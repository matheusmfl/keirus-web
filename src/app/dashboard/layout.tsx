import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { AsideNavMenu } from "./components/AsideNavMenu";
import { Footer } from "./components/Footer";

const montSerrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "Keirus Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AsideNavMenu />
      <body className={`${montSerrat.className} bg-[#F6F6F9]`}>
        <main className="ml-[218px] bg-[#F6F6F9] ">
        {children}
        <Footer />
          </main></body>
    </html>
  );
}
