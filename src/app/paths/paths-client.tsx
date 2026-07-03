'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE_DISPLAY } from '@/lib/site';
import { useEmailGate } from '@/lib/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import './paths.css';
type CategoryKey = 'creative' | 'human' | 'business' | 'technical' | 'niche';

type Path = {
  num: string;
  title: string;
  upskill: string[];
  tools: string[];
  monetise: string[];
};

type Category = {
  key: CategoryKey;
  num: number;
  label: string;
  range: string;
  paths: Path[];
};

const CATEGORIES: Category[] = [
  {
    key: 'creative',
    num: 1,
    label: 'Creative & Content',
    range: 'Paths 01–10',
    paths: [
      { num: '01', title: 'AI Music Creator', upskill: ['Learn Suno & Udio prompt engineering', 'Study song structure & genre vocabulary', 'Practice ElevenLabs for vocal styling'], tools: ['Suno', 'Udio', 'ElevenLabs', 'Soundraw', 'Beatoven'], monetise: ['Sell tracks on AudioJungle & Pond5', 'License music for content creators', 'Custom song commissions', 'Sync licensing for ads & film'] },
      { num: '02', title: 'AI Filmmaker', upskill: ['Master Runway Gen-3 & Kling prompting', 'Learn cinematic language & shot types', 'Study CapCut AI for post-production'], tools: ['Runway', 'Kling', 'Pika', 'CapCut', 'Sora'], monetise: ['Short film licensing & festival submission', 'Brand video production services', 'YouTube channel ad revenue', 'Client storytelling retainers'] },
      { num: '03', title: 'AI Visual Artist', upskill: ['Master Midjourney parameters & styles', 'Learn composition & colour theory basics', 'Study Adobe Firefly for commercial work'], tools: ['Midjourney', 'Adobe Firefly', 'DALL-E 3', 'Ideogram'], monetise: ['Sell prints on Society6 & Redbubble', 'Commission-based digital art', 'NFT collections & digital galleries', 'Brand identity & campaign visuals'] },
      { num: '04', title: 'AI Author / Ghostwriter', upskill: ['Learn Claude & ChatGPT for long-form', 'Study book structure & narrative arc', 'Practice editing AI drafts in your voice'], tools: ['Claude', 'Sudowrite', 'Atticus', 'Canva'], monetise: ['Ghostwriting for executives & founders', 'Self-publish on Amazon KDP', 'Paid newsletters & Substack', 'Book coaching programmes'] },
      { num: '05', title: 'AI Podcast Producer', upskill: ['Learn Descript AI editing workflow', 'Study Opus Clip for clip repurposing', 'Practice RSS distribution & SEO'], tools: ['Descript', 'Riverside', 'Opus Clip', 'Podcastle'], monetise: ['Podcast production agency', 'Sponsorships & host-read ads', 'Premium member-only episodes', 'Repurposed content packages'] },
      { num: '06', title: 'AI Fashion Designer', upskill: ['Learn Midjourney for concept & collection', 'Study Cala for design-to-manufacture', 'Master CLO 3D for digital garments'], tools: ['Midjourney', 'Cala', 'CLO 3D', 'Adobe Firefly'], monetise: ['Print-on-demand fashion brand', 'Digital fashion for gaming & metaverse', 'Design consultation for emerging brands', 'Styling packages with AI mood boards'] },
      { num: '07', title: 'AI Brand Storyteller', upskill: ['Master Claude for narrative & copy', 'Study brand voice architecture', 'Learn Canva AI for visual storytelling'], tools: ['Claude', 'Copy.ai', 'Jasper', 'Canva'], monetise: ['Brand strategy retainers', 'Website & launch copy packages', 'Email sequence writing', 'Content strategy consulting'] },
      { num: '08', title: 'AI Photography Business', upskill: ['Learn Luminar AI & Lightroom AI', 'Master Photoroom for portraits & products', 'Study Adobe Firefly for composites'], tools: ['Luminar AI', 'Photoroom', 'Adobe Firefly', 'Canva'], monetise: ['AI headshot packages for professionals', 'Commercial photography retouching', 'Stock photo creation & licensing', 'Real estate & product photography'] },
      { num: '09', title: 'AI Scriptwriter', upskill: ['Study screenwriting structure & format', 'Master Claude for dialogue & scene writing', 'Learn platform-specific script formats'], tools: ['Claude', 'ChatGPT', 'Sudowrite', 'Final Draft'], monetise: ['YouTube & ad script packages', 'Short film & web series scripts', 'Corporate video scriptwriting', 'UGC script writing for creators'] },
      { num: '10', title: 'AI Travel Documentarian', upskill: ['Master CapCut AI for travel editing', 'Learn Runway for cinematic enhancement', 'Study travel content SEO & distribution'], tools: ['CapCut', 'Runway', 'ElevenLabs', 'Claude'], monetise: ['YouTube monetisation & brand deals', 'Tourism board collaborations', 'Documentary licensing to streaming', 'Travel writing & media licensing'] },
    ],
  },
  {
    key: 'human',
    num: 2,
    label: 'Human & Community',
    range: 'Paths 11–20',
    paths: [
      { num: '11', title: 'AI Life Coach (Augmented)', upskill: ['ICF accredited coaching fundamentals', 'Learn Claude for session prep & notes', 'Study Notion AI for client management'], tools: ['Claude', 'Notion AI', 'Loom AI', 'Calendly'], monetise: ['1:1 coaching packages ($1k–$5k)', 'Group coaching programmes', 'Digital courses & playbooks', 'Corporate wellbeing workshops'] },
      { num: '12', title: 'AI Wellness Creator', upskill: ['Study mindset & behaviour change science', 'Learn HeyGen for wellness content', 'Master short-form for health niche'], tools: ['HeyGen', 'CapCut', 'Claude', 'Canva'], monetise: ['Membership community', 'Affiliate revenue from wellness tools', 'Sponsored content partnerships', 'Digital journals & programmes'] },
      { num: '13', title: 'AI Relationship Coach', upskill: ['Study attachment theory & communication', 'Learn Claude for conflict script prep', 'Build content niche in relationship AI'], tools: ['Claude', 'Canva', 'Beehiiv', 'Circle'], monetise: ['Couples coaching intensives', 'Communication framework courses', 'Content monetisation & brand deals', 'Speaking at HR & wellness events'] },
      { num: '14', title: 'AI Community Architect', upskill: ['Study community management & retention', 'Learn Circle & Skool platform mechanics', 'Master Beehiiv for community newsletters'], tools: ['Circle', 'Skool', 'Beehiiv', 'Claude'], monetise: ['Paid community membership', 'Community-as-a-service for brands', 'Event facilitation & cohorts', 'Sponsorships within community'] },
      { num: '15', title: 'AI Career Coach', upskill: ['Study labour market & AI skills shifts', 'Learn Claude for CV & interview prep', 'Master the identity-rebuild framework'], tools: ['Claude', 'Notion AI', 'Canva', 'LinkedIn'], monetise: ['Career transition coaching packages', 'Resume & LinkedIn optimisation', 'Corporate outplacement contracts', 'Group job-search programmes'] },
      { num: '16', title: 'AI Educator / Course Creator', upskill: ['Learn instructional design basics', 'Master Teachable or Kajabi workflows', 'Study Claude for curriculum building'], tools: ['Teachable', 'Kajabi', 'Synthesia', 'Claude'], monetise: ['Self-paced online courses', 'Live cohort programmes', 'Corporate L&D partnerships', 'Certification & accreditation fees'] },
      { num: '17', title: 'AI Youth Trainer', upskill: ['Study youth psychology & engagement', 'Learn gamified AI tools for young learners', 'Build school partnership pipeline'], tools: ['Canva', 'Claude', 'Kahoot AI', 'Synthesia'], monetise: ['School & college workshops', 'After-school programme licensing', 'Parent & family digital literacy', 'NGO & grant-funded programmes'] },
      { num: '18', title: 'AI Therapist Support', upskill: ['Understand AI ethics in mental health', 'Learn documentation & note automation', 'Study psycho-education content creation'], tools: ['Claude', 'Notion AI', 'Loom AI', 'Canva'], monetise: ['Augmented therapy practice', 'Psycho-education content & courses', 'Employee mental health contracts', 'Supervision & CPD programmes'] },
      { num: '19', title: 'AI Spiritual Creator', upskill: ['Develop a distinct spiritual framework', 'Learn HeyGen for meditative content', 'Study audio production for meditation'], tools: ['HeyGen', 'ElevenLabs', 'Suno', 'Canva'], monetise: ['Paid meditation & ritual programmes', 'Retreat facilitation & curation', 'Membership community & app', 'Sponsored content & brand deals'] },
      { num: '20', title: 'AI Parent Empowerment', upskill: ['Study child development & parenting science', 'Learn short-form content for parent niche', 'Build email list with lead magnets'], tools: ['Claude', 'Canva', 'Beehiiv', 'CapCut'], monetise: ['Parenting courses & memberships', 'Affiliate income from family tools', 'Brand partnerships & sponsorships', '1:1 parent coaching packages'] },
    ],
  },
  {
    key: 'business',
    num: 3,
    label: 'Business & Growth',
    range: 'Paths 21–30',
    paths: [
      { num: '21', title: 'AI Solopreneur', upskill: ['Map your AI tool stack to your business model', 'Study Make.com for workflow automation', 'Learn Stripe & Gumroad for sales'], tools: ['Make.com', 'Claude', 'Canva', 'Stripe'], monetise: ['Digital products & courses', 'Service packages & retainers', 'Affiliate income from tools used', 'Licensing your systems to others'] },
      { num: '22', title: 'AI Sales Specialist', upskill: ['Master Apollo.io prospect research', 'Learn Instantly for email sequences', 'Study Clay for hyper-personalisation'], tools: ['Apollo.io', 'Instantly', 'Clay', 'HubSpot AI'], monetise: ['Fractional sales director roles', 'Commission-based outreach retainers', 'Sales system builds for startups', 'Training sales teams on AI tools'] },
      { num: '23', title: 'AI Marketing Strategist', upskill: ['Learn AI-powered campaign analysis', 'Study Perplexity for market intelligence', 'Master multi-channel content strategy'], tools: ['Perplexity', 'Claude', 'Semrush AI', 'Canva'], monetise: ['Fractional CMO contracts', 'Marketing audit packages', 'Consulting retainers', 'AI marketing training for teams'] },
      { num: '24', title: 'AI Cold Outreach Expert', upskill: ['Study deliverability & inbox placement', 'Learn personalisation at scale with Clay', 'Master A/B testing email sequences'], tools: ['Instantly', 'Clay', 'Apollo.io', 'Lemlist'], monetise: ['Lead generation agency', 'Pay-per-meeting performance model', 'Outreach system setup packages', 'Ongoing management retainers'] },
      { num: '25', title: 'AI Brand Consultant', upskill: ['Study brand strategy & positioning', 'Learn AI-assisted competitor analysis', 'Master visual identity with AI tools'], tools: ['Claude', 'Looka', 'Canva', 'Perplexity'], monetise: ['Brand strategy packages ($2k–$10k)', 'Fractional brand director roles', 'Startup brand launch sprints', 'Ongoing brand guardianship'] },
      { num: '26', title: 'AI Pitch Deck Specialist', upskill: ['Study VC pitch structure & storytelling', 'Master Gamma & Beautiful.ai', 'Learn financial narrative writing'], tools: ['Gamma', 'Beautiful.ai', 'Claude', 'Canva'], monetise: ['Per-deck project fees ($1k–$5k)', 'Startup accelerator partnerships', 'Pitch coaching packages', 'Template products & marketplace'] },
      { num: '27', title: 'AI E-commerce Operator', upskill: ['Learn Shopify AI & product description', 'Study AI-powered ad creative', 'Master print-on-demand fulfilment'], tools: ['Shopify AI', 'Midjourney', 'Printful', 'ChatGPT'], monetise: ['Product sales & dropshipping', 'Print-on-demand brand', 'E-commerce consulting', 'AI store builds for clients'] },
      { num: '28', title: 'AI Social Media Manager', upskill: ['Master Buffer AI & scheduling tools', 'Learn platform-specific AI features', 'Study analytics & content optimisation'], tools: ['Buffer', 'Opus Clip', 'CapCut', 'Claude'], monetise: ['Monthly retainer per client', 'Content packages for founders', 'Agency model with sub-contractors', 'Social media courses & templates'] },
      { num: '29', title: 'AI Growth Strategist', upskill: ['Study growth loops & funnel architecture', 'Learn AI analytics & experimentation', 'Master paid acquisition with AI creative'], tools: ['Perplexity', 'Apollo.io', 'Make.com', 'Claude'], monetise: ['Equity + advisory roles at startups', 'Fractional growth director', 'Consulting sprints & audits', 'Training programmes for teams'] },
      { num: '30', title: 'AI Business Coach', upskill: ['Get business coaching certification', 'Learn AI-powered business diagnostics', 'Build frameworks for AI-era business'], tools: ['Claude', 'Notion AI', 'Gamma', 'Calendly'], monetise: ['High-ticket 1:1 coaching ($3k–$15k)', 'Group mastermind programmes', 'Online business courses', 'Corporate leadership training'] },
    ],
  },
  {
    key: 'technical',
    num: 4,
    label: 'Technical & Systems',
    range: 'Paths 31–40',
    paths: [
      { num: '31', title: 'AI Automation Consultant', upskill: ['Complete Make.com & Zapier certifications', 'Learn API basics & webhook logic', 'Study common business workflow pain points'], tools: ['Make.com', 'Zapier', 'n8n', 'Airtable'], monetise: ['Workflow build packages ($1k–$8k)', 'Monthly maintenance retainers', 'Automation audits for SMEs', 'White-label builds for agencies'] },
      { num: '32', title: 'AI Workflow Architect', upskill: ['Map end-to-end business processes', 'Learn system design & documentation', 'Study change management for AI rollout'], tools: ['Make.com', 'Notion AI', 'Miro', 'Claude'], monetise: ['Enterprise AI implementation', 'SOP & playbook creation', 'Fractional COO contracts', 'Team training on new systems'] },
      { num: '33', title: 'AI Prompt Engineer', upskill: ['Study prompt engineering techniques', 'Learn Claude & GPT-4 model behaviour', 'Build a library of tested prompt systems'], tools: ['Claude', 'ChatGPT', 'PromptBase', 'Notion'], monetise: ['Sell prompts on PromptBase', 'Custom GPT builds for businesses', 'Prompt auditing & optimisation', 'Training teams on effective prompting'] },
      { num: '34', title: 'AI Tool Educator', upskill: ['Test & document new AI tools weekly', 'Build YouTube & newsletter audience', 'Learn affiliate marketing for tools'], tools: ['Loom', 'Beehiiv', 'CapCut', 'Notion'], monetise: ['Affiliate income from tools reviewed', 'Sponsored tool tutorials', 'Premium review newsletter', 'Consulting from tool expertise'] },
      { num: '35', title: 'AI Research Analyst', upskill: ['Master Perplexity & NotebookLM', 'Study data synthesis & report writing', 'Learn citation management & accuracy'], tools: ['Perplexity', 'NotebookLM', 'Claude', 'Consensus'], monetise: ['Research retainers for executives', 'Market research reports', 'Academic support services', 'Intelligence briefings for investors'] },
      { num: '36', title: 'AI Data Storyteller', upskill: ['Learn Tableau AI & data visualisation', 'Study narrative writing for data', 'Master Claude for insight interpretation'], tools: ['Tableau AI', 'Claude', 'Canva', 'Perplexity'], monetise: ['Data storytelling for corporates', 'Annual report & dashboard creation', 'Investor presentation packages', 'Journalism & media analytics'] },
      { num: '37', title: 'AI Customer Service Architect', upskill: ['Learn chatbot design & conversation flow', 'Study Intercom AI & Zendesk AI', 'Master knowledge base architecture'], tools: ['Intercom AI', 'Zendesk AI', 'Voiceflow', 'Make.com'], monetise: ['AI chatbot builds for SMEs', 'CS automation audits', 'Ongoing optimisation retainers', 'White-label builds for agencies'] },
      { num: '38', title: 'AI No-Code SaaS Builder', upskill: ['Master Bubble or Glide for app building', 'Learn Supabase for AI-powered backends', 'Study product design & user experience'], tools: ['Bubble', 'Glide', 'Supabase', 'Make.com'], monetise: ['SaaS subscription revenue', 'App builds for clients ($5k–$30k)', 'Maintenance & feature retainers', 'Template marketplace products'] },
      { num: '39', title: 'AI SEO Specialist', upskill: ['Master Semrush AI & Ahrefs', 'Learn AI content optimisation strategy', 'Study technical SEO fundamentals'], tools: ['Semrush AI', 'Ahrefs', 'Claude', 'SurferSEO'], monetise: ['Monthly SEO retainers', 'Site audit packages', 'Content strategy for brands', 'Training courses for marketing teams'] },
      { num: '40', title: 'AI Newsletter Operator', upskill: ['Master Beehiiv growth mechanics', 'Learn newsletter monetisation models', 'Study AI-assisted content curation'], tools: ['Beehiiv', 'Claude', 'Perplexity', 'Canva'], monetise: ['Paid subscriptions & tiers', 'Sponsored newsletters', 'Affiliate income from recommendations', 'Build-to-sell newsletter assets'] },
    ],
  },
  {
    key: 'niche',
    num: 5,
    label: 'Niche & Specialist',
    range: 'Paths 41–50',
    paths: [
      { num: '41', title: 'AI Food Creator', upskill: ['Learn CapCut for food video editing', 'Study Claude for recipe development', 'Master Canva AI for cookbook design'], tools: ['CapCut', 'Claude', 'Canva', 'Shopify AI'], monetise: ['AI cookbook publishing', 'Meal prep subscription service', 'Food brand sponsorships', 'Cooking courses & workshops'] },
      { num: '42', title: 'AI Beauty Creator', upskill: ['Learn AI for beauty concept visualisation', 'Study colour theory & skincare science', 'Master short-form beauty content'], tools: ['Midjourney', 'CapCut', 'Canva', 'Adobe Firefly'], monetise: ['Brand ambassador deals', 'AI-generated look books & guides', 'Beauty consulting for brands', 'Affiliate income from beauty products'] },
      { num: '43', title: 'AI Real Estate Creator', upskill: ['Learn AI staging & property visualisation', 'Master Matterport & virtual tour tools', 'Study real estate content strategy'], tools: ['Midjourney', 'Matterport', 'Claude', 'Canva'], monetise: ['Virtual staging services for agents', 'Property marketing packages', 'Real estate education content', 'Market report publications'] },
      { num: '44', title: 'AI Financial Literacy Creator', upskill: ['Study personal finance & investing basics', 'Learn AI tools for financial modelling', 'Build compliant content creation systems'], tools: ['Claude', 'Perplexity', 'Canva', 'Beehiiv'], monetise: ['Financial education courses', 'Affiliate income from fintech tools', 'Paid community & membership', 'Sponsored newsletter partnerships'] },
      { num: '45', title: 'AI Interior Design Visualiser', upskill: ['Master Midjourney for interior rendering', 'Learn RoomGPT for instant visualisation', 'Study space planning & mood boards'], tools: ['Midjourney', 'RoomGPT', 'Canva', 'Adobe Firefly'], monetise: ['Virtual interior design packages', 'Mood board creation for developers', 'AI staging for real estate', 'Before/after transformation content'] },
      { num: '46', title: 'AI Language Specialist', upskill: ['Master DeepL & translation AI tools', 'Study cultural localisation & nuance', 'Learn multilingual content strategy'], tools: ['DeepL', 'Claude', 'ElevenLabs', 'HeyGen'], monetise: ['Translation & localisation packages', 'Multilingual content agencies', 'Language learning course creation', 'Cultural consulting for global brands'] },
      { num: '47', title: 'AI Sports Analyst', upskill: ['Study sports analytics & performance data', 'Learn AI video analysis tools', 'Build sports content niche audience'], tools: ['Perplexity', 'Claude', 'Tableau AI', 'CapCut'], monetise: ['Team & academy analytics contracts', 'Sports media & broadcast consulting', 'Athlete performance reports', 'Sports prediction content'] },
      { num: '48', title: 'AI Legal Document Specialist', upskill: ['Study contract law fundamentals', 'Learn Harvey AI & legal AI tools', 'Build compliance & template library'], tools: ['Harvey AI', 'Claude', 'Notion AI', 'Clio'], monetise: ['Document template marketplace', 'Legal support for startups', 'Compliance consulting for SMEs', 'Paralegal automation packages'] },
      { num: '49', title: 'AI Healthcare Creator', upskill: ['Study health communication ethics', 'Learn AI tools for medical content', 'Build compliant content frameworks'], tools: ['Claude', 'Perplexity', 'Canva', 'Synthesia'], monetise: ['Patient education content for clinics', 'Health brand content partnerships', 'Medical education courses', 'Healthcare communication consulting'] },
      { num: '50', title: 'AI Corporate Trainer', upskill: ['Build archetype-based AI training framework', 'Learn facilitation & workshop design', 'Study organisational psychology basics'], tools: ['Claude', 'Gamma', 'Synthesia', 'Miro'], monetise: ['Half-day & full-day workshops ($2k–$10k)', 'Ongoing L&D retainers', 'Train-the-trainer licences', 'Keynote speaking fees'] },
    ],
  },
];

const FILTER_BUTTONS: { key: CategoryKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All paths' },
  { key: 'creative', label: 'Creative & Content' },
  { key: 'human', label: 'Human & Community' },
  { key: 'business', label: 'Business & Growth' },
  { key: 'technical', label: 'Technical & Systems' },
  { key: 'niche', label: 'Niche & Specialist' },
];

export default function PathsClient() {
  const [filter, setFilter] = useState<CategoryKey | 'all'>('all');
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('paths');

  function toggle(num: string) {
    setOpenCards(prev => ({ ...prev, [num]: !prev[num] }));
  }

  return (
    <>
      {/* ── Nothing rendered until mount resolves gate phase ── */}
      {gatePhase === null && null}

      <EmailGateOverlay
        gatePhase={gatePhase}
        title="50 AI Career Paths"
        description="Enter your details below to unlock the full directory — and get notified when new free resources drop."
        gateName={gateName}
        setGateName={setGateName}
        gateEmail={gateEmail}
        setGateEmail={setGateEmail}
        gateType={gateType}
        setGateType={setGateType}
        gateError={gateError}
        gateSubmitting={gateSubmitting}
        onSubmit={handleGateSubmit}
      />

      {/* ── Main content (visible only after gate) ── */}
      {gatePhase === 'content' && (
      <div className="paths-root">
        <div className="paths-cover">
          <div className="paths-eye">YOUR HUMAN EDGE IN THE AI ERA · FREE GUIDE</div>
          <h1>50 AI Career Paths<br />for Different Personalities</h1>
          <p className="sub">Every path. Every tool. Every income stream. Built for the person who already has the gift — and just needs to know which corner of AI was made for it.</p>
          <div className="paths-cta-row">
            <Link href="/quiz" className="paths-btn-1">Find your extended Career Path →</Link>
          </div>
          <div className="paths-cover-logo">{SITE_DISPLAY}</div>
        </div>

        <div className="paths-filter-bar">
          {FILTER_BUTTONS.map(b => (
            <button
              key={b.key}
              type="button"
              className={`paths-filter-btn${filter === b.key ? ' active' : ''}`}
              onClick={() => setFilter(b.key)}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="paths-body">
          {CATEGORIES.filter(c => filter === 'all' || filter === c.key).map(cat => (
            <div key={cat.key}>
              <div className="paths-sec-hdr">
                <div className="paths-snum">{cat.num}</div>
                <h2>{cat.label}</h2>
                <span className="cnt">{cat.range}</span>
              </div>
              <div className="paths-grid">
                {cat.paths.map(p => {
                  const isOpen = !!openCards[p.num];
                  return (
                    <div key={p.num} className={`paths-card${isOpen ? ' open' : ''}`}>
                      <button type="button" className="paths-card-head" onClick={() => toggle(p.num)} aria-expanded={isOpen} aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${p.title} details`}>
                        <span className="paths-card-num">{p.num}</span>
                        <span className="paths-card-name">{p.title}</span>
                        <span className="paths-card-toggle">▼</span>
                      </button>
                      {isOpen && (
                        <div className="paths-card-body">
                          <span className="paths-lbl up">Upskill</span>
                          <ul>{p.upskill.map((u, i) => <li key={i}>{u}</li>)}</ul>
                          <span className="paths-lbl tools">Tools</span>
                          <div className="chip-row">
                            {p.tools.map((t, i) => <span key={i} className="chip">{t}</span>)}
                          </div>
                          <span className="paths-lbl money">Monetise</span>
                          <ul>{p.monetise.map((m, i) => <li key={i}>{m}</li>)}</ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="paths-section-cta">
                <Link href="/quiz" className="paths-btn-sc2">Find your extended Career Path →</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="paths-doc-footer">
          <div>
            <strong>{SITE_DISPLAY}</strong><br />
            Take the archetype quiz · Link in bio
          </div>
          <div className="paths-section-cta">
            <Link href="/quiz" className="paths-btn-sc2">Find your extended Career Path →</Link>
          </div>
            </div>
      </div>
      )}
    </>
  );
}
