import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Cal.com Webhook Handler
 *
 * Receives booking events from Cal.com and forwards notifications to Telegram.
 * Configure this webhook URL in Cal.com: Settings → Developer → Webhooks
 * Subscriber URL: https://yourdomain.com/api/webhooks/calcom
 *
 * Supported triggers (select all in Cal.com):
 *   BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED,
 *   BOOKING_REQUESTED, BOOKING_REJECTED, MEETING_STARTED, MEETING_ENDED
 */

// Events we handle — explicitly excludes payment triggers
const SUPPORTED_EVENTS = new Set([
  "BOOKING_CREATED",
  "BOOKING_CANCELLED",
  "BOOKING_RESCHEDULED",
  "BOOKING_REQUESTED",
  "BOOKING_REJECTED",
  "MEETING_STARTED",
  "MEETING_ENDED",
]);

// Header per event type
const EVENT_HEADERS: Record<string, string> = {
  BOOKING_CREATED: "📅 New Appointment Booked!",
  BOOKING_CANCELLED: "❌ Appointment Cancelled",
  BOOKING_RESCHEDULED: "🔄 Appointment Rescheduled",
  BOOKING_REQUESTED: "🔔 Appointment Requested (Pending Approval)",
  BOOKING_REJECTED: "🚫 Appointment Rejected",
  MEETING_STARTED: "🟢 Meeting Started",
  MEETING_ENDED: "🔴 Meeting Ended",
};

export async function POST(request: Request) {
  try {
    // --- Security: Read raw body for signature verification ---
    const rawBody = await request.text();

    if (rawBody.length > 50_000) {
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 }
      );
    }

    // --- Security: Verify Cal.com webhook signature ---
    const webhookSecret = process.env.CALCOM_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get("x-cal-signature-256");
      if (!signature) {
        console.error("Missing Cal.com webhook signature");
        return NextResponse.json(
          { error: "Missing signature." },
          { status: 401 }
        );
      }

      const expectedSignature = createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      try {
        const sigBuffer = new Uint8Array(Buffer.from(signature, "hex"));
        const expectedBuffer = new Uint8Array(
          Buffer.from(expectedSignature, "hex")
        );
        if (
          sigBuffer.length !== expectedBuffer.length ||
          !timingSafeEqual(sigBuffer, expectedBuffer)
        ) {
          console.error("Invalid Cal.com webhook signature");
          return NextResponse.json(
            { error: "Invalid signature." },
            { status: 401 }
          );
        }
      } catch {
        console.error("Signature comparison failed");
        return NextResponse.json(
          { error: "Invalid signature format." },
          { status: 401 }
        );
      }
    }

    // Parse the webhook payload
    let data: CalWebhookPayload;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    // Ignore unsupported events (including payment triggers)
    if (!SUPPORTED_EVENTS.has(data.triggerEvent)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const booking = data.payload;
    if (!booking) {
      return NextResponse.json({ error: "Missing payload." }, { status: 400 });
    }

    // --- Send notification to Telegram ---
    const botToken = process.env.TELEGRAM_BOT_API;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram environment variables");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const telegramMessage = formatMessage(data.triggerEvent, booking);

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send notification." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cal.com webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// --- Message Formatting ---

function formatMessage(event: string, booking: BookingPayload): string {
  const header = EVENT_HEADERS[event] || `📋 Booking Update: ${event}`;

  const attendeeNames =
    booking.attendees?.map((a) => a.name || a.email).join(", ") || "Unknown";
  const attendeeEmails =
    booking.attendees?.map((a) => a.email).join(", ") || "Unknown";

  const startTime = formatTime(booking.startTime, "full");
  const endTime = formatTime(booking.endTime, "short");

  const lines: (string | null)[] = [header, ""];

  // Common booking info
  lines.push(`📌 Title: ${sanitize(booking.title || "Untitled")}`);
  lines.push(`👤 With: ${sanitize(attendeeNames)}`);
  lines.push(`📧 Email: ${sanitize(attendeeEmails)}`);

  // Time info — relevant for most events
  if (booking.startTime) {
    lines.push(`🕐 Time: ${startTime}${endTime ? ` – ${endTime}` : ""}`);
  }

  // Event-specific details
  switch (event) {
    case "BOOKING_RESCHEDULED":
      if (booking.rescheduleReason) {
        lines.push(
          `💬 Reschedule reason: ${sanitize(booking.rescheduleReason)}`
        );
      }
      break;

    case "BOOKING_CANCELLED":
      if (booking.cancellationReason) {
        lines.push(
          `💬 Cancellation reason: ${sanitize(booking.cancellationReason)}`
        );
      }
      break;

    case "BOOKING_REJECTED":
      if (booking.rejectionReason) {
        lines.push(
          `💬 Rejection reason: ${sanitize(booking.rejectionReason)}`
        );
      }
      break;
  }

  // Optional common fields
  if (booking.location) {
    lines.push(`📍 Location: ${sanitize(booking.location)}`);
  }
  if (booking.description) {
    lines.push(`📝 Notes: ${sanitize(booking.description)}`);
  }

  lines.push("");
  lines.push("🔗 Check Cal.com dashboard for details");

  return lines.filter((l) => l !== null).join("\n");
}

function formatTime(
  isoString: string | undefined,
  style: "full" | "short"
): string {
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

/** Sanitize text to prevent injection */
function sanitize(text: string): string {
  return text
    .replace(/\0/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

// --- Cal.com Webhook Types ---
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
