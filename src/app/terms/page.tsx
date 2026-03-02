import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Torque",
  description: "Torque Labs Terms of Service — the rules and conditions governing your use of Torque.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Torque Labs ("Torque," "we," "us," or "our") governing your access to and use of the torque.so website, the Torque platform (app.torque.so), APIs, smart contracts, and all related services (collectively, the "Services").

By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you must not use our Services.`,
  },
  {
    title: "2. Eligibility",
    items: [
      "You must be at least 18 years of age or the age of majority in your jurisdiction",
      "You must not be located in, or a resident of, any jurisdiction where the use of blockchain-based services or digital assets is prohibited",
      "You must not be listed on any government sanctions list (including OFAC, EU, or UN sanctions lists)",
      "You must have the legal capacity to enter into a binding agreement",
    ],
    footer: `By using our Services, you represent and warrant that you meet all eligibility requirements.`,
  },
  {
    title: "3. Description of Services",
    content: `Torque provides a programmable growth infrastructure for protocols built on the Solana blockchain. Our Services include:`,
    items: [
      "Campaign creation and management tools for protocol teams to design incentive programs",
      "On-chain reward distribution through Torque smart contracts deployed on Solana",
      "Analytics dashboards providing insights into user behavior, retention, and campaign performance",
      "API access for protocol integrations and programmatic campaign management",
      "Leaderboards, streak tracking, and gamification mechanics",
    ],
    footer: `Torque is a tool layer. We do not operate as a financial institution, broker, exchange, or investment advisor. We do not custody user funds.`,
  },
  {
    title: "4. Wallet Connection and Authentication",
    content: `To use certain features of our Services, you must connect a compatible Solana wallet. By connecting your wallet, you acknowledge that:`,
    items: [
      "You are the sole owner and controller of your wallet and private keys",
      "Torque never has access to your private keys or seed phrases",
      "All transactions initiated through Torque require your explicit wallet approval",
      "You are responsible for maintaining the security of your wallet credentials",
      "Any transactions signed with your wallet are irreversible once confirmed on the blockchain",
    ],
  },
  {
    title: "5. Protocol Partner Terms",
    content: `If you use Torque as a protocol partner to create and manage growth campaigns:`,
    items: [
      "You are responsible for the accuracy and legality of your campaign parameters, reward structures, and promotional materials",
      "You must fund campaigns with sufficient tokens before activation. Torque is not responsible for unfunded or underfunded campaigns",
      "Campaign rewards are distributed automatically based on the conditions you define. Once deployed, campaign logic executes as programmed",
      "You grant Torque a non-exclusive license to display your protocol name, logo, and campaign data within our platform and marketing materials",
      "You agree not to create campaigns that incentivize illegal activity, market manipulation, or fraud",
    ],
  },
  {
    title: "6. User Conduct",
    content: `You agree not to:`,
    items: [
      "Use bots, scripts, or automated tools to manipulate campaigns, rewards, leaderboards, or any aspect of the Services",
      "Create multiple wallets or accounts to fraudulently claim rewards or circumvent campaign conditions (Sybil attacks)",
      "Exploit vulnerabilities, bugs, or errors in our smart contracts, platform, or APIs",
      "Interfere with, disrupt, or place an unreasonable load on our infrastructure",
      "Use the Services for money laundering, terrorist financing, or any illegal purpose",
      "Impersonate another person, protocol, or entity",
      "Reverse-engineer, decompile, or attempt to extract the source code of our proprietary software",
      "Circumvent any access controls, rate limits, or security measures",
    ],
    footer: `We reserve the right to suspend or terminate access to any user who violates these terms, without prior notice.`,
  },
  {
    title: "7. Rewards and Tokens",
    content: `Torque facilitates the distribution of digital tokens as campaign rewards. Regarding rewards:`,
    items: [
      "Rewards are distributed on-chain through Torque smart contracts and are subject to the conditions defined by the protocol partner",
      "Torque does not guarantee the value of any token distributed as a reward. Token values fluctuate and may become worthless",
      "Reward eligibility is determined programmatically based on on-chain activity. Torque does not manually adjudicate reward disputes",
      "Torque may implement anti-fraud measures that could delay, reduce, or withhold rewards from wallets exhibiting suspicious behavior",
      "Tax obligations arising from receipt of rewards are your sole responsibility. Torque does not provide tax advice and does not issue tax documents",
    ],
  },
  {
    title: "8. Fees",
    content: `Torque may charge fees for certain Services, including platform fees on campaign budgets and API usage fees. Fee schedules are published on our platform and may be updated from time to time with reasonable notice.

All blockchain transaction fees (gas fees) are paid by the initiating party and are not controlled by Torque. These fees are non-refundable.`,
  },
  {
    title: "9. Intellectual Property",
    content: `All content, branding, software, designs, and materials comprising the Torque platform and website are owned by or licensed to Torque Labs and are protected by intellectual property laws.

You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for their intended purpose. This license does not include the right to:`,
    items: [
      "Copy, modify, or distribute Torque's proprietary software or content",
      "Use Torque's trademarks, logos, or branding without written permission",
      "Create derivative works based on our Services",
      "Use our Services to build a competing product",
    ],
  },
  {
    title: "10. Smart Contract Risks",
    content: `Our Services interact with smart contracts deployed on the Solana blockchain. You acknowledge and accept the following risks:`,
    items: [
      "Smart contracts may contain bugs or vulnerabilities despite auditing and testing",
      "Blockchain networks may experience congestion, downtime, or forks that affect transaction execution",
      "On-chain transactions are irreversible. Torque cannot reverse, cancel, or modify confirmed transactions",
      "Regulatory changes may affect the legality or functionality of blockchain-based services in your jurisdiction",
      "Third-party protocols integrated with Torque may have their own risks, and Torque is not responsible for their failures",
    ],
  },
  {
    title: "11. Disclaimers",
    content: `THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, TORQUE DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:`,
    items: [
      "MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT",
      "THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE",
      "THAT ANY DEFECTS WILL BE CORRECTED",
      "THAT THE SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS",
    ],
    footer: `TORQUE DOES NOT PROVIDE FINANCIAL, INVESTMENT, TAX, OR LEGAL ADVICE. NOTHING IN OUR SERVICES CONSTITUTES A SOLICITATION, RECOMMENDATION, OR ENDORSEMENT OF ANY TOKEN, PROTOCOL, OR INVESTMENT STRATEGY.`,
  },
  {
    title: "12. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TORQUE LABS, ITS FOUNDERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:

Loss of profits, revenue, or data; loss of digital assets or tokens; cost of substitute services; damages arising from unauthorized access to or alteration of your data or transactions; damages arising from smart contract failures, blockchain network issues, or third-party protocol failures.

IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO TORQUE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).`,
  },
  {
    title: "13. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Torque Labs and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from:`,
    items: [
      "Your use of the Services",
      "Your violation of these Terms",
      "Your violation of any applicable law or regulation",
      "Your violation of any third-party rights",
      "Any campaign you create or manage through Torque",
    ],
  },
  {
    title: "14. Dispute Resolution",
    content: `Any dispute arising from or relating to these Terms or your use of the Services shall be resolved through binding arbitration administered in accordance with the rules of the American Arbitration Association (AAA). Arbitration shall take place in Delaware, United States, and shall be conducted in English.

You agree to waive any right to a jury trial and to participate in a class action lawsuit or class-wide arbitration.

Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights.`,
  },
  {
    title: "15. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.`,
  },
  {
    title: "16. Modifications to Terms",
    content: `We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Material changes may be communicated via email or platform notification.

Your continued use of the Services after changes are posted constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you must discontinue use of the Services.`,
  },
  {
    title: "17. Termination",
    content: `We may suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Upon termination:`,
    items: [
      "Your right to use the Services ceases immediately",
      "Any pending rewards may be forfeited if your account was terminated for violation of these Terms",
      "Provisions that by their nature should survive termination (including disclaimers, limitation of liability, indemnification, and dispute resolution) shall survive",
    ],
    footer: `You may stop using the Services at any time by disconnecting your wallet.`,
  },
  {
    title: "18. Severability",
    content: `If any provision of these Terms is found to be invalid or unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: "19. Entire Agreement",
    content: `These Terms, together with our Privacy Policy, constitute the entire agreement between you and Torque regarding your use of the Services, and supersede all prior agreements and understandings.`,
  },
  {
    title: "20. Contact Us",
    content: `If you have questions about these Terms, contact us at:

Torque Labs
Email: legal@torque.so
Website: https://torque.so`,
  },
];

export default function TermsPage() {
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
              Terms of Service
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

                {"items" in section && section.items && (
                  <ul className="space-y-2 mb-4">
                    {section.items.map((item, i) => (
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
