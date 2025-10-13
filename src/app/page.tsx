import Logo from "@/components/logo";
import Magnet from "@/components/react-bits/Magnet";
import DarkVeil from "@/components/react-bits/background/dark-veil";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="w-full h-[800px] relative -mt-16">
        <DarkVeil />

        <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full text-center px-4 md:px-8 space-y-4">
          <div className="w-full text-center flex items-center justify-center">
            <Logo width={100} height={100} size="xl" />
          </div>

          <p className="text-xl md:text-2xl text-white/90">Modern Quran Data API for Developers</p>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Access structured Quran data faster. Surahs, verses, translations in multiple languages, and tafsirs.
          </p>

          <Magnet padding={50} disabled={false} magnetStrength={20}>
            <a
              href="/docs"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Documentations <ArrowRightIcon className="inline-flex w-4 h-4" />
            </a>
          </Magnet>
        </div>
      </div>

      {/* USP Section */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Aura Al-Qur`an API?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Structured & Fast Data</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              API responses in milliseconds with structured JSON data easy to parse for modern applications.
            </p>
          </div>
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Verified & Accurate</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Qur`an data from trusted sources, verified for accuracy in text and translations.
            </p>
          </div>
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 3V0H7v3c-1.657 0-3 1.343-3 3v1a1 1 0 001 1h2V6a2 2 0 012-2zM7 8.5l-1.5 1.5 1.5 1.5L8.5 10 7 8.5z" />
                <path d="M13 3V0h-2v3c1.657 0 3 1.343 3 3v1a1 1 0 01-1 1h-2V6a2 2 0 012-2zM11 8.5l1.5 1.5-1.5 1.5-1.5-1.5L11 8.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Multi-Language</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Support for translations in various languages.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Example */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Quick Start</h2>
          <p className="text-center mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start using the API in minutes with this example curl to get Surah Al-Fatihah:
          </p>
          <div className="bg-gradient-to-r from-slate-900 to-gray-900 text-white p-6 rounded-lg shadow-inner overflow-x-auto border border-slate-800">
            <pre className="font-mono text-sm leading-relaxed">
              <code>
                {`curl --location --request GET 'https://api.aura-al-quran.com/surah/1' \\
--header 'Content-Type: application/json'`}
              </code>
            </pre>
          </div>
          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-500">
            For JavaScript: Use fetch API or axios for web app integration.
          </p>
          <div className="flex justify-center mt-8">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Copy Code
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Comprehensive Data
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                114 complete surahs with detailed verses
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Translations in Indonesian, English, and Arabic
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Concise tafsirs for each verse
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mr-3">/surah</code>
                <span>Get all surahs</span>
              </li>
              <li className="flex items-start">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mr-3">/surah/{"{id}"}</code>
                <span>Details of a specific surah</span>
              </li>
              <li className="flex items-start">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mr-3">/ayat/{"{number}"}</code>
                <span>Find verse by number</span>
              </li>
              <li className="flex items-start">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mr-3">/search</code>
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
