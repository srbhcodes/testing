import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Providers } from "./providers";

// 7.6: Optimized font loading with next/font
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Prevent FOIT
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Pulse | Token Trading Dashboard",
  description: "Real-time token tracking and market pulse - Track new pairs, final stretch, and migrated tokens",
  keywords: ["crypto", "tokens", "trading", "solana", "pulse", "market"],
  authors: [{ name: "Axiom" }],
  openGraph: {
    title: "Pulse | Token Trading Dashboard",
    description: "Real-time token tracking and market pulse",
    type: "website",
  },
};

// 7.9: Viewport configuration for mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://ui-avatars.com" />
        <link rel="dns-prefetch" href="https://ui-avatars.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* 7.11: Skip link for keyboard accessibility */}
        <a 
          href="#main-content" 
          className="skip-link sr-only focus:not-sr-only"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
