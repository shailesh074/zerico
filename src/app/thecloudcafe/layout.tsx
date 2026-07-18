import { Great_Vibes, Cormorant_Garamond } from "next/font/google";

// Calligraphy for flourishes; refined serif for headers, item names & prices.
const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export default function CloudCafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="cloudcafe"
      className={`${script.variable} ${serif.variable} min-h-svh bg-canvas`}
    >
      {children}
    </div>
  );
}
