import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LEVELS, levelFromSlug } from '@/lib/claude-quiz/levels';
import ResultView from '../../result-view';
import '../../claude-quiz.css';

/**
 * Shareable result page for each level. The result email links here, and the
 * Stripe checkout's cancel_url returns here, so a buyer who backs out lands
 * on their own result with the workbook offer still in front of them.
 */
export function generateStaticParams() {
  return LEVELS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const level = levelFromSlug(slug);
  if (!level) return {};
  return {
    title: `Level ${level.n}: ${level.name} | Claude Level Quiz | Temitope Saliu`,
    description: level.sum,
  };
}

export default async function ClaudeQuizResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const level = levelFromSlug(slug);
  if (!level) notFound();
  return (
    <div className="cq-page">
      <div className="cq-wrap">
        <div className="cq-brand">
          <Link href="/"><b>Temitope Saliu</b> · Your Human Edge</Link>
          <span>Your Claude level</span>
        </div>
        <ResultView level={level} />
      </div>
    </div>
  );
}
