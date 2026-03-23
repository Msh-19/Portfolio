import { createHmac, timingSafeEqual } from "crypto";

import { NextResponse } from "next/server";

import { sendTelegramMessage } from "@/lib/telegram";

const SUPPORTED_EVENTS = new Set([
  "BOOKING_CREATED",
  "BOOKING_CANCELLED",
  "BOOKING_RESCHEDULED",
  "BOOKING_REQUESTED",
  "BOOKING_REJECTED",
  "MEETING_STARTED",
  "MEETING_ENDED",
]);

const EVENT_HEADERS: Record<string, string> = {
  BOOKING_CREATED: "New appointment booked",
  BOOKING_CANCELLED: "Appointment cancelled",
  BOOKING_RESCHEDULED: "Appointment rescheduled",
  BOOKING_REQUESTED: "Appointment requested",
  BOOKING_REJECTED: "Appointment rejected",
  MEETING_STARTED: "Meeting started",
  MEETING_ENDED: "Meeting ended",
};

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    if (rawBody.length > 50_000) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }

    const webhookSecret = process.env.CALCOM_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Missing Cal.com webhook secret");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const signature = request.headers.get("x-cal-signature-256");
    if (!signature) {
      console.error("Missing Cal.com webhook signature");
      return NextResponse.json({ error: "Missing signature." }, { status: 401 });
    }

    const expectedSignature = createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    try {
      const sigBuffer = new Uint8Array(Buffer.from(signature, "hex"));
      const expectedBuffer = new Uint8Array(Buffer.from(expectedSignature, "hex"));
      if (
        sigBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(sigBuffer, expectedBuffer)
      ) {
        console.error("Invalid Cal.com webhook signature");
        return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
      }
    } catch {
      console.error("Signature comparison failed");
      return NextResponse.json({ error: "Invalid signature format." }, { status: 401 });
    }

    let data: CalWebhookPayload;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    if (!SUPPORTED_EVENTS.has(data.triggerEvent)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const booking = data.payload;
    if (!booking) {
      return NextResponse.json({ error: "Missing payload." }, { status: 400 });
    }

    const telegramMessage = formatMessage(data.triggerEvent, booking);

    try {
      await sendTelegramMessage(telegramMessage);
    } catch (error) {
      console.error("Telegram API error:", error);
      return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cal.com webhook error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

function formatMessage(event: string, booking: BookingPayload): string {
  const header = EVENT_HEADERS[event] || `Booking update: ${event}`;
  const attendeeNames =
    booking.attendees?.map((attendee) => attendee.name || attendee.email).join(", ") ||
    "Unknown";
  const attendeeEmails =
    booking.attendees?.map((attendee) => attendee.email).join(", ") || "Unknown";

  const lines: string[] = [header, ""];

  lines.push(`Title: ${sanitize(booking.title || "Untitled")}`);
  lines.push(`With: ${sanitize(attendeeNames)}`);
  lines.push(`Email: ${sanitize(attendeeEmails)}`);

  if (booking.startTime) {
    const startTime = formatTime(booking.startTime, "full");
    const endTime = formatTime(booking.endTime, "short");
    lines.push(`Time: ${startTime}${endTime ? ` - ${endTime}` : ""}`);
  }

  switch (event) {
    case "BOOKING_RESCHEDULED":
      if (booking.rescheduleReason) {
        lines.push(`Reschedule reason: ${sanitize(booking.rescheduleReason)}`);
      }
      break;
    case "BOOKING_CANCELLED":
      if (booking.cancellationReason) {
        lines.push(`Cancellation reason: ${sanitize(booking.cancellationReason)}`);
      }
      break;
    case "BOOKING_REJECTED":
      if (booking.rejectionReason) {
        lines.push(`Rejection reason: ${sanitize(booking.rejectionReason)}`);
      }
      break;
  }

  if (booking.location) {
    lines.push(`Location: ${sanitize(booking.location)}`);
  }

  if (booking.description) {
    lines.push(`Notes: ${sanitize(booking.description)}`);
  }

  lines.push("");
  lines.push("Check the Cal.com dashboard for full details.");

  return lines.join("\n");
}

function formatTime(isoString: string | undefined, style: "full" | "short") {
  if (!isoString) return "";

  try {
    return new Date(isoString).toLocaleString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      ...(style === "full"
        ? { dateStyle: "full", timeStyle: "short" }
        : { timeStyle: "short" }),
    });
  } catch {
    return isoString;
  }
}

function sanitize(text: string) {
  return text
    .replace(/\0/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

interface BookingPayload {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  status?: string;
  cancellationReason?: string;
  rescheduleReason?: string;
  rejectionReason?: string;
  organizer?: {
    name?: string;
    email?: string;
  };
  attendees?: Array<{
    name?: string;
    email?: string;
    timeZone?: string;
  }>;
  metadata?: Record<string, unknown>;
}

interface CalWebhookPayload {
  triggerEvent: string;
  createdAt?: string;
  payload?: BookingPayload;
}
