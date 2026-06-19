import type { Metadata } from 'next';
import AiStadiumClient from './ai-stadium-client';

export const metadata: Metadata = {
  title: 'AI for Teachers and Coaches | Free Interactive Guide',
  description:
    'An interactive 6-gate guide for teachers, coaches, trainers and facilitators to build an AI clone, grow an audience, monetise knowledge, and project your monthly revenue — all in one browser.',
  openGraph: {
    title: 'AI for Teachers and Coaches | Free Interactive Guide',
    description:
      'Build your AI clone, open the floor, monetise your knowledge, and track your payout — an interactive stadium guide.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Teachers and Coaches | Free Interactive Guide',
    description: 'An interactive 6-gate guide to build, grow and monetise with AI.',
  },
};

export default function AiStadiumPage() {
  return <AiStadiumClient />;
}
