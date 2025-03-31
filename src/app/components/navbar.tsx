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

interface MenuItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

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
    <header className="flex justify-between items-center lg:pt-6 pt-12 text-white max-w-[1400px] w-full px-8 z-[999]">
      <Link href="/" className="flex items-center space-x-2 z-[999]">
        <Image src="/Logotype.svg" alt="Torque logo" width={110} height={32} />
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop menu */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <div className="w-4"></div>
          <NavigationMenuItem>
            <CustomButton href="https://platform.torque.so">
              Client Login
            </CustomButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="absolute top-16 left-0 right-0 bg-[#0a0a0a]/10 
        md:hidden z-50 backdrop-blur-lg w-full overflow-hidden 
        transition-[max-height] duration-300 ease-in-out mt-4
        "
        style={{ maxHeight: `${menuHeight}px` }}
      >
        <div className="p-4 flex flex-col space-y-2 justify-end items-end pt-8 pb-12 ">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-8 justify-end items-end w-full">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} !text-3xl !font-sans`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <CustomButton customVariant="big" href="https://app.torque.so">
                  Launch app
                </CustomButton>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[rgba(142,233,233,0)] via-[rgba(142,233,233,1)] to-[rgba(142,233,233,0)]"></div>
        </div>
      </div>
    </header>
  );
}
