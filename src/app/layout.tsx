import navbar from "@/components/navbar";
import { Layout } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import React from "react";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata = {
    title: "AzoraX Al-Qur'an API",
    description:
        "Data Al-Qur'an yang Cepat, Lengkap, dan Modern untuk Developer Muslim Indonesia. Dapatkan akșes ke data Surah, Ayat, Terjemahan, Tafsir, dan Audio Al-Qur'an dengan API yang terstruktur dan terverifikasi.",
    keywords: ["Al-Qur'an", "API", "data Al-Qur'an", "developer Muslim", "terjemahan", "tafsir", "murottal", "Indonesia"],
    author: "AzoraX Al-Qur'an Team",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <Head></Head>
            <body>
                <Layout
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
                    darkMode={false}
                >
                    {children}

                    <Footer />
                </Layout>
            </body>
        </html>
    );
}
