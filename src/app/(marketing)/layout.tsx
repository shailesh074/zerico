import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

/**
 * Marketing shell — scopes the Zerico brand theme and wraps every marketing
 * page with the shared Navbar + Footer. The restaurant module (`/[slug]`)
 * lives outside this group and is unaffected.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="zerico" className="flex min-h-svh flex-col bg-canvas">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
