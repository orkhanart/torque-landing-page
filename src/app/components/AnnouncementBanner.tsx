"use client";
import { CustomButton } from "@/components/ui/custom-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm z-[1001] border-b border-border/10">
      <div className="flex items-center justify-center py-3 bg-primary/30 text-white w-full">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="text-sm md:text-base text-black">
            Torque Labs announces $5 million fundraise
          </span>
          <CustomButton 
            buttonSize="small"
            buttonColor="primary"
            onClick={() => {}} 
            asLink={false}
            className="bg-secondary hover:bg-secondary/90"
          >
            Read more
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

