"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const pathname = usePathname();

  // Rotate symbol on scroll
  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY * 0.15; // Adjust speed with multiplier
      setScrollRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Playbooks", href: "/playbooks" },
    { label: "Company", href: "/company" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      const menuElement = document.getElementById("mobile-menu");
      if (menuElement) {
        setMenuHeight(menuElement.scrollHeight);
      }
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-[1000] border-b border-black/10">
        <div className="flex items-center h-16 px-6 w-full">
          {/* Left: Logo Symbol */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logos/torque-symbol.svg"
              alt="Torque"
              width={32}
              height={28}
              className="h-7 w-auto transition-transform duration-100"
              style={{ transform: `rotate(${scrollRotation}deg)` }}
            />
          </Link>

          {/* Separator line */}
          <div className="hidden lg:block w-px h-8 bg-black/10 mx-8" />

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 font-body text-sm transition-colors ${
                    isActive
                      ? "text-black font-medium"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              href="https://docs.torque.so"
              external
              size="sm"
            >
              Docs
            </Button>
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Launch App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden ml-auto p-2 hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-black/10"
          style={{ maxHeight: `${menuHeight}px` }}
        >
          <nav className="px-6 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block py-3 font-body text-sm transition-colors ${
                    isActive
                      ? "text-black font-medium"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 space-y-3 border-t border-black/10 mt-2">
              <Button
                variant="outline"
                href="https://docs.torque.so"
                external
                className="w-full"
              >
                Docs
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full"
              >
                Launch App
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer to account for fixed header */}
      <div className="h-16" />

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
