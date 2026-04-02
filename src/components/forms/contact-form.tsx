"use client";

import { useState } from "react";
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

const fieldClass = "min-h-10 w-full rounded-lg border border-border bg-black px-3 md:min-h-11";

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
    <form onSubmit={submit} className="mobile-card space-y-4 md:p-5">
      <p className="text-sm text-zinc-300">Send us your details and message, and our team will get back to you.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">Full name<input className={fieldClass} value={data.full_name} onChange={(e) => setField("full_name", e.target.value)} /></label>
        <label className="text-sm">Email (optional)<input className={fieldClass} type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} /></label>
        <label className="text-sm">Phone or WhatsApp<input className={fieldClass} value={data.phone_or_whatsapp} onChange={(e) => setField("phone_or_whatsapp", e.target.value)} /></label>
        <label className="text-sm">Preferred contact method
          <select className={fieldClass} value={data.preferred_contact_method} onChange={(e) => setField("preferred_contact_method", e.target.value)}>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">Message
        <textarea className="min-h-24 w-full rounded-lg border border-border bg-black px-3 py-2" value={data.message} onChange={(e) => setField("message", e.target.value)} />
      </label>

      {Object.entries(errors).length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-red-400">{Object.values(errors).map((err) => err && <li key={err}>{err}</li>)}</ul>
      )}

      <label className="flex items-start gap-2 text-sm">
        <input className="mt-1" type="checkbox" checked={data.consent_checkbox} onChange={(e) => setField("consent_checkbox", e.target.checked)} />
        <span>I consent to be contacted regarding my enquiry.</span>
      </label>

      <Button type="submit" className="w-full">{status === "loading" ? "Sending..." : "Send message"}</Button>

      {status === "success" && <p className="text-sm text-emerald-300">Thanks — we received your message and will reply shortly.</p>}
      {status === "error" && <p className="text-sm text-red-300">Couldn’t submit. Please message WhatsApp +27 60 971 0050.</p>}
    </form>
  );
}
