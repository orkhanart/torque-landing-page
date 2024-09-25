"use client"
import { useState } from 'react';
import Link from 'next/link';
import { CustomButton } from "@/components/ui/customButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/community', label: 'Community' },
    { href: '/docs', label: 'Docs' },
  ]

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-[#0a0a0a] text-white max-w-[1400px] w-full">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/Logotype.svg" alt="Torque logo" width={110} height={32} />
      </Link>
      
      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className='w-4'></div>
          <NavigationMenuItem>
            <CustomButton>
              Launch app
            </CustomButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a0a0a] p-4 md:hidden z-50">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <CustomButton>
                  Launch app
                </CustomButton>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  )
}