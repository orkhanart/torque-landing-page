import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-card backdrop-blur-lg border-t border-border/10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 px-6 sm:px-8 text-white max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logos/LogoPurple.svg" alt="Torque logo" width={32} height={32} />
          </Link>
          <p className="text-secondary-foreground text-sm text-center sm:text-right">
            © {new Date().getFullYear()} Torque. All rights reserved.
          </p>
        </div>
        
        
        <a
          href="https://x.com/torqueprotocol"
          target="_blank"
          rel="noopener noreferrer"
          >
          <FaXTwitter className="w-6 h-6 text-secondary" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;



