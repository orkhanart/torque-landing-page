import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
//import AnimatedBackground from "@/components/AnimatedBackground";
import Hyperspeed from "@/blocks/Backgrounds/Hyperspeed/Hyperspeed";
// import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "Torque",
  description: "Building Solana's onchain attention economy.",
  icons: {
    icon: "/logos/c-logo-lm-2.png",
  },
  openGraph: {
    title: "Torque - The Growth Protocol",
    description: "The SVM growth engine.",
    url: "https://torque.so",
    siteName: "Torque",
    images: [
      {
        url: "/og-image-light-mode.png",
        width: 1200,
        height: 675,
        alt: "Torque - Solana's Incentive Protocol",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Torque - Solana's Incentive Protocol",
    description: "Launch Smart Incentives to Drive Growth",
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
        <div className="fixed inset-0 top-0 z-0 w-full h-full overflow-hidden">
          {/* <Hyperspeed /> */}
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
