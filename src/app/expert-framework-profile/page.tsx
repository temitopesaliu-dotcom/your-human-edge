import type { Metadata } from 'next';
import { EFP_CSS } from './efp-styles';
import QuizClient from './quiz-client';

export const metadata: Metadata = {
  title: 'The Expert Framework Profile | Temitope Saliu',
  description: 'Answer 10 questions and watch your expertise become an offer, a website with your name on it, three prices and 12 companies to send it to.',
  alternates: { canonical: 'https://temitopesaliu.com/expert-framework-profile' },
  openGraph: {
    title: 'The Expert Framework Profile',
    description: 'See the business your expertise can become, in five minutes.',
    type: 'website',
  },
};

export default function ExpertFrameworkProfilePage() {
  return (
    <div className="efp">
      <style dangerouslySetInnerHTML={{ __html: EFP_CSS }} />
      <QuizClient />
    </div>
  );
}
