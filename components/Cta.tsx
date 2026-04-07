import { Button } from "./ui/button";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[800px] bg-primary/10 blur-[120px] rounded-full opacity-50" />

      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[3rem] bg-linear-to-b from-card/80 to-card/40 backdrop-blur-2xl border border-primary/10 px-8 py-16 sm:px-16 sm:py-24 text-center shadow-2xl">
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] outfit mb-2">
            <Sparkles className="size-4 fill-current" />
            No more half-finished projects
          </div>

          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl outfit leading-[1.1]">
            Ready to finish what you <span className="text-gradient">start?</span>
          </h2>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground font-medium leading-relaxed">
            Join a global community of high-performers committing to their evolution. Your breakthrough is only <span className="text-foreground font-bold">X days</span> away.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row pt-4">
            <Button
              size="lg"
              asChild
              className="h-16 px-12 text-xl font-bold bg-primary hover:bg-primary/90 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 rounded-full group outline-none"
            >
              <Link href="/signup" className="flex items-center gap-3">
                Start My Challenge
                <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="flex items-center gap-3 text-muted-foreground/80">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-background bg-muted flex items-center justify-center font-bold text-[10px] overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 42}`} 
                      alt="Avatar" 
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold outfit">
                Join <span className="text-primary">452+ builders</span> this week
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corner icon */}
        <Zap className="absolute -bottom-6 -right-6 size-32 text-primary/5 -rotate-12 pointer-events-none" />
      </div>
    </section>
  );
}