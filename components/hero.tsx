import { Button } from "./ui/button";
import { ArrowRight, PlayCircle } from "lucide-react"; // Icons add a modern touch

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Accent - Optional subtle glow */}
            <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 bg-amber-500/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 text-center">
                {/* Badge - Small detail that adds "Modern SaaS" vibes */}
                <div className="mb-6 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                    ✨ Join 2,000+ builders this month
                </div>

                <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                    Finish what you <span className="text-amber-600">start.</span>
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
                    Stop leaving projects in the graveyard. Commit to building in
                    <span className="font-semibold text-neutral-900"> X days</span> and
                    turn your "one day" into "day one."
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="h-12 bg-amber-600 px-8 text-base font-semibold text-white hover:bg-amber-700 shadow-lg shadow-amber-200 transition-all hover:scale-105"
                    >
                        Start your challenge
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-12 px-8 text-base font-semibold text-neutral-700 hover:bg-neutral-100"
                    >
                        <PlayCircle className="mr-2 h-4 w-4 text-amber-600" />
                        View examples
                    </Button>
                </div>

                {/* Social Proof / Trust Bar */}
                <div className="mt-16 text-sm font-medium text-neutral-400">
                    Trusted by indie hackers at
                    <div className="mt-4 flex justify-center gap-8 grayscale opacity-70">
                        {/* Replace with actual SVGs/logos */}
                        <span className="font-bold">SHIP IT</span>
                        <span className="font-bold">BUILDER</span>
                        <span className="font-bold">DEVLOG</span>
                    </div>
                </div>
            </div>
        </section>
    );
}