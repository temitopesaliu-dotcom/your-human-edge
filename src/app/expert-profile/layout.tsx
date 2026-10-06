import type { Metadata } from 'next';

// Build form for Expert Framework buyers, linked from the course access page. Not for search.
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
