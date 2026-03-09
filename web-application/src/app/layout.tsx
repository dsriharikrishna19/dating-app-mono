import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import NavbarSwitcher from "@/components/layout/NavbarSwitcher";

export const metadata: Metadata = {
  title: "Spark - Find Your Connection",
  description: "Modern dating platform for genuine connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavbarSwitcher />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
