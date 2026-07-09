import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "体験予約 — yahong tour",
  description:
    "ご希望の日程・体験コースを選んでお申し込みください。無料でご参加いただけます（実費のみ）。",
  openGraph: {
    title: "体験予約 — yahong tour",
    description: "ご希望の日程と体験を選んで、気軽にお申し込みください。",
    locale: "ja_JP",
  },
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
