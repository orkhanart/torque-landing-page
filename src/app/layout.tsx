import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
//import AnimatedBackground from "@/components/AnimatedBackground";
import Hyperspeed from "@/blocks/Backgrounds/Hyperspeed/Hyperspeed";
// import Navbar from "./components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Torque",
  description: "Building Solana's onchain attention economy.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Torque - The Growth Protocol",
    description: "The SVM growth engine.",
    url: "https://torque.so",
    siteName: "Torque",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Torque - The Growth Protocol",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Torque - The Growth Protocol",
    description: "Building Solana's onchain attention economy.",
    images: ["/og-image.png"], // Replace with your actual image path
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
          <Hyperspeed />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
