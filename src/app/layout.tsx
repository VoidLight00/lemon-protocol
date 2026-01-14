import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { ThemeProvider } from "@/components/common/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lemon Protocol - 관계 커뮤니케이션 AI",
  description: "상황을 설명하면, 전문적인 관계 솔루션을 제공합니다. 심리학 이론 기반 분석과 실용적인 프로토콜을 제안해 드립니다.",
  keywords: ["연애 상담", "관계 심리학", "커뮤니케이션", "AI 상담", "Gottman", "연애 팁"],
  authors: [{ name: "Lemon Protocol" }],
  openGraph: {
    title: "Lemon Protocol - 관계 커뮤니케이션 AI",
    description: "상황을 설명하면, 전문적인 관계 솔루션을 제공합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
