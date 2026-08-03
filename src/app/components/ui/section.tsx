import type { ReactNode } from "react";
import { cn } from "./cn";

/** Vertical rhythm tiers (Bible §8: compact / regular / spacious / feature). */
const spacingClasses = {
  compact: "py-section-compact",
  regular: "py-section-regular",
  spacious: "py-section-spacious",
  feature: "py-section-feature",
} as const;

type SectionSpacing = keyof typeof spacingClasses;

type SectionProps = {
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
};

export function Section({ spacing = "regular", className, children }: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)}>{children}</section>
  );
}
