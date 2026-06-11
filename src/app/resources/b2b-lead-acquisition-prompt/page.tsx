import type { Metadata } from 'next';
import B2BPromptClient from './b2b-prompt-client';

export const metadata: Metadata = {
  title: 'B2B Lead Acquisition Master Prompt | Free Resource',
  description:
    'A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company in under 2 minutes. Free resource.',
  openGraph: {
    title: 'B2B Lead Acquisition Master Prompt | Free Resource',
    description: 'Build a complete B2B lead acquisition playbook with one prompt. 7 stages, any industry.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Lead Acquisition Master Prompt',
    description: 'Build a complete B2B lead acquisition playbook with one prompt.',
  },
};

export default function B2BPromptPage() {
  return <B2BPromptClient />;
}
