"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="w-full bg-white border-t border-black/10">
      {/* CTA Section */}
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-20">
        <div className="border border-black p-8 md:p-12 text-center max-w-2xl mx-auto rounded-[3px]">
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-black mb-4">
            See how much you could save on incentives
          </h3>
          <p className="text-black/60 mb-8">
            Join 15+ leading Solana protocols using Torque to optimize their growth spend.
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="group">
            Book a Strategy Call
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-black/10">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Logo & Copyright */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logos/torque-symbol.svg"
                  alt="Torque"
                  width={24}
                  height={21}
                  className="h-5 w-auto"
                />
              </Link>
              <span className="font-mono text-xs text-black/40">
                © {new Date().getFullYear()} Torque
              </span>
            </div>

            {/* Center: Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/platform"
                className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
              >
                Platform
              </Link>
              <Link
                href="/solutions"
                className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
              >
                Solutions
              </Link>
              <Link
                href="/playbooks"
                className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
              >
                Playbooks
              </Link>
              <Link
                href="/company"
                className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
              >
                Company
              </Link>
              <Link
                href="https://docs.torque.so/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
              >
                Docs
              </Link>
            </nav>

            {/* Right: Social */}
            <a
              href="https://x.com/torqueprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
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
