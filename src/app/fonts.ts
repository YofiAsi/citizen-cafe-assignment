import { Assistant, Frank_Ruhl_Libre } from "next/font/google";

/**
 * Functional/system voice (Bible §6 "Assistant = system").
 * Hebrew-first typeface — also covers all Hebrew vocabulary content.
 */
export const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

/**
 * Stand-in for Fedra Serif (Bible §6 "Fedra = voice") — Fedra is a commercial
 * Typotheque font with no licensed files in this repo (decision log #15).
 * The `--font-brand` token lists "Fedra Serif" first, so licensed files
 * loaded via next/font/local later take over without component changes.
 */
export const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank-ruhl",
  display: "swap",
});
