import Image from "next/image";

const u = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const COVER = u("1501339847302-ac426a4a7cbb", 800);
const items = [
  { name: "Cloud Latte", price: "₹260", img: u("1541167760496-1628856ab772") },
  { name: "Butter Croissant", price: "₹180", img: u("1555507036-ab1f4038808a") },
  { name: "Cold Brew", price: "₹280", img: u("1461023058943-07fcbe16d735") },
];

/** A stylised preview of the café page, for the browser frame. */
export function CafePreviewDesktop() {
  return (
    <div className="bg-surface">
      <div className="relative h-44 w-full">
        <Image src={COVER} alt="" fill sizes="700px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-medium text-white ring-1 ring-white/25 backdrop-blur">
          ● Open now
        </span>
        <div className="absolute bottom-4 left-5">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            Specialty Coffee
          </p>
          <p className="font-display text-2xl font-medium text-white">
            Cloud Café
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {items.map((it) => (
          <div
            key={it.name}
            className="overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="relative h-16 w-full">
              <Image
                src={it.img}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="truncate text-[0.7rem] font-medium text-ink">
                {it.name}
              </p>
              <p className="text-[0.7rem] font-semibold text-accent">
                {it.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Narrow café preview for the phone frame. */
export function CafePreviewMobile() {
  return (
    <div className="w-[180px] bg-surface sm:w-[200px]">
      <div className="relative h-28 w-full">
        <Image src={COVER} alt="" fill sizes="200px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="absolute bottom-2.5 left-3 font-display text-lg font-medium text-white">
          Cloud Café
        </p>
      </div>
      <div className="space-y-2 p-3">
        {items.slice(0, 2).map((it) => (
          <div key={it.name} className="flex items-center gap-2.5">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={it.img}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.7rem] font-medium text-ink">
                {it.name}
              </p>
              <p className="text-[0.65rem] text-muted">Rich & smooth</p>
            </div>
            <p className="text-[0.7rem] font-semibold text-accent">
              {it.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
