import { ARCHETYPES, type ArchetypeKey } from './archetypes';
import { SITE_URL, SITE_DISPLAY } from './site';

const FROM = process.env.EMAIL_FROM || 'Temitope | Your Human Edge <hello@temitopesaliu.com>';

function wrapEmail(content: string, preheader = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Your Human Edge</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#faf8f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1040;-webkit-text-size-adjust:100%}
  .wrap{max-width:600px;margin:0 auto;background:#fff}
  .hdr{background:#1a1040;padding:28px 40px;text-align:center}
  .logo{color:#fff;font-size:14px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;text-decoration:none}
  .logo-dot{color:#d85a30}
  .body{padding:48px 40px}
  .eyebrow{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#9b92b8;margin-bottom:16px}
  h1{font-size:26px;font-weight:600;line-height:1.25;color:#1a1040;margin-bottom:24px}
  h1 em{color:#d85a30;font-style:italic;font-weight:400}
  p{font-size:16px;line-height:1.8;color:#3d3460;margin-bottom:20px}
  p strong{color:#1a1040}
  .callout{background:#f7f4ff;border-left:3px solid #534ab7;padding:20px 24px;margin:28px 0;border-radius:0 8px 8px 0}
  .callout p{font-size:15px;font-style:italic;color:#1a1040;margin:0}
  .badge{display:inline-block;padding:7px 20px;border-radius:40px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:28px}
  .cta-wrap{text-align:center;padding:32px 0 12px}
  .cta-btn{display:inline-block;background:#1a1040;color:#fff !important;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:.07em;padding:17px 40px;border-radius:40px}
  .cta-sub{font-size:13px;color:#9b92b8;margin-top:14px;text-align:center}
  .rule{height:1px;background:#edeaf6;margin:36px 0}
  .sig{font-size:15px;line-height:1.7;color:#3d3460}
  .sig-name{font-weight:700;color:#1a1040;font-size:16px;margin-top:8px;display:block}
  .sig-role{font-size:13px;color:#9b92b8;display:block}
  .ftr{background:#f2ede6;padding:24px 40px;text-align:center}
  .ftr p{font-size:12px;color:#9b92b8;line-height:1.7;margin:0}
  .ftr a{color:#9b92b8}
  @media(max-width:620px){.body{padding:32px 24px}.hdr{padding:20px 24px}.ftr{padding:20px 24px}h1{font-size:22px}}
</style>
</head>
<body>
${preheader ? `<span style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f4;">${preheader}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</span>` : ''}
<div class="wrap">
  <div class="hdr">
    <a class="logo" href="${SITE_URL}">YOUR HUMAN <span class="logo-dot">EDGE</span></a>
  </div>
  <div class="body">
    ${content}
    <div class="rule"></div>
    <div class="sig">
      Keep going,<br>
      <span class="sig-name">Temitope Saliu</span>
      <span class="sig-role">AI × Human Psychology &nbsp;·&nbsp; ${SITE_DISPLAY}</span>
    </div>
  </div>
  <div class="ftr">
    <p>You&apos;re receiving this because you took the AI Archetype Quiz at <a href="${SITE_URL}">${SITE_DISPLAY}</a></p>
  </div>
</div>
</body>
</html>`;
}

export function getDay1Email(name: string, archetype: ArchetypeKey) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `You&apos;re a ${arch.name}. Here&apos;s what that actually means.`;
  const preheader = 'Most people go their whole lives without knowing which side of AI they naturally belong on.';
  const html = wrapEmail(`
    <p class="eyebrow">Day 1 &nbsp;·&nbsp; Your AI Archetype</p>
    <h1>You just discovered something most people <em>never</em> find out.</h1>
    <p>Hey ${firstName},</p>
    <p>Your result is in.</p>
    <p>You&apos;re a <strong>${arch.name} ${arch.emoji}</strong></p>
    <div class="badge" style="background:${arch.color}18;color:${arch.color};border:1px solid ${arch.color}35;">${arch.name} Archetype</div>
    <p><strong>${arch.tagline}</strong></p>
    <p>Let me be direct about what this actually means — because most AI &quot;personality quizzes&quot; tell you what you already know and call it insight. I&apos;m not here for that.</p>
    <div class="callout">
      <p>Being a ${arch.name} means your natural way of operating — the thing you do instinctively — is the exact thing AI needs most right now. Not in a generic &quot;everyone matters&quot; way. In a very specific, monetisable, in-demand way.</p>
    </div>
    <p>The fear most ${arch.name}s carry is ${arch.fear}. That fear is understandable. It&apos;s also wrong.</p>
    <p>Tomorrow I&apos;ll break down the psychology behind why ${arch.name}s thrive in the AI era — and the specific trap that keeps most of you from starting.</p>
  `, preheader);
  return { subject, html };
}

export function getDay2Email(name: string, archetype: ArchetypeKey) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `The psychology of the ${arch.name} (and the trap holding you back)`;
  const preheader = 'Understanding your archetype\'s psychology isn\'t optional. It\'s the entire game.';
  const html = wrapEmail(`
    <p class="eyebrow">Day 2 &nbsp;·&nbsp; The Psychology</p>
    <h1>Why ${arch.name}s are wired differently — and what that costs you <em>without AI.</em></h1>
    <p>Hey ${firstName},</p>
    <p>Yesterday I told you you&apos;re a <strong>${arch.name}</strong>. Today I go deeper.</p>
    <div class="callout">
      <p>&quot;The ${arch.name}&apos;s biggest danger isn&apos;t AI replacing them. It&apos;s overthinking whether AI is aligned with who they are — while someone with less skill but more action runs past them.&quot;</p>
    </div>
    <p>Here&apos;s the reframe that changes everything for ${arch.name}s:</p>
    <div class="callout">
      <p>${arch.reframe}</p>
    </div>
    <p><strong>The practical move for this week:</strong> Start with one tool. <strong>${arch.tool}.</strong></p>
    <p>Your specific entry point: ${arch.useCase}</p>
    <p>Tomorrow: the three career paths that ${arch.name}s are quietly dominating right now. Income ranges included.</p>
  `, preheader);
  return { subject, html };
}

export function getDay3Email(name: string, archetype: ArchetypeKey, playbookCtaUrl: string) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `3 careers the ${arch.name} was built for (${arch.income})`;
  const preheader = 'These aren\'t aspirational. They\'re already happening.';
  const html = wrapEmail(`
    <p class="eyebrow">Day 3 &nbsp;·&nbsp; Career Paths</p>
    <h1>What a <em>${arch.name}</em> actually gets paid for in the AI economy.</h1>
    <p>Hey ${firstName},</p>
    <p><strong>1. ${arch.paths[0]}</strong><br>The companies that survive the AI transition need the human side of adoption done right. ${arch.income}.</p>
    <p><strong>2. ${arch.paths[1]}</strong><br>The person who sits between the technical team and real-world business outcomes — translating, designing, making AI work for real people. ${arch.income}.</p>
    <p><strong>3. ${arch.paths[2]}</strong><br>Clear thinking and judgment applied to AI decisions. Increasingly rare, increasingly paid. ${arch.income}.</p>
    <div class="callout">
      <p>These three are just the surface. Your full AI Career Playbook maps 12 specific paths for the ${arch.name} archetype — with exact skills, income ranges, and a 90-day blueprint.</p>
    </div>
    <div class="cta-wrap">
      <a href="${playbookCtaUrl}" class="cta-btn">Get My ${arch.name} Playbook →</a>
      <p class="cta-sub">$5.99 &nbsp;·&nbsp; Instant access &nbsp;·&nbsp; Yours forever</p>
    </div>
  `, preheader);
  return { subject, html };
}

export function getDay4Email(name: string, archetype: ArchetypeKey, playbookCtaUrl: string) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `Why smart people fail at AI (it&apos;s not about skill)`;
  const preheader = 'The people struggling with AI aren\'t the ones who lack ability.';
  const html = wrapEmail(`
    <p class="eyebrow">Day 4 &nbsp;·&nbsp; The Real Barrier</p>
    <h1>Your biggest competitor isn&apos;t AI. It&apos;s the version of you that <em>refuses to adapt.</em></h1>
    <p>Hey ${firstName},</p>
    <p>The ones who are stuck are almost never stuck because they lack skill. They&apos;re stuck because of one of these three things:</p>
    <p><strong>Identity threat.</strong> When your professional identity is built on specific expertise, anything that disrupts it feels like it&apos;s disrupting <em>you</em>.</p>
    <p><strong>Perfectionism as procrastination.</strong> Intelligent people are very good at finding legitimate reasons to wait.</p>
    <p><strong>The wrong comparison.</strong> Most people ask &quot;Can I do this better than AI?&quot; The question is: &quot;Can I do this better than a person using AI?&quot;</p>
    <div class="callout">
      <p>${arch.reframe}</p>
    </div>
    <div class="cta-wrap">
      <a href="${playbookCtaUrl}" class="cta-btn">Get Your 90-Day Blueprint →</a>
      <p class="cta-sub">The ${arch.name} Playbook &nbsp;·&nbsp; 12 career paths &nbsp;·&nbsp; $5.99</p>
    </div>
  `, preheader);
  return { subject, html };
}

export function getDay5Email(name: string, archetype: ArchetypeKey, playbookCtaUrl: string) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `This is the last email. Here&apos;s what I think you should do.`;
  const preheader = '5 days. You know what you are. The only question left is what you do with it.';
  const html = wrapEmail(`
    <p class="eyebrow">Day 5 &nbsp;·&nbsp; The Decision</p>
    <h1>You&apos;ve read four emails. You know your archetype. <em>Now what?</em></h1>
    <p>Hey ${firstName},</p>
    <p>This is the last email in this series. I&apos;m not going to drag it out.</p>
    <p>You are a <strong>${arch.name}</strong>. The gap between knowing your archetype and using it to build something does not close on its own. Decision does.</p>
    <div class="callout">
      <p>The ${arch.name} AI Career Playbook: 12 specific paths, income ranges, a 90-day blueprint, the tool stack, and the income strategy. Plus the full 50 AI Career Paths directory as a buyer bonus.</p>
    </div>
    <p>It&apos;s $5.99. Not a course. Not a subscription. A clear map — built for your archetype — that you own permanently.</p>
    <div class="cta-wrap">
      <a href="${playbookCtaUrl}" class="cta-btn">Get My ${arch.name} Playbook — $5.99 →</a>
      <p class="cta-sub">Instant access &nbsp;·&nbsp; Permanent &nbsp;·&nbsp; One decision, one time</p>
    </div>
    <p>If you choose not to — that&apos;s a legitimate choice. Make it consciously, not by default.</p>
  `, preheader);
  return { subject, html };
}

export function getPurchaseConfirmationEmail(name: string, archetype: ArchetypeKey, accessLink: string) {
  const arch = ARCHETYPES[archetype] || ARCHETYPES['H'];
  const firstName = (name || '').split(' ')[0] || 'there';
  const subject = `Your ${arch.name} Playbook is ready — here&apos;s your link`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your Human Edge — Purchase Confirmed</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#faf8f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1040}
  .wrap{max-width:600px;margin:0 auto;background:#fff}
  .hdr{background:#1a1040;padding:28px 40px;text-align:center}
  .logo{color:#fff;font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;text-decoration:none}
  .logo-dot{color:#d85a30}
  .hero{background:linear-gradient(135deg,#1a1040 0%,${arch.color} 100%);padding:48px 40px;text-align:center}
  .confirm-badge{display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:7px 20px;border-radius:40px;margin-bottom:20px}
  .hero-title{font-size:28px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:8px}
  .hero-title em{color:rgba(255,255,255,.7);font-style:italic;font-weight:400}
  .hero-sub{font-size:15px;color:rgba(255,255,255,.65)}
  .body{padding:48px 40px}
  p{font-size:16px;line-height:1.8;color:#3d3460;margin-bottom:20px}
  p strong{color:#1a1040}
  .access-box{background:#f7f4ff;border:2px solid #534ab7;border-radius:12px;padding:32px;text-align:center;margin:32px 0}
  .access-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#9b92b8;margin-bottom:16px}
  .access-btn{display:inline-block;background:#1a1040;color:#fff !important;text-decoration:none;font-size:15px;font-weight:700;letter-spacing:.06em;padding:18px 44px;border-radius:40px;margin-bottom:12px}
  .access-note{font-size:13px;color:#9b92b8}
  .checklist{background:#f7f9f8;border-radius:10px;padding:24px 28px;margin:28px 0}
  .checklist-item{font-size:15px;color:#1a1040;line-height:1.6;padding:6px 0;padding-left:28px;position:relative}
  .checklist-item::before{content:"✓";position:absolute;left:0;color:#0f6e56;font-weight:700}
  .ftr{background:#f2ede6;padding:24px 40px;text-align:center}
  .ftr p{font-size:12px;color:#9b92b8;line-height:1.7;margin:0}
</style>
</head>
<body>
<span style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f4;">Purchase confirmed. Your permanent access link is below.&nbsp;‌&nbsp;‌&nbsp;‌</span>
<div class="wrap">
  <div class="hdr">
    <a class="logo" href="${SITE_URL}">YOUR HUMAN <span class="logo-dot">EDGE</span></a>
  </div>
  <div class="hero">
    <div class="confirm-badge">✓ &nbsp; Purchase Confirmed</div>
    <h1 class="hero-title">Your <em>${arch.name}</em><br>Playbook is ready.</h1>
    <p class="hero-sub">${arch.tagline}</p>
  </div>
  <div class="body">
    <p>Hey ${firstName},</p>
    <p>Your payment cleared. Here&apos;s your permanent access link — bookmark it, it&apos;s yours forever:</p>
    <div class="access-box">
      <div class="access-label">Your Personal Access Link</div>
      <a href="${accessLink}" class="access-btn">Open My ${arch.name} Playbook →</a>
      <p class="access-note">No login required &nbsp;·&nbsp; Works on any device &nbsp;·&nbsp; Never expires</p>
    </div>
    <p><strong>What&apos;s inside your playbook:</strong></p>
    <div class="checklist">
      <div class="checklist-item">12 specific AI career paths with income ranges</div>
      <div class="checklist-item">A 90-day blueprint to position yourself starting this week</div>
      <div class="checklist-item">Your archetype&apos;s exact tool stack with specific use cases</div>
      <div class="checklist-item">Three income models: consulting, training, and community</div>
      <div class="checklist-item">The psychology of AI resistance — your specific identity threat and the reframe</div>
      <div class="checklist-item"><strong>Buyer Bonus:</strong> The full 50 AI Career Paths directory at ${SITE_DISPLAY}/paths</div>
    </div>
    <p>If you have any questions, reply to this email directly.</p>
    <div style="padding-top:8px;">
      <span style="font-weight:700;color:#1a1040;font-size:16px;display:block;">Temitope Saliu</span>
      <span style="font-size:13px;color:#9b92b8;">Founder · Your Human Edge · ${SITE_DISPLAY}</span>
    </div>
  </div>
  <div class="ftr">
    <p>This receipt was sent to confirm your purchase. Keep this email for your records.</p>
  </div>
</div>
</body>
</html>`;
  return { subject, html };
}

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY not set');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    const data = await res.json();
    if (res.ok) return { success: true, id: data.id };
    return { success: false, error: data.message || `HTTP ${res.status}` };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
