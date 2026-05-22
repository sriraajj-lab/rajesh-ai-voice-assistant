import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rajesh AI | RCM Voice Assistant",
  description:
    "AI Voice Assistant for Rajesh Kantubhukta - RCM Director, Denial Management Expert. Ask about denial codes, appeal strategies, payer rules, and revenue cycle management.",
  keywords: [
    "RCM AI",
    "Voice Assistant",
    "Denial Management",
    "Revenue Cycle",
    "Healthcare AI",
  ],
  authors: [{ name: "Rajesh Kantubhukta" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Rajesh AI | RCM Voice Assistant",
    description: "AI Voice Assistant for RCM Denial Management",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-[#f5f5f5]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
