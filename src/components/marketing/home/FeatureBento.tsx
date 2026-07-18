import {
  QrCode,
  LayoutDashboard,
  Images,
  BadgePercent,
  BarChart3,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { features, type FeatureIcon } from "@/data/marketing/features";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<FeatureIcon, LucideIcon> = {
  qr: QrCode,
  dashboard: LayoutDashboard,
  gallery: Images,
  offers: BadgePercent,
  analytics: BarChart3,
  website: Globe,
};

const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-6",
];

export function FeatureBento() {
  return (
    <div className="mt-14 grid gap-4 lg:grid-cols-6">
      {features.map((feature, i) => {
        const Icon = iconMap[feature.icon];
        const wide = spans[i] === "lg:col-span-6";
        return (
          <Reveal key={feature.id} delay={i * 70} className={spans[i]}>
            <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-float sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6">
                <Icon className="size-[1.35rem]" strokeWidth={1.75} />
              </span>
              <h3 className="font-display mt-5 text-xl font-medium text-ink">
                {feature.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted",
                  wide && "max-w-xl",
                )}
              >
                {feature.description}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
