import { CheckCircle2, Trophy, Rocket } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      title: "Set Your Objective",
      description: "Define a clear, measurable goal and choose your challenge duration (e.g., 30, 75, or 100 days).",
      icon: <Rocket className="w-8 h-8 text-primary" />,
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Check-in Daily",
      description: "Log your progress every single day. Reflection and consistency are the keys to long-term growth.",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      title: "Claim Your Victory",
      description: "Finish the challenge, visualize your 100% completion grid, and build unstoppable momentum.",
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      color: "from-amber-500/20 to-amber-500/5"
    },
  ];

  return (
    <section id="how" className="py-24 border-y border-primary/5 bg-primary/[0.02] relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-primary/5 blur-[80px] rounded-full" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black outfit sm:text-5xl tracking-tight">The <span className="text-gradient">3-Step</span> Blueprint</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Simplicity is the ultimate sophistication. Here is how you evolve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-linear-to-r from-transparent via-primary/20 to-transparent -z-10" />

            {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                    <div className={`size-24 rounded-[2rem] bg-linear-to-br ${step.color} border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 ring-4 ring-background`}>
                        {step.icon}
                    </div>

                    <div className="space-y-3">
                        <div className="text-primary font-bold text-sm uppercase tracking-widest outfit">
                            Phase 0{i + 1}
                        </div>
                        <h3 className="text-2xl font-bold outfit">{step.title}</h3>
                        <p className="text-muted-foreground/80 leading-relaxed font-medium">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
