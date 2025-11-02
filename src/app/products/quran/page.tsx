"use client";

import { SurahSkeleton } from "@/components/skeleton/skeleton-surah";
import { Heading } from "@/components/typhography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import SurahContent from "./components/surah-content";
import JuzContent from "./components/juz-content";

const QuranContent = () => {
    return (
        <section className="mx-auto max-w-7xl py-24">
            <Heading size="h1" className="text-center">
                Start the Journey of Enlightenment
            </Heading>

            <Tabs defaultValue="surah" className="w-full">
                <TabsList>
                    <TabsTrigger value="surah">Surah</TabsTrigger>
                    <TabsTrigger value="juz">Juz</TabsTrigger>
                </TabsList>
                <TabsContent value="surah">
                    <SurahContent />
                </TabsContent>
                <TabsContent value="juz">
                    <JuzContent />
                </TabsContent>
            </Tabs>
        </section>
    );
};

const QuranPage = () => {
    return (
        <Suspense fallback={<SurahSkeleton />}>
            <QuranContent />
        </Suspense>
    );
};

export default QuranPage;
