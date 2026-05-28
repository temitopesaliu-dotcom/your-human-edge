import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	title: "Your Human Edge | AI Archetype Quiz",
	description:
		"Stop trying to learn all of AI. Discover which corner of AI fits your inherent skills, personality and values.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				{children}
				{/* <nav className="mobile-dock" aria-label="Mobile navigation">
					<Link href="/quiz" className="mobile-dock__item">
						<span>⌂</span>
						<span>Home</span>
					</Link>
					<Link href="/paths" className="mobile-dock__item">
						<span>▦</span>
						<span>Paths</span>
					</Link>
					<Link
						href="/quiz"
						className="mobile-dock__item mobile-dock__item--primary">
						<span>✦</span>
						<span>Quiz</span>
					</Link>
					<Link href="/coming-soon" className="mobile-dock__item">
						<span>◌</span>
						<span>Community</span>
					</Link>
				</nav> */}
			</body>
		</html>
	);
}
