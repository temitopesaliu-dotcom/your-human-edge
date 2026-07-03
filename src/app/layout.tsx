import type { Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
	const gaId = process.env.NEXT_PUBLIC_GA_ID;
	const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

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
				{gaId && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
							strategy="afterInteractive"
						/>
						<Script id="google-analytics" strategy="afterInteractive">
							{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${gaId}', {
									page_path: window.location.pathname,
								});
							`}
						</Script>
					</>
				)}
				{fbPixelId && (
					<>
						<Script id="fb-pixel-init" strategy="afterInteractive">
							{`
								!function(f,b,e,v,n,t,s)
								{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
									n.callMethod.apply(n,arguments):n.queue.push(arguments)};
								if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
								n.queue=[];t=b.createElement(e);t.async=!0;
								t.src=v;s=b.getElementsByTagName(e)[0];
								s.parentNode.insertBefore(t,s)}
								(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
								fbq('init', '${fbPixelId}');
								fbq('track', 'PageView');
							`}
						</Script>
						<noscript>
							<img
								height="1"
								width="1"
								style={{ display: 'none' }}
								src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
								alt=""
							/>
						</noscript>
					</>
				)}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
