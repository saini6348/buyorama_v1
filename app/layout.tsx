import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Ticker from "@/components/Ticker";
import { getBrands, getSalesEvents } from "@/lib/api";
import { ApiBrand, ApiSalesEvent } from "@/lib/types";

export const revalidate = 60;

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "BUY-O-RAMA — We Do the Searching. You Do the Saving.",
  description:
    "India's funkiest deals hub: coupons, credit card offers and sale events — updated all day, every day.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let brands: ApiBrand[] = [];
  let salesEvents: ApiSalesEvent[] = [];
  try {
    brands = await getBrands();
  } catch {
    brands = [];
  }
  try {
    salesEvents = await getSalesEvents();
  } catch {
    salesEvents = [];
  }

  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} ${jakarta.variable}`}>
        <Header brands={brands} salesEvents={salesEvents} />
        <Ticker brands={brands} />
        <main>{children}</main>
        <Footer brands={brands} salesEvents={salesEvents} />
        <MobileNav />
      </body>
    </html>
  );
}
