"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArchetypeBySlug } from "@/lib/archetypes";
import { SITE_DISPLAY } from "@/lib/site";

const CAREER_DETAILS: Record<
	string,
	{ title: string; desc: string; earn: string }[]
> = {
	H: [
		{
			title: "AI Life Coach (Augmented)",
			desc: "Use AI for session prep, notes and content. You stay fully present.",
			earn: "$1k–$5k/mo",
		},
		{
			title: "AI Community Architect",
			desc: "Build and run a paid community. AI handles content; you hold the space.",
			earn: "$2k–$10k/mo",
		},
		{
			title: "AI Corporate Wellbeing Trainer",
			desc: "Run workshops on psychological safety, empathy and AI transition.",
			earn: "$2k–$10k/day",
		},
		{
			title: "AI Relationship Coach",
			desc: "Coach individuals and couples using AI to prep and scale your practice.",
			earn: "$800–$3k/mo",
		},
		{
			title: "AI Educator / Course Creator",
			desc: "Package your knowledge into courses. AI builds the infrastructure.",
			earn: "$500–$50k/launch",
		},
		{
			title: "AI Career Transition Coach",
			desc: "Help people rebuild identity and direction after layoffs.",
			earn: "$1k–$3k/client",
		},
	],
	C: [
		{
			title: "AI Brand Strategist",
			desc: "Define brand voice and visual identity using AI to rapid-prototype creative.",
			earn: "$3k–$12k/mo",
		},
		{
			title: "AI Creative Director",
			desc: "Lead AI-augmented creative studios. Your taste is the differentiator.",
			earn: "$5k–$20k/mo",
		},
		{
			title: "AI Content Studio Owner",
			desc: "Package production: writing, video, design via AI + your editorial eye.",
			earn: "$2k–$15k/mo",
		},
		{
			title: "AI Visual Storyteller",
			desc: "Midjourney, Runway, Sora — you direct. AI executes at scale.",
			earn: "$1k–$8k/project",
		},
		{
			title: "AI Music Producer",
			desc: "Suno, Udio, Splice AI — composition and production at creative velocity.",
			earn: "$500–$5k/project",
		},
		{
			title: "AI UX / Product Designer",
			desc: "Figma AI + v0 + Claude. Design systems in hours, not weeks.",
			earn: "$80k–$180k/yr",
		},
	],
	S: [
		{
			title: "AI Automation Consultant",
			desc: "Build Make/Zapier/n8n workflows for SMBs. Retainer model.",
			earn: "$3k–$10k/mo",
		},
		{
			title: "No-Code AI Systems Designer",
			desc: "Create business intelligence systems without engineering teams.",
			earn: "$5k–$15k/project",
		},
		{
			title: "AI Integration Architect",
			desc: "Connect existing company systems to AI layers. Enterprise-level.",
			earn: "$120k–$280k/yr",
		},
		{
			title: "AI Ops Engineer",
			desc: "Build, deploy and monitor LLM pipelines in production environments.",
			earn: "$100k–$200k/yr",
		},
		{
			title: "Prompt Engineering Consultant",
			desc: "Systematic prompt libraries, evaluation frameworks, and fine-tuning.",
			earn: "$2k–$8k/mo",
		},
		{
			title: "AI Product Manager",
			desc: "Spec, prioritise and ship AI-native features in product teams.",
			earn: "$110k–$200k/yr",
		},
	],
	G: [
		{
			title: "AI Growth Strategist",
			desc: "Build AI-powered acquisition and retention systems for startups.",
			earn: "$5k–$20k/mo",
		},
		{
			title: "AI GTM Architect",
			desc: "Design go-to-market systems using Clay, Apollo, AI for outbound.",
			earn: "$4k–$15k/mo",
		},
		{
			title: "Revenue Acceleration Consultant",
			desc: "Audit and rebuild sales pipelines with AI tooling.",
			earn: "$8k–$25k/project",
		},
		{
			title: "AI Marketing Director",
			desc: "Own performance, content and lifecycle with AI-native strategy.",
			earn: "$120k–$250k/yr",
		},
		{
			title: "Fractional CMO (AI-native)",
			desc: "Serve 3–5 companies simultaneously with AI as leverage.",
			earn: "$5k–$15k/mo each",
		},
		{
			title: "AI Affiliate / Growth Partner",
			desc: "Build content + funnels to monetise AI tool referrals.",
			earn: "$2k–$50k/mo",
		},
	],
};

const TOOLS: Record<string, { name: string; desc: string; price: string }[]> = {
	H: [
		{
			name: "Claude",
			desc: "Primary thinking partner. Session prep, content, difficult email drafting.",
			price: "FREE TIER",
		},
		{
			name: "Notion AI",
			desc: "Client management and knowledge base.",
			price: "FREE TIER",
		},
		{
			name: "HeyGen",
			desc: "AI avatar content. Scale your video presence.",
			price: "FROM $29/mo",
		},
		{
			name: "Loom AI",
			desc: "Async video check-ins with auto-captions and summaries.",
			price: "FREE TIER",
		},
		{
			name: "Circle / Skool",
			desc: "Your community platform. AI handles content infrastructure.",
			price: "FROM $49/mo",
		},
		{
			name: "Beehiiv",
			desc: "Your email list. The audience you own.",
			price: "FREE TIER",
		},
	],
	C: [
		{
			name: "Midjourney",
			desc: "Visual ideation at speed. Your eye + AI production.",
			price: "FROM $10/mo",
		},
		{
			name: "Claude",
			desc: "Strategic narrative and copy. Editorial thinking partner.",
			price: "FREE TIER",
		},
		{
			name: "Runway",
			desc: "AI video editing and generation.",
			price: "FROM $15/mo",
		},
		{
			name: "Figma AI",
			desc: "Design at velocity. AI-assisted component generation.",
			price: "FREE TIER",
		},
		{
			name: "Suno",
			desc: "AI music creation from text prompts.",
			price: "FREE TIER",
		},
		{
			name: "Framer AI",
			desc: "Website creation from descriptions. No code.",
			price: "FROM $19/mo",
		},
	],
	S: [
		{
			name: "Make (Integromat)",
			desc: "Multi-step AI automation workflows.",
			price: "FREE TIER",
		},
		{
			name: "Claude",
			desc: "Intelligence layer inside your workflows.",
			price: "FREE TIER",
		},
		{
			name: "n8n",
			desc: "Self-hosted automation with AI nodes.",
			price: "FREE SELF-HOST",
		},
		{
			name: "Airtable AI",
			desc: "Structured data + AI inference in one system.",
			price: "FROM $20/mo",
		},
		{
			name: "Cursor / Copilot",
			desc: "AI-native coding. 10x your build speed.",
			price: "FROM $20/mo",
		},
		{
			name: "Retool",
			desc: "Internal tools on top of AI APIs.",
			price: "FREE TIER",
		},
	],
	G: [
		{
			name: "Clay",
			desc: "AI-powered lead research and enrichment at scale.",
			price: "FROM $149/mo",
		},
		{
			name: "Claude",
			desc: "Hyper-personalised outreach based on Clay research.",
			price: "FREE TIER",
		},
		{
			name: "Apollo.io",
			desc: "AI-enhanced prospecting and email sequencing.",
			price: "FREE TIER",
		},
		{
			name: "HubSpot AI",
			desc: "CRM + AI insights. Pipeline intelligence.",
			price: "FREE TIER",
		},
		{
			name: "Perplexity",
			desc: "Real-time research and competitor intelligence.",
			price: "FREE TIER",
		},
		{
			name: "Jasper / Copy.ai",
			desc: "Brand-voice content at scale.",
			price: "FROM $49/mo",
		},
	],
};

export default function ResultsClient({ slug }: { slug: string }) {
	const arch = getArchetypeBySlug(slug);
	if (!arch) notFound();

	const careers = CAREER_DETAILS[arch.key] || [];
	const tools = TOOLS[arch.key] || [];

	const storedName = useSyncExternalStore(
		() => () => {},
		() => localStorage.getItem("yhe_name") || "",
		() => ""
	);
	const [buying, setBuying] = useState(false);
	const [buyError, setBuyError] = useState("");

	useEffect(() => {
		track("result_view", { archetype: arch.key });
	}, [arch.key]);

	async function handleBuy() {
		setBuyError("");
		setBuying(true);
		track("buy_click", { archetype: arch?.key });

		try {
			const email = localStorage.getItem("yhe_email") || "";
			const res = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, archetype: arch?.key ?? "H" }),
			});
			const data = await res.json();
			if (!res.ok || !data.url)
				throw new Error(data.error || "Checkout unavailable.");
			window.location.href = data.url;
		} catch (err: unknown) {
			setBuying(false);
			setBuyError(err instanceof Error ? err.message : "Checkout unavailable.");
		}
	}

	return (
		<div className="result-page">
			<nav
				role="navigation"
				aria-label="Main navigation"
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 99,
					background: "rgba(26,16,64,.94)",
					backdropFilter: "blur(14px)",
					borderBottom: "1px solid rgba(255,255,255,.07)",
					padding: "0 32px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: "62px",
				}}>
				<Link href="/quiz" className="nav-logo" aria-label="Your Human Edge home">
					human<span>+</span>ai
				</Link>
				<Link href="/quiz" className="nav-cta" aria-label="Retake the archetype quiz">
					Take the quiz again
				</Link>
			</nav>

			<header
				role="banner"
				style={{
					background: `linear-gradient(135deg,${arch.colorDark} 0%,${arch.color} 100%)`,
					padding: "120px 28px 64px",
					textAlign: "center",
					position: "relative",
					overflow: "hidden",
				}}>
				<div
					className="result-page__glow"
					aria-hidden="true"
					style={{
						position: "absolute",
						inset: 0,
						background:
							"radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.15),transparent 60%)",
					}}
				/>
				{storedName && (
					<div
						style={{
							fontFamily: "'Cormorant Garamond', serif",
							fontSize: "1.05rem",
							color: "rgba(255,255,255,.6)",
							marginBottom: "20px",
							fontStyle: "italic",
							position: "relative",
							zIndex: 1,
						}}>
						{storedName}, meet your archetype.
					</div>
				)}
				<span
					style={{
						fontSize: "3.2rem",
						display: "block",
						marginBottom: "14px",
						position: "relative",
						zIndex: 1,
					}}
					role="img"
					aria-label={`${arch.name} emoji`}>
					{arch.emoji}
				</span>
				<div
					style={{
						fontSize: ".7rem",
						letterSpacing: ".2em",
						textTransform: "uppercase",
						color: "rgba(255,255,255,.7)",
						fontWeight: 500,
						marginBottom: "8px",
						position: "relative",
						zIndex: 1,
					}}>
					Your AI Archetype
				</div>
				<h1
					style={{
						fontFamily: "'Cormorant Garamond', serif",
						fontSize: "clamp(2.4rem,7vw,4rem)",
						fontWeight: 600,
						color: "#fff",
						lineHeight: 1.06,
						marginBottom: "12px",
						position: "relative",
						zIndex: 1,
					}}>
					The {arch.name}
				</h1>
				<p
					style={{
						fontFamily: "'Cormorant Garamond', serif",
						fontStyle: "italic",
						fontSize: "1.1rem",
						color: "rgba(255,255,255,.82)",
						position: "relative",
						zIndex: 1,
					}}>
					&quot;{arch.tagline}&quot;
				</p>
			</header>

			<main style={{ padding: "60px 0 80px" }}>
				<div className="container">
					<article style={cardStyle}>
						<h2 style={labelStyle("var(--purple)")}>Who you are</h2>
						<p style={bodyTextStyle}>{arch.reframe}</p>
						<h3 style={labelStyle("var(--teal)")}>Natural strengths</h3>
						<div style={{ margin: "8px 0 4px" }}>
							{[
								"Deep Listener",
								"Natural Coach",
								"Emotionally Intelligent",
								"Systems Thinker",
								"Strategic Vision",
								"People-First",
							].map((s) => (
								<span
									key={s}
									style={{
										display: "inline-block",
										padding: "5px 14px",
										borderRadius: "40px",
										fontSize: ".78rem",
										fontWeight: 500,
										background: "var(--paper)",
										color: "var(--ink)",
										border: "1px solid var(--border)",
										margin: "3px",
									}}>
									{s}
								</span>
							))}
						</div>
						<h3 style={labelStyle("var(--coral)")}>Where AI fits you</h3>
						<p style={bodyTextStyle}>
							Your archetype&apos;s tool: <strong>{arch.tool}</strong>.{" "}
							{arch.useCase}
						</p>
					</article>

					<section style={cardStyle} aria-labelledby="career-paths-heading">
						<h2 id="career-paths-heading" style={{ ...labelStyle("#b8860b"), marginTop: 0 }}>
							AI career paths for your archetype
						</h2>
						<div className="table-scroll">
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									background: "#fff",
									borderRadius: "10px",
									overflow: "hidden",
									border: "1px solid var(--border)",
								}}>
								<thead>
									<tr>
										{["Career Path", "What you do", "Earning range"].map(
											(h) => (
												<th
													key={h}
													scope="col"
													style={{
														background: "var(--ink)",
														color: "#fff",
														padding: "10px 14px",
														textAlign: "left",
														fontSize: "9.5px",
														letterSpacing: ".1em",
														textTransform: "uppercase",
														fontWeight: 500,
													}}>
													{h}
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody>
									{careers.map((c, i) => (
										<tr
											key={i}
											style={{ borderBottom: "1px solid var(--border)" }}>
											<td
												style={{
													padding: "10px 14px",
													fontSize: ".88rem",
													fontWeight: 600,
												}}>
												{c.title}
											</td>
											<td
												style={{
													padding: "10px 14px",
													fontSize: ".84rem",
													color: "var(--soft)",
												}}>
												{c.desc}
											</td>
											<td style={{ padding: "10px 14px" }}>
												<span
													style={{
														display: "inline-block",
														borderRadius: "4px",
														padding: "2px 8px",
														fontSize: ".78rem",
														fontWeight: 600,
														background: arch.colorLight,
														color: arch.color,
													}}>
													{c.earn}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>

					<section style={cardStyle} aria-labelledby="tools-heading">
						<h2 id="tools-heading" style={labelStyle("var(--purple)")}>
							Your natural AI tools
						</h2>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
								gap: "10px",
								margin: "10px 0",
							}}>
							{tools.map((t) => (
								<div
									key={t.name}
									style={{
										background: "#fff",
										border: "1px solid var(--border)",
										borderRadius: "10px",
										padding: "12px 14px",
										display: "flex",
										alignItems: "flex-start",
										gap: "10px",
									}}>
									<span
										aria-hidden="true"
										style={{
											width: 5,
											height: 5,
											borderRadius: "50%",
											background: arch.color,
											flexShrink: 0,
											marginTop: 6,
										}}
									/>
									<div>
										<div
											style={{
												fontSize: ".88rem",
												fontWeight: 500,
												color: "var(--ink)",
											}}>
											{t.name}
										</div>
										<div
											style={{
												fontSize: ".78rem",
												color: "var(--soft)",
												lineHeight: 1.5,
											}}>
											{t.desc}
										</div>
										<span
											style={{
												display: "inline-block",
												marginTop: "5px",
												fontSize: ".72rem",
												color: arch.color,
												background: arch.colorLight,
												borderRadius: "4px",
												padding: "1px 7px",
												fontWeight: 600,
											}}>
											{t.price}
										</span>
									</div>
								</div>
							))}
						</div>
					</section>

					<section
						id="upgrade"
						aria-labelledby="playbook-heading"
						style={{
							background: "var(--ink)",
							borderRadius: "18px",
							padding: "48px 40px",
							textAlign: "center",
							color: "#fff",
							marginTop: "24px",
						}}>
						<div
							style={{
								fontSize: ".68rem",
								letterSpacing: ".2em",
								textTransform: "uppercase",
								color: "#e8a020",
								fontWeight: 500,
								marginBottom: "14px",
							}}>
							Your Personal Playbook · $9.99
						</div>
						<h2
							id="playbook-heading"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
								fontSize: "clamp(1.8rem,4vw,2.4rem)",
								fontWeight: 500,
								color: "#fff",
								marginBottom: "12px",
								lineHeight: 1.2,
							}}>
							Get the full map.
							<br />
							Not just the archetype.
						</h2>
						<p
							style={{
								fontSize: ".92rem",
								color: "rgba(255,255,255,.6)",
								lineHeight: 1.78,
								maxWidth: "480px",
								margin: "0 auto 26px",
							}}>
							Your free results show you <em>who</em> you are. The Playbook
							shows you exactly <em>what to do</em> — every AI career path,
							income strategy, tool stack, and 90-day action plan built for The{" "}
							{arch.name}.
						</p>
						<div
							style={{
								background: "rgba(255,255,255,.06)",
								borderRadius: "12px",
								padding: "22px 24px",
								marginBottom: "28px",
								textAlign: "left",
							}}>
							{[
								"Deep-dive into your archetype's skills, tools and income strategies",
								"Your 30-Day AI Activation Blueprint — week-by-week, no guesswork",
								"Archetype-specific tool stack — the exact AI tools that fit how you work",
								"The psychology behind AI resistance — and how to move past yours",
								"Income pathways: coaching, community, courses, and consulting",
								`Common traps ${arch.name}s fall into — and how to avoid every one`,
								"+ Bonus: The AI Career Map — 50+ roles, real income ranges & your archetype's top picks",
							].map((item, i) => (
								<p
									key={i}
									style={{
										color: i === 6 ? "#e8a020" : "rgba(255,255,255,.88)",
										fontSize: ".88rem",
										display: "flex",
										alignItems: "flex-start",
										gap: "9px",
										padding: "5px 0",
										lineHeight: 1.5,
									}}>
									<span
										aria-hidden="true"
										style={{
											color: "#e8a020",
											fontWeight: 700,
											flexShrink: 0,
										}}>
										✓
									</span>
									{item}
								</p>
							))}
						</div>
						<div
							style={{
								fontSize: ".88rem",
								color: "rgba(255,255,255,.35)",
								textDecoration: "line-through",
								marginBottom: "4px",
							}}>
							Valued at $57
						</div>
						<div
							style={{
								fontFamily: "'Cormorant Garamond', serif",
								fontSize: "3.2rem",
								fontWeight: 600,
								color: "#e8a020",
								lineHeight: 1,
							}}>
							$9.99
						</div>
						<div
							style={{
								display: "inline-block",
								background: "rgba(232,160,32,.15)",
								border: "1px solid rgba(232,160,32,.35)",
								borderRadius: "40px",
								padding: "4px 14px",
								fontSize: ".73rem",
								color: "#e8a020",
								margin: "6px 0 26px",
								letterSpacing: ".03em",
							}}>
							🔥 Launch Price — Valid for the first 10 subscribers
						</div>
						<br />
						<button
							onClick={handleBuy}
							disabled={buying}
							aria-label="Purchase AI career playbook for $9.99"
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: "9px",
								background: arch.color,
								color: "#fff",
								fontFamily: "'DM Sans', sans-serif",
								fontSize: "1rem",
								fontWeight: 600,
								padding: "16px 42px",
								borderRadius: "50px",
								border: "none",
								cursor: buying ? "not-allowed" : "pointer",
								opacity: buying ? 0.6 : 1,
								marginBottom: "10px",
								transition: 'transform .2s, box-shadow .2s',
							}}
							onMouseEnter={(e) => !buying && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.3)')}
							onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = 'none')}
							onFocus={(e) => e.currentTarget.style.outline = '2px solid #fff'}
							onBlur={(e) => e.currentTarget.style.outline = 'none'}>
							{buying ? "Preparing checkout…" : "Get My AI Guide →"}
						</button>
						{buyError && (
							<div
								role="alert"
								style={{
									color: "#ffcdd2",
									fontSize: ".8rem",
									marginTop: "8px",
								}}>
								{buyError}
							</div>
						)}
						<div
							style={{
								fontSize: ".75rem",
								color: "rgba(255,255,255,.3)",
								display: "block",
							}}>
							Instant access · Secure checkout · 100% satisfaction guaranteed
						</div>
					</section>
				</div>
			</main>

			<footer role="contentinfo">
				<div>
					<strong>{SITE_DISPLAY}</strong> &nbsp;·&nbsp;{" "}
					<span style={{ fontStyle: "italic", opacity: 0.6 }}>
						AI x Human Psychology
					</span>
				</div>
				<ul className="f-links">
					<li>
						<Link href="/quiz">Take the quiz</Link>
					</li>
					<li>
						<Link href="/coming-soon">Community</Link>
					</li>
				</ul>
				<div style={{ fontSize: ".7rem", opacity: 0.25 }}>
					© 2025 {SITE_DISPLAY}
				</div>
			</footer>
		</div>
	);
}

const cardStyle: React.CSSProperties = {
	background: "#fff",
	border: "1px solid var(--border)",
	borderRadius: "14px",
	padding: "32px 36px",
	marginBottom: "20px",
	boxShadow: "0 2px 20px rgba(26,16,64,.05)",
};
const bodyTextStyle: React.CSSProperties = {
	fontSize: ".97rem",
	color: "var(--soft)",
	lineHeight: 1.82,
	marginBottom: "8px",
};
function labelStyle(color: string): React.CSSProperties {
	return {
		fontSize: ".68rem",
		letterSpacing: ".18em",
		textTransform: "uppercase",
		fontWeight: 600,
		marginBottom: "10px",
		marginTop: "26px",
		display: "block",
		color,
	};
}
function track(event: string, data?: Record<string, unknown>) {
	try {
		const payload = JSON.stringify({
			event,
			data,
			page: window.location.pathname,
			ts: Date.now(),
		});
		if (navigator?.sendBeacon)
			navigator.sendBeacon(
				"/api/track",
				new Blob([payload], { type: "application/json" })
			);
	} catch {}
}
