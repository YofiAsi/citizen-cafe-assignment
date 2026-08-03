import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
