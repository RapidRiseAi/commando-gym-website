import { NextResponse } from "next/server";
import { productInterestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = productInterestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const webhookUrl = process.env.PRODUCT_WEBHOOK_URL || process.env.JOIN_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({
        success: false,
        message: "Missing PRODUCT_WEBHOOK_URL configuration."
      }, { status: 500 });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? ""
      },
      body: JSON.stringify({
        source: "product-selection-modal",
        submission_type: parsed.data.option_type === "wellness" ? "wellness_booking" : "membership",
        submitted_at: new Date().toISOString(),
        webhook_secret: process.env.APPS_SCRIPT_WEBHOOK_SECRET ?? "",
        ...parsed.data
      })
    });

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        message: "Could not send request to booking system."
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: "Selection request captured and sent."
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Unexpected error. Please contact WhatsApp +27 60 971 0050."
    }, { status: 500 });
  }
}
