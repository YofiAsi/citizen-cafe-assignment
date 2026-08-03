import type { ReactNode } from "react";
import { cn } from "./cn";

type ContainerProps = {
  /** Wide bleed variant (Bible §8: multiple max-width tokens, not one container). */
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

export function Container({ wide = false, className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-md tablet:px-lg",
        wide ? "max-w-wide" : "max-w-content",
        className,
      )}
    >
      {children}
    </div>
  );
}
