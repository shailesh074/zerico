/**
 * The render loop — proof that website generation needs no per-customer code.
 * Given an ordered list of section instances, look each up in the registry and
 * render it with the uniform props. Unknown types (e.g. premium sections not yet
 * built) are skipped safely.
 */
import type { Business } from "@/types";
import type { SectionInstance, WebsiteContent } from "./types";
import { SECTIONS } from "./registry";

export function WebsiteRenderer({
  sections,
  business,
  content,
}: {
  sections: SectionInstance[];
  business: Business;
  content: WebsiteContent;
}) {
  return (
    <>
      {sections.map((section, i) => {
        const Section = SECTIONS[section.type];
        if (!Section) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[engine] no component for section "${section.type}"`);
          }
          return null;
        }
        return (
          <Section
            key={`${section.type}-${i}`}
            business={business}
            content={content}
            config={section.config ?? {}}
          />
        );
      })}
    </>
  );
}
