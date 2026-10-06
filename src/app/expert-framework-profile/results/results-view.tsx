'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_ACCENT } from '@/lib/efp/data';
import type { EfpCompany, EfpResultRecord } from '@/lib/efp/types';

const WORKSHOP = '/expert-framework';

type Win = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

function track(position: number) {
  const w = window as Win;
  w.gtag?.('event', 'efp_cta_click', { cta_position: position, page_title: 'Expert Framework Profile Results Page' });
}

function Cta({ position, big = true }: { position: number; big?: boolean }) {
  return (
    <a className={`efp-btn${big ? ' efp-big' : ''}`} href={WORKSHOP} onClick={() => track(position)}>
      Get instant access
    </a>
  );
}

function CompanyColumn({ title, sub, list, small = false }: { title: string; sub: string; list: EfpCompany[]; small?: boolean }) {
  return (
    <div className="efp-cot">
      <header><b>{title}</b><span>{sub}</span></header>
      {list.map((c, i) => (
        <div className="efp-cocard" key={i}>
          <b>{c[0]}</b>
          <span>{c[1]}</span>
          <span className="efp-how">
            <em>{small ? 'Where to find them:' : 'How to approach:'}</em> {c[2].replace(/^(find them|approach)\s*:\s*/i, '')}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ResultsView({ record, viewEventId }: { record: EfpResultRecord; viewEventId: string }) {
  const b = record.build;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const w = window as Win;
    w.fbq?.('track', 'ViewContent', { content_name: 'Expert Framework Profile Results Page' }, { eventID: viewEventId });
    w.gtag?.('event', 'efp_results_viewed', { page_title: 'Expert Framework Profile Results Page', build_source: record.source });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = reduce
      ? [window.setTimeout(() => setShown(5), 0)]
      : [0, 1, 2, 3, 4].map((i) => window.setTimeout(() => setShown(i + 1), 200 + i * 280));
    return () => timers.forEach(clearTimeout);
  }, [viewEventId, record.source]);

  const stage = (i: number) => `efp-stage${shown > i ? ' efp-on' : ''}`;
  const largeCount = b.companies.large.length;

  return (
    <div className="efp-res" style={{ ['--acc' as string]: record.accent || DEFAULT_ACCENT }}>
      <div className="efp-hello"><h1>{record.firstName}, this prototype is the first step to building your business.</h1></div>

      <div className={`efp-gap ${stage(0)}`} data-clarity-mask="true">
        <small>{record.paidEcho}</small>
        <h2>{b.gap}</h2>
      </div>

      <div className={stage(1)} data-clarity-mask="true">
        <span className="efp-label">Your website preview</span>
        <div className="efp-browser">
          <div className="efp-chrome"><div className="efp-dots"><i /><i /><i /></div><div className="efp-url">www.{record.siteSlug}.com</div></div>
          <div className="efp-site">
            <div className="efp-snav"><b>{b.brand}</b><span className="efp-chip">{b.navCta}</span></div>
            <div className="efp-shero">
              <p className="efp-kick">{b.kicker}</p>
              <h4>{b.h1}</h4>
              <p>{b.lede}</p>
              <div className="efp-ctas"><span className="efp-chip">{b.cta1}</span><span className="efp-chip efp-ghost">{b.cta2}</span></div>
              <p className="efp-priceline">{b.priceline}</p>
            </div>
            <div className="efp-band">{b.band.map(([v, l], i) => <div key={i}><b>{v}</b><span>{l}</span></div>)}</div>
            <section className="efp-ssec">
              <h2>Sound familiar?</h2>
              <p className="efp-sh">What your buyer is telling themselves this week.</p>
              <div className="efp-thoughts">{b.thoughts.map((t, i) => <q key={i}>{t}</q>)}</div>
            </section>
            <section className="efp-ssec">
              <h2>Three ways in</h2>
              <p className="efp-sh">Every option starts with a short call.</p>
              <div className="efp-tiers">
                {b.tiers.map((t, i) => (
                  <div className={`efp-tier${t.pick ? ' efp-pick' : ''}`} key={i}>
                    <span className="efp-tag">{t.tag}</span>
                    <h4>{t.name}</h4>
                    <div className="efp-price">{t.price}<sup>*</sup></div>
                    <div className="efp-unit">{t.unit}</div>
                    <p>{t.why}</p>
                  </div>
                ))}
              </div>
              <p className="efp-sh" style={{ margin: '12px 0 0', fontSize: 12.5 }}>
                *Estimates based on typical market rates for your field and country. Not a market research study.
              </p>
            </section>
            <div className="efp-more efp-inpreview">
              <div><b>This is a prototype. Build the real thing from start to finish.</b><br /><span>How it works · What&apos;s included · Is this for you? · About you · FAQ · Live on your own domain</span></div>
              <Cta position={1} />
            </div>
          </div>
        </div>
        <p className="efp-caption">{b.pricingNote}</p>
      </div>

      <section className={`efp-panel ${stage(2)}`} data-clarity-mask="true">
        <span className="efp-label">Your buyer and go-to-market</span>
        <h3>Who you&apos;re selling to</h3>
        <p className="efp-why">Built from who brings you the problem and what they&apos;ve already tried.</p>
        <div className="efp-icp">
          <div className="efp-box"><h4>Your buyer</h4><p>{b.who}</p></div>
          <div className="efp-box"><h4>What they want</h4><ul>{b.want.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
          <div className="efp-box"><h4>What they don&apos;t want</h4><ul>{b.dont.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
        </div>
        <div className="efp-more">
          <div><b>Get your go-to-market strategy</b><br /><span>Where your buyers are, tailored elevator pitches and your first 30 days of outreach.</span></div>
          <Cta position={2} />
        </div>
      </section>

      <section className={`efp-panel ${stage(3)}`} data-clarity-mask="true">
        <span className="efp-label">Your companies</span>
        <h3>{b.companiesHeading}</h3>
        <p className="efp-why">{b.companiesWhy}</p>
        <div className="efp-cos">
          <CompanyColumn title="Large" sub={largeCount > 1 ? `${largeCount} named, approach first` : 'Who to approach first'} list={b.companies.large} />
          <CompanyColumn title="Medium" sub={b.companies.medium.length > 1 ? `${b.companies.medium.length} named, verify first` : 'Check before you reach out'} list={b.companies.medium} />
          <CompanyColumn title="Small" sub="Profiles and where to find them" list={b.companies.small} small />
        </div>
        <div className="efp-more">
          <div><b>100 companies, matched to your offer</b><br /><span>Get the full list of 100 companies to send your offer to, generated from what you build.</span></div>
          <Cta position={3} />
        </div>
        <p className="efp-note">Company suggestions are AI-generated from your answers. Check each one before you reach out.</p>
      </section>

      <div className={`efp-next-sec ${stage(4)}`}>
        <h3>Build the real thing, from start to finish.</h3>
        <p>You&apos;ve seen a preview. The self-paced workshop takes you through the full build, with the same prompts used live with experts.</p>
        <ol className="efp-steps">
          <li><b>Map your expert layer</b><span>You&apos;ve seen a slice. The workshop maps all of it.</span></li>
          <li><b>Choose your offer</b><span>We picked one for you. You&apos;ll choose from several.</span></li>
          <li><b>Launch your website</b><span>This preview becomes your own live site.</span></li>
          <li><b>Get 100 companies to send it to</b><span>You&apos;ve seen 12. You leave with 100 more.</span></li>
        </ol>
        <div className="efp-buy"><Cta position={4} /><small>Self-paced. Watch it in under an hour.</small></div>
      </div>

      <div className="efp-footer" role="contentinfo">2026 Temitope Saliu. The Expert Framework Profile is proprietary methodology. All rights reserved.</div>
    </div>
  );
}
