import { SectionTitle } from "./SectionTitle";
import { GeometricCard } from "./GeometricCard";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Leaderboards",
    description:
      "Lorem ipsum dolor sit amet adipisicing elit. Quisqua quo amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Raffles",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Airdrops",
    description:
      "Lorem ipsum dolor sit amet consectetur amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Custom",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisqua ma metquos.",
  },
];

const titleParts = [
  {
    text: "Enabling protocols to user their tokens as",
  },
  {
    text: "fuel for growth,",
    gradient: true,
  },
  {
    text: "by launching and iterating on",
  },
  {
    text: "large-scale incentive campaigns.",
    gradient: true,
  },
];

export function PlatformFeatures({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <SectionTitle title={titleParts} className="mb-20" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {features.map((feature) => (
          <GeometricCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
