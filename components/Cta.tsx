import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      {/* Container with a subtle gradient border effect */}
      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 px-8 py-16 sm:px-16 sm:py-24 text-center shadow-2xl">

        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-amber-600/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-amber-900/20 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="size-3" />
            No more half-finished projects
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to finish what you <span className="text-amber-500">start?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            Join a community of builders committing to their goals. Your next
            big project is only <span className="text-white font-medium italic">X days</span> away from completion.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-14 px-10 text-lg bg-amber-600 hover:bg-amber-500 text-white transition-all hover:scale-105 shadow-xl shadow-amber-900/20"
            >
              <Link href="/signup">
                Start your challenge
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <p className="text-sm text-neutral-500 sm:ml-4">
              Join <span className="text-neutral-300 font-bold">452 builders</span> this week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}