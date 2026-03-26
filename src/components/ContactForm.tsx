"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await res.json()) as { success: boolean; error?: string };
      if (!res.ok || !payload.success) {
        setStatus("error");
        setError(payload.error ?? "Could not send message.");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setError("Could not send message.");
    }
  }

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <div className="fieldGrid">
        <label className="field">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Your full name"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
          />
        </label>
      </div>

      <label className="field">
        <span>Subject</span>
        <input
          required
          value={form.subject}
          onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
          placeholder="Project discussion"
        />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Write your message..."
        />
      </label>

      <button className="btn btnPrimary sendBtn" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="successText">Message sent successfully. I will get back to you soon.</p>
      )}
      {status === "error" && <p className="errorText">{error}</p>}
    </form>
  );
}
