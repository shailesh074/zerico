"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/marketing/Logo";
import { Button } from "@/components/ui/Button";

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

export function LoginCard() {
  const [notice, setNotice] = useState(false);

  // Auth ships in a later phase — this form doesn't submit credentials
  // anywhere; it explains how dashboards are provisioned.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-float">
      <div className="flex justify-center">
        <Logo />
      </div>
      <h1 className="font-display mt-6 text-center text-2xl font-semibold text-ink">
        Welcome back
      </h1>
      <p className="mt-1.5 text-center text-sm text-muted">
        Sign in to your café dashboard
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input type="email" placeholder="you@yourcafe.com" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input type="password" placeholder="••••••••" className={field} />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>
      </form>

      {notice && (
        <div className="mt-5 flex gap-3 rounded-xl border border-line bg-canvas-2/60 p-4 text-sm text-muted">
          <Info className="size-5 shrink-0 text-accent" />
          <p>
            Owner dashboards are being provisioned individually right now.
            Message us and we&apos;ll set up your login.
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have a dashboard yet?{" "}
        <a
          href={site.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent hover:text-accent-hover"
        >
          Talk to us
        </a>
      </p>
    </div>
  );
}
