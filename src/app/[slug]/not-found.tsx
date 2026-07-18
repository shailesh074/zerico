import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
        We couldn&apos;t find that café
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-ink transition hover:bg-accent-hover"
      >
        Go home
      </Link>
    </main>
  );
}
