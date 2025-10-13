import Logo from "@/components/logo";
import Magnet from "@/components/react-bits/Magnet";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import DarkVeil from "@/components/react-bits/background/dark-veil";
import { ArrowRightIcon, CircleGaugeIcon, LanguagesIcon, SparklesIcon } from "lucide-react";

const USPS = [
    {
        icon: SparklesIcon,
        title: "Verified & Accurate",
        description: "Qur`an data from trusted sources, verified for accuracy in text and translations.",
    },
    {
        icon: CircleGaugeIcon,
        title: "Structured & Fast Data",
        description: " API responses in milliseconds with structured JSON data easy to parse for modern applications.",
    },
    {
        icon: LanguagesIcon,
        title: "Multi-Language",
        description: "Support for translations in various languages.",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen">
            <div className="relative -mt-16 h-[800px] w-full">
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
            </div>

            {/* USP Section */}
            <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
                <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Why Choose Aura Al-Qur`an API?</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {USPS?.map((usp) => (
                        <SpotlightCard
                            key={usp?.title}
                            className="group transition-transform duration-300 ease-out hover:scale-105"
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

            {/* Quick Start Example */}
            <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
                <div className="rounded-xl border border-gray-200/50 bg-white p-8 shadow-lg md:p-12 dark:border-gray-700/50 dark:bg-gray-900">
                    <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl">Quick Start</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600 dark:text-gray-400">
                        Start using the API in minutes with this example curl to get Surah Al-Fatihah:
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-gradient-to-r from-slate-900 to-gray-900 p-6 text-white shadow-inner">
                        <pre className="font-mono text-sm leading-relaxed">
                            <code>
                                {`curl --location --request GET 'https://api.aura-al-quran.com/surah/1' \\
--header 'Content-Type: application/json'`}
                            </code>
                        </pre>
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500">
                        For JavaScript: Use fetch API or axios for web app integration.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <button className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600">
                            Copy Code
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
                <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Core Features</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="group rounded-xl border border-gray-200/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80">
                        <h3 className="mb-6 flex items-center text-2xl font-bold">
                            <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            Comprehensive Data
                        </h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <svg className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                114 complete surahs with detailed verses
                            </li>
                            <li className="flex items-start">
                                <svg className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Translations in Indonesian, English, and Arabic
                            </li>
                            <li className="flex items-start">
                                <svg className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Concise tafsirs for each verse
                            </li>
                            <li className="flex items-start">
                                <svg className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                High-quality murottal recordings
                            </li>
                        </ul>
                    </div>
                    <div className="group rounded-xl border border-gray-200/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80">
                        <h3 className="mb-6 flex items-center text-2xl font-bold">
                            <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2zm-6.496 4a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H4.504z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Key Endpoints
                        </h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <code className="mr-3 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">/surah</code>
                                <span>Get all surahs</span>
                            </li>
                            <li className="flex items-start">
                                <code className="mr-3 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">/surah/{"{id}"}</code>
                                <span>Details of a specific surah</span>
                            </li>
                            <li className="flex items-start">
                                <code className="mr-3 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">/ayat/{"{number}"}</code>
                                <span>Find verse by number</span>
                            </li>
                            <li className="flex items-start">
                                <code className="mr-3 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">/search</code>
                                <span>Search text in Quran</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* <SplashCursor /> */}
        </div>
    );
}
