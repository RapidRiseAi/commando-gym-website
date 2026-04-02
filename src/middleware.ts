import { NextRequest, NextResponse } from "next/server";

const MOBILE_UA_REGEX = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

export function middleware(request: NextRequest) {
  const isMobileUserAgent = MOBILE_UA_REGEX.test(request.headers.get("user-agent") ?? "");
  const isSpaPath = request.nextUrl.pathname === "/spa";
  const referer = request.headers.get("referer") ?? "";
  const isInternalReferer = referer.startsWith(request.nextUrl.origin);

  if (isMobileUserAgent && isSpaPath && !isInternalReferer) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/spa"]
};
