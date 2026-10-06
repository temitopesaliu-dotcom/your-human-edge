import type { Metadata } from 'next';

// The form is a client component, so its canonical lives here. The confirmation and not-a-fit pages below clear it and carry noindex.
export const metadata: Metadata = {
  alternates: { canonical: '/the-blueprint-audit/apply' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
