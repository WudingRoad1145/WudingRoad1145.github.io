import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HomeReturnProvider } from "@/components/HomeReturn";
import SiteChrome from "@/components/SiteChrome";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yán Fēng — Design, technology & being human",
  description:
    "Selected work and personal stories by Yán Fēng Product, hardware, interfaces, and the humans behind them",
  icons: {
    icon: "/yan.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeReturnProvider>
          <SiteChrome>{children}</SiteChrome>
        </HomeReturnProvider>
      </body>
    </html>
  );
}
