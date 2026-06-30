import type { Metadata } from 'next';
import MergeMethodClient from './merge-method-client';

export const metadata: Metadata = {
  title: 'The Merge Method | Free Resource',
  description:
    'A 5-step lead acquisition framework by Temitope Saliu. No cold pitching — find the exact loophole in a prospect\'s system, build proof, and personalise the breakdown directly to the decision maker.',
  openGraph: {
    title: 'The Merge Method | Free Resource',
    description: 'A 5-step lead acquisition framework. No pitching — find the loophole, build proof, merge in.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Merge Method',
    description: 'A 5-step lead acquisition framework. No pitching — find the loophole, build proof, merge in.',
  },
};

export default function MergeMethodPage() {
  return <MergeMethodClient />;
}
