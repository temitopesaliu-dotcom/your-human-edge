import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Intelligence Layer: Go From Expertise to Offer — Temitope Saliu",
  description:
    "A 3-hour live working session for ambitious professionals who are done leaving money on the table.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
