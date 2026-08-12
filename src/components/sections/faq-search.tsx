"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { faqGroups } from "@/content/site-content";

export function FaqSearch() {
  const [query, setQuery] = useState("");
  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filtered = useMemo(() => {
    if (!query) return faqGroups;
    const lower = query.toLowerCase();
    return faqGroups
      .map((group) => ({ ...group, items: group.items.filter((item) => item.q.toLowerCase().includes(lower) || item.a.toLowerCase().includes(lower)) }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search FAQ"
        aria-label="Search frequently asked questions"
        className="mb-6 min-h-11 w-full rounded-xl border border-white/10 bg-surface px-4 text-white placeholder:text-zinc-500 focus-visible:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:max-w-md"
      />
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {faqGroups.map((group) => (
          <a
            key={group.title}
            href={`#faq-${slug(group.title)}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-surface px-3 py-1.5 text-xs text-zinc-300"
          >
            {group.title}
          </a>
        ))}
      </div>
      <div className="space-y-6">
        {filtered.map((group) => (
          <div key={group.title} id={`faq-${slug(group.title)}`} className="scroll-mt-24">
            <h3 className="mb-3 font-display text-lg font-semibold">{group.title}</h3>
            <div className="space-y-2">
              {group.items.map((item) => (
                <details key={item.q} className="spotlight-card group p-4">
                  <span aria-hidden className="spotlight-card__border" />
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">
                    {item.q}
                    <span aria-hidden className="text-zinc-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-7 text-sm text-zinc-300">
        Didn’t find your question?{" "}
        <Link href="/contact" className="text-white underline underline-offset-4">
          Contact us directly.
        </Link>
      </p>
    </>
  );
}
