"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiEndpoints, Category } from "@/data/available-endpoints";
import { AlertCircle, CheckCircle2, Link2Icon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import APITester from "./api-tester";

const ExampleSection = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);
    const [selectedCategory, setSelectedCategory] = useState<Category>("all");
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Email validation function
    const validateEmail = (email: string): { isValid: boolean; error?: string } => {
        // Check if empty
        if (!email || email.trim() === "") {
            return { isValid: false, error: "Email is required" };
        }

        // Check basic format with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: "Please enter a valid email address" };
        }

        // Check length (RFC 5321)
        if (email.length > 254) {
            return { isValid: false, error: "Email address is too long" };
        }

        // Check local part and domain
        const [localPart, domain] = email.split("@");

        if (localPart.length > 64) {
            return { isValid: false, error: "Email address is invalid" };
        }

        // Check for consecutive dots
        if (email.includes("..")) {
            return { isValid: false, error: "Email address cannot contain consecutive dots" };
        }

        // Check if domain has at least one dot
        if (!domain.includes(".")) {
            return { isValid: false, error: "Please enter a valid domain" };
        }

        return { isValid: true };
    };

    const handleRequestApiKey = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset states
        setError(null);

        // Validate email before making API call
        const validation = validateEmail(email);
        if (!validation.isValid) {
            setError(validation.error || "Invalid email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/api/v1/email/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
                },
                body: JSON.stringify({ to: email }),
            });

            // Handle HTTP errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    message: `Server error: ${response.status} ${response.statusText}`,
                }));

                throw new Error(errorData.message || "Failed to request API key. Please try again.");
            }

            const data = await response.json();
            console.log("API Key request successful:", data);

            // Success flow
            setIsOpen(false);
            setShowSuccess(true);
            setEmail("");

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (err) {
            // Handle different error types
            if (err instanceof TypeError && err.message.includes("fetch")) {
                setError("Network error. Please check your connection and try again.");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }

            console.error("API Key request error:", err);
        } finally {
            setIsLoading(false);
        }
    };

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
                                        { key: "asmaul-husna", label: "Asmaul Husna" },
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

                            {showSuccess && (
                                <Alert className="mt-4 border-green-500 bg-green-50 dark:bg-green-950">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <AlertTitle className="text-green-800 dark:text-green-200">Request Successful!</AlertTitle>
                                    <AlertDescription className="text-green-700 dark:text-green-300">
                                        Please check your email for your API key.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="mt-4">
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="default" className="w-fit">
                                            <Link2Icon className="mr-2 h-4 w-4" /> Get API Key
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Request API Key</DialogTitle>
                                            <DialogDescription>Enter your email address to receive your API key.</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleRequestApiKey}>
                                            <div className="grid gap-4 py-4">
                                                {error && (
                                                    <Alert variant="destructive">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <AlertTitle>Error</AlertTitle>
                                                        <AlertDescription>{error}</AlertDescription>
                                                    </Alert>
                                                )}

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="email" className="text-right">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="col-span-3"
                                                        placeholder="name@example.com"
                                                        required
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Requesting...
                                                        </>
                                                    ) : (
                                                        "Request Key"
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
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
