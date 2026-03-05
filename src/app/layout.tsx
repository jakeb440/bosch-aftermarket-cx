import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bosch Aftermarket Services CX Diagnostic",
  description:
    "Customer experience diagnostic for Bosch domestic appliances aftermarket services — synthesized from consumer feedback and competitive benchmarking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
