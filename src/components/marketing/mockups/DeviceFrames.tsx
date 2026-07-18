import { cn } from "@/lib/utils";

/** A macOS-style browser window chrome wrapping arbitrary screen content. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-float",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2/70 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#e5695f]" />
          <span className="size-3 rounded-full bg-[#e6b34c]" />
          <span className="size-3 rounded-full bg-[#68b45c]" />
        </span>
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-canvas px-3 py-1 text-xs text-subtle">
          {url}
        </span>
        <span className="w-8" />
      </div>
      {children}
    </div>
  );
}

/** A phone chrome wrapping arbitrary screen content. */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2.2rem] border-[7px] border-ink bg-ink p-0 shadow-float",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-surface">
        <span className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/25" />
        {children}
      </div>
    </div>
  );
}
