import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Torque",
  description: "Torque Labs Privacy Policy — how we collect, use, and protect your information.",
};

const sections = [
  {
    title: "1. Introduction",
    content: `Torque Labs ("Torque," "we," "us," or "our") operates the torque.so website, the Torque platform (app.torque.so), and related services (collectively, the "Services"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access or use our Services.

By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of our Services.`,
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        subtitle: "2.1 Information You Provide",
        items: [
          "Wallet addresses — when you connect a Solana wallet to interact with Torque campaigns or rewards",
          "Contact information — email address, name, or social handles when you submit forms, request integrations, or contact our team",
          "Protocol and project details — when you apply to integrate with Torque as a protocol partner",
          "Communications — messages, feedback, and support requests you send to us",
        ],
      },
      {
        subtitle: "2.2 Information Collected Automatically",
        items: [
          "On-chain data — publicly available blockchain transaction data, wallet balances, token holdings, and interaction history on the Solana network",
          "Usage data — pages visited, features used, click patterns, session duration, and referral sources",
          "Device and browser information — IP address, browser type, operating system, device identifiers, and screen resolution",
          "Cookies and similar technologies — we use cookies, local storage, and analytics tools to understand usage patterns and improve our Services",
        ],
      },
      {
        subtitle: "2.3 Information from Third Parties",
        items: [
          "Publicly available blockchain data from Solana and associated networks",
          "Analytics data from service providers such as Google Analytics",
          "Information from integrated platforms when you authorize third-party connections",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    items: [
      "Provide, operate, and maintain our Services, including campaign execution, reward distribution, and analytics dashboards",
      "Process transactions and distribute on-chain rewards through Torque smart contracts",
      "Analyze on-chain behavior to generate insights, leaderboards, and growth recommendations for protocol partners",
      "Communicate with you about updates, support requests, and service-related announcements",
      "Detect and prevent fraud, abuse, bot activity, and unauthorized access",
      "Improve and develop new features, products, and services",
      "Comply with legal obligations and enforce our Terms of Service",
    ],
  },
  {
    title: "4. How We Share Your Information",
    content: `We do not sell your personal information. We may share information in the following circumstances:`,
    items: [
      "Protocol partners — aggregated, anonymized analytics and campaign performance data. We do not share individual wallet addresses with partners unless you explicitly opt in",
      "Service providers — trusted third-party vendors who assist with hosting, analytics, email delivery, and infrastructure (e.g., Vercel, Google Analytics, Formspree)",
      "Legal compliance — when required by law, regulation, legal process, or governmental request",
      "Business transfers — in connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction",
      "With your consent — when you explicitly authorize us to share information with a specific party",
    ],
  },
  {
    title: "5. On-Chain Data",
    content: `Torque processes publicly available on-chain data from the Solana blockchain. This includes wallet addresses, transaction histories, token balances, and smart contract interactions. This data is inherently public and immutable on the blockchain.

Torque does not control or modify on-chain data. Reward distributions executed through Torque smart contracts are recorded on-chain and are publicly visible. You should be aware that any on-chain transactions are permanent and cannot be deleted or modified.`,
  },
  {
    title: "6. Cookies and Tracking Technologies",
    content: `We use cookies and similar technologies to:`,
    items: [
      "Remember your preferences and wallet connections",
      "Analyze traffic and usage patterns via Google Analytics",
      "Measure campaign effectiveness",
      "Ensure security and prevent fraud",
    ],
    footer: `You can control cookies through your browser settings. Disabling cookies may affect the functionality of our Services. We use Google Analytics with IP anonymization enabled.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. Specifically:

Off-chain data (contact info, usage data) is retained for the duration of your use of our Services and for a reasonable period thereafter for analytics and legal compliance.

On-chain data is permanent and immutable on the Solana blockchain and cannot be deleted by Torque or any party.

You may request deletion of your off-chain data by contacting us at privacy@torque.so.`,
  },
  {
    title: "8. Data Security",
    content: `We implement industry-standard security measures to protect your information, including encryption in transit (TLS/SSL), access controls, and regular security assessments. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.

We do not store private keys. Wallet interactions are handled client-side through standard Solana wallet adapters.`,
  },
  {
    title: "9. Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights:`,
    items: [
      "Access — request a copy of the personal information we hold about you",
      "Correction — request correction of inaccurate or incomplete information",
      "Deletion — request deletion of your off-chain personal information",
      "Objection — object to certain processing activities",
      "Portability — request your data in a structured, machine-readable format",
      "Withdraw consent — withdraw previously given consent at any time",
    ],
    footer: `To exercise any of these rights, contact us at privacy@torque.so. We will respond within 30 days.`,
  },
  {
    title: "10. International Users",
    content: `Torque is operated from the United States. If you access our Services from outside the United States, your information may be transferred to and processed in the United States or other jurisdictions where our service providers operate. By using our Services, you consent to such transfers.

For users in the European Economic Area (EEA), United Kingdom, or other jurisdictions with data protection laws, we process your data based on legitimate interests, contractual necessity, or your consent, as applicable.`,
  },
  {
    title: "11. Children's Privacy",
    content: `Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.`,
  },
  {
    title: "12. Third-Party Links",
    content: `Our Services may contain links to third-party websites, protocols, or applications. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.`,
  },
  {
    title: "13. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of our Services after changes are posted constitutes acceptance of the revised policy.`,
  },
  {
    title: "14. Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, contact us at:

Torque Labs
Email: privacy@torque.so
Website: https://torque.so`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen bg-white pt-24 md:pt-32">
        {/* Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-3xl">
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Legal
            </div>
            <h1 data-animate="fade-up" className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p data-animate="fade-up" className="text-sm text-black/40 font-mono">
              Last updated: March 1, 2026
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl md:text-2xl font-medium text-black mb-4">
                  {section.title}
                </h2>

                {section.content && (
                  <div className="text-sm md:text-base text-black/70 leading-relaxed whitespace-pre-line mb-4">
                    {section.content}
                  </div>
                )}

                {"subsections" in section &&
                  section.subsections?.map((sub) => (
                    <div key={sub.subtitle} className="mb-6">
                      <h3 className="text-base font-medium text-black mb-2">
                        {sub.subtitle}
                      </h3>
                      <ul className="space-y-2">
                        {sub.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-black/70 leading-relaxed">
                            <span className="w-1 h-1 bg-black/30 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {"items" in section && !("subsections" in section) && (
                  <ul className="space-y-2 mb-4">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-black/70 leading-relaxed">
                        <span className="w-1 h-1 bg-black/30 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {"footer" in section && section.footer && (
                  <p className="text-sm text-black/70 leading-relaxed">
                    {section.footer}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <div className="h-screen" />
      <Footer />
    </>
  );
}
