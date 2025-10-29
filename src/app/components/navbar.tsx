"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomButton } from "@/components/ui/customButton";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { ContactModal } from "./ContactModal";

interface MenuItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Docs", href: "/docs" },
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
      <header className="fixed top-[52px] left-0 right-0 bg-card backdrop-blur-lg z-[1000] border-b border-border/10">
        <div className="flex justify-between items-center py-4 px-6 md:px-8 text-white max-w-[1600px] mx-auto w-full">
          <Link href="/" className="flex items-center space-x-2 z-[999]">
            <Image src="/logos/LogoNewFull.svg" alt="Torque logo" width={130} height={32} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href}>
                  <span className={`transition-colors ${
                    isActive 
                      ? 'text-secondary' 
                      : 'text-secondary-foreground hover:text-black'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Request Access Button */}
          <div className="hidden lg:block">
            <CustomButton 
              buttonSize="small"
              buttonColor="primary"
              onClick={() => setShowModal(true)}
              className="shadow-[0px_0px_20px_0px_rgba(161,255,255,0.3)]"
              asLink={false}
            >
              Request Access
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-[999] text-secondary p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border/10"
          style={{ maxHeight: `${menuHeight}px` }}
        >
          <nav className="px-5 py-4 space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block transition-colors py-2 ${
                    isActive 
                      ? 'text-secondary' 
                      : 'text-secondary-foreground hover:text-black'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <CustomButton 
                buttonSize="small"
                buttonColor="primary"
                onClick={() => {
                  setShowModal(true);
                  closeMenu();
                }}
                className="w-full shadow-[0px_0px_20px_0px_rgba(161,255,255,0.3)]"
                asLink={false}
              >
                Request Access
              </CustomButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer to account for fixed header and banner */}
      <div className="h-[116px]"></div>

      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
