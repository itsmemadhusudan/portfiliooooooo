import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getPortfolioData } from "@/lib/portfolio-queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const d = await getPortfolioData();
    const ogTitle = d.ogTitle ?? d.siteTitle;
    const ogDesc = d.ogDescription ?? d.siteDescription;
    return {
      title: d.siteTitle,
      description: d.siteDescription,
      icons: {
        icon: "/profile/fav.png",
        shortcut: "/profile/fav.png",
        apple: "/profile/fav.png",
      },
      openGraph: {
        title: ogTitle,
        description: ogDesc,
        type: "website",
      },
    };
  } catch {
    return {
      title: "Portfolio",
      description: "Run db:migrate and db:seed to load content.",
      icons: {
        icon: "/profile/fav.png",
        shortcut: "/profile/fav.png",
        apple: "/profile/fav.png",
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
