import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Join Now", "Join Commando with gym access from 5 AM to 9 PM and a supportive start.", "/join");

export default function JoinPage() {
  redirect("/memberships");
}
