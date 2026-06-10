import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
	title: "Your Human Edge | AI Archetype Quiz",
	description:
		"Stop trying to learn all of AI. Discover which corner of AI fits your inherent skills, personality and values.",
	viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

	return (
		<html lang="en">
			<head>
				{clarityId && (
					<Script id="ms-clarity" strategy="afterInteractive">
						{`(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window,document,"clarity","script","${clarityId}");`}
					</Script>
				)}
			</head>
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
				</nav> */}
			</body>
		</html>
	);
}

