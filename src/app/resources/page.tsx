import type { Metadata } from 'next';
import ResourcesClient from './resources-client';

export const metadata: Metadata = {
  title: 'Free Resources | Your Human Edge',
  description:
    'Free AI career resources including the complete 50+ AI Career Paths directory. Tools, income strategies, and step-by-step guides for every personality type.',
  openGraph: {
    title: 'Free AI Career Resources | Your Human Edge',
    description:
      'Free AI career resources including the complete 50+ AI Career Paths directory.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Career Resources | Your Human Edge',
    description:
      'Free AI career resources including the complete 50+ AI Career Paths directory.',
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
