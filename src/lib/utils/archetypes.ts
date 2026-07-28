export type ArchetypeKey = 'H' | 'C' | 'S' | 'G';

export interface Archetype {
  key: ArchetypeKey;
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  colorLight: string;
  colorDark: string;
  paths: string[];
  income: string;
  fear: string;
  reframe: string;
  tool: string;
  useCase: string;
  // MailerLite group ID for this archetype — set via env vars
  mailerLiteGroupEnvKey: string;
}

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  H: {
    key: 'H',
    slug: 'human-bridge',
    name: 'Human Bridge',
    emoji: '🌉',
    tagline: 'You make AI human. That\'s rarer than any technical skill.',
    color: '#0f6e56',
    colorLight: '#E1F5EE',
    colorDark: '#0a5240',
    paths: ['AI Empathy Consultant', 'Human-AI Integration Coach', 'Workplace AI Adoption Specialist'],
    income: '$80K–$220K',
    fear: 'that AI will make human connection feel redundant',
    reframe: 'AI can simulate presence. It cannot create trust. The thing that makes you irreplaceable — the ability to hold space for real human transformation — is yours alone.',
    tool: 'Claude',
    useCase: 'Use Claude to draft empathy-first content and coaching frameworks, then bring your human judgment to personalise it.',
    mailerLiteGroupEnvKey: 'MAILERLITE_GROUP_H',
  },
  C: {
    key: 'C',
    slug: 'creative-amplifier',
    name: 'Creative Amplifier',
    emoji: '🎨',
    tagline: 'Your creativity just got a co-pilot that never sleeps.',
    color: '#c94f2a',
    colorLight: '#FEF0EA',
    colorDark: '#a03d20',
    paths: ['AI-Augmented Brand Strategist', 'Creative Director (AI Studio)', 'Visual Storytelling Consultant'],
    income: '$70K–$180K',
    fear: 'that AI-generated work will devalue your creative identity',
    reframe: 'AI doesn\'t have taste. It doesn\'t have a point of view. It doesn\'t know what matters to your specific audience. You do. That\'s the entire difference between content and art.',
    tool: 'Midjourney + Claude',
    useCase: 'Use Midjourney for rapid visual ideation, Claude for strategic narrative — then bring your aesthetic eye to filter, refine, and make it mean something.',
    mailerLiteGroupEnvKey: 'MAILERLITE_GROUP_C',
  },
  S: {
    key: 'S',
    slug: 'systems-architect',
    name: 'Systems Architect',
    emoji: '⚙️',
    tagline: 'You don\'t just use AI — you build the infrastructure others run on.',
    color: '#534ab7',
    colorLight: '#EEEDFE',
    colorDark: '#3e3696',
    paths: ['AI Automation Consultant', 'No-Code AI Systems Designer', 'Business Process AI Integrator'],
    income: '$100K–$280K',
    fear: 'that your systems expertise becomes commoditised as AI makes everyone a builder',
    reframe: 'AI lowered the floor for who can build. It raised the ceiling for what an expert builder can create. The people who understood systems before AI are now the architects of the AI era.',
    tool: 'Make (formerly Integromat) + Claude',
    useCase: 'Use Make to build multi-step AI automation workflows. Use Claude as the intelligence layer inside those workflows — for decisions, drafting, and routing.',
    mailerLiteGroupEnvKey: 'MAILERLITE_GROUP_S',
  },
  G: {
    key: 'G',
    slug: 'growth-catalyst',
    name: 'Growth Catalyst',
    emoji: '🚀',
    tagline: 'You see opportunity where others see chaos. AI just doubled the playing field.',
    color: '#1565C0',
    colorLight: '#E8F0FE',
    colorDark: '#0d47a1',
    paths: ['AI-Powered Growth Strategist', 'Revenue Acceleration Consultant', 'AI GTM Architect'],
    income: '$90K–$300K',
    fear: 'that the speed of AI change makes yesterday\'s growth playbooks obsolete',
    reframe: 'Every disruption creates a new leaderboard. The people who understood growth fundamentals before AI are the ones who will write the new rules. You\'re not behind — you\'re early.',
    tool: 'Clay + Claude',
    useCase: 'Use Clay for AI-powered lead research and enrichment at scale. Use Claude to craft hyper-personalised outreach based on what Clay surfaces. This combo is replacing entire SDR teams.',
    mailerLiteGroupEnvKey: 'MAILERLITE_GROUP_G',
  },
};

export const ARCHETYPE_SLUGS: Record<string, ArchetypeKey> = {
  'human-bridge': 'H',
  'creative-amplifier': 'C',
  'systems-architect': 'S',
  'growth-catalyst': 'G',
};

export function getArchetypeBySlug(slug: string): Archetype | null {
  const key = ARCHETYPE_SLUGS[slug];
  return key ? ARCHETYPES[key] : null;
}

export function getArchetypeByKey(key: string): Archetype | null {
  const k = key.toUpperCase() as ArchetypeKey;
  return ARCHETYPES[k] || null;
}

export const QUIZ_QUESTIONS = [
  {
    q: 'In your ideal workday, you are mostly...',
    nudge: 'Think about how you actually spend your energy, not how you think you should.',
    opts: [
      { t: 'Having deep conversations, coaching or helping someone through something', a: 'H' },
      { t: 'Creating something — writing, designing, filming, making something new', a: 'C' },
      { t: 'Building or optimising systems, automating processes, solving technical problems', a: 'S' },
      { t: 'Strategising, selling, growing, or driving results that move the needle', a: 'G' },
    ],
  },
  {
    q: 'Your friends would say your greatest gift is...',
    nudge: 'What do people always thank you for or seek you out about?',
    opts: [
      { t: 'Making people feel truly heard, seen and understood', a: 'H' },
      { t: 'Seeing beauty and ideas that others miss', a: 'C' },
      { t: 'Turning chaos into organised, efficient, working systems', a: 'S' },
      { t: 'Spotting opportunities and turning them into outcomes', a: 'G' },
    ],
  },
  {
    q: 'When you first encounter a new AI tool, you think...',
    nudge: 'Your gut reaction matters most here.',
    opts: [
      { t: 'How can this help me understand and serve people better?', a: 'H' },
      { t: 'What incredible things could I create with this?', a: 'C' },
      { t: 'How does this actually work and what can I build with it?', a: 'S' },
      { t: 'Where is the opportunity here that everyone else is missing?', a: 'G' },
    ],
  },
  {
    q: 'The type of work that puts you in flow is...',
    nudge: 'Flow is the clue — when do you lose track of time?',
    opts: [
      { t: 'Deep human conversations — coaching, counselling, mentoring, teaching', a: 'H' },
      { t: 'Making something from nothing — art, words, music, video, ideas', a: 'C' },
      { t: 'Designing and building — systems, workflows, architecture, logic', a: 'S' },
      { t: 'Executing and winning — pitching, growing, converting, closing', a: 'G' },
    ],
  },
  {
    q: 'What outcome matters most to you at the end of the day?',
    nudge: 'Not what you think should matter — what actually makes you feel satisfied.',
    opts: [
      { t: 'Someone leaves feeling genuinely transformed or understood', a: 'H' },
      { t: 'Something original and beautiful now exists because of you', a: 'C' },
      { t: 'A system runs perfectly without you having to be there', a: 'S' },
      { t: 'Numbers moved — revenue, reach, results, impact', a: 'G' },
    ],
  },
  {
    q: 'The content you consume most is...',
    nudge: 'Not what you think you should read — what you actually open.',
    opts: [
      { t: 'Psychology, human behaviour, emotional intelligence, relationships', a: 'H' },
      { t: 'Art, design, storytelling, culture, creativity, aesthetics', a: 'C' },
      { t: 'Tech, systems, productivity, engineering, workflows', a: 'S' },
      { t: 'Business, marketing, sales, entrepreneurship, growth', a: 'G' },
    ],
  },
  {
    q: 'Your biggest frustration at work is usually...',
    nudge: 'The thing that genuinely irritates you — trust that feeling.',
    opts: [
      { t: 'Not enough time for real, meaningful human connection', a: 'H' },
      { t: 'Creative ideas that never make it out of your head', a: 'C' },
      { t: 'Repetitive tasks that should obviously be automated', a: 'S' },
      { t: 'Growth that moves slower than your ambition', a: 'G' },
    ],
  },
  {
    q: 'In a team, you naturally become...',
    nudge: 'Think about the last group you worked with. What role did you fall into without thinking?',
    opts: [
      { t: 'The emotional anchor — people come to you when things get hard', a: 'H' },
      { t: 'The ideas person — fresh angles, unexpected thinking, new possibilities', a: 'C' },
      { t: 'The builder — turning abstract ideas into working, tangible reality', a: 'S' },
      { t: 'The driver — pushing everyone toward the goal with energy and clarity', a: 'G' },
    ],
  },
  {
    q: 'When AI challenges come up in conversation, you instinctively ask...',
    nudge: 'Your first instinct reveals your natural lens.',
    opts: [
      { t: 'How do we keep the human element genuinely central to this?', a: 'H' },
      { t: 'What can I imagine and create that has not been made yet?', a: 'C' },
      { t: 'Let me understand the architecture — what can we actually build?', a: 'S' },
      { t: 'Where is everyone else behind the curve, and how do I get ahead?', a: 'G' },
    ],
  },
  {
    q: 'The legacy you want to build with AI is...',
    nudge: 'Do not filter. What actually moves you when you think about it?',
    opts: [
      { t: 'Deeper human understanding and connection across the world', a: 'H' },
      { t: 'A creative body of work that changes how people see things', a: 'C' },
      { t: 'Systems that make complex things simple for millions of people', a: 'S' },
      { t: 'Measurable impact — businesses built, lives materially changed', a: 'G' },
    ],
  },
];
