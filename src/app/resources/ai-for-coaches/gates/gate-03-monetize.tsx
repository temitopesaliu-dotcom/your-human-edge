'use client';

import { useEffect, useState } from 'react';
import { PromptCard } from './prompt-card';

interface Gate03MonetizeProps {
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem('ai-for-coaches-' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function storageSet(key: string, val: unknown) {
  try { localStorage.setItem('ai-for-coaches-' + key, JSON.stringify(val)); } catch {}
}

export function Gate03Monetize({ copiedId, onCopy }: Gate03MonetizeProps) {
  const [offer, setOffer] = useState(() =>
    storageGet('offer-builder', { a: '', o: '', t: '', p: '' })
  );

  useEffect(() => {
    storageSet('offer-builder', offer);
  }, [offer]);

  const updateField = (field: 'a' | 'o' | 't' | 'p', value: string) => {
    setOffer(prev => ({ ...prev, [field]: value }));
  };

  const renderOfferText = () => {
    const { a, o, t, p } = offer;
    if (!a && !o && !t && !p) {
      return 'Fill in the fields above and your offer will build itself here.';
    }
    return `Help ${a || '[who you help]'} get ${o || '[the result]'} in ${t || '[timeframe]'}, without ${p || '[the obstacle]'}.`;
  };

  const filledPrompt6 = `I've been teaching/coaching ${offer.a || '[topic]'} for [X years]. My niche is ${offer.a || '[niche]'}.

Ask me 5 questions about who I help and what result I get them, then turn my answers into ONE paid offer: a name, a one-sentence promise, 3 concrete outcomes a buyer gets, and a fair starting price for someone with no existing audience yet.`;

  return (
    <div>
      <div className="as-panel-head">
        <div>
          <h2 className="as-display">Monetize your knowledge</h2>
          <p className="as-sub">Turn what you already teach into one offer someone can pay for.</p>
        </div>
      </div>

      <div className="as-section-label">Prompt template — find the niche first</div>
      <PromptCard
        id="p5"
        name="05 — Find my most profitable niche"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`For the last [X years], I've worked as a [role] helping [who] do [what].

Ask me 5 questions to understand my background, then suggest 3 specific, profitable niches I could build a coaching/training business around. For each niche tell me: who pays for this, what they're currently paying for instead, and one early sign there's demand (a community, a hashtag, a competitor already charging for it).`}
      />

      <div className="offer-builder-wrap">
        <div className="as-section-label">Build the offer live</div>
        <div className="as-fields">
          <div className="as-field">
            <label>Who you help</label>
            <input
              value={offer.a}
              onChange={e => updateField('a', e.target.value)}
              placeholder="e.g. busy ESL teachers new to online tutoring"
            />
          </div>
          <div className="as-field">
            <label>The result you get them</label>
            <input
              value={offer.o}
              onChange={e => updateField('o', e.target.value)}
              placeholder="e.g. their first 3 paying students"
            />
          </div>
          <div className="as-field">
            <label>Timeframe</label>
            <input
              value={offer.t}
              onChange={e => updateField('t', e.target.value)}
              placeholder="e.g. 30 days"
            />
          </div>
          <div className="as-field">
            <label>The obstacle you remove</label>
            <input
              value={offer.p}
              onChange={e => updateField('p', e.target.value)}
              placeholder="e.g. cold-pitching strangers"
            />
          </div>
        </div>
        <div className="as-offer-out">
          <div className="ol">Your offer, live</div>
          <div className="ov">{renderOfferText()}</div>
        </div>
      </div>

      <PromptCard
        id="p6"
        name="06 — Build my first paid offer"
        copiedId={copiedId}
        onCopy={onCopy}
        text={filledPrompt6}
      />
    </div>
  );
}
