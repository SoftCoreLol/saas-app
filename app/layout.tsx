import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ColorBends from "@/components/ColorBends";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <div className="absolute inset-0 z-[-1]">
            <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={30}
              speed={0.3}
              scale={1.2}
              frequency={1.4}
              warpStrength={1.2}
              mouseInfluence={0.8}
              parallax={0.6}
              noise={0.08}
              transparent
            />
          </div>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
