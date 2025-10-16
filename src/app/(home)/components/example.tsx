"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import APITester, { APITesterProps } from "./api-tester";
import AnimatedContent from "@/components/AnimatedContent";

export type TypeParameters = "query" | "path" | "body" | "header";

const apiEndpoints: APITesterProps["endpoint"][] = [
    {
        method: "GET",
        path: "/surahs",
        description: "Get list surahs with pagination",
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
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
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
        path: "/surahs/{surahId}/ayats/{ayatNumber}",
        description: "Get detail ayat from surah by surah ID and ayat number",
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
            { name: "ayatNumber", type: "path", description: "Ayat Number", required: true },
        ],
        example: {
            description: "Get user with surah ID 1 and ayat number 1",
            params: { surahId: "1", ayatNumber: "1" },
        },
    },
    {
        method: "GET",
        path: "/search",
        description: "Search for Ayat based on Arabic text or translation using full text search",
        parameters: [{ name: "q", type: "query", description: "Search keywords (1-100 characters)", required: true }],
        example: {
            description: "Retrieve first page of surahs",
            params: { q: "human" },
        },
    },
];

const ExampleSection = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);

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
                        <CardContent className="p-0">
                            <div className="max-h-[500px] overflow-y-auto">
                                {apiEndpoints.map((endpoint, index) => (
                                    <div
                                        key={index}
                                        className={`hover:bg-muted/50 cursor-pointer border-b p-4 transition-all duration-200 hover:shadow-sm ${
                                            selectedEndpoint === endpoint ? "bg-muted border-l-primary border-l-4" : ""
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
