import { Button } from "./ui/button";
import { ArrowRight, PlayCircle, Sparkles, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-primary/20 blur-[120px] rounded-full opacity-50 dark:opacity-20" />
            
            <div className="container mx-auto px-4 text-center relative">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary animate-in fade-in slide-in-from-top-4 duration-500">
                    <Sparkles className="w-4 h-4" />
                    <span>Join 2,000+ builders this month</span>
                </div>

                <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl outfit leading-[1.1]">
                    Finish what you <span className="text-gradient">start.</span>
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl font-medium antialiased animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Stop leaving projects in the graveyard. Commit to building in
                    <span className="text-foreground font-bold underline decoration-primary/30 decoration-4 underline-offset-4 mx-1">X days</span> 
                    and turn your &quot;one day&quot; into &quot;day one.&quot;
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row animate-in fade-in zoom-in-95 duration-1000">
                    <Button
                        asChild
                        size="lg"
                        className="h-14 bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 rounded-full group outline-none"
                    >
                        <Link href="/signup" className="flex items-center gap-2">
                            Start Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-14 px-10 text-lg font-bold text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all rounded-full outline-none"
                        asChild
                    >
                        <Link href="#features" className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5" />
                            Launch Demo
                        </Link>
                    </Button>
                </div>

                {/* Social Proof */}
                <div className="mt-20 space-y-6 animate-in fade-in duration-1000 delay-500">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Trusted by industry-leading creators
                    </p>
                    <div className="flex justify-center flex-wrap gap-8 sm:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-black outfit text-xl italic"><Zap className="w-6 h-6 fill-current"/> SHIPIT</div>
                        <div className="flex items-center gap-2 font-black outfit text-xl italic"><Zap className="w-6 h-6 fill-current"/> BUILDER</div>
                        <div className="flex items-center gap-2 font-black outfit text-xl italic"><Zap className="w-6 h-6 fill-current"/> DEVLOG</div>
                    </div>
                </div>
            </div>
        </section>
    );
}