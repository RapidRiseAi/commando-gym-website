import { NextResponse } from "next/server";
import { joinSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = joinSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Lead captured. Wire this endpoint to CRM/email automation.",
    data: parsed.data
  });
}
