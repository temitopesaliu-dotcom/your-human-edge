import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Expert Framework, Self-Paced | Temitope Saliu',
  description:
    'From expertise to a live offer. The Expert Framework + AI working session, built live over five hours with experts across 15 countries, now a private self-paced course you can watch in under an hour.',
};

export default function IntelligenceLayerCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
