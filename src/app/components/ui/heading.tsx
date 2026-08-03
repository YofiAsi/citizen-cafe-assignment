import type { ElementType, ReactNode } from "react";
import { cn } from "./cn";

/** Brand-voice roles (Bible §6: Fedra = display/h1/h2 only). */
const variantClasses = {
  display: "font-brand text-display",
  h1: "font-brand text-h1",
  h2: "font-brand text-h2",
} as const;

type HeadingVariant = keyof typeof variantClasses;

const defaultTag: Record<HeadingVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
};

type HeadingProps = {
  variant: HeadingVariant;
  /** Rendered tag when the document outline needs to differ from the visual role. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Heading({ variant, as, className, children }: HeadingProps) {
  const Tag = as ?? defaultTag[variant];
  return <Tag className={cn(variantClasses[variant], className)}>{children}</Tag>;
}
