import type { Metadata } from 'next';

// The page is a client component, so its canonical lives here. Title and description come from the (workshop) group layout.
export const metadata: Metadata = {
  alternates: { canonical: '/workshop' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
