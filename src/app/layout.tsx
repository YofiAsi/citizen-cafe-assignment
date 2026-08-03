import type { Metadata } from "next";
import { assistant, frankRuhl } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citizen Café — Hebrew Flashcards",
  description: "Study Hebrew vocabulary with flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${assistant.variable} ${frankRuhl.variable}`}>
      <body className="bg-surface-base font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
