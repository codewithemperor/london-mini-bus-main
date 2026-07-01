import type { Metadata } from "next";
import "./globals.css";
import TopBar from "../components/topbar";
import { Nunito, Outfit } from "next/font/google";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import FloatingWhatsApp from "@/components/floating-icon";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.londonminibusrental.co.uk"),

  title: {
    default: "London Minibus Rental | Minibus Hire with Driver",
    template: "%s | London Minibus Rental",
  },

  description:
    "London Minibus Rental provides reliable and affordable minibus hire with professional drivers. Serving London and the UK for airport transfers, schools, businesses, events and group travel.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.londonminibusrental.co.uk",
    siteName: "London Minibus Rental",
    title: "London Minibus Rental | Minibus Hire with Driver",
    description:
      "Affordable and reliable minibus hire with driver in London. Ideal for airport transfers, corporate travel, school trips and group transport across the UK.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={nunito.className}>
       
        <TopBar />

        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
