import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";

const auditInfo = {
  title: "Audited by Industry Leaders in Crypto",

  audits: [
    {
      auditor: "OtterSec",
      logo: "/logos/ottersec.png", // You'll need to add this logo
      status: "Completed",
      date: "Q2 2025",
      description:
        "Comprehensive security audit covering smart contracts and protocol logic",
      badge: "Passed",
    },
    {
      auditor: "Halborn",
      logo: "/logos/halborn.png", // You'll need to add this logo
      status: "Completed",
      date: "Q3 2024",
      description: "Penetration testing and vulnerability assessment",
      badge: "Passed",
    },
  ],
};

export function AuditSection({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-12", className)}>
      <div className="text-center mb-8">
        <SectionTitle
          title={auditInfo.title}
          as="h2"
          className="mb-4 text-center mx-auto"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-black/40 border border-[#A1FFFF]/20 rounded-lg p-4 relative overflow-hidden group hover:border-[#A1FFFF]/40 transition-all duration-300">
          {/* Cyan accent border with gradient */}
          <div className="absolute top-0 left-0 bottom-0 h-full w-1 bg-gradient-to-b from-[#A1FFFF] to-[#F1A3A1]"></div>

          {/* Geometric accent in bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#A1FFFF]/30"></div>

          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#A1FFFF]/20 to-[#F1A3A1]/20 rounded-lg flex items-center justify-center border border-[#A1FFFF]/20">
                <span className="text-[#A1FFFF] font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">OtterSec</h3>
                <p className="text-[#A1FFFF] text-xs font-medium">
                  Completed • Q2 2025
                </p>
              </div>
            </div>
            <span className="bg-gradient-to-r from-[#A1FFFF]/20 to-[#F1A3A1]/20 text-[#A1FFFF] px-2 py-1 rounded-full text-xs font-medium border border-[#A1FFFF]/20">
              Passed
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Comprehensive security audit covering smart contracts and protocol
            logic
          </p>
        </div>
      </div>
    </div>
  );
}
