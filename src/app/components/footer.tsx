import React from "react";
import { CustomButton } from "@/components/ui/customButton";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row md:justify-between justify-center items-center gap-6 max-w-[1400px] pb-12 px-8">
      <div className="flex flex-row gap-4 md:visible invisible lg:items-center items-start justify-start  z-50 bg-transparent ">
        <Image src="/blue-logo.svg" alt="Torque" width={28} height={28} />
        <p className="text-tertiary">© 2025 Torque</p>
        {/* <p>Privacy Policy</p> */}
        {/* <p>Legal</p> */}
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-start sm:items-center sm:w-auto w-full z-50 bg-transparent">
        <div className="flex flex-row gap-4 items-center">
          <a
            href="https://x.com/torqueprotocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/x-logo.svg" alt="X" width={16} height={16} />
          </a>
          {/* <Image src="/discord-logo.svg" alt="Discord" width={19} height={19} /> */}
          {/* <p>Community</p> */}
          {/* <a
            href="https://docs.torque.so/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a> */}
        </div>
      </div>
      <div className="flex flex-row gap-4 md:hidden items-start sm:items-center sm:w-auto w-full z-50 bg-transparent">
        <Image src="/blue-logo.svg" alt="Torque" width={28} height={28} />
        <p className="text-tertiary">© 2025 Torque</p>
        <p>Privacy Policy</p>
        <p>Legal</p>
      </div>
      {/* <Image src="/Glowing.png" alt="sparkle" width={1400} height={1400} className=" absolute bottom-0 left-0 w-full h-full" /> */}
    </footer>
  );
};

export default Footer;
