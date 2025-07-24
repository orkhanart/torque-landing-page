import { cn } from "@/lib/utils";

type TitleParts = {
  text: string;
  gradient?: boolean;
};

interface SectionTitleProps {
  title: string | TitleParts[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
}

export function SectionTitle({
  title,
  className,
  as = "h2",
}: SectionTitleProps) {
  const titleParts = typeof title === "string" ? [{ text: title }] : title;

  const Component = as;

  return (
    <Component
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
    </Component>
  );
}
