import Logo from "@/components/logo";
import DarkVeil from "@/components/react-bits/background/dark-veil";
import Magnet from "@/components/react-bits/Magnet";
import { ArrowRightIcon } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative -mt-16 h-[800px] w-full">
            <DarkVeil />

            <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 transform space-y-4 px-4 text-center md:px-8">
                <div className="flex w-full items-center justify-center text-center">
                    <Logo width={100} height={100} size="xl" />
                </div>

                <p className="text-xl text-white/90 md:text-2xl">Modern Quran Data API for Developers</p>
                <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                    Access structured Quran data faster. Surahs, verses, translations in multiple languages, and tafsirs.
                </p>

                <Magnet padding={50} disabled={false} magnetStrength={20}>
                    <a
                        href="/docs"
                        className="rounded-lg border border-white/30 px-8 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/10"
                    >
                        View Documentations <ArrowRightIcon className="inline-flex h-4 w-4" />
                    </a>
                </Magnet>
            </div>

            {/* <SplashCursor /> */}
            <div className="absolute inset-x-0 -bottom-12 h-[200px] bg-gradient-to-t from-[#0b0a0b] to-black blur-2xl" />
        </section>
    );
};

export default HeroSection;
