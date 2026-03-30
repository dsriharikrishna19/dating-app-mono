import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import RootProvider from "@/components/providers/RootProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Friendly Buddy | Find Your Perfect Match",
  description: "Join the most premium dating app to find meaningful connections and real chemistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.variable} antialiased`}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
