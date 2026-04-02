"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { faqGroups } from "@/content/site-content";

export function FaqSearch() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return faqGroups;
    const lower = query.toLowerCase();
    return faqGroups
      .map((group) => ({ ...group, items: group.items.filter((item) => item.q.toLowerCase().includes(lower) || item.a.toLowerCase().includes(lower)) }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search FAQ" className="mb-6 min-h-11 w-full rounded-lg border border-border bg-surface px-3 md:max-w-md" />
      <div className="space-y-5">
        {filtered.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-lg font-semibold">{group.title}</h3>
            <div className="space-y-2">{group.items.map((item) => <details key={item.q} className="rounded-xl border border-border bg-surface p-4"><summary>{item.q}</summary><p className="mt-2 text-sm text-zinc-300">{item.a}</p></details>)}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-300">Didn’t find your question? <Link href="/contact" className="underline">Contact us directly.</Link></p>
    </>
  );
}
