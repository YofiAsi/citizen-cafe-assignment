import type { ElementType, ReactNode } from "react";
import { cn } from "./cn";

/** Functional-voice roles (Bible §6: Assistant = body, labels, metadata). */
const variantClasses = {
  body: "font-sans text-body",
  label: "font-sans text-label",
  meta: "font-sans text-meta text-text-muted",
} as const;

type TextVariant = keyof typeof variantClasses;

const defaultTag: Record<TextVariant, ElementType> = {
  body: "p",
  label: "span",
  meta: "span",
};

type TextProps = {
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Text({ variant = "body", as, className, children }: TextProps) {
  const Tag = as ?? defaultTag[variant];
  return <Tag className={cn(variantClasses[variant], className)}>{children}</Tag>;
}
