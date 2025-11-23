import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { CircleGaugeIcon, FileBoxIcon, SparklesIcon } from "lucide-react";

const USPS = [
    {
        icon: SparklesIcon,
        title: "Verified & Accurate",
        description: "Data from trusted sources, verified for accuracy in text and translations.",
    },
    {
        icon: CircleGaugeIcon,
        title: "Structured & Fast Data",
        description: " API responses in milliseconds with structured JSON data easy to parse for modern applications.",
    },
    {
        icon: FileBoxIcon,
        title: "Better Documentation",
        description: "Our documentation is designed by developers for developers.",
    },
];

const USPSesction = () => {
    return (
        <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={2}
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.2}
        >
            <section className="mx-auto min-h-[700px] max-w-7xl px-4 py-24 md:px-8">
                <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Why Choose Ninetynine X API Muslim ?</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {USPS?.map((usp) => (
                        <SpotlightCard
                            key={usp?.title}
                            className="group rounded-md transition-transform duration-300 ease-out hover:scale-105"
                            spotlightColor="rgba(96, 16, 221, 0.4)"
                        >
                            <div className="space-y-4">
                                <usp.icon className="h-16 w-16 text-gray-400 transition-transform duration-300 ease-out group-hover:scale-75" />
                                <h3 className="text-xl font-semibold transition-transform duration-300 ease-out group-hover:scale-105">
                                    {usp?.title}
                                </h3>
                                <p className="leading-relaxed text-gray-400 transition-transform duration-300 ease-out group-hover:scale-105">
                                    {usp?.description}
                                </p>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </section>
        </AnimatedContent>
    );
};

export default USPSesction;
