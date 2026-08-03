import type { Metadata } from "next";
import { CardDeck, type DeckCard } from "@/app/components/flashcards/card-deck";
import { Container } from "@/app/components/ui/container";
import { Heading } from "@/app/components/ui/heading";
import { Section } from "@/app/components/ui/section";
import { Text } from "@/app/components/ui/text";

/* Harness for the flashcard deck (plan 7a) — renders it against fixed sample
   cards, with no database. The product page arrives with milestone 7b. */

export const metadata: Metadata = {
  title: "Card Deck Harness — Citizen Café",
  description: "Renders the flashcard deck against sample cards.",
};

const SAMPLE_CARDS: DeckCard[] = [
  { id: "sample-1", hebrew: "שָׁלוֹם", english: "Hello / Peace" },
  { id: "sample-2", hebrew: "תּוֹדָה", english: "Thank you" },
  { id: "sample-3", hebrew: "בְּבַקָּשָׁה", english: "Please / You're welcome" },
  { id: "sample-4", hebrew: "מַיִם", english: "Water" },
  { id: "sample-5", hebrew: "אַהֲבָה", english: "Love" },
  { id: "sample-6", hebrew: "חָבֵר", english: "Friend" },
];

export default function CardDeckHarnessPage() {
  return (
    <main>
      <Section spacing="regular">
        <Container>
          <Text variant="meta" as="p">
            Harness · flashcard deck
          </Text>
          <Heading variant="h1" className="mt-sm">
            Card deck
          </Heading>
          <Text className="mt-md mb-xl max-w-prose">
            Tap the top card to flip it. Next sends the top card to the back of
            the deck; Shuffle drops the deck out of frame and stacks it back up
            in a new order.
          </Text>
          <CardDeck
            cards={SAMPLE_CARDS}
            label="Foundation · Red"
            levelSlug="red"
          />
        </Container>
      </Section>
    </main>
  );
}
