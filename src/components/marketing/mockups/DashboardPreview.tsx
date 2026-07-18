import { Plus, Pencil } from "lucide-react";

const nav = ["Overview", "Menu", "Gallery", "Offers", "Analytics"];
const rows = [
  { name: "Cloud Latte", price: "₹260", on: true },
  { name: "Butter Croissant", price: "₹180", on: true },
  { name: "House Granola Bowl", price: "₹290", on: false },
];

/** A stylised preview of the owner dashboard, for a browser frame. */
export function DashboardPreview() {
  return (
    <div className="flex bg-surface text-ink">
      {/* Sidebar */}
      <aside className="hidden w-36 shrink-0 flex-col gap-1 border-r border-line bg-surface-2/50 p-3 sm:flex">
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="grid size-5 place-items-center rounded-md bg-accent text-[0.6rem] font-bold text-accent-ink">
            Z
          </span>
          <span className="font-display text-sm font-semibold">Zerico</span>
        </div>
        {nav.map((item) => (
          <span
            key={item}
            className={`rounded-lg px-2.5 py-1.5 text-[0.72rem] font-medium ${
              item === "Menu"
                ? "bg-accent-soft text-accent"
                : "text-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-base font-semibold">Menu</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-semibold text-accent-ink">
            <Plus className="size-3" /> Add item
          </span>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.name}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5"
            >
              <span className="grid size-4 place-items-center rounded-[3px] border border-veg">
                <span className="size-1.5 rounded-full bg-veg" />
              </span>
              <span className="flex-1 truncate text-[0.78rem] font-medium">
                {row.name}
              </span>
              <span className="text-[0.78rem] font-semibold text-ink">
                {row.price}
              </span>
              <span
                className={`flex h-4 w-7 items-center rounded-full p-0.5 ${
                  row.on ? "justify-end bg-accent" : "justify-start bg-line-strong"
                }`}
              >
                <span className="size-3 rounded-full bg-white" />
              </span>
              <Pencil className="size-3.5 text-subtle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
