export default function HowItWorks() {
  const steps = [
    {
      title: "Create a Challenge",
      description: "Define your goal and choose how many days you will commit.",
    },
    {
      title: "Check in Daily",
      description: "Log your daily progress and stay accountable.",
    },
    {
      title: "Complete the Challenge",
      description: "Finish your goal and build momentum.",
    },
  ];

  return (
    <section id="how" className="py-24 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">How it works</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-indigo-500 font-bold text-lg">
                Step {i + 1}
              </div>

              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>

              <p className="text-neutral-400 mt-3">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
