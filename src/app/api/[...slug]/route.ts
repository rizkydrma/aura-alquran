import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL!; // tidak diexpose ke client
const API_KEY = process.env.API_KEY;

async function proxyRequest(req: NextRequest, slug: string[], method: string) {
    try {
        const search = req.nextUrl.search || "";
        const url = `${BASE_URL}/${slug.join("/")}${search}`;

        const headers = new Headers();
        headers.set("Content-Type", "application/json");

        const body = method !== "GET" ? await req.text() : undefined;

        const res = await fetch(url, { method, headers: { ...headers, "X-API-KEY": API_KEY || "" }, body });
        const text = await res.text();

        return new NextResponse(text, {
            status: res.status,
            headers: {
                "Content-Type": res.headers.get("content-type") || "application/json",
            },
        });
    } catch (err) {
        console.error("[API PROXY ERROR]", err);
        return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await ctx.params;
    return proxyRequest(req, slug, "GET");
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await ctx.params;
    return proxyRequest(req, slug, "POST");
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await ctx.params;
    return proxyRequest(req, slug, "PUT");
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await ctx.params;
    return proxyRequest(req, slug, "DELETE");
}
