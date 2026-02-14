import { NextResponse } from "next/server";
import { z } from "zod";

// --- Security: Strict Zod schema with length limits and pattern validation ---
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(
      /^[\p{L}\p{M}\s'.,-]+$/u,
      "Name contains invalid characters"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  // Honeypot field — should always be empty (bots auto-fill hidden fields)
  website: z.string().max(0, "Invalid submission").optional(),
});

// --- Security: Rate limiter with memory cleanup ---
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;
const RATE_LIMIT_CLEANUP_INTERVAL = 5 * 60_000; // 5 minutes

// Periodically clean stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamp] of rateLimitMap) {
    if (now - timestamp > RATE_LIMIT_MS * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_CLEANUP_INTERVAL);

export async function POST(request: Request) {
  try {
    // --- Security: Enforce content-type ---
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type." },
        { status: 415 }
      );
    }

    // --- Security: Rate limiting per IP ---
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Please wait before sending another message." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, Date.now());

    // --- Security: Guard against oversized payloads ---
    const bodyText = await request.text();
    if (bodyText.length > 10_000) {
      return NextResponse.json(
        { error: "Request payload too large." },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON." },
        { status: 400 }
      );
    }

    // --- Security: Validate with strict Zod schema ---
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    // --- Security: Honeypot check (bot trap) ---
    if (result.data.website) {
      // Silently reject — looks like success to the bot
      return NextResponse.json({ success: true });
    }

    // Sanitize inputs
    const name = sanitize(result.data.name).trim();
    const email = result.data.email.trim().toLowerCase();
    const message = sanitize(result.data.message).trim();

    // --- Security: Block link spam (allow max 2 URLs) ---
    const urlPattern = /https?:\/\/|www\./gi;
    const urlMatches = message.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
      return NextResponse.json(
        { error: "Too many links in message. Please reduce and try again." },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_API;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Format the message for Telegram (plain text — no parse_mode to avoid injection)
    const telegramMessage = [
      `📩 New Contact Form Message`,
      ``,
      `👤 Name: ${name}`,
      `📧 Email: ${email}`,
      ``,
      `💬 Message:`,
      message,
      ``,
      `🕐 ${new Date().toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" })}`,
      `🌐 IP: ${ip}`,
    ].join("\n");

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          // No parse_mode — plain text prevents Markdown/HTML injection entirely
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * Strip HTML/script tags, null bytes, and excessive whitespace.
 * This prevents XSS, HTML injection, and null byte attacks.
 */
function sanitize(text: string): string {
  return text
    .replace(/\0/g, "")                          // Remove null bytes
    .replace(/<\/?[^>]+(>|$)/g, "")               // Strip HTML tags
    .replace(/javascript:/gi, "")                  // Strip JS protocol
    .replace(/on\w+\s*=/gi, "")                    // Strip event handlers (onclick=, etc.)
    .replace(/\s+/g, " ");                         // Collapse excessive whitespace
}
