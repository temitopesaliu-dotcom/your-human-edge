import type { Metadata } from 'next';

// The page is a client component, so its canonical lives here. The download page below clears it and carries noindex.
export const metadata: Metadata = {
  alternates: { canonical: '/story-to-income' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
