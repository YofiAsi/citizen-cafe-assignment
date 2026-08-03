import type { Metadata } from "next";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Container } from "@/app/components/ui/container";
import { Heading } from "@/app/components/ui/heading";
import { Section } from "@/app/components/ui/section";
import { Text } from "@/app/components/ui/text";
import { cn } from "@/app/components/ui/cn";

/* Temporary showcase of the 8a tokens + 8b primitives. Not part of the
   product flow — remove or hide once the real pages land. */

export const metadata: Metadata = {
  title: "Design System — Citizen Café",
  description: "Token and primitive showcase for the Citizen Café flashcards app.",
};

const brandSwatches = [
  { name: "brand.yellow", fill: "bg-brand-yellow", on: "text-brand-charcoal" },
  { name: "brand.charcoal", fill: "bg-brand-charcoal", on: "text-text-inverse" },
  { name: "surface.base", fill: "bg-surface-base", on: "text-text-primary" },
  { name: "surface.raised", fill: "bg-surface-raised", on: "text-text-primary" },
  { name: "text.muted", fill: "bg-text-muted", on: "text-text-inverse" },
  { name: "border.subtle", fill: "bg-border-subtle", on: "text-text-primary" },
] as const;

const levelSwatches = [
  { name: "Red", fill: "bg-level-red", on: "text-level-red-on" },
  { name: "Orange", fill: "bg-level-orange", on: "text-level-orange-on" },
  { name: "Pink", fill: "bg-level-pink", on: "text-level-pink-on" },
  { name: "Yellow", fill: "bg-level-yellow", on: "text-level-yellow-on" },
  { name: "Light Blue", fill: "bg-level-light-blue", on: "text-level-light-blue-on" },
  { name: "Blue", fill: "bg-level-blue", on: "text-level-blue-on" },
  { name: "Lime", fill: "bg-level-lime", on: "text-level-lime-on" },
  { name: "Green", fill: "bg-level-green", on: "text-level-green-on" },
  { name: "Dark Green", fill: "bg-level-dark-green", on: "text-level-dark-green-on" },
  { name: "Turquoise", fill: "bg-level-turquoise", on: "text-level-turquoise-on" },
  { name: "Indigo", fill: "bg-level-indigo", on: "text-level-indigo-on" },
  { name: "Purple", fill: "bg-level-purple", on: "text-level-purple-on" },
] as const;

function Swatch({ name, fill, on }: { name: string; fill: string; on: string }) {
  return (
    <div
      className={cn(
        "flex h-24 items-end rounded-sm border border-border-subtle p-sm",
        fill,
      )}
    >
      <span className={cn("font-sans text-meta", on)}>{name}</span>
    </div>
  );
}

function SpecimenLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text variant="meta" as="p" className="mb-xs">
      {children}
    </Text>
  );
}

export default function DesignPage() {
  return (
    <main>
      {/* ------------------------------------------------ Hero / typography */}
      <Section spacing="spacious">
        <Container>
          <Text variant="meta" as="p">
            Milestone 8 · design system showcase
          </Text>
          <Heading variant="display" className="mt-sm animate-fade-up">
            Warm belonging through modern Hebrew
          </Heading>
          <Text className="mt-md max-w-prose">
            Every colour, type role, and space on this page resolves to a
            Design Bible token — nothing is styled ad hoc.
          </Text>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Type roles */}
      <Section spacing="regular">
        <Container>
          <Heading variant="h2">Typography roles</Heading>
          <div className="mt-lg flex flex-col gap-lg">
            <div>
              <SpecimenLabel>display.hero — brand serif</SpecimenLabel>
              <Heading variant="display" as="p">
                Learn Hebrew, live Tel Aviv
              </Heading>
            </div>
            <div>
              <SpecimenLabel>heading.h1 — brand serif</SpecimenLabel>
              <Heading variant="h1" as="p">
                Foundation, Flow, Freedom
              </Heading>
            </div>
            <div>
              <SpecimenLabel>heading.h2 — brand serif</SpecimenLabel>
              <Heading variant="h2" as="p">
                Pick a level, flip a card
              </Heading>
            </div>
            <div>
              <SpecimenLabel>body.default — Assistant, Hebrew included</SpecimenLabel>
              <Text className="max-w-prose">
                Assistant carries all functional text and every Hebrew word.{" "}
                <span dir="rtl" lang="he">
                  שָׁלוֹם, תּוֹדָה, בְּבַקָּשָׁה
                </span>
              </Text>
            </div>
            <div>
              <SpecimenLabel>ui.label / meta.small — Assistant</SpecimenLabel>
              <Text variant="label" as="p">
                Level dropdown label
              </Text>
              <Text variant="meta" as="p" className="mt-xs">
                12 cards · Foundation tier
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Colours */}
      <Section spacing="regular">
        <Container>
          <Heading variant="h2">Brand & surface colours</Heading>
          <div className="mt-lg grid grid-cols-2 gap-md tablet:grid-cols-3 desktop:grid-cols-6">
            {brandSwatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>

          <Heading variant="h2" className="mt-xl">
            Level colours
          </Heading>
          <Text variant="meta" as="p" className="mt-xs">
            Provisional values — final hexes land with taxonomy spec 4a. Each
            fill pairs with an AA-checked on-colour.
          </Text>
          <div className="mt-lg grid grid-cols-2 gap-md tablet:grid-cols-4 desktop:grid-cols-6">
            {levelSwatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------- Controls & surfaces */}
      <Section spacing="regular">
        <Container>
          <Heading variant="h2">Buttons & cards</Heading>
          <div className="mt-lg flex flex-wrap items-center gap-md">
            <Button>Next card</Button>
            <Button variant="secondary">Shuffle</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="mt-xl grid gap-lg tablet:grid-cols-2">
            <Card interactive className="animate-fade-in">
              <Text variant="meta">Foundation · Red</Text>
              <p dir="rtl" lang="he" className="mt-sm font-sans text-h1">
                שָׁלוֹם
              </p>
              <Text className="mt-sm">Hello / Peace</Text>
            </Card>
            <Card interactive className="animate-fade-up rounded-br-signature">
              <Text variant="meta">Signature curve corner</Text>
              <Text className="mt-sm max-w-prose">
                The quarter-circle moment from the Bible, straight from the
                radius token. Hover either card for the gentle lift — no
                dramatic e-commerce motion.
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ Dark rhythm band */}
      <Section spacing="regular" className="bg-surface-dark">
        <Container>
          <Heading variant="h2" className="text-text-inverse">
            Dark bands create pacing
          </Heading>
          <Text className="mt-md max-w-prose text-text-inverse">
            Charcoal sections punctuate the warm off-white field — testimonial
            strips and the footer will live on this surface.
          </Text>
          <Button className="mt-lg">Yellow stays the accent</Button>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Spacing */}
      <Section spacing="regular">
        <Container>
          <Heading variant="h2">Spacing scale</Heading>
          <div className="mt-lg flex flex-col gap-sm">
            {(
              [
                ["xs", "w-xs"],
                ["sm", "w-sm"],
                ["md", "w-md"],
                ["lg", "w-lg"],
                ["xl", "w-xl"],
              ] as const
            ).map(([name, width]) => (
              <div key={name} className="flex items-center gap-md">
                <Text variant="meta" className="w-lg">
                  {name}
                </Text>
                <div className={cn("h-4 rounded-sm bg-brand-yellow", width)} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
