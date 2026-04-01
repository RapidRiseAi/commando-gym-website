import { z } from "zod";

export const joinSchema = z.object({
  full_name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone_or_whatsapp: z.string().min(7, "Please add your phone or WhatsApp number."),
  age_range: z.string().optional(),
  fitness_goal: z.enum(["lose weight", "build muscle", "improve fitness", "rehab/recovery", "general wellness"]),
  current_fitness_level: z.enum(["beginner", "intermediate", "advanced"]),
  preferred_plan: z.string().min(1, "Please choose a preferred plan."),
  interested_in_spa: z.enum(["yes", "no"]),
  preferred_start_date: z.string().optional(),
  preferred_contact_method: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().max(500).optional(),
  consent_checkbox: z.boolean().refine(Boolean, "Consent is required to submit.")
});

export type JoinFormData = z.infer<typeof joinSchema>;
