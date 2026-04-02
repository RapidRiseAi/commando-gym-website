import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Join Now", "Join Commando with 24/7 access and a supportive start.", "/join");

export default function JoinPage() {
  redirect("/memberships");
}
