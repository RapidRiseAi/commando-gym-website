import { Button } from "@/components/ui/button";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/85 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Button href="/memberships">Join Now</Button>
        <Button href="/contact" variant="secondary">
          Ask a Question
        </Button>
      </div>
    </div>
  );
}
