import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AsciiProvider } from "@/components/ascii/AsciiContext";
import { AsciiControlPanel } from "@/components/ascii/AsciiControlPanel";

export const metadata: Metadata = {
  title: "Torque | The Revenue Engine for On-Chain Growth",
  description: "Stop renting mercenary TVL. Torque is the intelligent growth stack for Solana protocols, driving retention and revenue through programmable incentives.",
  icons: {
    icon: [
      { url: "/logos/torque-symbol-app.svg", type: "image/svg+xml" },
      { url: "/logos/torque-symbol-app.ico", sizes: "32x32" },
    ],
    apple: "/logos/torque-symbol-app.svg",
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
        <link rel="icon" href="/logos/torque-symbol-app.svg" type="image/svg+xml" />
        <link rel="icon" href="/logos/torque-symbol-app.ico" sizes="32x32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
        <AsciiProvider>
          <ScrollProvider>
            <ScrollProgress />
            {children}
            <AsciiControlPanel />
          </ScrollProvider>
        </AsciiProvider>
      </body>
    </html>
  );
}
