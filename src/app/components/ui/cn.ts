/** Join class names, dropping falsy entries. Dependency-free by design. */
export function cn(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
