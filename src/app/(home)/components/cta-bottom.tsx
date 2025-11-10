import AnimatedContent from "@/components/AnimatedContent";
import Threads from "@/components/Threads";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const CTABottom = () => {
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
            <div className="relative h-[400px] w-full">
                <Threads amplitude={1} distance={0} enableMouseInteraction={false} color={[0.5, 0.2, 1]} />

                <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 transform space-y-4 rounded-3xl border border-white/20 bg-neutral-50/5 p-12 px-4 text-center shadow-[0_8px_60px_-10px_rgba(0,0,0,0.4)] md:px-8">
                    <h1 className="relative text-4xl font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                        Build smarter with Ninetynine X API Muslim.
                    </h1>
                    <p className="relative text-lg text-white/70">Fast, reliable, and ready for your next idea.</p>

                    <Link href="/docx" className={buttonVariants({})}>
                        Get Started <ArrowRightIcon />
                    </Link>
                </div>
            </div>
        </AnimatedContent>
    );
};

export default CTABottom;
