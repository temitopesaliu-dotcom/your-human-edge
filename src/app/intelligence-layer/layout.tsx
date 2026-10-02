import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Intelligence Framework Profile — Temitope Saliu",
  description:
    "Discover exactly how your expertise becomes an AI-powered offer — and what someone with your background can charge.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function IntelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
