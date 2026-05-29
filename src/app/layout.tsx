import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Cursor } from "@/components/cursor";
import Link from "next/link";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jes",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-mono">
        <ThemeProvider>
          <Cursor />
          {/* Persistent header — sits outside template so it never animates */}
          <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 pointer-events-none">
            <Link href="/" className="text-sm font-semibold tracking-tight hover:text-muted-foreground transition-colors pointer-events-auto">
              Jes Marwaha
            </Link>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
