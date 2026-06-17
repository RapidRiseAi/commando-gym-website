import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL ?? process.env.JOIN_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? ""
        },
        body: JSON.stringify({
          ...parsed.data,
          source: "contact_form",
          submission_type: "enquiry",
          submitted_at: new Date().toISOString(),
          webhook_secret: process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? ""
        })
      });

      if (!webhookResponse.ok) {
        return NextResponse.json({
          success: false,
          message: "Contact request failed to route. Please message WhatsApp +27 60 971 0050."
        }, { status: 502 });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks, your message has been received. We will reply shortly."
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Unexpected error. Please contact WhatsApp +27 60 971 0050."
    }, { status: 500 });
  }
}
