import type { Metadata } from 'next';
import QuizClient from './quiz-client';

export const metadata: Metadata = {
  title: 'AI Archetype Quiz | Your Human Edge',
  description:
    'Take the free AI archetype quiz to discover which corner of AI fits your inherent skills, personality and values. 10 questions, 4 archetypes.',
  openGraph: {
    title: 'Which Part of AI Was Made for You?',
    description:
      'Take the AI archetype quiz to discover your personalized path. Based on DISC, Myers-Briggs & Personality Science.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which Part of AI Was Made for You?',
    description: 'Take the AI archetype quiz to discover your personalized path.',
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
