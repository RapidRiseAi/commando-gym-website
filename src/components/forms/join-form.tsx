"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinSchema, type JoinFormData } from "@/lib/validation";

type Errors = Partial<Record<keyof JoinFormData, string>>;

const initialData: JoinFormData = {
  full_name: "",
  email: "",
  phone_or_whatsapp: "",
  age_range: "",
  fitness_goal: "improve fitness",
  current_fitness_level: "beginner",
  preferred_plan: "",
  interested_in_spa: "yes",
  preferred_start_date: "",
  preferred_contact_method: "whatsapp",
  message: "",
  consent_checkbox: false
};

const fieldClass =
  "min-h-11 w-full rounded-xl border border-white/10 bg-black px-3 text-white placeholder:text-zinc-500 transition focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

export function JoinForm() {
  const [data, setData] = useState<JoinFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = (field: keyof JoinFormData, value: string | boolean) => setData((prev) => ({ ...prev, [field]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = joinSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof JoinFormData;
        next[field] = issue.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/join", {
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
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-surface p-5 shadow-card md:p-8">
      <p className="text-sm text-zinc-300">You can complete this in under two minutes. We’ll contact you on your preferred method.</p>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Your details</p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">Full name<input className={`mt-1 ${fieldClass}`} value={data.full_name} onChange={(e) => setField("full_name", e.target.value)} /></label>
        <label className="text-sm">Email<input className={`mt-1 ${fieldClass}`} type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} /></label>
        <label className="text-sm">Phone or WhatsApp<input className={`mt-1 ${fieldClass}`} value={data.phone_or_whatsapp} onChange={(e) => setField("phone_or_whatsapp", e.target.value)} /></label>
        <label className="text-sm">Fitness goal
          <select className={`mt-1 ${fieldClass}`} value={data.fitness_goal} onChange={(e) => setField("fitness_goal", e.target.value)}>
            {joinSchema.shape.fitness_goal.options.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="text-sm">Current fitness level
          <select className={`mt-1 ${fieldClass}`} value={data.current_fitness_level} onChange={(e) => setField("current_fitness_level", e.target.value)}>
            {joinSchema.shape.current_fitness_level.options.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Plan preferences</p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">Preferred plan<input className={`mt-1 ${fieldClass}`} value={data.preferred_plan} onChange={(e) => setField("preferred_plan", e.target.value)} /></label>
        <label className="text-sm">Interested in Wellness Studio
          <select className={`mt-1 ${fieldClass}`} value={data.interested_in_spa} onChange={(e) => setField("interested_in_spa", e.target.value)}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label>
        <label className="text-sm">Preferred contact method
          <select className={`mt-1 ${fieldClass}`} value={data.preferred_contact_method} onChange={(e) => setField("preferred_contact_method", e.target.value)}>
            <option value="phone">Phone</option><option value="whatsapp">WhatsApp</option><option value="email">Email</option>
          </select>
        </label>
      </div>

      <details className="rounded-xl border border-white/10 p-3 md:hidden">
        <summary className="cursor-pointer font-display text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Optional details</summary>
        <div className="mt-3 grid gap-4">
          <label className="text-sm">Age range (optional)<input className={`mt-1 ${fieldClass}`} value={data.age_range} onChange={(e) => setField("age_range", e.target.value)} /></label>
          <label className="text-sm">Preferred start date<input className={`mt-1 ${fieldClass}`} type="date" value={data.preferred_start_date} onChange={(e) => setField("preferred_start_date", e.target.value)} /></label>
          <label className="block text-sm">Message (optional)
            <textarea className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-white focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" value={data.message} onChange={(e) => setField("message", e.target.value)} />
          </label>
        </div>
      </details>

      <div className="hidden gap-4 md:grid md:grid-cols-2">
        <label className="text-sm">Age range (optional)<input className={`mt-1 ${fieldClass}`} value={data.age_range} onChange={(e) => setField("age_range", e.target.value)} /></label>
        <label className="text-sm">Preferred start date<input className={`mt-1 ${fieldClass}`} type="date" value={data.preferred_start_date} onChange={(e) => setField("preferred_start_date", e.target.value)} /></label>
        <label className="block text-sm md:col-span-2">Message (optional)
          <textarea className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-white focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" value={data.message} onChange={(e) => setField("message", e.target.value)} />
        </label>
      </div>

      {Object.values(errors).filter(Boolean).length > 0 && (
        <div className="flex gap-2 rounded-xl border border-white/15 border-l-2 border-l-white/60 bg-white/[0.03] p-3 text-sm text-zinc-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <ul className="space-y-1">{Object.values(errors).map((err) => err && <li key={err}>{err}</li>)}</ul>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-zinc-300">
        <input id="join-consent" className="mt-1 h-4 w-4 accent-white" type="checkbox" checked={data.consent_checkbox} onChange={(e) => setField("consent_checkbox", e.target.checked)} />
        <span>
          <label htmlFor="join-consent">I consent to be contacted regarding membership options, and I accept Commando’s </label>
          <Link href="/terms" className="text-white underline underline-offset-4">Terms &amp; Waiver</Link>,{" "}
          <Link href="/media-policy" className="text-white underline underline-offset-4">Media Policy</Link>, and{" "}
          <Link href="/privacy" className="text-white underline underline-offset-4">Privacy Policy</Link>.
        </span>
      </div>

      <Button type="submit" className="w-full">{status === "loading" ? "Submitting..." : "Join Now"}</Button>
      {status === "success" && (
        <div className="rounded-xl border border-white/15 bg-white/[0.03] p-3 text-sm text-zinc-100">
          <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" aria-hidden /> Thanks, your request has been received. Our team will contact you within 24 hours. If urgent, message WhatsApp +27 60 971 0050.</p>
          <div className="mt-2 flex gap-3"><Link href="/faq" className="underline">View FAQ</Link><Link href="/memberships" className="underline">Explore Memberships</Link></div>
        </div>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-zinc-200"><AlertCircle className="h-4 w-4" aria-hidden /> Could not submit. Please contact Chantelle on WhatsApp +27 60 971 0050 and we’ll assist as soon as possible.</p>
      )}
    </form>
  );
}
