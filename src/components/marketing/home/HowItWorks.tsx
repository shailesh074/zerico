import { Palette, ScanLine, LineChart, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Palette,
    title: "We build your page",
    description:
      "Send us your menu and photos. We craft your premium Zerico page and hand you a ready-to-print QR code.",
  },
  {
    icon: ScanLine,
    title: "Share your QR",
    description:
      "Put it on tables, the counter, your window — anywhere. Guests scan and browse instantly, no app needed.",
  },
  {
    icon: LineChart,
    title: "Manage & grow",
    description:
      "Update dishes, run offers, and see what guests love — right from your dashboard, whenever you like.",
  },
];

export function HowItWorks() {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 100}>
          <div className="relative flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-7">
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-lg font-semibold text-canvas">
                {i + 1}
              </span>
              <step.icon className="size-6 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="font-display mt-6 text-xl font-medium text-ink">
              {step.title}
            </h3>
            <p className="mt-2.5 text-pretty text-[0.95rem] leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
