import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: { default: "Commando Gym Sabie", template: "%s | Commando Gym Sabie" },
  description: "Premium dark-themed gym and spa in Sabie. Train with confidence and recover with purpose.",
  metadataBase: new URL(siteConfig.baseUrl)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-24 md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
