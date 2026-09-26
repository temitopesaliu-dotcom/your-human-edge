import type { Metadata } from 'next';
import QuizClient from './quiz-client';
import './claude-quiz.css';

export const metadata: Metadata = {
  title: 'Where Are You With Claude? | Free Claude Level Quiz | Temitope Saliu',
  description:
    'A free 2-minute quiz for non-technical people. Find your level in Claude Chat and Claude Cowork, what is holding you back, and your exact next step.',
  openGraph: {
    title: 'Where are you with Claude?',
    description: 'Free 2-minute quiz. Find your level in Claude Chat and Cowork, and your next step.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where are you with Claude?',
    description: 'Free 2-minute quiz. Find your level in Claude Chat and Cowork, and your next step.',
  },
};

export default function ClaudeQuizPage() {
  return <QuizClient />;
}
