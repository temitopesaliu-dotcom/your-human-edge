/**
 * Claude Level Quiz: questions, scoring and the four result levels.
 *
 * Shared by the quiz page, the emailed result page, the checkout route and the
 * workbook page, so a level means the same thing everywhere.
 */

export type LevelNumber = 1 | 2 | 3 | 4;

export type ClaudeWorkbookProduct =
  | 'claude-workbook-1'
  | 'claude-workbook-2'
  | 'claude-workbook-3'
  | 'claude-workbook-4';

/** $9.99 for every level. The page label and the Stripe charge both read this. */
export const WORKBOOK_PRICE_CENTS = 999;
export const WORKBOOK_PRICE_LABEL = '$9.99';

export interface QuizQuestion {
  area: 'chat' | 'cowork' | 'both';
  q: string;
  o: [string, string, string, string];
}

export const QUESTIONS: QuizQuestion[] = [
  { area: 'chat', q: 'How often do you use Claude, or any AI assistant?', o: ['Never, or I tried it once', 'A few times a month', 'A few times a week', "Every day. It's part of how I work"] },
  { area: 'chat', q: 'When you open Claude, what do you usually do?', o: ["I'm not sure what to ask", 'Ask a quick question, like a search engine', 'Go back and forth to draft or think something through', 'Give it a full task with context and a clear outcome'] },
  { area: 'chat', q: 'How much do you tell Claude before you ask for something?', o: ['Nothing. I just type the question', 'A sentence or two', 'Who I am, what I want and the tone', 'Background, examples and limits, plus saved instructions it remembers'] },
  { area: 'chat', q: "Claude's first answer isn't right. What do you do?", o: ["Give up. Maybe AI isn't for me", 'Start a new chat and try again', "Tell it what's wrong and ask again", "Push back and redirect until it's exactly right"] },
  { area: 'chat', q: 'Which of these have you used Claude for?', o: ['Nothing yet', 'Quick facts and definitions', 'Writing: emails, posts, messages', 'Real decisions: career, money, relationships, strategy'] },
  { area: 'cowork', q: 'Have you given Claude your own files (PDFs, docs, spreadsheets)?', o: ["No. I didn't know I could", 'Once or twice', 'Often, to read and summarise them', 'Yes. It organises, edits and builds files for me'] },
  { area: 'cowork', q: 'How familiar are you with Cowork, where Claude does tasks for you instead of just chatting?', o: ['Never heard of it', "Heard of it, haven't tried it", 'Tried it for a simple task', 'I hand it real multi-step work'] },
  { area: 'cowork', q: 'Is Claude connected to any of your tools, like email, calendar or Google Drive?', o: ["No. I didn't know that was possible", "No, but I'd like it to be", 'One tool', 'Several. It works across my tools'] },
  { area: 'cowork', q: 'Do you have tasks you repeat every week that Claude could take off your plate?', o: ["I haven't thought about it", 'Yes, but I do them by hand', "I've handed one or two to Claude", 'Claude runs them. I just review'] },
  { area: 'both', q: 'Which sentence fits you best right now?', o: ["Claude is a curiosity I haven't figured out", 'Claude is a handy tool I use now and then', 'Claude is a thinking partner I rely on', 'Claude is a teammate that gets work done for me'] },
];

export interface QuizLevel {
  n: LevelNumber;
  slug: string;
  name: string;
  short: string;
  sum: string;
  now: string[];
  nxt: string[];
  qw: string;
  qp: string;
  workbook: string;
  workbookDesc: string;
  workbookList: string[];
  product: ClaudeWorkbookProduct;
}

export const LEVELS: QuizLevel[] = [
  {
    n: 1, slug: 'curious-observer', name: 'The Curious Observer', short: 'Curious Observer',
    sum: "You know AI matters, but Claude hasn't clicked for you yet. That's not a talent problem. Nobody has shown you where to start, and that's easy to fix.",
    now: ["You're not sure what to ask, so you rarely open it", "One bad answer makes it feel like it isn't for you", 'Chat and Cowork still feel like the same fuzzy thing'],
    nxt: ['Use Chat with confidence for everyday thinking, writing and decisions', 'Know the three things to tell Claude before any request', 'Get one real win this week so the habit sticks'],
    qw: "Open Claude and paste this. Fill in the brackets. It's the fastest way to feel what Claude can do.",
    qp: "I'm [your role/situation]. This week I'm stuck on [one real problem]. Ask me 3 questions to understand it, then give me 3 practical options and tell me which you'd pick and why.",
    workbook: 'The Claude Starter Workbook', workbookDesc: 'From zero to confident in Claude Chat. Plain English, real examples, no jargon.',
    workbookList: ["What Claude is (and isn't) in one page", 'The 3-part way to ask so you get useful answers', '20 ready-to-use prompts for work and life', 'Your first 7 days with Claude, step by step'],
    product: 'claude-workbook-1',
  },
  {
    n: 2, slug: 'casual-asker', name: 'The Casual Asker', short: 'Casual Asker',
    sum: "You use Claude like a smarter search engine. It works, but you're leaving most of its value on the table.",
    now: ['Short questions get you short, generic answers', 'You start a new chat instead of shaping the answer', "Your own files and context haven't come in yet"],
    nxt: ['Turn one-line questions into rich, useful conversations', 'Bring in your own documents and saved instructions', 'Take your first step into Cowork'],
    qw: 'Next time you ask Claude something, add this before your question.',
    qp: "Before you answer: I'm [who you are], I want this for [goal], and the tone should be [tone]. If anything is unclear, ask me first. Here's my request: [your question]",
    workbook: 'The Claude Conversation Workbook', workbookDesc: 'Go from quick questions to real results with the context, refining and file habits that change everything.',
    workbookList: ['The context formula that fixes most weak answers', 'How to push back and refine instead of restarting', 'Using your own PDFs, docs and spreadsheets', 'Projects and saved instructions, set up once', 'Your first Cowork task, walked through'],
    product: 'claude-workbook-2',
  },
  {
    n: 3, slug: 'thinking-partner', name: 'The Thinking Partner', short: 'Thinking Partner',
    sum: "Claude is part of how you think. You're ahead of most people. The next jump is letting Claude do the work, not just talk it through.",
    now: ['Strong back-and-forth in Chat', 'You refine and push back well', 'Cowork and connected tools are mostly untouched'],
    nxt: ['Hand full multi-step tasks to Cowork', 'Connect Claude to your email, calendar and files', 'Build repeatable workflows you never have to re-explain'],
    qw: 'Open Cowork and hand it one real task with this.',
    qp: "Here's a task I do every week: [describe it]. Do it for me this time. Tell me what you need from me first, then show me the finished result and what you'd change to make it faster next time.",
    workbook: 'The Cowork Handoff Workbook', workbookDesc: 'Move from talking with Claude to having Claude do the work: Cowork, connectors and repeatable workflows.',
    workbookList: ['Chat vs Cowork: when to use which', 'Your first 5 handoffs, with exact wording', 'Connecting Gmail, Calendar and Drive safely', 'Turning a repeated task into a one-line request', "Reviewing Claude's work without redoing it"],
    product: 'claude-workbook-3',
  },
  {
    n: 4, slug: 'operator', name: 'The Operator', short: 'Operator',
    sum: "Claude is a working teammate for you. You're in the top tier. The gain now is in systems, leverage, and turning this skill into income.",
    now: ['Cowork handles real tasks for you', 'Claude works across your tools', 'You get finished work, not just answers'],
    nxt: ['Build systems that run with little input from you', 'Package what you know into products or services', 'Lead others across the bridge'],
    qw: 'Ask Claude to audit your week with this.',
    qp: "Look at how I've used you this week. List every task I repeated, estimate the time each took, and design one system that removes the top three. Be blunt about what I'm still doing by hand.",
    workbook: 'The Claude Operator Workbook', workbookDesc: 'Systems, skills and leverage. Turn your Claude fluency into time back and income.',
    workbookList: ['Designing workflows that run without you', 'Building skills and scheduled tasks', 'Your personal AI operating system', 'Packaging your expertise into offers with Claude'],
    product: 'claude-workbook-4',
  },
];

export function levelFromNumber(n: unknown): QuizLevel | null {
  const num = typeof n === 'string' ? parseInt(n, 10) : n;
  return LEVELS.find((l) => l.n === num) ?? null;
}

export function levelFromSlug(slug: string): QuizLevel | null {
  return LEVELS.find((l) => l.slug === slug) ?? null;
}

export function levelFromProduct(product: string): QuizLevel | null {
  return LEVELS.find((l) => l.product === product) ?? null;
}

export interface QuizScore {
  level: QuizLevel;
  chatPct: number;
  coworkPct: number;
}

/** answers: one 0-3 index per question. Returns null if incomplete or malformed. */
export function scoreQuiz(answers: unknown): QuizScore | null {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) return null;
  if (!answers.every((a) => Number.isInteger(a) && a >= 0 && a <= 3)) return null;
  const a = answers as number[];
  let chat = 0, chatMax = 0, cw = 0, cwMax = 0;
  QUESTIONS.forEach((q, i) => {
    if (q.area !== 'cowork') { chat += a[i]; chatMax += 3; }
    if (q.area !== 'chat') { cw += a[i]; cwMax += 3; }
  });
  const p = a.reduce((x, y) => x + y, 0) / (QUESTIONS.length * 3);
  const idx = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
  return {
    level: LEVELS[idx],
    chatPct: Math.round((chat / chatMax) * 100),
    coworkPct: Math.round((cw / cwMax) * 100),
  };
}
