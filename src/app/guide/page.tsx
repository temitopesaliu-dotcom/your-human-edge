import type { Metadata } from 'next';
import GuideClient from './guide-client';

export const metadata: Metadata = {
  title: '50 AI Paths Step-by-Step Guide | Your Human Edge',
  description:
    'Get the full step-by-step implementation guide for all 50 AI career paths. One-time $19.99 purchase with permanent access.',
  openGraph: {
    title: '50 AI Paths — Full Step-by-Step Guide',
    description: 'Turn the free 50 paths directory into a clear, category-by-category action plan.',
    type: 'website',
  },
};

export default function GuidePage() {
  return <GuideClient />;
}
