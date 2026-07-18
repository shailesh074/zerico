import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-ink shadow-soft hover:bg-accent-hover hover:shadow-float",
        secondary:
          "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
        ghost: "text-ink hover:bg-surface-2",
        onDark:
          "border border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/15",
        light: "bg-white text-ink shadow-soft hover:bg-white/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
  /** When set, renders a link (internal via next/link, external via <a>). */
  href?: string;
  external?: boolean;
};

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

type AnchorProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

function Sheen({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 group-hover:animate-[cta-sheen_0.9s_ease] group-hover:opacity-100"
    />
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  href,
  external,
  ...props
}: ButtonProps | AnchorProps) {
  const classes = cn("group", button({ variant, size }), className);
  const showSheen = (variant ?? "primary") === "primary";
  const content = (
    <>
      <Sheen show={showSheen} />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !external;
    if (isInternal) {
      return (
        <Link
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
