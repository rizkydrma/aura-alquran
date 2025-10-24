"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Code, Copy, FileJson, Loader2, Play, Shield, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export interface APITesterProps {
    endpoint: {
        method: string;
        path: string;
        description: string;
        parameters: Array<{
            name: string;
            type: "query" | "path" | "body" | "header";
            description: string;
            required: boolean;
        }>;
        example?: {
            description: string;
            params?: Record<string, string>;
            body?: any;
        };
    };
}

export default function APITester({ endpoint }: APITesterProps) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [params, setParams] = useState<Record<string, string>>({});
    const [body, setBody] = useState("");
    const [apiKey, setApiKey] = useState("YOUR_API_KEY");

    // Auto-fill example data when endpoint changes
    useEffect(() => {
        if (endpoint.example) {
            if (endpoint.example.params) {
                setParams(endpoint.example.params);
            } else {
                setParams({});
            }

            if (endpoint.example.body) {
                setBody(JSON.stringify(endpoint.example.body, null, 2));
            } else {
                setBody("");
            }
        } else {
            setParams({});
            setBody("");
        }
    }, [endpoint]);

    const buildHeaders = () => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (apiKey && apiKey !== "YOUR_API_KEY") {
            headers["X-API-KEY"] = apiKey;
        }

        return headers;
    };

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

    const buildUrl = () => {
        let url = endpoint.path;
        const queryParams = new URLSearchParams();

        // Replace path parameters
        endpoint.parameters
            .filter((p) => p.type === "path")
            .forEach((p) => {
                url = url.replace(`[${p.name}]`, params[p.name] || "");
            });

        // Add query parameters
        endpoint.parameters
            .filter((p) => p.type === "query")
            .forEach((p) => {
                if (params[p.name]) {
                    queryParams.append(p.name, params[p.name]);
                }
            });

        const queryString = queryParams.toString();
        return queryString ? `${url}?${queryString}` : url;
    };

    const testAPI = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const url = buildUrl();
            const parsedHeaders = buildHeaders();

            const options: RequestInit = {
                method: endpoint.method,
                headers: parsedHeaders,
            };

            if (["POST", "PUT", "PATCH"].includes(endpoint.method) && body) {
                try {
                    options.body = JSON.parse(body);
                    options.body = JSON.stringify(options.body);
                } catch (e) {
                    console.log("ERROR:", e);
                    options.body = body;
                }
            }

            const response = await fetch(`http://localhost:8000/api/v1` + url, options);
            const data = await response.json();

            setResponse({
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                data: data,
                timestamp: new Date().toISOString(),
            });
        } catch (err: any) {
            setError(err.message || "An error occurred while testing the API");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatJSON = (obj: any) => {
        return JSON.stringify(obj, null, 2);
    };

    const currentHeaders = buildHeaders();

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                            <code className="text-lg">{endpoint.path}</code>
                        </CardTitle>
                        <CardDescription>{endpoint.description}</CardDescription>
                    </div>
                    <Button onClick={testAPI} disabled={loading} className="gap-2">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                        {loading ? "Testing..." : "Test API"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
                <Tabs defaultValue="parameters" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="parameters">Parameters</TabsTrigger>
                        <TabsTrigger value="body">Body</TabsTrigger>
                        <TabsTrigger value="headers">Headers</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="parameters" className="space-y-4">
                        {endpoint.parameters
                            .filter((p) => p.type === "query" || p.type === "path")
                            .map((param, index) => (
                                <div key={index} className="space-y-2">
                                    <Label htmlFor={param.name} className="flex items-center gap-2">
                                        {param.name}
                                        <Badge variant="outline" className="text-xs">
                                            {param.type}
                                        </Badge>
                                        {param.required && (
                                            <Badge variant="destructive" className="text-xs">
                                                Required
                                            </Badge>
                                        )}
                                    </Label>
                                    <Input
                                        id={param.name}
                                        placeholder={param.description}
                                        value={params[param.name] || ""}
                                        onChange={(e) => setParams({ ...params, [param.name]: e.target.value })}
                                    />
                                    <p className="text-muted-foreground text-xs">{param.description}</p>
                                </div>
                            ))}

                        {endpoint.parameters.filter((p) => p.type === "query" || p.type === "path").length === 0 && (
                            <p className="text-muted-foreground py-4 text-center">No parameters required</p>
                        )}

                        {endpoint.example && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (endpoint.example?.params) {
                                        setParams(endpoint.example.params);
                                    }
                                }}
                                className="mt-2 gap-1"
                            >
                                <Play className="h-3 w-3" />
                                Use Example Data
                            </Button>
                        )}
                    </TabsContent>

                    <TabsContent value="body" className="space-y-4">
                        {["POST", "PUT", "PATCH"].includes(endpoint.method) ? (
                            <div className="space-y-2">
                                <Label htmlFor="body">Request Body (JSON)</Label>
                                <Textarea
                                    id="body"
                                    placeholder='{"key": "value"}'
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    rows={8}
                                    className="font-mono text-sm"
                                />
                                <p className="text-muted-foreground text-xs">Enter JSON data for the request body</p>
                                {endpoint.example?.body && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setBody(JSON.stringify(endpoint.example!.body, null, 2))}
                                        className="gap-1"
                                    >
                                        <Play className="h-3 w-3" />
                                        Use Example Body
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <p className="text-muted-foreground py-4 text-center">This method doesn`t support request body</p>
                        )}
                    </TabsContent>

                    <TabsContent value="headers" className="space-y-4">
                        <div className="space-y-4">
                            {/* Content-Type Header (Locked) */}
                            <div className="space-y-2">
                                <Label htmlFor="content-type">Content-Type</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="content-type" value="application/json" disabled className="bg-muted cursor-not-allowed" />
                                    <Badge variant="secondary" className="gap-1">
                                        <Shield className="h-3 w-3" />
                                        Locked
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-xs">Content-Type is automatically set to JSON</p>
                            </div>

                            {/* API Key Header */}
                            <div className="space-y-2">
                                <Label htmlFor="api-key">X-API-KEY</Label>
                                <Input
                                    id="api-key"
                                    placeholder="Enter your API key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="font-mono"
                                />
                                <p className="text-muted-foreground text-xs">Required: Enter your API key for authenticated requests</p>
                            </div>

                            {/* Current Headers Preview */}
                            <div className="space-y-2">
                                <Label>Current Headers</Label>
                                <div className="bg-muted rounded-lg p-3">
                                    <pre className="font-mono text-xs">{formatJSON(currentHeaders)}</pre>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4" />
                                    Request URL
                                </Label>
                                <div className="bg-muted flex items-center gap-2 rounded-lg p-3">
                                    <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                                    <code className="flex-1 font-mono text-sm">{buildUrl()}</code>
                                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(buildUrl())} className="gap-1">
                                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Full Request Preview
                                </Label>
                                <div className="bg-muted rounded-lg p-4">
                                    <pre className="overflow-x-auto font-mono text-xs">
                                        {`Request: ${endpoint.method} ${buildUrl()}
Headers: ${formatJSON(currentHeaders)}
${body ? `Body: ${body}` : "Body: (none)"}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Response Section */}
                {response && (
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Response</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant={response.status < 400 ? "default" : "destructive"} className="gap-1">
                                    {response.status} {response.statusText}
                                </Badge>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(formatJSON(response))} className="gap-1">
                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                        </div>

                        <Tabs defaultValue="body" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="body" className="gap-1">
                                    <FileJson className="h-3 w-3" />
                                    Body
                                </TabsTrigger>
                                <TabsTrigger value="info" className="gap-1">
                                    <Code className="h-3 w-3" />
                                    Info
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="body">
                                <div className="relative">
                                    <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
                                        <code>{formatJSON(response.data)}</code>
                                    </pre>
                                </div>
                            </TabsContent>

                            <TabsContent value="info" className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <p className="text-muted-foreground text-sm">
                                        {response.status} {response.statusText}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Timestamp</Label>
                                    <p className="text-muted-foreground text-sm">{new Date(response.timestamp).toLocaleString()}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Response Headers</Label>
                                    <pre className="bg-muted mt-1 overflow-x-auto rounded-lg p-3 text-xs">
                                        <code>{formatJSON(response.headers)}</code>
                                    </pre>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive" className="mt-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
