import { type Archetype, type ArchetypeKey } from '@/lib/archetypes';
import { SITE_DISPLAY } from '@/lib/site';

type PlaybookRenderOptions = {
  archetype: Archetype;
  storedName?: string;
};

type ToolItem = { icon: string; name: string; desc: string; tier: 'free' | 'paid' };
type StrengthItem = { icon: string; title: string; desc: string };
type CareerItem = { title: string; desc: string; earn: string };
type LearnStep = { week: string; title: string; desc: string; chips: { label: string; free: boolean }[] };
type IncomeItem = { title: string; range: string; desc: string; bullets: string[] };
type CaseItem = { label: string; quote: string; meta: string; stats: { val: string; lbl: string }[] };
type TrapItem = { title: string; desc: string; fix: string };
type PlanWeek = { week: string; sub: string; tasks: string[] };

type PlaybookData = {
  romanNumeral: string;
  coverGradient: [string, string];
  accent: string;
  accentLight: string;
  archetypeWord: { before: string; emphasis: string; after: string };
  tagline: string;
  introParagraphs: string[];
  strengths: StrengthItem[];
  careers: CareerItem[];
  learning: LearnStep[];
  tools: ToolItem[];
  incomes: IncomeItem[];
  cases: CaseItem[];
  traps: TrapItem[];
  plan: PlanWeek[];
  ctaBg: string;
  ctaText: string;
  footerTagline: string;
};

const PLAYBOOK_DATA: Record<ArchetypeKey, PlaybookData> = {
  H: {
    romanNumeral: 'I',
    coverGradient: ['#0d5e47', '#1D9E75'],
    accent: '#0d5e47',
    accentLight: '#E1F5EE',
    archetypeWord: { before: 'The Human', emphasis: 'Bridge', after: '' },
    tagline: '"You were born to understand people. AI helps you reach more of them."',
    introParagraphs: [
      'You are the person people come to when they need to feel understood. Not explained to. Not fixed. Understood. This is not a personality quirk — it is a developed, rare, and genuinely valuable human capacity that most people cannot replicate no matter how hard they try.',
      'Your highest value has always been in the room where someone needs to be held — emotionally, intellectually, or professionally. Coaching, counselling, mentoring, teaching, community building, HR, facilitation. Anywhere the job is fundamentally about being genuinely present with another human being.',
      'The gift was always there. What has historically limited you is bandwidth. You can only be present with so many people at once. AI just changed that equation permanently.',
    ],
    strengths: [
      { icon: '👂', title: 'Deep Listening', desc: "You hear what isn't being said. This is the rarest skill in any organisation and AI cannot simulate the felt experience of being genuinely heard." },
      { icon: '🧭', title: 'Natural Coach', desc: 'You instinctively ask the question that unlocks someone. This is worth thousands per session when properly packaged and delivered at scale.' },
      { icon: '❤️', title: 'Emotional Intelligence', desc: 'You read rooms, relationships and dynamics that others miss entirely. In AI-era organisations, this is now a C-suite level competency.' },
      { icon: '🌐', title: 'Community Building', desc: 'You create belonging wherever you go. Paid communities built around genuine connection are one of the most resilient business models in the current economy.' },
      { icon: '🤝', title: 'Trust Building', desc: 'People trust you quickly. In a world saturated with AI-generated content, human-felt trust is the scarcest resource and the most valuable currency.' },
      { icon: '🪞', title: 'Reflective Capacity', desc: 'You help people see themselves clearly. This is the core competency of every high-value coaching, consulting and facilitation practice.' },
    ],
    careers: [
      { title: 'AI Life Coach (Augmented)', desc: 'Use AI for session prep, notes and content. You stay fully present in the room.', earn: '$1k–$5k / month' },
      { title: 'AI Community Architect', desc: 'Build and run a paid community. AI handles content; you hold the space.', earn: '$2k–$10k / month' },
      { title: 'AI Corporate Wellbeing Trainer', desc: 'Run workshops for companies on psychological safety, empathy and AI transition.', earn: '$2k–$10k / day' },
      { title: 'AI Relationship Coach', desc: 'Coach individuals and couples using AI to prep material and scale your practice.', earn: '$800–$3k / month' },
      { title: 'AI Educator / Course Creator', desc: 'Package your knowledge into courses. AI builds the infrastructure and content.', earn: '$500–$50k / launch' },
      { title: 'AI Career Transition Coach', desc: 'Help people rebuild identity and direction after layoffs with AI-augmented tools.', earn: '$1k–$3k / client' },
    ],
    learning: [
      { week: 'Week 1–2', title: 'Foundation: AI as your thinking partner', desc: 'Start with Claude. Use it for one hour a day to prep for real conversations — coaching sessions, difficult emails, teaching plans. Get comfortable with AI as a reflective tool for your own thinking, not just a task executor.', chips: [{ label: 'Claude.ai — Free tier', free: true }, { label: "Anthropic's prompt guide — Free", free: true }, { label: 'Claude Pro — $20/mo', free: false }] },
      { week: 'Week 3–4', title: 'Content: Get your ideas out at scale', desc: "Use Claude to turn what you know into content. One conversation with Claude should produce 5 pieces of content. Your expertise + AI's production capacity = consistent presence without content fatigue.", chips: [{ label: 'Canva Free — Design', free: true }, { label: 'CapCut — Video editing', free: true }, { label: 'HeyGen — $29/mo — Avatar content', free: false }] },
      { week: 'Month 2', title: 'Delivery: AI-augment your practice', desc: "Set up Notion AI for client management. Use Loom AI for async check-ins between sessions. Add Calendly for booking. You've now separated your time from your impact — serving more people in less time.", chips: [{ label: 'Notion Free — Client mgmt', free: true }, { label: 'Calendly Free — Booking', free: true }, { label: 'Loom AI — $15/mo — Async video', free: false }] },
      { week: 'Month 3', title: 'Community: Build your paid space', desc: 'Launch a community using Circle or Skool. Use Beehiiv for the email newsletter that feeds it. Your presence is the anchor — AI runs the content and infrastructure around it. This is your recurring revenue engine.', chips: [{ label: 'Skool Free — 14-day trial', free: true }, { label: 'Beehiiv Free — to 2,500 subs', free: true }, { label: 'Circle — $49/mo — Premium community', free: false }] },
    ],
    tools: [
      { icon: '🧠', name: 'Claude (Anthropic)', desc: 'Your primary thinking partner. Use for session prep, content creation, curriculum building, difficult email drafting and reflective journaling prompts.', tier: 'free' },
      { icon: '📔', name: 'Notion AI', desc: 'Your client management and knowledge base. Store session notes, client profiles, resource libraries. AI summarises and organises everything for you.', tier: 'free' },
      { icon: '🎥', name: 'HeyGen', desc: 'Create AI avatar content — teaching videos, welcome sequences, course modules — without being on camera every day. Your face and energy, scaled.', tier: 'paid' },
      { icon: '🎙️', name: 'Loom AI', desc: 'Async video check-ins for clients between sessions. AI trims silences, adds captions and generates summaries automatically. Deep connection without real-time cost.', tier: 'free' },
      { icon: '🏛️', name: 'Circle / Skool', desc: 'Your community platform. Where your members gather, learn and connect. AI-assisted content scheduling keeps the community alive between your live sessions.', tier: 'paid' },
      { icon: '📧', name: 'Beehiiv', desc: 'Your newsletter infrastructure. Build and nurture your audience with weekly insights. AI helps with content. You bring the human story that makes people open it.', tier: 'free' },
    ],
    incomes: [
      { title: '1:1 Coaching Practice', range: '$1,000 – $5,000/mo', desc: 'High-touch coaching with AI handling all admin. You serve 5–10 clients deeply. AI manages notes, prep, follow-up and content between sessions.', bullets: ['Package: 4 sessions + async support', 'Price: $500–$2,500 per package', 'Upsell: 6-month containers'] },
      { title: 'Paid Community', range: '$2,000 – $15,000/mo', desc: 'Monthly membership community. Your presence anchors it. AI generates the weekly content, resources and programming. Scales without burning out.', bullets: ['Model: $49–$99/month per member', '50 members = $2,500–$5k/mo', 'Add live sessions for premium tier'] },
      { title: 'Corporate Workshops', range: '$2,000 – $10,000/day', desc: 'Half or full-day sessions for organisations. AI-era psychological safety, empathy training, team transition support. High value, low frequency.', bullets: ['Entry: $2k half-day workshop', 'Premium: $5k–$10k full-day', 'Retainer: $3k–$5k/month ongoing'] },
      { title: 'Online Course', range: '$500 – $50,000/launch', desc: 'Package your expertise into a self-paced course. AI builds the curriculum, creates supporting materials and handles delivery infrastructure.', bullets: ['Price: $97–$997 per course', 'Launch to email list first', 'Evergreen with AI-run ads'] },
    ],
    cases: [
      { label: 'Case Study 01 — The Counsellor', quote: 'I was seeing 12 clients a week and spending 15 hours on admin. I used Claude for session prep and notes, HeyGen to create a psycho-education video series, and Beehiiv to build an email list. Within 4 months I had a course generating $3k a month passively — and I got 3 hours a day back to actually be present with my clients.', meta: 'Former NHS counsellor · UK · Human Bridge archetype', stats: [{ val: '15hrs', lbl: 'Admin saved/week' }, { val: '$3k', lbl: 'Passive course income' }, { val: '4mo', lbl: 'To first sale' }, { val: '600+', lbl: 'Email subscribers' }] },
      { label: 'Case Study 02 — The HR Leader', quote: "I left my HR director role knowing I wanted to do something with AI and human psychology — but I didn't know how. I took the archetype quiz, found I was a Human Bridge, and built a corporate workshop offering around psychological safety in AI transitions. I ran my first workshop 6 weeks after leaving. It paid $4,500.", meta: 'Former People Director · Nigeria · Human Bridge archetype', stats: [{ val: '6wks', lbl: 'From quiz to first client' }, { val: '$4,500', lbl: 'First workshop fee' }, { val: '3', lbl: 'Repeat clients in month 2' }] },
    ],
    traps: [
      { title: 'Trap 1: Over-giving and burning out even with AI', desc: 'AI handles admin but Human Bridges often fill the freed time with more giving rather than protecting their recovery capacity.', fix: 'Set a hard limit on 1:1 time. Let AI content do the giving at scale. Protect your energy for the sessions only you can run.' },
      { title: 'Trap 2: Under-charging because the work feels like care', desc: 'Human Bridges often feel guilty monetising empathy. The result is excellent work compensated at a fraction of its market value.', fix: 'Research market rates for coaching and facilitation. Your emotional intelligence is a premium professional skill. Price it accordingly.' },
      { title: 'Trap 3: Staying too personal — not building the system', desc: "Your greatest risk is remaining the only person who can deliver your value. If you're the only product, you can't scale.", fix: 'Build one digital product — a course, a guide, a community — that delivers your value without requiring your presence. Start with this.' },
      { title: 'Trap 4: Neglecting technical fluency entirely', desc: "You don't need to be technical. But complete avoidance of the tools means depending on others for basic setup — costing time and money.", fix: "Spend 2 hours with Claude, 2 hours with Canva, 2 hours with Beehiiv. That's the minimum viable technical literacy for your archetype." },
    ],
    plan: [
      { week: 'Week 1', sub: 'Foundation', tasks: ['Create free Claude account — use daily for 1 week', 'Use Claude to prep for 3 real conversations', 'Write your coaching/teaching niche in one sentence', 'Take the full archetype quiz and read your results', 'Set up a Beehiiv free account'] },
      { week: 'Week 2–3', sub: 'Content', tasks: ['Use Claude to create 10 pieces of content from 1 conversation', 'Post 3x this week — short, honest, in your voice', 'Set up Canva free for basic design', 'Write your first Beehiiv welcome email', 'Identify your first digital product idea'] },
      { week: 'Week 4', sub: 'First offer', tasks: ['Build a simple lead magnet (use Claude to write it)', 'Set up Calendly for booking', 'Send your first Beehiiv email to your list', 'DM 5 people who could benefit from what you do', 'Book your first paid conversation'] },
    ],
    ctaBg: '#0d5e47',
    ctaText: '#0d5e47',
    footerTagline: 'Your Human Bridge Personal AI Guide',
  },
  C: {
    romanNumeral: 'II',
    coverGradient: ['#c94f2a', '#d4870a'],
    accent: '#c94f2a',
    accentLight: '#FEF0EA',
    archetypeWord: { before: 'The', emphasis: 'Creative', after: 'Amplifier' },
    tagline: '"You see the world differently. AI lets you show the world what you see."',
    introParagraphs: [
      "Creativity is your currency. You have always imagined things that don't exist yet — and the gap between what lives in your head and what you can actually produce has been the defining frustration of your creative life. Not the ideas. Never the ideas. The making.",
      'The gap between what you see in your imagination and what you can physically produce has historically been the bottleneck. Equipment costs. Production time. Team requirements. Technical skills you never chose to develop because they weren\'t where your gift lives.',
      'AI just closed that gap permanently. You are now the director, the writer, the studio. The constraint was never imagination. It was always production. That problem is solved.',
    ],
    strengths: [
      { icon: '🎨', title: 'Visual Thinking', desc: 'You process the world in images, compositions and aesthetics before words. This is the native intelligence that drives every great creative output.' },
      { icon: '🎙️', title: 'Original Voice', desc: 'Your creative perspective is distinctly yours. In a world of AI-generated content, a genuinely original voice is the rarest and most valuable thing that exists.' },
      { icon: '🖼️', title: 'Aesthetic Judgment', desc: 'Knowing the difference between what the machine made and what is actually good. Art direction — not just generation — is your superpower.' },
      { icon: '📚', title: 'Storytelling Instinct', desc: 'You understand narrative structure intuitively. Beginning, tension, resolution. The emotional arc that makes someone feel something.' },
      { icon: '🎲', title: 'Creative Risk', desc: 'The willingness to make something that has never existed. To choose a direction and stand behind it. AI generates options. You make choices.' },
      { icon: '💡', title: 'Cultural Antenna', desc: 'You sense what the culture needs before it knows it needs it. This is the most valuable input in any creative process and cannot be automated.' },
    ],
    careers: [
      { title: 'AI Filmmaker / Video Director', desc: 'Direct AI-generated footage. Write, produce, distribute. You are the creative vision.', earn: '$2k–$15k/project' },
      { title: 'AI Visual Artist / Illustrator', desc: 'Create and license original AI-assisted artwork. Build a body of work and audience.', earn: '$500–$10k/series' },
      { title: 'AI Music Creator', desc: "Produce original tracks, license music, take commissions. Your ear, AI's production.", earn: '$1k–$5k/month' },
      { title: 'AI Brand Storyteller', desc: 'Write brand narratives, campaigns, content strategies. Your voice at scale.', earn: '$2k–$8k/retainer' },
      { title: 'AI Fashion Designer', desc: 'Concept collections, design products, build a brand. From vision to manufacture.', earn: '$1k–$20k/collection' },
      { title: 'AI Scriptwriter', desc: 'Write scripts for YouTube, ads, films, UGC. High demand, scalable output.', earn: '$500–$5k/project' },
    ],
    learning: [
      { week: 'Week 1–2', title: 'Foundation: Master one generative tool', desc: 'Choose Midjourney or Runway — not both. Spend 10 hours inside it this week. Learn the parameters, the style language, the limits. Make 50 outputs. Delete 45. Study the 5 that are actually good.', chips: [{ label: 'Midjourney — Free trial', free: true }, { label: 'Runway — Free tier', free: true }, { label: 'Midjourney Pro — $10/mo', free: false }] },
      { week: 'Week 3–4', title: 'Build: Complete your first AI-assisted project', desc: 'One finished piece. Not a portfolio — one thing. A short film. A collection of 10 images. A 60-second music track. Something with a beginning, middle and end. Finish it. Ship it.', chips: [{ label: 'Claude — Free tier (for scripts)', free: true }, { label: 'Adobe Firefly — Free', free: true }, { label: 'ElevenLabs — Free tier (voice)', free: true }] },
      { week: 'Month 2', title: 'Audience: Share and build your body of work', desc: 'Post consistently — 3× per week minimum. Not just the finished work. The process. The behind-the-scenes. The decisions you made and why. Your audience is paying for your eye, not just your output.', chips: [{ label: 'CapCut — Free (content editing)', free: true }, { label: 'HeyGen — $29/mo (avatar content)', free: false }, { label: 'Buffer — Free (scheduling)', free: true }] },
      { week: 'Month 3', title: 'Income: Your first paying creative client', desc: 'You now have a body of work. Use it. Reach out to 10 brands in your aesthetic lane. Offer a specific, small, first project. Get paid. Deliver beyond expectations. This becomes your case study.', chips: [{ label: 'Canva — Free (proposals)', free: true }, { label: 'Stripe — Free (payments)', free: true }, { label: 'Claude — For client comms', free: true }] },
    ],
    tools: [
      { icon: '🖼️', name: 'Midjourney', desc: 'Primary image generation. Master the visual language and parameters for your aesthetic.', tier: 'free' },
      { icon: '🎬', name: 'Runway / Sora', desc: 'Video generation and editing. Your virtual production company.', tier: 'paid' },
      { icon: '🎤', name: 'ElevenLabs', desc: 'Voice cloning and audio production. Narration, music, sound design.', tier: 'free' },
      { icon: '🤖', name: 'HeyGen', desc: 'AI avatar content. Scale your video presence without being on camera daily.', tier: 'paid' },
      { icon: '✍️', name: 'Claude', desc: 'Script writing, creative briefs, client communications. Your AI writing partner.', tier: 'free' },
      { icon: '🎨', name: 'Adobe Firefly', desc: 'Commercial-safe image generation. Integrated into Creative Cloud.', tier: 'free' },
    ],
    incomes: [
      { title: 'AI Content Creation Agency', range: '$3,000–$15,000/mo', desc: 'Build and run client content at scale. You are the creative director. AI is the studio.', bullets: ['4–8 clients at $1k–$3k/month each', 'Retainer model for recurring revenue', 'Upsell: brand identity + strategy'] },
      { title: 'Creative Direction', range: '$2,000–$10,000/project', desc: 'High-value, low-volume. You direct the vision. AI executes. Clients pay for your eye.', bullets: ['Single project fees ($2k–$5k)', 'Campaign direction retainers', 'Art direction for ad agencies'] },
      { title: 'Digital Art Licensing', range: '$500–$5,000/month', desc: 'License AI-assisted artwork to brands, publishers, stock platforms. Income without client work.', bullets: ['Stock platforms: Pond5, AudioJungle', 'Direct brand licensing', 'Limited edition drops'] },
      { title: 'AI Creative Workshops', range: '$1,000–$5,000/workshop', desc: 'Teach other creatives to use AI tools for their medium. High demand from agencies and schools.', bullets: ['Half-day workshops: $1k–$2.5k', 'Full-day intensives: $3k–$5k', 'Online cohort programmes'] },
    ],
    cases: [
      { label: 'Case Study 01 — The Frustrated Filmmaker', quote: "I had the same film in my head for 9 years. Couldn't afford the crew. Couldn't afford the equipment. I learned Runway in 3 weeks. I made a 4-minute short film entirely with AI-generated footage, my narration and ElevenLabs for the score. It got 80,000 views on YouTube in the first month. A production company reached out.", meta: 'Former advertising creative · UK · Creative Amplifier archetype', stats: [{ val: '9yrs', lbl: 'Film in head' }, { val: '3wks', lbl: 'Tool learning' }, { val: '80k', lbl: 'First month views' }, { val: '1', lbl: 'Production enquiry' }] },
      { label: 'Case Study 02 — The Marketing Creative', quote: "I had 8 years in marketing but always felt like the 'creative one' who couldn't actually produce. With Midjourney and Claude I built a content studio as a team of one. I went from employee to freelance brand director in 4 months. My first month freelance made more than my last 3 months employed.", meta: 'Former marketing manager · Nigeria · Creative Amplifier archetype', stats: [{ val: '4mo', lbl: 'Employee to freelance' }, { val: '3x', lbl: 'Previous monthly income' }, { val: '1', lbl: 'Person team' }, { val: '8yrs', lbl: 'Domain expertise' }] },
    ],
    traps: [
      { title: 'Producing without distributing', desc: 'Creative Amplifiers often stay in the generative phase and avoid the uncomfortable act of sharing publicly.', fix: 'Set a rule: one finished thing shared per week. Not perfect. Finished. The audience only exists if you show up.' },
      { title: 'Losing your voice to the machine', desc: "Over-relying on what AI proposes rather than directing it. The output starts to look like everyone else's.", fix: 'Always prompt from a reference point that is yours. Your aesthetic, your references, your decisions. AI is the brush, you are the painter.' },
      { title: 'Not charging for creative direction', desc: 'Charging for AI tool time rather than for your eye and judgment. This dramatically undervalues the work.', fix: "Your pricing is for the vision, the taste, the decisions. AI's role is invisible in your pricing — like a photographer doesn't price for the camera." },
      { title: 'Creating in isolation', desc: 'Building a large portfolio with no audience, then launching to silence because nobody knows you exist yet.', fix: 'Share the process from day one. Before the work is finished. The audience grows alongside the work, not after it.' },
    ],
    plan: [
      { week: 'Week 1', sub: 'Tool mastery', tasks: ['Choose one tool: Midjourney or Runway', 'Spend 10hrs — make 50 outputs', 'Study: what makes the good ones good?', 'Join the official Discord/community', 'Follow 5 creators using your chosen tool'] },
      { week: 'Week 2–3', sub: 'First project', tasks: ['Define one finished project to complete', 'Use Claude to write the creative brief', 'Build it — start to finish', "Ship it. Post it. Don't wait.", 'Document the process as you go'] },
      { week: 'Week 4', sub: 'First income', tasks: ['Reach out to 10 brands in your lane', 'Offer one specific deliverable', 'Price it: minimum $300, ideally $500+', 'Deliver & document as case study', 'Ask for a testimonial immediately'] },
    ],
    ctaBg: '#c94f2a',
    ctaText: '#c94f2a',
    footerTagline: 'The Creative Amplifier Personal AI Guide',
  },
  S: {
    romanNumeral: 'III',
    coverGradient: ['#534ab7', '#7F77DD'],
    accent: '#534ab7',
    accentLight: '#EEEDFE',
    archetypeWord: { before: 'The', emphasis: 'Systems', after: 'Architect' },
    tagline: '"You think in workflows. AI thinks in automation. Together you\'re unstoppable."',
    introParagraphs: [
      "You see the inefficiency in everything. Not as a frustration — as a map. Every broken process, every repetitive task, every place where a human is doing something a machine should be doing — that's not a problem to you. That's an invitation.",
      'Your greatest satisfaction has always been invisible work. The system that runs perfectly without anyone thinking about it. The workflow that eliminated three hours of manual effort per day. The process that nobody credits because it just works.',
      "AI is the most powerful building material ever created for people who think like you. You don't just use AI — you build with it. And the world is desperately short of people who can design the invisible infrastructure that everyone else depends on.",
    ],
    strengths: [
      { icon: '🧩', title: 'Systems Thinking', desc: 'You see the whole before the parts. The architecture before the components. This is the rarest thinking pattern in any organisation.' },
      { icon: '🔍', title: 'Pattern Recognition', desc: 'You spot inefficiency before it causes pain. You see the bottleneck forming three steps before everyone else notices it.' },
      { icon: '📊', title: 'Process Mapping', desc: 'You can take any complex workflow and translate it into executable, testable, documentable logic. This skill is worth thousands per engagement.' },
      { icon: '🔧', title: 'Debugging Mindset', desc: 'You know why things break. Not just that they broke. The systematic investigation that finds the root cause is your native mode.' },
      { icon: '📝', title: 'Documentation', desc: 'You build things other people can actually use. Clear, complete, transferable systems. This is what separates a build from a solution.' },
      { icon: '🌉', title: 'Technical Translation', desc: 'You can speak to engineers and speak to clients. The bridge between what technology can do and what humans actually need.' },
    ],
    careers: [
      { title: 'AI Automation Consultant', desc: 'Build and maintain automation workflows for businesses. The most in-demand technical AI role.', earn: '$1k–$8k/build' },
      { title: 'AI Workflow Architect', desc: 'Design the AI infrastructure organisations run on. Enterprise-level impact.', earn: '$3k–$15k/project' },
      { title: 'AI No-Code SaaS Builder', desc: 'Build and sell AI-powered software products. The highest-leverage income model.', earn: '$1k–$50k+ MRR' },
      { title: 'AI Prompt Engineer', desc: "Design the AI instruction systems that power other people's businesses.", earn: '$500–$5k/engagement' },
      { title: 'AI Customer Service Architect', desc: 'Build the conversational AI systems that handle customer interaction at scale.', earn: '$2k–$10k/build' },
      { title: 'AI Research Analyst', desc: 'Use AI to synthesise intelligence faster than any team. Sell the insight.', earn: '$1k–$5k/retainer' },
    ],
    learning: [
      { week: 'Week 1–2', title: 'Foundation: Your first Make.com automation', desc: "Create a free Make.com account. Complete their Getting Started tutorial. Then automate one real thing in your own life or work — email routing, social scheduling, data collection. It doesn't matter what. Build something real.", chips: [{ label: 'Make.com — Free tier (1,000 ops/mo)', free: true }, { label: 'Make.com Academy — Free', free: true }, { label: 'Make.com Core — $9/mo', free: false }] },
      { week: 'Week 3–4', title: 'Integration: Claude + your workflow', desc: "Add Claude API to your Make.com workflow. This is the upgrade that transforms automation into intelligence. Your workflow now doesn't just move data — it understands and responds to it.", chips: [{ label: 'Anthropic API — Pay as you go', free: false }, { label: 'Claude.ai — Free tier for learning', free: true }, { label: 'n8n — Free self-hosted alternative', free: true }] },
      { week: 'Month 2', title: 'Client: Build your first paid workflow', desc: 'Find one small business with an obvious manual process. Offer to automate it for $500–$1,500. Document everything. This becomes your case study and your pitch template for the next client.', chips: [{ label: 'Airtable — Free tier (database)', free: true }, { label: 'Notion AI — Free tier (documentation)', free: true }, { label: 'Loom — Free (walkthrough videos)', free: true }] },
      { week: 'Month 3', title: 'Scale: Package and systematise your offer', desc: 'You now have a client, a system, and a process. Package the offer. Build the sales page. Create the onboarding doc. Turn one successful engagement into a repeatable, sellable product.', chips: [{ label: 'Stripe — Free (payments)', free: true }, { label: 'Canva — Free (proposal design)', free: true }, { label: 'Claude — For proposal writing', free: true }] },
    ],
    tools: [
      { icon: '⚙️', name: 'Make.com', desc: 'Primary automation platform. Visual workflow builder. The foundation of your practice.', tier: 'free' },
      { icon: '🔗', name: 'n8n', desc: 'Open-source alternative to Make.com. Self-hosted for enterprise clients who need data sovereignty.', tier: 'free' },
      { icon: '🧠', name: 'Claude', desc: 'AI intelligence layer in your workflows. Also for documentation, client proposals and system design.', tier: 'free' },
      { icon: '🗂', name: 'Airtable', desc: 'Database layer for your automations. Connects with everything. Stores and structures the data your systems move.', tier: 'free' },
      { icon: '🔄', name: 'Zapier', desc: 'Simpler automation for clients already using it. Less powerful than Make.com but wider adoption.', tier: 'free' },
      { icon: '📚', name: 'Notion AI', desc: 'Documentation and knowledge management. Your systems need to be documented. This is where that lives.', tier: 'free' },
    ],
    incomes: [
      { title: 'Automation Builds', range: '$1,000–$8,000/build', desc: 'Project-based workflow builds for businesses. Most common entry point. Clean scope, clear deliverable.', bullets: ['Discovery audit: $500 (deducted from build)', 'Build fee: $1k–$8k depending on complexity', 'Monthly maintenance: $200–$500/mo'] },
      { title: 'SaaS Products', range: '$500–$50,000+ MRR', desc: 'The highest-leverage model. Build once, sell many times. Your systems thinking becomes a product.', bullets: ['No-code tools: Bubble, Glide, Supabase', 'Niche-specific workflow products', 'Template marketplace products'] },
      { title: 'Enterprise Implementation', range: '$5,000–$30,000/project', desc: 'Larger organisations implementing AI infrastructure. High ticket, longer sales cycle, significant impact.', bullets: ['Scoped engagement with milestones', 'Change management component included', 'Ongoing retainer post-implementation'] },
      { title: 'Technical Training', range: '$1,000–$5,000/programme', desc: 'Teach other people to automate. Agencies, founders, operations teams. High demand.', bullets: ['Workshop: $1k–$2.5k per session', 'Online course: $97–$497', 'Team training retainer: $1k–$3k/mo'] },
    ],
    cases: [
      { label: 'Case Study 01 — The Operations Manager', quote: "I'd been in operations for 11 years. When I heard about Make.com I spent a weekend learning it and immediately saw 8 workflows I could have automated years ago. I started consulting on the side while still employed. Within 6 months I had 4 clients paying me $1,500–$3,000 a month each. I handed in my notice.", meta: 'Former Operations Manager · Lagos · Systems Architect archetype', stats: [{ val: '1wknd', lbl: 'To first automation' }, { val: '6mo', lbl: 'To resignation' }, { val: '4', lbl: 'Clients retained' }, { val: '$8k', lbl: 'Monthly consulting revenue' }] },
      { label: 'Case Study 02 — The Project Manager', quote: "I didn't know how to code. I still don't. I used Bubble and Make.com to build a client onboarding SaaS for agencies. It took me 3 months to build. I launched at $49/month. Within 6 months I had 40 paying customers. The product runs without me.", meta: 'Former Project Manager · UK · Systems Architect archetype', stats: [{ val: '3mo', lbl: 'Build time' }, { val: '$49/mo', lbl: 'Price point' }, { val: '40', lbl: 'Paying customers (mo 6)' }, { val: '0hrs', lbl: 'Daily maintenance required' }] },
    ],
    traps: [
      { title: 'Over-engineering the solution', desc: 'Building complex, elegant systems when a simple workflow would have done the job in a fraction of the time.', fix: 'Define the minimum viable automation first. Build that. Add complexity only when a specific need demands it.' },
      { title: 'Building without selling', desc: 'Systems Architects often have beautiful, functional work that nobody knows about because marketing feels uncomfortable.', fix: 'Document every build with a Loom video walkthrough. This is your portfolio and your sales material. Make it while you build.' },
      { title: 'Under-communicating the value of invisible work', desc: "Your best systems are invisible — they just work. Clients don't realise what they have until it breaks.", fix: "Send monthly impact reports: 'This month your automation saved X hours and processed Y items.' Make the invisible visible." },
      { title: 'Waiting for perfection before shipping', desc: "The most common Systems Architect trap. A working system at 80% is infinitely more valuable than a perfect system that doesn't exist yet.", fix: 'Set a ship date before you start building. Hold it. The last 20% of perfection takes 80% of the time and delivers 5% of the value.' },
    ],
    plan: [
      { week: 'Week 1', sub: 'Foundation', tasks: ['Create Make.com free account', 'Complete their Getting Started course', 'Automate one real thing in your life', 'Join Make.com community forum', 'Study 3 automation case studies'] },
      { week: 'Week 2–3', sub: 'Build', tasks: ['Connect Claude API to a Make.com workflow', 'Build a workflow that uses AI judgment', 'Document it fully with Loom video', 'Price it: what would this save a business?', 'Post it — show your process publicly'] },
      { week: 'Week 4', sub: 'Sell', tasks: ['Identify 5 businesses with obvious manual processes', 'Offer a free audit (30 min call)', 'Propose one automation: $500–$1,500', 'Build it. Document it. Get paid.', 'Ask for a testimonial & referral'] },
    ],
    ctaBg: '#534ab7',
    ctaText: '#534ab7',
    footerTagline: 'The Systems Architect Personal AI Guide',
  },
  G: {
    romanNumeral: 'IV',
    coverGradient: ['#1a1040', '#534ab7'],
    accent: '#1a1040',
    accentLight: '#E8E6FC',
    archetypeWord: { before: 'The', emphasis: 'Growth', after: 'Catalyst' },
    tagline: '"You see opportunity everywhere. AI moves at the speed of your vision."',
    introParagraphs: [
      'Growth is your language. You are built for momentum — for spotting the gap between where something is and where it could be. That gap is not daunting to you. It is energising. You have always been able to make things happen faster than the people around you.',
      'The bottleneck has never been your ambition. It has always been the speed of execution. The research that took a week. The outreach that took a month. The analysis that required a team. The pipeline that needed three people to manage.',
      'AI just gave your ambition an engine. You are now one person operating at the output level of a team — with the strategic intelligence, relationship instinct and drive that a team of ten could never replicate. The gap between your vision and your execution just closed.',
    ],
    strengths: [
      { icon: '🎯', title: 'Opportunity Identification', desc: 'You see the gap before the market does. The underserved customer, the unsolved problem, the untapped channel. This is your most valuable strategic asset.' },
      { icon: '💬', title: 'Persuasion', desc: 'Natural ability to move people toward decisions. To make someone feel that the next step is obvious and compelling. This cannot be automated.' },
      { icon: '📈', title: 'Results Orientation', desc: 'You keep the goal in sight when others drift. When the process gets complicated, you cut back to: what actually moves the number?' },
      { icon: '🤝', title: 'Relationship Compounding', desc: 'You maintain and activate a network over years. The relationship that pays off 3 years after you planted it. AI cannot replicate this compounding.' },
      { icon: '🔮', title: 'Strategic Prioritisation', desc: 'Knowing which bets are worth making. Which leads to pursue. Which opportunities to let go. This judgment is what separates good growth from busy growth.' },
      { icon: '⚡', title: 'Speed to Action', desc: 'Moving before others have finished deliberating. First-mover advantage in opportunities, relationships and market positions. Your native operating speed.' },
    ],
    careers: [
      { title: 'AI Sales Automation Specialist', desc: 'Build outreach systems that find, reach and convert at scale. Commission + retainer model.', earn: '$3k–$15k/month' },
      { title: 'AI Growth Strategist', desc: 'Design and execute growth strategies for businesses using AI tools. High-ticket advisory.', earn: '$5k–$20k/month' },
      { title: 'AI Cold Outreach Expert', desc: 'Build and run personalised outreach campaigns for clients. Performance-based models available.', earn: '$2k–$8k/client' },
      { title: 'AI Marketing Strategist', desc: 'Use AI for market intelligence, campaign design and performance optimisation.', earn: '$3k–$10k/retainer' },
      { title: 'AI Brand Consultant', desc: 'Use AI to research, position and build brands for startups and growing businesses.', earn: '$2k–$10k/project' },
      { title: 'AI Business Coach', desc: 'Coach founders and executives using AI-augmented diagnostics and frameworks.', earn: '$3k–$15k/client' },
    ],
    learning: [
      { week: 'Week 1–2', title: 'Foundation: Apollo.io + Instantly setup', desc: "Create Apollo.io free account. Find 100 ideal prospects for a business you know well. Then set up an Instantly account and build a 3-step email sequence. Don't send yet. This week is setup and learning the tools.", chips: [{ label: 'Apollo.io — Free tier (50 exports/mo)', free: true }, { label: 'Instantly — $37/mo starter', free: false }, { label: 'Clay — Free trial', free: true }] },
      { week: 'Week 3–4', title: 'Launch: First outreach campaign', desc: 'Choose one specific niche. One specific offer. One specific person type. Send 200 personalised emails. Track open rates, reply rates, meetings booked. Every number is data. Optimise based on what you learn.', chips: [{ label: 'Claude — For email personalisation copy', free: true }, { label: 'Loom — Free (personalised video loom)', free: true }, { label: 'HubSpot — Free CRM', free: true }] },
      { week: 'Month 2', title: 'Scale: What worked, amplified', desc: 'You have one campaign that works. Now scale it. Use Clay to research prospects at volume with hyper-personalisation that used to take a full team. Double the volume. Improve the conversion rate.', chips: [{ label: 'Clay — From $149/mo', free: false }, { label: 'Perplexity — For prospect research', free: true }, { label: 'Make.com — For workflow automation', free: true }] },
      { week: 'Month 3', title: 'Offer: Package for clients or your own business', desc: 'You now have a repeatable growth system. Either use it for your own business or package it as a service for clients. Both paths generate significant income. The choice depends on which gives you the most control over your time.', chips: [{ label: 'Stripe — Free (client payments)', free: true }, { label: 'Canva — Free (proposal design)', free: true }, { label: 'Beehiiv — Free to 2,500 (newsletter)', free: true }] },
    ],
    tools: [
      { icon: '🎭', name: 'Apollo.io', desc: 'Prospect identification and enrichment. Find the right people at the right companies at the right time.', tier: 'free' },
      { icon: '📨', name: 'Instantly.ai', desc: 'Email outreach at volume with personalisation. Your outreach engine.', tier: 'paid' },
      { icon: '🧱', name: 'Clay', desc: 'Hyper-personalised prospect research at scale. The tool that makes your outreach feel bespoke.', tier: 'paid' },
      { icon: '📊', name: 'HubSpot AI', desc: 'CRM with AI features. Know when to reach out and what to say. Free tier is extensive.', tier: 'free' },
      { icon: '🔎', name: 'Perplexity', desc: 'Real-time market and competitor intelligence. Research in minutes that used to take days.', tier: 'free' },
      { icon: '⚙️', name: 'Make.com', desc: 'Automate the repetitive parts of your growth workflow. Free your strategic time.', tier: 'free' },
    ],
    incomes: [
      { title: 'AI Growth Agency', range: '$5,000–$20,000/month', desc: 'Run growth for multiple clients. You are the strategic brain. AI handles the execution volume.', bullets: ['3–6 clients at $2k–$5k each/month', 'Performance bonuses on results delivered', 'Equity option for early-stage startups'] },
      { title: 'Fractional GTM Director', range: '$5,000–$15,000/month', desc: "Be the part-time growth leader for companies that can't afford full-time. High value, flexible.", bullets: ['2–3 clients at $3k–$8k each/month', 'Typically 2 days/week per client', 'Often converts to full-time advisory'] },
      { title: 'Outreach System Builds', range: '$2,000–$8,000/project', desc: 'Build the outreach infrastructure and hand it over. Project-based, clean scope.', bullets: ['System audit: $500 (deducted from build)', 'Build fee: $2k–$8k', 'Training + handover included'] },
      { title: 'Advisory + Equity', range: '$0 base + equity upside', desc: 'Advise early-stage companies. Take equity instead of or alongside cash. Your network is the value.', bullets: ['Typically 0.25–1% equity per company', '3–5 companies simultaneously', 'Monthly strategic sessions + introductions'] },
    ],
    cases: [
      { label: 'Case Study 01 — The Sales Director', quote: 'I built and ran sales teams for 12 years. When I learned Apollo and Instantly I realised I could do what my team of 6 did — alone — in 2 hours a day. I started an outreach agency on the side. Within 4 months I had 5 clients paying $3k each. I now run a team of 3 and earn 3x my former salary.', meta: 'Former Sales Director · South Africa · Growth Catalyst archetype', stats: [{ val: '4mo', lbl: 'To first 5 clients' }, { val: '3x', lbl: 'Former salary income' }, { val: '2hrs/day', lbl: 'Active management time' }, { val: '5', lbl: 'Paying clients' }] },
      { label: 'Case Study 02 — The Marketer Who Went Fractional', quote: 'I spent 9 years as a marketing director. I was exhausted managing teams and budgets. I went fractional — 3 clients, 3 days a week, at $4k each. I use Perplexity for research, Claude for strategy documents, Apollo for outreach. I earn more, work less, and have complete control over my time.', meta: 'Former Marketing Director · UK · Growth Catalyst archetype', stats: [{ val: '3', lbl: 'Clients simultaneously' }, { val: '$12k/mo', lbl: 'Fractional income' }, { val: '3 days', lbl: 'Active work per week' }, { val: '9yrs', lbl: 'Domain expertise applied' }] },
    ],
    traps: [
      { title: 'Moving so fast you break trust', desc: "AI enables speed. Speed without relationship intelligence produces outreach that feels automated even when it isn't.", fix: "Before any outreach sequence, ask: does this feel like it came from a human who knows this person? If not, slow down and personalise." },
      { title: 'Using AI as a shortcut to relationships', desc: 'AI can find the right people. It cannot build the relationship. Growth Catalysts sometimes confuse volume for connection.', fix: 'Set a rule: every AI-initiated conversation gets a genuinely human follow-up. The machine opens the door. You walk through it.' },
      { title: 'Neglecting the inner work', desc: "The Growth Catalyst's greatest risk is mistaking busyness for purpose. Moving fast in every direction — and burning out.", fix: "Quarterly review: Is what I'm building aligned with what I actually want? Growth for its own sake is not a destination." },
      { title: 'Over-promising AI capabilities to clients', desc: "The excitement of AI tools can lead to commitments that the technology can't reliably deliver — yet.", fix: 'Underpromise and overdeliver. Your reputation is your most valuable asset. Protect it over any single client relationship.' },
    ],
    plan: [
      { week: 'Week 1', sub: 'Foundation', tasks: ['Create Apollo.io free account', 'Find 100 ideal prospects for one niche', 'Set up HubSpot free CRM', 'Write your positioning in one sentence', 'Study 3 outreach case studies'] },
      { week: 'Week 2–3', sub: 'Launch', tasks: ['Set up Instantly account', 'Write 3-step email sequence with Claude', 'Send first 200 emails to your Apollo list', 'Track: open rate, reply rate, meetings', 'Optimise based on data'] },
      { week: 'Week 4', sub: 'Close', tasks: ['Follow up on all replies within 24hrs', 'Book and run 3 discovery calls', 'Make one offer — minimum $500', 'Get paid. Deliver results.', 'Document as case study immediately'] },
    ],
    ctaBg: '#1565C0',
    ctaText: '#1565C0',
    footerTagline: 'The Growth Catalyst Personal AI Guide',
  },
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function renderPlaybookStyles(d: PlaybookData): string {
  return `
    *{margin:0;padding:0;box-sizing:border-box}
    html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    body{font-family:'DM Sans',Arial,sans-serif;background:#faf8f4;color:#1a1040;font-size:13.5px;line-height:1.65;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .pb-cover{background:linear-gradient(145deg,${d.coverGradient[0]},${d.coverGradient[1]});color:#fff;padding:60px 52px 52px;position:relative;overflow:hidden;min-height:260px}
    .pb-cover::before{content:'';position:absolute;right:52px;top:40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06)}
    .pb-cover::after{content:'';position:absolute;left:-40px;bottom:-40px;width:260px;height:260px;border-radius:50%;border:1px solid rgba(255,255,255,.08)}
    .pb-cover-pre{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:14px;font-weight:500;position:relative;z-index:1}
    .pb-cover h1{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:500;line-height:1.05;margin-bottom:12px;color:#fff;position:relative;z-index:1}
    .pb-cover h1 em{font-style:italic;opacity:.75}
    .pb-cover-tagline{font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;color:rgba(255,255,255,.7);margin-bottom:24px;position:relative;z-index:1}
    .pb-cover-badges{display:flex;gap:10px;flex-wrap:wrap;position:relative;z-index:1}
    .pb-badge{padding:4px 14px;border-radius:40px;font-size:9.5px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.8)}
    .pb-cover-logo{position:absolute;bottom:24px;right:52px;font-family:'Cormorant Garamond',serif;font-size:12px;color:rgba(255,255,255,.3);letter-spacing:.08em}
    .pb-wrap{max-width:760px;margin:0 auto;padding:0 32px 60px}
    .pb-sec{margin-top:40px;break-inside:avoid-page;page-break-inside:avoid}
    .pb-sec:first-of-type{margin-top:36px}
    .pb-sec-hdr{display:flex;align-items:center;gap:12px;margin-bottom:18px;padding-bottom:12px;border-bottom:2px solid ${d.accent}}
    .pb-sec-icon{width:28px;height:28px;border-radius:50%;background:${d.accent};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0}
    .pb-sec-hdr h2{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:#1a1040}
    .pb-intro{background:${d.accentLight};border-left:4px solid ${d.accent};border-radius:0 10px 10px 0;padding:18px 22px}
    .pb-intro p{font-size:13.5px;color:#1a1040;line-height:1.8}
    .pb-intro p+p{margin-top:10px}
    .pb-strengths{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .pb-strength{background:#fff;border:1px solid #ddd8cf;border-radius:10px;padding:16px 15px;break-inside:avoid;page-break-inside:avoid}
    .pb-strength .icn{font-size:18px;margin-bottom:8px;display:block}
    .pb-strength h4{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:600;margin-bottom:5px;color:#1a1040}
    .pb-strength p{font-size:11.5px;color:#4a3f6b;line-height:1.55}
    .pb-careers{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #ddd8cf}
    .pb-careers th{background:#1a1040;color:#fff;padding:10px 14px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
    .pb-careers td{padding:11px 14px;border-bottom:1px solid #ddd8cf;font-size:12.5px;vertical-align:top}
    .pb-careers tr:last-child td{border-bottom:none}
    .pb-earn{display:inline-block;background:${d.accentLight};color:${d.accent};border-radius:4px;padding:2px 8px;font-size:10px;font-weight:500;margin-top:3px}
    .pb-learn-item{display:flex;gap:16px;margin-bottom:18px;break-inside:avoid;page-break-inside:avoid}
    .pb-learn-num{width:32px;height:32px;border-radius:50%;background:${d.accent};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;margin-top:2px}
    .pb-learn-content h4{font-weight:500;font-size:13.5px;color:#1a1040;margin-bottom:4px}
    .pb-learn-content p{font-size:12px;color:#4a3f6b;line-height:1.6;margin-bottom:6px}
    .pb-chips{display:flex;flex-wrap:wrap;gap:6px}
    .pb-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:40px;font-size:10.5px;font-weight:500;border:1px solid #ddd8cf;color:#4a3f6b;background:#fff}
    .pb-chip.free{border-color:${d.accent}55;color:${d.accent};background:${d.accentLight}}
    .pb-tools{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .pb-tool{background:#fff;border:1px solid #ddd8cf;border-radius:10px;padding:14px 15px;display:flex;gap:12px;align-items:flex-start;break-inside:avoid;page-break-inside:avoid}
    .pb-tool-icon{width:32px;height:32px;border-radius:8px;background:${d.accentLight};display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
    .pb-tool h4{font-size:12.5px;font-weight:500;color:#1a1040;margin-bottom:3px}
    .pb-tool p{font-size:11px;color:#4a3f6b;line-height:1.5}
    .pb-tool-tier{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:1px 7px;border-radius:4px;margin-top:4px}
    .pb-tool-tier.free{color:${d.accent};background:${d.accentLight}}
    .pb-tool-tier.paid{color:#c94f2a;background:#fdf0ea}
    .pb-incomes{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .pb-income{background:#fff;border:1px solid #ddd8cf;border-radius:10px;padding:16px;border-top:3px solid ${d.accent};break-inside:avoid;page-break-inside:avoid}
    .pb-income h4{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:#1a1040;margin-bottom:6px}
    .pb-income .rng{font-size:16px;font-weight:600;font-family:'Cormorant Garamond',serif;margin-bottom:6px;color:${d.accent}}
    .pb-income p{font-size:11.5px;color:#4a3f6b;line-height:1.55}
    .pb-income ul{list-style:none;margin-top:6px}
    .pb-income ul li{font-size:11px;color:#4a3f6b;padding:2px 0 2px 12px;position:relative}
    .pb-income ul li::before{content:'▸';position:absolute;left:0;color:${d.accent};font-size:10px}
    .pb-case{background:#1a1040;color:#fff;border-radius:12px;padding:24px 26px;margin-bottom:10px;break-inside:avoid;page-break-inside:avoid}
    .pb-case-lbl{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#e8a020;font-weight:500;margin-bottom:10px}
    .pb-case blockquote{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;line-height:1.6;color:rgba(255,255,255,.88);margin-bottom:14px;border-left:3px solid ${d.accent};padding-left:16px}
    .pb-case-meta{font-size:11px;color:rgba(255,255,255,.45)}
    .pb-case-stats{display:flex;gap:20px;margin-top:14px;flex-wrap:wrap}
    .pb-case-stat{text-align:center;flex:1;min-width:80px}
    .pb-case-stat .val{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#e8a020;display:block}
    .pb-case-stat .lbl{font-size:9.5px;color:rgba(255,255,255,.45);letter-spacing:.06em;text-transform:uppercase}
    .pb-traps{display:flex;flex-direction:column;gap:10px}
    .pb-trap{background:#fff;border:1px solid #ddd8cf;border-left:4px solid #c94f2a;border-radius:0 10px 10px 0;padding:14px 16px;break-inside:avoid;page-break-inside:avoid}
    .pb-trap h4{font-size:13px;font-weight:500;color:#c94f2a;margin-bottom:4px}
    .pb-trap p{font-size:12px;color:#4a3f6b;line-height:1.55}
    .pb-trap-fix{margin-top:6px;font-size:11.5px;font-weight:500;color:${d.accent}}
    .pb-plan{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .pb-week{background:#fff;border:1px solid #ddd8cf;border-radius:10px;overflow:hidden;break-inside:avoid;page-break-inside:avoid}
    .pb-week-head{background:${d.accent};color:#fff;padding:10px 14px}
    .pb-week-head h4{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:500}
    .pb-week-head p{font-size:10px;opacity:.75;margin-top:2px}
    .pb-week-body{padding:12px 14px}
    .pb-week-body ul{list-style:none}
    .pb-week-body ul li{font-size:11.5px;color:#4a3f6b;padding:4px 0 4px 12px;position:relative;border-bottom:1px solid #ddd8cf;line-height:1.45}
    .pb-week-body ul li:last-child{border-bottom:none}
    .pb-week-body ul li::before{content:'▸';position:absolute;left:0;color:${d.accent};font-size:.6rem;top:6px}
    .pb-cta-strip{background:${d.ctaBg};border-radius:12px;padding:22px 28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px}
    .pb-cta-strip .lbl{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:500;margin-bottom:6px}
    .pb-cta-strip .title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;color:#fff;line-height:1.2}
    .pb-cta-strip a{display:inline-flex;align-items:center;gap:8px;background:#fff;color:${d.ctaText};font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;padding:12px 24px;border-radius:40px;text-decoration:none;white-space:nowrap;flex-shrink:0}
    .pb-foot{background:#1a1040;color:rgba(255,255,255,.4);padding:18px 52px;display:flex;justify-content:space-between;align-items:center;font-size:9.5px;gap:16px;flex-wrap:wrap}
    .pb-foot strong{color:rgba(255,255,255,.75);font-family:'Cormorant Garamond',serif;font-size:12px}
    @media(max-width:760px){
      .pb-cover{padding:40px 24px 36px}
      .pb-cover h1{font-size:34px}
      .pb-cover-logo{display:none}
      .pb-wrap{padding:0 16px 40px}
      .pb-strengths{grid-template-columns:1fr}
      .pb-tools{grid-template-columns:1fr}
      .pb-incomes{grid-template-columns:1fr}
      .pb-plan{grid-template-columns:1fr}
      .pb-foot{padding:18px 24px}
    }
  `;
}

function renderPlaybookBody(d: PlaybookData): string {
  return `
    <div class="pb-cover">
      <div class="pb-cover-pre">Your Personal AI Guide · Archetype ${d.romanNumeral}</div>
      <h1>${escapeHtml(d.archetypeWord.before)}${d.archetypeWord.before ? '<br>' : ''}<em>${escapeHtml(d.archetypeWord.emphasis)}</em>${d.archetypeWord.after ? ' ' + escapeHtml(d.archetypeWord.after) : ''}</h1>
      <div class="pb-cover-tagline">${escapeHtml(d.tagline)}</div>
      <div class="pb-cover-badges">
        <span class="pb-badge">Deep Dive</span>
        <span class="pb-badge">30-Day Plan</span>
        <span class="pb-badge">Income Streams</span>
        <span class="pb-badge">Case Studies</span>
      </div>
      <div class="pb-cover-logo">${escapeHtml(SITE_DISPLAY)}</div>
    </div>

    <div class="pb-wrap">

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">1</div><h2>Who you are — deep dive</h2></div>
        <div class="pb-intro">${d.introParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">2</div><h2>Your 6 natural strengths — and why they matter now</h2></div>
        <div class="pb-strengths">${d.strengths.map(s => `
          <div class="pb-strength"><span class="icn">${s.icon}</span><h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.desc)}</p></div>
        `).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">3</div><h2>AI career paths built for you</h2></div>
        <table class="pb-careers">
          <thead><tr><th>Career Path</th><th>What you do</th><th>Earning range</th></tr></thead>
          <tbody>${d.careers.map(c => `
            <tr><td><strong>${escapeHtml(c.title)}</strong></td><td>${escapeHtml(c.desc)}</td><td><span class="pb-earn">${escapeHtml(c.earn)}</span></td></tr>
          `).join('')}</tbody>
        </table>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">4</div><h2>Your step-by-step learning path</h2></div>
        ${d.learning.map((l, i) => `
          <div class="pb-learn-item">
            <div class="pb-learn-num">${i + 1}</div>
            <div class="pb-learn-content">
              <h4>${escapeHtml(l.week)} — ${escapeHtml(l.title)}</h4>
              <p>${escapeHtml(l.desc)}</p>
              <div class="pb-chips">${l.chips.map(ch => `<span class="pb-chip${ch.free ? ' free' : ''}">${escapeHtml(ch.label)}</span>`).join('')}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">5</div><h2>Your AI natural tools — full breakdown</h2></div>
        <div class="pb-tools">${d.tools.map(t => `
          <div class="pb-tool"><div class="pb-tool-icon">${t.icon}</div><div><h4>${escapeHtml(t.name)}</h4><p>${escapeHtml(t.desc)}</p><span class="pb-tool-tier ${t.tier}">${t.tier === 'free' ? 'Free tier available' : 'Paid tier'}</span></div></div>
        `).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">6</div><h2>How you make money with AI — income streams</h2></div>
        <div class="pb-incomes">${d.incomes.map(i => `
          <div class="pb-income"><h4>${escapeHtml(i.title)}</h4><div class="rng">${escapeHtml(i.range)}</div><p>${escapeHtml(i.desc)}</p><ul>${i.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul></div>
        `).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">7</div><h2>Real-world case studies — people like you</h2></div>
        ${d.cases.map(c => `
          <div class="pb-case">
            <div class="pb-case-lbl">${escapeHtml(c.label)}</div>
            <blockquote>${escapeHtml(c.quote)}</blockquote>
            <div class="pb-case-meta">${escapeHtml(c.meta)}</div>
            <div class="pb-case-stats">${c.stats.map(s => `<div class="pb-case-stat"><span class="val">${escapeHtml(s.val)}</span><span class="lbl">${escapeHtml(s.lbl)}</span></div>`).join('')}</div>
          </div>
        `).join('')}
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">8</div><h2>Common traps — and how to avoid them</h2></div>
        <div class="pb-traps">${d.traps.map(t => `
          <div class="pb-trap"><h4>${escapeHtml(t.title)}</h4><p>${escapeHtml(t.desc)}</p><div class="pb-trap-fix"><strong>Fix:</strong> ${escapeHtml(t.fix)}</div></div>
        `).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-sec-hdr"><div class="pb-sec-icon">9</div><h2>Your 30-day action plan</h2></div>
        <div class="pb-plan">${d.plan.map(w => `
          <div class="pb-week"><div class="pb-week-head"><h4>${escapeHtml(w.week)}</h4><p>${escapeHtml(w.sub)}</p></div><div class="pb-week-body"><ul>${w.tasks.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div></div>
        `).join('')}</div>
      </div>

      <div class="pb-sec">
        <div class="pb-cta-strip">
          <div>
            <div class="lbl">Ready to go deeper?</div>
            <div class="title">Get hands-on support, live sessions &amp; your full community inside.</div>
          </div>
          <a href="/resources">Explore all resources →</a>
        </div>
      </div>

    </div>

    <div class="pb-foot">
      <div><strong>${escapeHtml(SITE_DISPLAY)}</strong><br>${escapeHtml(d.footerTagline)}</div>
      <div style="text-align:right;opacity:.7">Your gift already exists.<br>AI is the amplifier.</div>
    </div>
  `;
}


export function buildPlaybookPageMarkup({ archetype }: PlaybookRenderOptions): string {
  const data = PLAYBOOK_DATA[archetype.key];
  return `<style>${renderPlaybookStyles(data)}</style>${renderPlaybookBody(data)}`;
}
