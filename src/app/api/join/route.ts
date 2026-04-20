import { NextResponse } from "next/server";
import { joinSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = joinSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const appScriptUrl = process.env.JOIN_WEBHOOK_URL;

    if (appScriptUrl) {
      const webhookResponse = await fetch(appScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? ""
        },
        body: JSON.stringify({
          ...parsed.data,
          source: "join_form",
          submission_type: "membership",
          submitted_at: new Date().toISOString(),
          webhook_secret: process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? ""
        })
      });

      if (!webhookResponse.ok) {
        return NextResponse.json({
          success: false,
          message: "Submission failed to route. Please contact WhatsApp +27 60 971 0050."
        }, { status: 502 });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks — your request has been received. We'll contact you within 24 hours.",
      data: parsed.data
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Unexpected error. Please contact WhatsApp +27 60 971 0050."
    }, { status: 500 });
  }
}
