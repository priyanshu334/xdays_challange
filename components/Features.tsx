import { Target, Zap, Activity, Users, ShieldCheck, Sparkles } from "lucide-react"

export default function Features() {

    const features = [
        {
            title: "Commit to a Goal",
            description:
                "Define a challenge and commit to finishing it within a fixed number of days.",
            icon: <Target className="w-6 h-6 text-primary" />
        },
        {
            title: "Keep the Streak",
            description:
                "Log your daily progress and maintain consistency. Don't break the chain.",
            icon: <Zap className="w-6 h-6 text-amber-500" />
        },
        {
            title: "Visual Evolution",
            description:
                "See your progress with beautiful contribution grids and interactive progress bars.",
            icon: <Activity className="w-6 h-6 text-emerald-500" />
        },
        {
            title: "Accountable Results",
            description:
                "Built-in accountability tools to ensure you turn your goals into finished results.",
            icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
        }
    ]

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[400px] w-[400px] bg-primary/5 blur-[100px] rounded-full" />
            
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-black outfit sm:text-5xl tracking-tight">
                        Built for <span className="text-gradient">Consistency</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        Everything you need to stop procrastinating and start finishing. Fine-tuned for performers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="glass-card p-8 rounded-3xl border-none hover:shadow-primary/10 transition-all group"
                        >
                            <div className="size-14 rounded-2xl bg-background/50 border border-primary/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold outfit mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-muted-foreground/80 leading-relaxed text-sm font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}