import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torque | The Revenue Engine for On-Chain Growth",
  description: "Stop renting mercenary TVL. Torque is the intelligent growth stack for Solana protocols, driving retention and revenue through programmable incentives.",
  icons: {
    icon: "/logos/c-logo-lm-2.png",
  },
  openGraph: {
    title: "Torque | The Revenue Engine for On-Chain Growth",
    description: "Stop renting mercenary TVL. Torque is the intelligent growth stack for Solana protocols, driving retention and revenue through programmable incentives.",
    url: "https://torque.so",
    siteName: "Torque",
    images: [
      {
        url: "/og-image-light-mode.png",
        width: 1200,
        height: 675,
        alt: "Torque - The Revenue Engine for On-Chain Growth",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Torque | The Revenue Engine for On-Chain Growth",
    description: "Stop renting mercenary TVL. Torque is the intelligent growth stack for Solana protocols, driving retention and revenue through programmable incentives.",
    images: ["/og-image-light-mode.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/c-logo-lm-2.png" sizes="any" />
      </head>
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8CM307NTBB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8CM307NTBB');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
