import type { NextConfig } from "next";

// Single source of truth for the Content-Security-Policy. The site serves only
// same-origin assets (self-hosted fonts via next/font, pre-optimized images,
// first-party API routes); external hosts appear only as user navigations
// (WhatsApp, tel:, Google Maps) which are not subject to CSP fetch directives.
// 'unsafe-inline' is required for Next.js' inline bootstrap scripts and the
// inline styles injected by next/font; tightening this to nonces would require
// switching pages to dynamic rendering (see SECURITY.md).
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()"
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Images are pre-optimized to static WebP and served directly; the runtime
    // optimizer is a no-op on Cloudflare/OpenNext without an Images binding.
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
