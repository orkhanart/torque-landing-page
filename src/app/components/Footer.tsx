"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="w-full overflow-hidden relative bg-[#0000FF]">

      {/* Big TORQUE Text */}
      <div className="relative z-10 w-full">
        <div className="text-[20vw] font-bold leading-[0.85] tracking-[-0.05em] text-white/10 select-none overflow-hidden" style={{ fontFamily: "'Unbounded', sans-serif" }}>
          TORQUE
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
                  className="w-10 h-10 rounded-[3px] border border-white bg-transparent flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
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
      <div className="relative z-10 border-t border-white/10">
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

    </footer>
  );
};

export default Footer;
