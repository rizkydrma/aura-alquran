export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
    const url = path.startsWith("/api") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        cache: "no-store",
    });

    if (!res.ok) {
        let message = `Request failed with status ${res.status}`;
        try {
            const err = await res.json();
            message = err?.error?.message || message;
        } catch {}
        throw new Error(message);
    }

    return res.json();
}
