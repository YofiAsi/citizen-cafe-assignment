"use client";

import type { ReactNode } from "react";
import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Select } from "radix-ui";
import type { Selection } from "./selection";
import { levelColor } from "./level-map";
import { selectionHref, type SelectionParams } from "./selection-url";
import { warmUp } from "@/app/components/flashcards/sound";
import { cn } from "@/app/components/ui/cn";
import { Text } from "@/app/components/ui/text";

/**
 * The cascading tier → level → type picker (plan 6b, brief "Core UX").
 *
 * Each dropdown narrows the next: choosing a tier filters the levels, and the
 * type dropdown appears only for levels that have packs. Choices are URL state
 * (plan 6a) and the whole taxonomy is already in props, so narrowing is done in
 * memory — the choice shows immediately (optimistic) while the URL catches up.
 */

export type DeckPickerProps = {
  selection: Selection;
};

/* Bible §10 form rules: white surface, thin border, nothing browser-default. */
const TRIGGER_CLASSES =
  "flex w-full items-center justify-between gap-sm rounded-sm border border-border-subtle bg-surface-raised px-md py-sm font-sans text-label text-text-primary transition-colors duration-150 ease-soft hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-text-muted";

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    // Fixed width so the row keeps its rhythm as labels change length; the
    // fields wrap to a stack when the viewport is too narrow for the row.
    <div className="flex w-full flex-col gap-xs mobile:w-72">
      <Text variant="label" as="label" className="text-text-muted">
        {label}
      </Text>
      {children}
      {hint ? (
        <Text variant="meta" as="p">
          {hint}
        </Text>
      ) : null}
    </div>
  );
}

type Option = { slug: string; label: string; dotColor?: string };

function Dropdown({
  value,
  options,
  placeholder,
  disabled = false,
  ariaLabel,
  onChange,
}: {
  value: string | null;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
  ariaLabel: string;
  onChange: (slug: string) => void;
}) {
  const selected = options.find((option) => option.slug === value);
  return (
    <Select.Root
      value={value ?? undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <Select.Trigger className={TRIGGER_CLASSES} aria-label={ariaLabel}>
        <Select.Value placeholder={placeholder}>
          {selected ? (
            <span className="flex items-center gap-sm">
              {selected.dotColor ? (
                <span
                  aria-hidden
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: selected.dotColor }}
                />
              ) : null}
              {selected.label}
            </span>
          ) : null}
        </Select.Value>
        <Select.Icon>
          <Chevron />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-10 w-(--radix-select-trigger-width) rounded-sm border border-border-subtle bg-surface-raised p-xs shadow-card-hover"
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.slug}
                value={option.slug}
                className="flex cursor-pointer items-center gap-sm rounded-sm px-sm py-xs font-sans text-label outline-none select-none data-highlighted:bg-surface-base data-[state=checked]:font-semibold"
              >
                {option.dotColor ? (
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: option.dotColor }}
                  />
                ) : null}
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function DeckPicker({ selection }: DeckPickerProps) {
  const router = useRouter();
  // Each choice is a navigation; the transition keeps the old deck on screen
  // and gives us a pending flag instead of a blank frame. The optimistic copy
  // moves the dropdowns on click rather than a round trip later — it falls
  // back to the server's answer once the navigation settles, which is also
  // what makes back/forward land on the right options.
  const [pending, startTransition] = useTransition();
  const [choice, setChoice] = useOptimistic<SelectionParams>({
    tier: selection.tier ?? undefined,
    level: selection.level ?? undefined,
    type: selection.type ?? undefined,
  });

  function go(next: SelectionParams) {
    startTransition(() => {
      setChoice(next);
      router.push(selectionHref(next));
    });
  }

  // Narrowed from the catalog already in props — no request per step.
  const levels = choice.tier ? (selection.levelsByTier[choice.tier] ?? []) : [];
  const types = choice.level ? (selection.typesByLevel[choice.level] ?? []) : [];
  const hasTypes = types.length > 0;
  const needsType = hasTypes && !choice.type;

  return (
    // Decoding the card sounds on first contact means the deck's deal-in
    // ladder is ready by the time a choice lands.
    <div
      onPointerDown={warmUp}
      className={cn(
        "flex flex-wrap items-start gap-lg transition-opacity duration-150 ease-soft",
        pending && "opacity-60",
      )}
    >
      <Field label="Tier">
        <Dropdown
          ariaLabel="Tier"
          value={choice.tier ?? null}
          options={selection.tiers}
          placeholder="Choose a tier"
          onChange={(tier) => go({ tier })}
        />
      </Field>

      <Field label="Level" hint={choice.tier ? undefined : "Pick a tier first."}>
        <Dropdown
          ariaLabel="Level"
          value={choice.level ?? null}
          options={levels.map((level) => ({
            ...level,
            dotColor: levelColor(level.slug),
          }))}
          placeholder="Choose a level"
          disabled={!choice.tier}
          onChange={(level) => go({ tier: choice.tier, level })}
        />
      </Field>

      {/* Only levels with packs get a third step (Dark Green, Turquoise, Indigo). */}
      {hasTypes ? (
        <Field label="Type" hint={needsType ? "Pick a type to start." : undefined}>
          <Dropdown
            ariaLabel="Type"
            value={choice.type ?? null}
            options={types}
            placeholder="Choose a type"
            onChange={(type) =>
              go({ tier: choice.tier, level: choice.level, type })
            }
          />
        </Field>
      ) : null}
    </div>
  );
}
