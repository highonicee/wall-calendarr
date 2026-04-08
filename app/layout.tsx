import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar",
  description: "A minimal cute wall calendar with monthly floral themes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}