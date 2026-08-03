import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Container } from "@/app/components/ui/container";
import { Heading } from "@/app/components/ui/heading";
import { Section } from "@/app/components/ui/section";
import { Text } from "@/app/components/ui/text";

/* Placeholder home page — replaced by the real selection flow in milestone 6b. */
export default function Home() {
  return (
    <main>
      <Section spacing="spacious">
        <Container>
          <Heading variant="display">Citizen Café — Hebrew Flashcards</Heading>
          <Text className="mt-md">
            Scaffold placeholder. The app is under construction.
          </Text>

          <Card interactive className="mt-xl max-w-prose animate-fade-up">
            <Text variant="meta">Foundation · Red</Text>
            {/* Hebrew vocabulary always renders in Assistant (plan 8b font
                strategy); explicit dir/lang per src/app/CLAUDE.md. */}
            <p dir="rtl" lang="he" className="mt-sm font-sans text-h1">
              שָׁלוֹם
            </p>
            <Text className="mt-sm">Hello / Peace</Text>
          </Card>

          <div className="mt-xl flex gap-md">
            <Button>Next</Button>
            <Button variant="secondary">Shuffle</Button>
          </div>

          <Text variant="meta" as="p" className="mt-xl">
            <Link href="/design" className="underline hover:text-text-primary">
              Design system showcase →
            </Link>{" "}
            ·{" "}
            <Link href="/dev/cards" className="underline hover:text-text-primary">
              Card deck harness →
            </Link>
          </Text>
        </Container>
      </Section>
    </main>
  );
}
