import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DishLens — Your ingredients. More possibilities.",
  description: "Discover dishes using the ingredients already in your kitchen."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}