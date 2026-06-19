import { PromptCard } from './prompt-card';

interface Gate01CloneProps {
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

const TOOLS = [
  {
    name: 'ChatGPT',
    desc: 'Create your image',
  },
  {
    name: 'Google Flow',
    desc: 'Create your 8-second free video with the image created on ChatGPT',
  },
  {
    name: 'ElevenLabs',
    desc: 'Clone your voice',
  },
  {
    name: 'Captions',
    desc: 'Prefer your real face? Record on your phone - it auto edits, captions, and reframes for each platform',
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
            <p>{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="prompt-header-wrap">
        <div className="as-section-label">Prompt templates — copy, fill the brackets, paste into Claude or ChatGPT</div>
      </div>

      <PromptCard
        id="p1"
        name="01 — Create Clone On ChatGPT"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`Create an ultra realistic beauty portrait of the image attached. Face forward
Mid-20s Black woman, long flowing wavy hair with soft loose curls past her shoulders, deep dark brown with honey highlights, perfectly styled and shiny, warm rich brown skin with luminous glow, soft brown eyes with defined lashes, full glossy nude lips, soft cheekbones with subtle highlighter, oversized cream cashmere sweater slightly off-shoulder, layered delicate gold chains stacked at different lengths, small diamond stud earrings, gold cuff bracelet visible, manicured nude nails, seated at a luxury podcast studio with a black professional microphone close to her mouth, warm boke lighting with soft golden glow, blurred neutral cream and beige luxury interior with subtle decer in background. shallow depth of field, 9:16 vertical, ultra realistic, cinematic, expensive aesthetic.`}
      />

      <PromptCard
        id="p2"
        name="02 — Create a Video on Google Flow"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`Upload the image created on ChatGPT after downloading.

A Mid-20s Black woman uploaded.
She speaks directly to the camera with a calm, intimate, feminine tone. Realistic skin texture, natural lip sync.
She says, "Your Human Edge in the AI world is much larger than you think. This is your time to become who you've Always Known you could be, finally."
Performance: Calm. No smile. Pause briefly after each ellipsis. Direct eye contact. Minimal hand movement. Slow camera push-in.`}
      />

      <PromptCard
        id="p3"
        name="03 — Define my AI clone's voice"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I teach/coach [topic] and want to create an AI avatar version of myself for video content.

Here's how I actually talk: [describe your pace, humor, energy level, and 2-3 phrases you say often].

Write me a "persona brief" I can paste into HeyGen, Synthesia, or any AI avatar tool's script generator so every script sounds like me: my tone, my pacing, my catchphrases, and the 3 things I should never sound like.`}
      />

      <PromptCard
        id="p4"
        name="04 — Turn my expertise into 10 scripts"
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
        id="p5"
        name="05 — Repurpose one video into five"
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
