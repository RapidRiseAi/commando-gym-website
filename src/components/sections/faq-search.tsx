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
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search FAQ" className="mb-6 min-h-10 w-full rounded-lg border border-border bg-surface px-3 md:min-h-11 md:max-w-md" />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {faqGroups.map((group) => (
          <a
            key={group.title}
            href={`#faq-${slug(group.title)}`}
            className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-xs text-zinc-300"
          >
            {group.title}
          </a>
        ))}
      </div>
      <div className="space-y-5">
        {filtered.map((group) => (
          <div key={group.title} id={`faq-${slug(group.title)}`} className="scroll-mt-24">
            <h3 className="mb-2 text-lg font-semibold">{group.title}</h3>
            <div className="space-y-2">{group.items.map((item) => <details key={item.q} className="rounded-xl border border-border bg-surface p-3 md:p-4"><summary>{item.q}</summary><p className="mt-2 text-sm text-zinc-300">{item.a}</p></details>)}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-300">Didn’t find your question? <Link href="/contact" className="underline">Contact us directly.</Link></p>
    </>
  );
}
