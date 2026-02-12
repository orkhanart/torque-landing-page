"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";
import { ArrowUpRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { motion, useInView } from "framer-motion";
import { EnergyField } from "@/components/EnergyField";
import { DistortedText } from "@/components/DistortedText";

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

  return (
    <footer className="w-full bg-blue overflow-hidden">
      {/* CTA Section */}
      <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32" ref={ctaRef}>
        {/* Energy Field Background */}
        <EnergyField className="opacity-50" />

        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider text-white/60 border border-white/20 px-3 py-1.5 rounded-[3px]"
          >
            <Terminal className="w-3 h-3" />
            <span>Ready to Optimize</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white uppercase"
          >
            Ready to optimize your
            <br />
            <span className="text-white/40">liquidity?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-white/60 mb-10 max-w-xl mx-auto"
          >
            Launch campaigns that target the real issues, not vanity metrics.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="inverse"
              className="group"
            >
              Get audited
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Huge TORQUE Typography with Distortion */}
      <div className="relative w-full" style={{ marginTop: "-4vw" }}>
        <DistortedText
          text="TORQUE"
          className="text-[28vw] text-white/10"
        />
      </div>

      {/* Footer Content */}
      <div className="w-full px-6 py-16">
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
      <div className="border-t border-white/20">
        <div className="w-full px-6 py-6">
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
