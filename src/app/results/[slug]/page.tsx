import { notFound } from 'next/navigation';
import { getArchetypeBySlug } from '@/lib/archetypes';
import ResultsClient from './results-client';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const arch = getArchetypeBySlug(slug);
  if (!arch) {
    return { title: 'Archetype Not Found | Your Human Edge' };
  }
  return {
    title: `The ${arch.name} ${arch.emoji} | AI Archetype Results`,
    description: `${arch.tagline} Discover your AI career paths, income strategies, and tool stack as a ${arch.name}.`,
    openGraph: {
      title: `The ${arch.name} - AI Archetype`,
      description: arch.tagline,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `The ${arch.name} - AI Archetype`,
      description: arch.tagline,
    },
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getArchetypeBySlug(slug)) notFound();
  return <ResultsClient slug={slug} />;
}
