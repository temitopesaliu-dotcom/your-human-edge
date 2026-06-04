import type { Metadata } from 'next';
import ComingSoonClient from './coming-soon-client';

export const metadata: Metadata = {
  title: 'Join the Community Waitlist | Your Human Edge',
  description:
    'Reserve your founding spot in the AI + Human Psychology community. Monthly live sessions, archetype peer groups, and curated resources.',
  openGraph: {
    title: 'Join the Community Waitlist | Your Human Edge',
    description: 'Monthly live sessions, archetype peer groups, and curated AI tool recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Community Waitlist',
    description: 'Monthly live sessions, archetype peer groups, and curated AI tool recommendations.',
  },
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
