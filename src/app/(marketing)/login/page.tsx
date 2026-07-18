import type { Metadata } from "next";
import { site } from "@/config/site";
import { LoginCard } from "@/components/marketing/LoginCard";

export const metadata: Metadata = {
  title: `Login — ${site.name}`,
  description: "Sign in to your Zerico café dashboard.",
};

export default function LoginPage() {
  return (
    <section className="mesh-warm relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-32">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative">
        <LoginCard />
      </div>
    </section>
  );
}
