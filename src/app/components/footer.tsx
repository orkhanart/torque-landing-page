import React from "react";
import { CustomButton } from "@/components/ui/customButton";
import Image from "next/image";


const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row md:justify-between justify-start items-center gap-6 max-w-[1400px]">
      <div className="flex flex-row gap-4 md:visible invisible items-center">
        <Image src="/blue-logo.svg" alt="Torque" width={28} height={28} />
        <p className="text-tertiary">© 2024 Torque</p>
        <p>Privacy Policy</p>
        <p>Legal</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-row gap-4 items-center">
          <Image src="/x-logo.svg" alt="X" width={16} height={16} />
          <Image src="/discord-logo.svg" alt="Discord" width={19} height={19} />
          <p>Community</p>
          <p>Docs</p>
        </div>
        <CustomButton>Launch App</CustomButton>
      </div>
      <div className="flex flex-row gap-4 md:hidden items-center">
        <Image src="/blue-logo.svg" alt="Torque" width={28} height={28} />
        <p className="text-tertiary">© 2024 Torque</p>
        <p>Privacy Policy</p>
        <p>Legal</p>
      </div>
       
    </footer>
  )
}

export default Footer;