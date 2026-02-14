"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";
import { ArrowUpRight, Terminal, LayoutGrid, FileText, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { motion, useInView } from "framer-motion";
import { EnergyField } from "@/components/EnergyField";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const navLinks = [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Playbooks", href: "/playbooks" },
    { label: "Company", href: "/company" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "https://docs.torque.so/", external: true },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
  ];

  const socialLinks = [
    { icon: FaXTwitter, href: "https://x.com/torqueprotocol", label: "Twitter" },
    { icon: FaDiscord, href: "https://discord.gg/torque", label: "Discord" },
    { icon: FaGithub, href: "https://github.com/torque-labs", label: "GitHub" },
  ];

  const agencyFeatures = [
    {
      icon: LayoutGrid,
      title: 'Multi-Tenant "God View"',
      description: "Manage 10+ client protocols from a single login.",
    },
    {
      icon: FileText,
      title: "Whitelabel Reporting",
      description: "Auto-generate branded PDF reports for clients.",
    },
    {
      icon: Code,
      title: "Agency API",
      description: "Build custom dashboards on top of Torque.",
    },
  ];

  return (
    <footer className="w-full overflow-hidden relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-light via-blue to-[#000066]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />

      {/* Agencies & Partners Section */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-24" ref={ctaRef}>
        <EnergyField className="opacity-30" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-white/60 border border-white/20 px-3 py-1.5 rounded-[3px]">
              <Terminal className="w-3 h-3" />
              <span>For Agencies & Partners</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-white mb-4 leading-[1.1] tracking-tight">
              Run Your Growth Practice on Torque
            </h2>

            <p className="text-base text-white/60 max-w-xl mx-auto">
              Join agencies delivering 240% average ROI for their protocol clients.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto"
          >
            {agencyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-[3px] bg-white/5 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-[3px] bg-white/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-sm font-medium text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/50">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="inverse"
              className="group"
            >
              Apply for Partner Program
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button variant="inverse-ghost" href="https://docs.torque.so/">
              View Documentation
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-[4.5rem] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logos/torque-symbol.svg"
                alt="Torque"
                width={32}
                height={28}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              The growth protocol for Solana. Optimize incentives, maximize results.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-[3px] border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Get Started
            </h4>
            <p className="text-white/60 text-sm mb-6">
              Ready to optimize your growth strategy?
            </p>
            <Button
              href="https://app.torque.so"
              variant="inverse-outline"
            >
              Launch App
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/20">
        <div className="w-full px-6 md:px-8 lg:px-[4.5rem] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-xs text-white/50">
              © {currentYear} Torque Labs. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="font-mono text-xs text-white/50 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-mono text-xs text-white/50 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
