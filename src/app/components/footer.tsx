import React from "react";
import { CustomShapeButton } from "@/components/ui/customShapeButton";


const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row md:justify-between justify-start items-center gap-6">
      <div className="flex flex-row gap-4 md:visible invisible items-center">
        {/* <Image src="/logo.svg" alt="Torque" width={100} height={100} /> */}
        <p>© 2024 Torque</p>
        <p>Privacy Policy</p>
        <p>Legal</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-row gap-4 items-center">
          <p>X</p>
          <p>Discord</p>
          <p>Community</p>
          <p>Docs</p>
        </div>
        
        <CustomShapeButton>Launch App</CustomShapeButton>
      </div>
      <div className="flex flex-row gap-4 md:hidden items-center">
        {/* <Image src="/logo.svg" alt="Torque" width={100} height={100} /> */}
        <p>© 2024 Torque</p>
        <p>Privacy Policy</p>
        <p>Legal</p>
      </div>
       
    </footer>
  )
}

export default Footer;