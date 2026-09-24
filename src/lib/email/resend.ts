import "server-only";

// Minimal Resend client (REST API; no SDK dependency). Uses the website's
// sending-only key, RESEND_API_KEY, restricted to imowit.com. This is separate
// from the SMTP credentials Supabase Auth uses for sign-up codes.
// Returns whether Resend accepted the message; never throws.
export async function sendEmail(message: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; email not sent");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "iMowiT Website <noreply@imowit.com>",
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("resend send failed", res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (e) {
    console.error("resend request failed", e instanceof Error ? e.name : "unknown");
    return false;
  }
}
