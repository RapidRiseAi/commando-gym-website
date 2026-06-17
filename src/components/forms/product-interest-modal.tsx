"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productInterestSchema, type ProductInterestData } from "@/lib/validation";

type Props = {
  optionType: "membership" | "wellness";
  selectedOption: string;
  triggerLabel: string;
  triggerClassName?: string;
  selectionOptions?: string[];
};

type Errors = Partial<Record<keyof ProductInterestData, string>>;

export function ProductInterestModal({ optionType, selectedOption, triggerLabel, triggerClassName, selectionOptions }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [step, setStep] = useState<"select" | "form">(selectionOptions?.length ? "select" : "form");
  const [errors, setErrors] = useState<Errors>({});
  const [chosenOption, setChosenOption] = useState(selectedOption);
  const [formData, setFormData] = useState<ProductInterestData>({
    option_type: optionType,
    selected_option: chosenOption,
    full_name: "",
    phone_or_whatsapp: "",
    preferred_contact_method: "whatsapp",
    preferred_date: "",
    notes: "",
    consent_checkbox: false
  });

  const setField = (field: keyof ProductInterestData, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const resetModalState = () => {
    setStep(selectionOptions?.length ? "select" : "form");
    setChosenOption(selectedOption);
    setFormData((prev) => ({
      ...prev,
      selected_option: selectedOption,
      full_name: "",
      phone_or_whatsapp: "",
      preferred_contact_method: "whatsapp",
      preferred_date: "",
      notes: "",
      consent_checkbox: false
    }));
    setErrors({});
    setStatus("idle");
  };

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
      setTimeout(() => {
        setOpen(false);
        resetModalState();
      }, 1300);
    } catch {
      setStatus("error");
    }
  };

  const closeModal = () => {
    setOpen(false);
    resetModalState();
  };

  const inputClass =
    "mt-1 min-h-11 w-full rounded-xl border border-white/10 bg-black px-3 text-white placeholder:text-zinc-500 transition focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <>
      <Button
        onClick={() => {
          resetModalState();
          setOpen(true);
        }}
        className={triggerClassName ?? "w-full"}
      >
        {triggerLabel}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm md:items-center md:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={step === "select" ? "Choose your service option" : "Request this option"}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-2xl border border-white/15 bg-surface p-4 shadow-glow md:max-h-none md:max-w-lg md:p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold">{step === "select" ? "Choose your service option" : "Request this option"}</h3>
                {step === "form" && (
                  <>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Selected option</p>
                    <div className="mt-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                      {chosenOption} · {optionType === "membership" ? "Membership" : "Wellness Service"}
                    </div>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/30 hover:text-white"
              >
                ✕
              </button>
            </div>

            {step === "select" && selectionOptions?.length ? (
              <div className="space-y-2">
                {selectionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChosenOption(option);
                      setFormData((prev) => ({ ...prev, selected_option: option }));
                      setStep("form");
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-left text-sm text-zinc-100 transition hover:border-white/30 hover:bg-surface-2"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
            <form onSubmit={submit} className="space-y-3">
              <label className="block text-sm">
                Full name
                <input className={inputClass} value={formData.full_name} onChange={(e) => setField("full_name", e.target.value)} />
              </label>
              <label className="block text-sm">
                Phone / WhatsApp
                <input className={inputClass} value={formData.phone_or_whatsapp} onChange={(e) => setField("phone_or_whatsapp", e.target.value)} />
              </label>
              <label className="block text-sm">
                Preferred contact method
                <select className={inputClass} value={formData.preferred_contact_method} onChange={(e) => setField("preferred_contact_method", e.target.value)}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </label>
              <label className="block text-sm">
                Preferred date (optional)
                <input className={inputClass} type="date" value={formData.preferred_date} onChange={(e) => setField("preferred_date", e.target.value)} />
              </label>
              <label className="block text-sm">
                Notes (optional)
                <textarea className="mt-1 min-h-20 w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-white focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" value={formData.notes} onChange={(e) => setField("notes", e.target.value)} />
              </label>
              <div className="flex items-start gap-2 text-xs text-zinc-300">
                <input id={`interest-consent-${chosenOption}`} type="checkbox" checked={formData.consent_checkbox} onChange={(e) => setField("consent_checkbox", e.target.checked)} className="mt-0.5 h-4 w-4 accent-white" />
                <span>
                  <label htmlFor={`interest-consent-${chosenOption}`}>I consent to be contacted regarding this option and to my information being handled per the </label>
                  <Link href="/privacy" className="text-white underline underline-offset-4">Privacy Policy</Link>.
                </span>
              </div>

              {Object.values(errors).filter(Boolean).length > 0 && (
                <div className="flex gap-2 rounded-xl border border-white/15 border-l-2 border-l-white/60 bg-white/[0.03] p-3 text-xs text-zinc-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <ul className="space-y-1">{Object.values(errors).map((err) => err && <li key={err}>{err}</li>)}</ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">{status === "loading" ? "Submitting..." : "Submit Request"}</Button>
                <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>

              {status === "success" && <p className="flex items-center gap-2 text-sm text-white"><CheckCircle2 className="h-4 w-4" aria-hidden /> Request sent. We’ll contact you shortly.</p>}
              {status === "error" && <p className="flex items-center gap-2 text-sm text-zinc-200"><AlertCircle className="h-4 w-4" aria-hidden /> Could not send request. Please WhatsApp +27 60 971 0050.</p>}
            </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
