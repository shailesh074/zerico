import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { comparisonGroups, pricingPlans } from "@/data/marketing/pricing";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-grid size-5 place-items-center rounded-full bg-accent-soft text-accent">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  if (value === false) return <Minus className="size-4 text-subtle/60" />;
  return <span className="text-[0.9rem] font-medium text-ink">{value}</span>;
}

export function PricingComparison() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-soft">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="p-5 text-sm font-semibold text-muted">
              Compare plans
            </th>
            {pricingPlans.map((plan) => (
              <th key={plan.id} className="p-5 text-center">
                <span className="font-display block text-lg font-semibold text-ink">
                  {plan.name}
                </span>
                <span className="text-sm text-subtle">
                  ₹{plan.price}
                  {plan.period}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonGroups.map((group) => (
            <Fragment key={group.group}>
              <tr className="bg-canvas-2/50">
                <td
                  colSpan={4}
                  className="px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-wide text-accent"
                >
                  {group.group}
                </td>
              </tr>
              {group.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-line/70",
                    i === group.rows.length - 1 && "border-line",
                  )}
                >
                  <td className="p-5 text-[0.95rem] text-ink">{row.label}</td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center">
                      <Cell value={row.starter} />
                    </div>
                  </td>
                  <td className="bg-accent-soft/25 p-5 text-center">
                    <div className="flex justify-center">
                      <Cell value={row.business} />
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center">
                      <Cell value={row.pro} />
                    </div>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
