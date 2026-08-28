import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Ticker from "@/components/Ticker";
import { getBrands } from "@/lib/api";
import { ApiBrand } from "@/lib/types";

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

const themeInit = `
(function(){try{var t=localStorage.getItem('buyorama-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let brands: ApiBrand[] = [];
  try {
    brands = await getBrands();
  } catch {
    brands = [];
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${bricolage.variable} ${jakarta.variable}`}>
        <Header brands={brands} />
        <Ticker brands={brands} />
        <main>{children}</main>
        <Footer brands={brands} />
        <MobileNav />
      </body>
    </html>
  );
}
