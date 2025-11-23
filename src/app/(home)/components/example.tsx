"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import APITester, { APITesterProps } from "./api-tester";
import AnimatedContent from "@/components/AnimatedContent";

export type TypeParameters = "query" | "path" | "body" | "header";

type Category = "quran" | "hadith" | "dzikir" | "all";

const apiEndpoints: (APITesterProps["endpoint"] & { categories: Category[] })[] = [
    {
        method: "GET",
        path: "/surahs",
        description: "Get list surahs with pagination",
        categories: ["quran"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10)", required: false },
        ],
        example: {
            description: "Retrieve first page of surahs",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/surahs/{surahId}",
        description: "Get detail surah by surah ID",
        categories: ["quran"],
        parameters: [{ name: "surahId", type: "path", description: "Surah ID", required: true }],
        example: {
            description: "Get user with surah ID 1",
            params: { surahId: "1" },
        },
    },
    {
        method: "GET",
        path: "/surahs/{surahID}/ayats",
        description: "Get list ayat from surah with pagination",
        categories: ["quran"],
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10)", required: false },
            { name: "q", type: "query", description: "Search ayat based on arabic, translation, indonesia", required: false },
        ],
        example: {
            description: "Retrieve first page of surahs",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/surahs/{surahId}/ayats/{ayatNumber}",
        description: "Get detail ayat from surah by surah ID and ayat number",
        categories: ["quran"],
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
            { name: "ayatNumber", type: "path", description: "Ayat Number", required: true },
        ],
        example: {
            description: "Get user with surah ID 1 and ayat number 1",
            params: { surahId: "1", ayatNumber: "1" },
        },
    },
    // Hadith endpoints
    {
        method: "GET",
        path: "/hadiths",
        description: "Get list hadiths with pagination",
        categories: ["hadith"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10)", required: false },
        ],
        example: {
            description: "Retrieve first page of hadiths",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/hadiths/{hadithId}",
        description: "Get detail hadith by hadith ID",
        categories: ["hadith"],
        parameters: [{ name: "hadithId", type: "path", description: "Hadith ID", required: true }],
        example: {
            description: "Get hadith with ID 1",
            params: { hadithId: "1" },
        },
    },
    // Dzikir endpoints
    {
        method: "GET",
        path: "/dzikirs",
        description: "Get list dzikir with pagination",
        categories: ["dzikir"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10)", required: false },
        ],
        example: {
            description: "Retrieve first page of dzikir",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/dzikirs/{dzikirId}",
        description: "Get detail dzikir by dzikir ID",
        categories: ["dzikir"],
        parameters: [{ name: "dzikirId", type: "path", description: "Dzikir ID", required: true }],
        example: {
            description: "Get dzikir with ID 1",
            params: { dzikirId: "1" },
        },
    },
];

const ExampleSection = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);
    const [selectedCategory, setSelectedCategory] = useState<Category>("all");

    const getFilteredEndpoints = () => {
        if (selectedCategory === "all") return apiEndpoints;
        return apiEndpoints.filter((endpoint) => endpoint.categories.includes(selectedCategory));
    };

    // Ensure selected endpoint is always valid when category changes
    useEffect(() => {
        const filteredEndpoints = getFilteredEndpoints();
        const currentSelectedIsValid = filteredEndpoints.includes(selectedEndpoint);

        if (!currentSelectedIsValid && filteredEndpoints.length > 0) {
            setSelectedEndpoint(filteredEndpoints[0]);
        }
    }, [selectedCategory, selectedEndpoint]);

    const getMethodColor = (method: string) => {
        switch (method) {
            case "GET":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "POST":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "PUT":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "DELETE":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

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
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl">Quick Start</h2>
                <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600 dark:text-gray-400">
                    Start using the API in minutes with this example.
                </p>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Endpoint List */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Available Endpoints</CardTitle>
                            <CardDescription>Click to test different API endpoints</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px] overflow-y-auto p-0">
                            <div className="flex h-full">
                                {/* Category Flags */}
                                <div className="bg-muted/20 flex h-full w-fit flex-col items-center gap-4 border-r">
                                    {[
                                        { key: "all", label: "All" },
                                        { key: "quran", label: "Quran" },
                                        { key: "hadith", label: "Hadith" },
                                        { key: "dzikir", label: "Dzikir" },
                                        { key: "asmaulHusna", label: "Asmaul Husna" },
                                        { key: "doa", label: "Doa" },
                                    ].map((category) => (
                                        <button
                                            key={category.key}
                                            onClick={() => setSelectedCategory(category.key as Category)}
                                            className={`group flex w-9 items-center justify-center border-l py-3 transition-colors ${
                                                selectedCategory === category.key
                                                    ? "bg-primary/10 text-primary border-primary"
                                                    : "text-muted-foreground hover:bg-muted/30 border-transparent"
                                            } `}
                                        >
                                            <span className="block rotate-180 text-xs font-medium whitespace-nowrap [writing-mode:vertical-rl]">
                                                {category.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Endpoint List */}
                                <div className="flex-1">
                                    <div className="max-h-[500px] overflow-y-auto">
                                        {getFilteredEndpoints().map((endpoint, index) => (
                                            <div
                                                key={index}
                                                className={`hover:bg-muted/50 cursor-pointer border-b p-4 transition-all duration-200 hover:shadow-sm ${
                                                    selectedEndpoint === endpoint ? "bg-muted border-l-primary border-l" : ""
                                                }`}
                                                onClick={() => setSelectedEndpoint(endpoint)}
                                            >
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                                                    <code className="font-mono text-sm">{endpoint.path}</code>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{endpoint.description}</p>
                                                {endpoint.example && <p className="text-primary mt-1 text-xs">💡 {endpoint.example.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* API Tester */}
                    <div className="lg:col-span-2">
                        <APITester endpoint={selectedEndpoint} />
                    </div>
                </div>
                {/* Additional Info */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Authentication</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Some endpoints may require authentication. Include your API KEY in the header:
                            </p>
                            <code className="bg-muted block rounded-lg p-3 text-sm">X-API-KEY: YOUR_API_KEY</code>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Response Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-sm">All API responses follow a consistent JSON format:</p>
                            <pre className="bg-muted overflow-x-auto rounded-lg p-3 text-xs">
                                <code>
                                    {JSON.stringify(
                                        {
                                            success: true,
                                            data: {},
                                            message: "Operation successful",
                                            timestamp: "2024-01-01T00:00:00Z",
                                        },
                                        null,
                                        2, // indentasi 2 spasi
                                    )}
                                </code>
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AnimatedContent>
    );
};

export default ExampleSection;
