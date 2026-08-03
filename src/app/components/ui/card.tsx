import type { ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  /** Adds the gentle hover lift (Bible §10: no dramatic e-commerce hover). */
  interactive?: boolean;
};

export function Card({ interactive = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border-subtle bg-surface-raised p-lg",
        interactive && "transition-shadow duration-150 ease-soft hover:shadow-card-hover",
        className,
      )}
      {...rest}
    />
  );
}
