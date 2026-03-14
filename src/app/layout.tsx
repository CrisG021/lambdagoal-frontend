import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LambdaGoal Alpha | Terminal",
  description: "Elite Sports Betting Archaeology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}