"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CustomButton } from "@/components/ui/customButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

  const menuItems: MenuItem[] = [];

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
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-[1000]">
        <div className="flex justify-between items-center py-4 px-5 text-white max-w-[1400px] mx-auto w-full">
          <Link href="/" className="flex items-center space-x-2 z-[999]">
            <Image src="/Logotype.svg" alt="Torque logo" width={110} height={32} />
          </Link>

          {/* Request Access Button */}
          <CustomButton 
            customVariant="header" 
            onClick={() => setShowModal(true)}
            className="shadow-[0px_0px_20px_0px_rgba(161,255,255,0.3)]"
            isLink={false}
          >
            Request Access
          </CustomButton>
        </div>
      </header>

      {/* Spacer to account for fixed header */}
      <div className="h-16"></div>

      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
