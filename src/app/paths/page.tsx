import type { Metadata } from 'next';
import PathsClient from './paths-client';

export const metadata: Metadata = {
  title: '50 AI Career Paths for Different Personalities | Your Human Edge',
  description:
    'Explore 50 AI career paths across creative, human-centered, business, technical and niche roles. Income ranges, tools, and monetization strategies included.',
  openGraph: {
    title: '50 AI Career Paths for Different Personalities',
    description: 'Every path. Every tool. Every income stream. Built for different personality types.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '50 AI Career Paths for Different Personalities',
    description: 'Every path. Every tool. Every income stream. Built for different personality types.',
  },
};

export default function PathsPage() {
  return <PathsClient />;
}
