export default function Features() {

    const features = [
        {
            title: "Commit to a Goal",
            description:
                "Define a challenge and commit to finishing it within a fixed number of days."
        },
        {
            title: "Track Daily Progress",
            description:
                "Log your daily progress and maintain a streak."
        },
        {
            title: "Visual Progress",
            description:
                "See your progress with beautiful grids and progress bars."
        },
        {
            title: "Build in Public",
            description:
                "Share your progress and stay accountable."
        }
    ]

    return (
        <section id="features" className="py-24">

            <div className="max-w-6xl mx-auto px-6">

                <h2 className="text-3xl font-bold text-center">
                    Everything you need to stay consistent
                </h2>

                <p className="text-neutral-400 text-center mt-4">
                    Simple tools to help you finish what you start.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-16">

                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl border border-neutral-800"
                        >
                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="text-neutral-400 mt-3">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    )
}