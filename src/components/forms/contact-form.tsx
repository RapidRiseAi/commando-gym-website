"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormData } from "@/lib/validation";

type Errors = Partial<Record<keyof ContactFormData, string>>;

const initialData: ContactFormData = {
  full_name: "",
  email: "",
  phone_or_whatsapp: "",
  preferred_contact_method: "whatsapp",
  message: "",
  consent_checkbox: false
};

const fieldClass =
  "min-h-11 w-full rounded-xl border border-white/10 bg-black px-3 text-white placeholder:text-zinc-500 transition focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = (field: keyof ContactFormData, value: string | boolean) => setData((prev) => ({ ...prev, [field]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        next[field] = issue.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setData(initialData);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-surface p-5 shadow-card md:p-6">
      <p className="text-sm text-zinc-300">Send us your details and message, and our team will get back to you.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm">Full name<input className={`mt-1 ${fieldClass}`} value={data.full_name} onChange={(e) => setField("full_name", e.target.value)} /></label>
        <label className="text-sm">Email (optional)<input className={`mt-1 ${fieldClass}`} type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} /></label>
        <label className="text-sm">Phone or WhatsApp<input className={`mt-1 ${fieldClass}`} value={data.phone_or_whatsapp} onChange={(e) => setField("phone_or_whatsapp", e.target.value)} /></label>
        <label className="text-sm">Preferred contact method
          <select className={`mt-1 ${fieldClass}`} value={data.preferred_contact_method} onChange={(e) => setField("preferred_contact_method", e.target.value)}>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm">Message
        <textarea className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 transition focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" value={data.message} onChange={(e) => setField("message", e.target.value)} />
      </label>

      {Object.values(errors).filter(Boolean).length > 0 && (
        <div className="mt-4 flex gap-2 rounded-xl border border-white/15 border-l-2 border-l-white/60 bg-white/[0.03] p-3 text-sm text-zinc-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <ul className="space-y-1">{Object.values(errors).map((err) => err && <li key={err}>{err}</li>)}</ul>
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 text-sm text-zinc-300">
        <input id="contact-consent" className="mt-1 h-4 w-4 accent-white" type="checkbox" checked={data.consent_checkbox} onChange={(e) => setField("consent_checkbox", e.target.checked)} />
        <span>
          <label htmlFor="contact-consent">I consent to Commando contacting me about my enquiry and to my information being handled as described in the </label>
          <Link href="/privacy" className="text-white underline underline-offset-4">Privacy Policy</Link>.
        </span>
      </div>

      <Button type="submit" className="mt-5 w-full">{status === "loading" ? "Sending..." : "Send message"}</Button>

      {status === "success" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-white"><CheckCircle2 className="h-4 w-4" aria-hidden /> Thanks, we received your message and will reply shortly.</p>
      )}
      {status === "error" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-zinc-200"><AlertCircle className="h-4 w-4" aria-hidden /> Could not submit. Please message WhatsApp +27 60 971 0050.</p>
      )}
    </form>
  );
}
