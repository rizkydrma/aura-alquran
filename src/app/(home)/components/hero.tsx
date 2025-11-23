import FadeContent from "@/components/FadeContent";
import DarkVeil from "@/components/react-bits/background/dark-veil";
import Magnet from "@/components/react-bits/Magnet";
import { Heading, Paragraph } from "@/components/typhography";
import { ArrowRightIcon } from "lucide-react";

const HeroSection = () => {
    return (
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <section className="relative -mt-16 h-[800px] w-full">
                <DarkVeil />
                <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2">
                    <Heading size="h3" className="text-center">
                        The Definitive Islamic API Resource
                    </Heading>
                    <Paragraph size="lg" className="mt-2 text-center">
                        Integrate Qur`an, Hadith, Prayer Data, and Islamic Content into Your Application.
                    </Paragraph>

                    <div className="flex justify-center">
                        <Magnet padding={50} disabled={false} magnetStrength={20}>
                            <a
                                href="/docs"
                                className="mt-10 flex w-fit items-center rounded-lg border border-white/30 px-8 py-4 text-center text-sm text-white backdrop-blur-sm transition-all hover:bg-white/10"
                            >
                                View Documentation <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </a>
                        </Magnet>
                    </div>
                </div>

                {/* <SplashCursor /> */}
                <div className="absolute inset-x-0 -bottom-12 h-[200px] bg-gradient-to-t from-[#0b0a0b] to-black blur-2xl" />
            </section>
        </FadeContent>
    );
};

export default HeroSection;
