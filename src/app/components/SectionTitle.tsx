import { cn } from "@/lib/utils";

type TitleParts = {
  text: string;
  gradient?: boolean;
};

interface SectionTitleProps {
  title: string | TitleParts[];
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  const titleParts = typeof title === "string" ? [{ text: title }] : title;

  return (
    <h2
      className={cn(
        "text-4xl lg:text-5xl font-medium text-center xl:max-w-[1100px] md:max-w-[800px] leading-tight font-sans",
        className
      )}
    >
      {titleParts.map((part, index) => {
        return (
          <>
            {index > 0 && <span>&nbsp;</span>}
            <span
              key={`${index}-${part.text}`}
              className={cn(
                part.gradient &&
                  "bg-custom-gradient bg-clip-text text-transparent"
              )}
            >
              {part.text}
            </span>
          </>
        );
      })}
    </h2>
  );
}
