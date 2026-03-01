"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCRAMBLE_CHARS } from "@/app/data/stats";

const TORQUE_TEXT = "TORQUE";

function ScrambleLetter({ char }: { char: string }) {
  const [display, setDisplay] = useState(char);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countRef = useRef(0);

  useEffect(() => {
    if (isHovered) {
      countRef.current = 0;
      intervalRef.current = setInterval(() => {
        countRef.current++;
        if (countRef.current > 6) {
          setDisplay(char);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setDisplay(SCRAMBLE_CHARS.text[Math.floor(Math.random() * SCRAMBLE_CHARS.text.length)]);
        }
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplay(char);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, char]);

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="invisible">{char}</span>
      <span className="absolute inset-0 flex items-center justify-center">{display}</span>
    </span>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const productLinks = [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Playbooks", href: "/playbooks" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ];


  const socialLinks = [
    { icon: FaXTwitter, href: "https://x.com/torqueprotocol", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@torque.so", label: "Email" },
  ];

  return (
    <footer className="w-full overflow-hidden relative bg-blue">

      {/* Big TORQUE Text */}
      <div className="relative z-10 w-full" data-animate="fade-in">
        <div
          className="text-[20vw] font-bold leading-[0.85] tracking-[-0.05em] text-white/10 select-none overflow-hidden"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          {TORQUE_TEXT.split("").map((char, i) => (
            <ScrambleLetter key={i} char={char} />
          ))}
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
              Torque exists to replace &ldquo;vibes-based&rdquo; marketing with deterministic, programmable ROI. No waste. Just growth.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="strobe-glitch w-10 h-10 rounded-[3px] border border-white bg-transparent flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              {productLinks.map((link) => (
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

          {/* Company Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
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

          {/* CTA Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">
              Get Started
            </h4>
            <p className="text-white/60 text-sm mb-6">
              Ready to engineer protocol equilibrium?
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
