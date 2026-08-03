import Image from "next/image";
import { getCards } from "@/application/services/catalog";
import { DeckPicker } from "@/app/components/catalog/deck-picker";
import { resolveSelection } from "@/app/components/catalog/selection";
import type { SelectionParams } from "@/app/components/catalog/selection-url";
import { CardDeck } from "@/app/components/flashcards/card-deck";
import { Container } from "@/app/components/ui/container";
import { Heading } from "@/app/components/ui/heading";
import { Section } from "@/app/components/ui/section";
import { Text } from "@/app/components/ui/text";

/**
 * The app's only page: choose a deck from the dropdowns, study it below them.
 * The choice lives in the URL (`/?tier=&level=&type=`), so this stays a server
 * component — it resolves the cascade and loads that deck's cards (plan 6a).
 */

/* Brand lockup — centred hero placement (Bible §7). Unoptimized because Next's
   image optimizer skips SVG unless `dangerouslyAllowSVG` is set. */
const LOGO = { src: "/images/cc-logo.svg", width: 280, height: 40 };

type HomeProps = {
  searchParams: Promise<SelectionParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const selection = await resolveSelection(await searchParams);
  const cards = selection.deck
    ? await getCards(selection.deck.levelId, selection.deck.typeId)
    : [];
  // Remounting on a new deck replays the deal-in animation (plan 7a).
  const deckKey = [selection.tier, selection.level, selection.type].join("/");

  return (
    <main>
      <Section spacing="compact">
        <Container>
          <header className="flex flex-col items-center text-center">
            <Image
              src={LOGO.src}
              width={LOGO.width}
              height={LOGO.height}
              alt="Citizen Café Tel Aviv"
              priority
              unoptimized
            />
            <Heading variant="h1" className="mt-lg mb-lg">
              Vocabulary Flashcard Game
            </Heading>
          </header>

          <DeckPicker selection={selection} />

          {/* No overflow clipping around the deck: it would flatten the 3D
              flip and cut the cards (src/app/CLAUDE.md). */}
          <div className="mt-xl flex min-h-96 flex-col items-center justify-center">
            {selection.deck && cards.length > 0 ? (
              <CardDeck key={deckKey} cards={cards} />
            ) : (
              <EmptyState empty={Boolean(selection.deck)} />
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}

/** Shown before the choice is complete, or when a chosen deck has no cards. */
function EmptyState({ empty }: { empty: boolean }) {
  return (
    <div className="flex h-52 w-80 flex-col items-center justify-center gap-sm rounded-md border border-dashed border-border-strong px-lg text-center">
      <Text variant="label">
        {empty ? "This deck has no cards yet" : "Choose a deck to start"}
      </Text>
      <Text variant="meta" as="p">
        {empty
          ? "Choose another level to keep going."
          : "Pick a tier and a level, then tap the card to reveal the English."}
      </Text>
    </div>
  );
}
