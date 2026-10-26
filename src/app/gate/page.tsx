import type { Metadata } from 'next';
import GateClient from './gate-client';

export const metadata: Metadata = {
  // Mid-funnel email gate: only useful straight after the quiz.
  robots: 'noindex, follow',
  title: 'Unlock Your AI Archetype Results | Your Human Edge',
  description:
    'Enter your details to see your personalized AI archetype results and discover which corner of AI was built for you.',
  openGraph: {
    title: 'Unlock Your AI Archetype Results',
    description: 'Discover which corner of AI fits your inherent skills and personality.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlock Your AI Archetype Results',
    description: 'Discover which corner of AI fits your inherent skills and personality.',
  },
};

export default function GatePage() {
  return <GateClient />;
}
