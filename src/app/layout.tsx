import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Cursor } from "@/components/cursor";
import Link from "next/link";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
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
    <html lang="en" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist)]">
        <ThemeProvider>
          <Cursor />
          {/* Persistent header — sits outside template so it never animates */}
          <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 pointer-events-none">
            <Link href="/" className="text-sm font-semibold tracking-tight pointer-events-auto inline-block px-3 py-1 rounded-full border border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 transition-all duration-200">
              Jes Marwaha
            </Link>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
