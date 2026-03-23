import { NextResponse } from "next/server";
import { z } from "zod";

import { sendTelegramMessage } from "@/lib/telegram";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[\p{L}\p{M}\s'.,-]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  website: z.string().max(0, "Invalid submission").optional(),
});

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
    }

    const ip = getClientIp(request);
    cleanupRateLimitMap();
    if (ip) {
      const lastRequest = rateLimitMap.get(ip);
      if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
        return NextResponse.json(
          { error: "Please wait before sending another message." },
          { status: 429 },
        );
      }
      rateLimitMap.set(ip, Date.now());
    }

    const bodyText = await request.text();
    if (bodyText.length > 10_000) {
      return NextResponse.json({ error: "Request payload too large." }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    if (result.data.website) {
      return NextResponse.json({ success: true });
    }

    const name = sanitize(result.data.name).trim();
    const email = result.data.email.trim().toLowerCase();
    const message = sanitize(result.data.message).trim();

    const urlPattern = /https?:\/\/|www\./gi;
    const urlMatches = message.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
      return NextResponse.json(
        { error: "Too many links in message. Please reduce and try again." },
        { status: 400 },
      );
    }

    const telegramMessage = [
      "New Contact Form Message",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      `Time: ${new Date().toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" })}`,
      `IP: ${ip ?? "Unavailable"}`,
    ].join("\n");

    try {
      await sendTelegramMessage(telegramMessage);
    } catch (error) {
      console.error("Telegram API error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

function sanitize(text: string): string {
  return text
    .replace(/\0/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/\s+/g, " ");
}

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, timestamp] of rateLimitMap) {
    if (now - timestamp > RATE_LIMIT_MS * 2) {
      rateLimitMap.delete(ip);
    }
  }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}
