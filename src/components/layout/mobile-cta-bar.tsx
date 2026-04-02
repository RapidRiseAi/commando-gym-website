import { Button } from "@/components/ui/button";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-black/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Button href="/join">Join Now</Button>
        <Button href="/contact" variant="secondary">Ask a Question</Button>
      </div>
    </div>
  );
}
