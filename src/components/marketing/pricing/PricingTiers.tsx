import { Check } from "lucide-react";
import { pricingPlans } from "@/data/marketing/pricing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PricingTiers() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {pricingPlans.map((plan, i) => {
        const popular = plan.popular;
        return (
          <Reveal key={plan.id} delay={i * 90}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300",
                popular
                  ? "border-accent/40 bg-surface shadow-float ring-1 ring-accent/20 lg:-translate-y-3"
                  : "border-line bg-surface shadow-soft hover:-translate-y-1 hover:shadow-float",
              )}
            >
              {popular && (
                <Badge
                  variant="solid"
                  className="absolute -top-3 left-7 shadow-soft"
                >
                  Most popular
                </Badge>
              )}

              <h3 className="font-display text-xl font-semibold text-ink">
                {plan.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-ink">
                  ₹{plan.price}
                </span>
                <span className="text-sm text-subtle">{plan.period}</span>
              </div>

              <div className="my-6 h-px bg-line" />

              <ul className="flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[0.92rem] text-ink"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
                        popular
                          ? "bg-accent text-accent-ink"
                          : "bg-accent-soft text-accent",
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={plan.ctaHref}
                variant={popular ? "primary" : "secondary"}
                size="lg"
                className="mt-8 w-full"
              >
                {plan.ctaLabel}
              </Button>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
