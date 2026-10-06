import type { Metadata } from 'next';

// The page is a client component, so its canonical lives here. The download page below overrides it with noindex.
export const metadata: Metadata = {
  alternates: { canonical: '/story-to-income' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
