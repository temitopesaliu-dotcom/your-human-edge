import { PromptCard } from './prompt-card';

interface Gate01CloneProps {
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

const TOOLS = [
  {
    name: 'HeyGen',
    tag: 'avatar + voice clone',
    desc: 'Paste a script, pick (or clone) your avatar, get a talking video in minutes. No camera, no lighting.',
  },
  {
    name: 'Synthesia',
    tag: 'avatar video, multilingual',
    desc: 'Strong for polished training and course-style videos, with auto-translation into other languages.',
  },
  {
    name: 'ElevenLabs',
    tag: 'voice cloning',
    desc: 'Clone your real voice for podcasts, audiobooks, or voiceovers when you don\'t want an on-screen avatar.',
  },
  {
    name: 'Captions',
    tag: 'record-and-AI-edit',
    desc: 'Prefer your real face? Record on your phone — it auto-edits, captions, and reframes for each platform.',
  },
];

export function Gate01Clone({ copiedId, onCopy }: Gate01CloneProps) {
  return (
    <div>
      <div className="as-panel-head">
        <div>
          <h2 className="as-display">Build your AI clone</h2>
          <p className="as-sub">Post 3-5 times a week without a camera.</p>
        </div>
      </div>

      <div className="as-section-label">Tools to use for your AI clone</div>
      <div className="as-tools">
        {TOOLS.map((t) => (
          <div key={t.name} className="as-tool">
            <div className="tname">{t.name}</div>
            <span className="ttag">{t.tag}</span>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="prompt-header-wrap">
        <div className="as-section-label">Prompt templates — copy, fill the brackets, paste into Claude or ChatGPT</div>
      </div>

      <PromptCard
        id="p1"
        name="01 — Define my AI clone's voice"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I teach/coach [topic] and want to create an AI avatar version of myself for video content.

Here's how I actually talk: [describe your pace, humor, energy level, and 2-3 phrases you say often].

Write me a "persona brief" I can paste into HeyGen, Synthesia, or any AI avatar tool's script generator so every script sounds like me: my tone, my pacing, my catchphrases, and the 3 things I should never sound like.`}
      />

      <PromptCard
        id="p2"
        name="02 — Turn my expertise into 10 scripts"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I'm a [your role, e.g. "yoga teacher with 8 years of experience"] and my audience is [who you help].

Give me 10 short-form video scripts (under 60 seconds each) I can record with an AI avatar or my own camera. Each script needs:
- A hook in the first 3 seconds that stops the scroll
- One clear teaching point or story from my real experience
- A simple call to action at the end (comment a word, follow, or click the link in bio)

Base the topics on the most common question or misconception my audience has about [topic].`}
      />

      <PromptCard
        id="p3"
        name="03 — Repurpose one video into five"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`Here's the transcript of one video I recorded: [paste transcript]

Turn this single video into 5 platform-native versions:
1. A TikTok/Reels script (under 60 sec, punchy)
2. A LinkedIn post (text-based, professional framing, same insight)
3. A Twitter/X thread (5-7 posts)
4. A YouTube Shorts title + description + 3 thumbnail text options
5. An email to my list sharing the same idea with a soft call to action

Keep my voice and the core story the same across all five — only change the format.`}
      />
    </div>
  );
}
