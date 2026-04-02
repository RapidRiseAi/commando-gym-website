"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { productInterestSchema, type ProductInterestData } from "@/lib/validation";

type Props = {
  optionType: "membership" | "wellness";
  selectedOption: string;
  triggerLabel: string;
  triggerClassName?: string;
};

type Errors = Partial<Record<keyof ProductInterestData, string>>;

export function ProductInterestModal({ optionType, selectedOption, triggerLabel, triggerClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<ProductInterestData>({
    option_type: optionType,
    selected_option: selectedOption,
    full_name: "",
    phone_or_whatsapp: "",
    preferred_contact_method: "whatsapp",
    preferred_date: "",
    notes: "",
    consent_checkbox: false
  });

  const setField = (field: keyof ProductInterestData, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = productInterestSchema.safeParse(formData);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProductInterestData;
        next[field] = issue.message;
      });
      setErrors(next);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setTimeout(() => setOpen(false), 1300);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className={triggerClassName ?? "w-full"}>{triggerLabel}</Button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 md:items-center md:p-4">
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-glow md:max-h-none md:max-w-lg md:p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">Request this option</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Selected option</p>
                <div className="mt-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                  {selectedOption} • {optionType === "membership" ? "Membership" : "Wellness Service"}
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <label className="block text-sm">
                Full name
                <input className="mt-1 min-h-11 w-full rounded-lg border border-border bg-black px-3" value={formData.full_name} onChange={(e) => setField("full_name", e.target.value)} />
              </label>
              <label className="block text-sm">
                Phone / WhatsApp
                <input className="mt-1 min-h-11 w-full rounded-lg border border-border bg-black px-3" value={formData.phone_or_whatsapp} onChange={(e) => setField("phone_or_whatsapp", e.target.value)} />
              </label>
              <label className="block text-sm">
                Preferred contact method
                <select className="mt-1 min-h-11 w-full rounded-lg border border-border bg-black px-3" value={formData.preferred_contact_method} onChange={(e) => setField("preferred_contact_method", e.target.value)}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </label>
              <label className="block text-sm">
                Preferred date (optional)
                <input className="mt-1 min-h-11 w-full rounded-lg border border-border bg-black px-3" type="date" value={formData.preferred_date} onChange={(e) => setField("preferred_date", e.target.value)} />
              </label>
              <label className="block text-sm">
                Notes (optional)
                <textarea className="mt-1 min-h-20 w-full rounded-lg border border-border bg-black px-3 py-2" value={formData.notes} onChange={(e) => setField("notes", e.target.value)} />
              </label>
              <label className="flex items-start gap-2 text-xs text-zinc-300">
                <input type="checkbox" checked={formData.consent_checkbox} onChange={(e) => setField("consent_checkbox", e.target.checked)} className="mt-1" />
                I consent to be contacted regarding this selected option.
              </label>

              {Object.values(errors).filter(Boolean).length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-xs text-red-400">{Object.values(errors).map((err) => err && <li key={err}>{err}</li>)}</ul>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">{status === "loading" ? "Submitting..." : "Submit Request"}</Button>
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              </div>

              {status === "success" && <p className="text-sm text-emerald-300">Request sent. We’ll contact you shortly.</p>}
              {status === "error" && <p className="text-sm text-red-300">Could not send request. Please WhatsApp +27 60 971 0050.</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
