import type { Metadata } from 'next';

// Testimonial collection form, shared by direct link only. Not for search.
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
