import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    const mailjetApiKey = process.env.MAILJET_API_KEY;
    const mailjetApiSecret = process.env.MAILJET_API_SECRET;
    const senderEmail = process.env.MAILJET_SENDER_EMAIL;
    const senderName = process.env.MAILJET_SENDER_NAME ?? "Portfolio Contact";
    const toEmail =
      process.env.CONTACT_TO_EMAIL ?? "madhusudhan.timalsina@smartsarks.com";

    if (!mailjetApiKey || !mailjetApiSecret || !senderEmail) {
      const missing: string[] = [];
      if (!mailjetApiKey) missing.push("MAILJET_API_KEY");
      if (!mailjetApiSecret) missing.push("MAILJET_API_SECRET");
      if (!senderEmail) missing.push("MAILJET_SENDER_EMAIL");

      const hint =
        process.env.NODE_ENV === "development"
          ? ` Add them in .env.local (not .env.example), then restart dev server. Missing: ${missing.join(", ")}.`
          : "";

      return NextResponse.json(
        {
          success: false,
          error: `Email service is not configured.${hint}`.trim(),
        },
        { status: 500 },
      );
    }

    const payload = {
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: senderName,
          },
          To: [
            {
              Email: toEmail,
              Name: "Madhusudan Timalsina",
            },
          ],
          ReplyTo: {
            Email: email,
            Name: name,
          },
          Subject: `Portfolio Contact: ${subject}`,
          TextPart: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            "",
            "Message:",
            message,
          ].join("\n"),
          HTMLPart: `
        <h3>New portfolio contact request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
        },
      ],
    };

    const res = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${mailjetApiKey}:${mailjetApiSecret}`,
        ).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let detail = "";
      try {
        const errBody = await res.text();
        if (process.env.NODE_ENV === "development" && errBody) {
          detail = ` ${errBody.slice(0, 280)}`;
        }
      } catch {
        /* ignore */
      }
      return NextResponse.json(
        { success: false, error: `Mail service rejected the request.${detail}`.trim() },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
