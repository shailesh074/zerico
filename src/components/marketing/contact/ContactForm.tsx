"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hi Zerico! I'd like to know more about getting my place online.",
      "",
      `Name: ${name}`,
      business && `Café / business: ${business}`,
      phone && `Phone: ${phone}`,
      message && `\n${message}`,
    ].filter(Boolean);
    const url = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Your name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aarti Mehta"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Café / business name
          </label>
          <input
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="e.g. The Cloud Cafe"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Phone <span className="text-subtle">(optional)</span>
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your number"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            How can we help?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Tell us a little about your place…"
            className={`${field} h-auto resize-none py-3`}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        <MessageCircle className="size-[1.05rem]" />
        Send on WhatsApp
      </Button>
      <p className="mt-3 text-center text-xs text-subtle">
        This opens WhatsApp with your details ready to send.
      </p>
    </form>
  );
}
