import type { ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

/**
 * Bible §10: primary CTA = yellow fill, dark text (never white on yellow),
 * compact rectangle, lightly rounded, clear hover and focus states.
 * Plain <button>; Radix-based behaviour arrives with milestone 6b.
 */
const variantClasses = {
  primary:
    "bg-brand-yellow text-brand-charcoal hover:bg-brand-yellow-hover active:bg-brand-yellow-pressed",
  secondary:
    "border border-border-strong bg-transparent text-text-primary hover:bg-surface-raised active:bg-border-subtle",
} as const;

type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-lg py-sm font-sans text-button",
        "transition-colors duration-150 ease-soft",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-charcoal",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
}
