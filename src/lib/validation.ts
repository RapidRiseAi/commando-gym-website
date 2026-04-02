import { z } from "zod";

export const joinSchema = z.object({
  full_name: z.string().optional(),
  email: z.union([z.literal(""), z.string().email("Please enter a valid email.")]),
  phone_or_whatsapp: z.string().min(7, "Please add your phone or WhatsApp number."),
  age_range: z.string().optional(),
  fitness_goal: z.enum(["lose weight", "build muscle", "improve fitness", "rehab/recovery", "general wellness"]),
  current_fitness_level: z.enum(["beginner", "intermediate", "advanced"]),
  preferred_plan: z.string().optional(),
  interested_in_spa: z.enum(["yes", "no"]),
  preferred_start_date: z.string().optional(),
  preferred_contact_method: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().max(500).optional(),
  consent_checkbox: z.boolean().refine(Boolean, "Consent is required to submit.")
});

export type JoinFormData = z.infer<typeof joinSchema>;

export const contactSchema = z.object({
  full_name: z.string().min(2, "Please add your name."),
  email: z.union([z.literal(""), z.string().email("Please enter a valid email.")]),
  phone_or_whatsapp: z.string().min(7, "Please add your phone or WhatsApp number."),
  preferred_contact_method: z.enum(["whatsapp", "phone", "email"]),
  message: z.string().max(500, "Message must be 500 characters or less.").optional(),
  consent_checkbox: z.boolean().refine(Boolean, "Consent is required to submit.")
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const productInterestSchema = z.object({
  option_type: z.enum(["membership", "wellness"]),
  selected_option: z.string().min(2, "Please select an option."),
  full_name: z.string().min(2, "Please add your name."),
  phone_or_whatsapp: z.string().min(7, "Please add a contact number."),
  preferred_contact_method: z.enum(["whatsapp", "phone", "email"]),
  preferred_date: z.string().optional(),
  notes: z.string().max(500).optional(),
  consent_checkbox: z.boolean().refine(Boolean, "Consent is required to submit.")
});

export type ProductInterestData = z.infer<typeof productInterestSchema>;
