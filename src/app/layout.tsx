import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Inter, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "yahong tour — ソウルを、友達のように歩く",
    template: "%s — yahong tour",
  },
  description:
    "日本語を学ぶ韓国人と一緒に、観光地ではない「ふつうの韓国」を歩く一日。2026年11月まで無料(実費のみ)。",
  openGraph: {
    title: "yahong tour — ソウルを、友達のように歩く",
    description: "ガイドというより、一緒に歩く友人のような時間を。",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "ソウルの路地",
      },
    ],
    locale: "ja_JP",
    type: "website",
    siteName: "yahong tour",
  },
  twitter: {
    card: "summary_large_image",
    title: "yahong tour — ソウルを、友達のように歩く",
    description: "ガイドというより、一緒に歩く友人のような時間を。",
    images: ["https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?w=1200&q=80"],
  },
  keywords: [
    "韓国旅行",
    "ソウル同行",
    "日本語ガイド",
    "韓国 個人ガイド",
    "ソウル ローカル体験",
    "Seoul local guide",
    "Korean tour Japanese speaker",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yahongtour.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
