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

export type TypeParameters = "query" | "path" | "body" | "header";

export type Category = "quran" | "hadith" | "dzikir" | "doa" | "asmaul-husna" | "tafsir" | "all";

export const apiEndpoints: (APITesterProps["endpoint"] & { categories: Category[] })[] = [
    // Surah endpoints
    {
        method: "GET",
        path: "/surahs",
        description: "Get list of all surahs with pagination and search",
        categories: ["quran"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 114)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
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
            description: "Get surah with ID 1",
            params: { surahId: "1" },
        },
    },
    // Ayat endpoints
    {
        method: "GET",
        path: "/surahs/{surahId}/ayats",
        description: "Get all ayats for a specific surah with pagination and search",
        categories: ["quran"],
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Retrieve first page of ayats from surah 1",
            params: { surahId: "1", page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/surahs/{surahId}/ayats/{ayatNumber}",
        description: "Get specific ayat by surah ID and ayat number",
        categories: ["quran"],
        parameters: [
            { name: "surahId", type: "path", description: "Surah ID", required: true },
            { name: "ayatNumber", type: "path", description: "Ayat Number", required: true },
        ],
        example: {
            description: "Get ayat 1 from surah 1",
            params: { surahId: "1", ayatNumber: "1" },
        },
    },
    {
        method: "GET",
        path: "/ayats/search",
        description: "Search for ayats across all surahs",
        categories: ["quran"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Search ayats",
            params: { q: "rahman", page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/ayats/juz",
        description: "Get list of available Juz",
        categories: ["quran"],
        parameters: [],
        example: {
            description: "Retrieve list of Juz",
        },
    },
    {
        method: "GET",
        path: "/ayats/juz/{juz}",
        description: "Get ayats filtered by Juz number",
        categories: ["quran"],
        parameters: [
            { name: "juz", type: "path", description: "Juz number", required: true },
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Get ayats from Juz 1",
            params: { juz: "1", page: "1", limit: "10" },
        },
    },
    // Tafsir endpoints
    {
        method: "GET",
        path: "/tafsirs/{ayatId}",
        description: "Get tafsir for a specific ayat by ayat ID",
        categories: ["quran", "tafsir"],
        parameters: [{ name: "ayatId", type: "path", description: "Ayat ID", required: true }],
        example: {
            description: "Get tafsir for ayat with ID 1",
            params: { ayatId: "1" },
        },
    },
    // Hadis endpoints
    {
        method: "GET",
        path: "/hadis",
        description: "Get hadis sources grouped with their counts",
        categories: ["hadith"],
        parameters: [],
        example: {
            description: "Retrieve list of hadis sources",
        },
    },
    {
        method: "GET",
        path: "/hadis/single/{source}",
        description: "Get a single random hadis from a specific source",
        categories: ["hadith"],
        parameters: [{ name: "source", type: "path", description: "Hadis source (e.g., bukhari, muslim)", required: true }],
        example: {
            description: "Get random hadis from Bukhari",
            params: { source: "bukhari" },
        },
    },
    {
        method: "GET",
        path: "/hadis/{source}",
        description: "Get all hadis from a specific source with pagination and search",
        categories: ["hadith"],
        parameters: [
            { name: "source", type: "path", description: "Hadis source (e.g., bukhari, muslim)", required: true },
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Get hadis from Bukhari",
            params: { source: "bukhari", page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/hadis/{source}/{number}",
        description: "Get specific hadis by source and number",
        categories: ["hadith"],
        parameters: [
            { name: "source", type: "path", description: "Hadis source (e.g., bukhari, muslim)", required: true },
            { name: "number", type: "path", description: "Hadis number", required: true },
        ],
        example: {
            description: "Get hadis number 1 from Bukhari",
            params: { source: "bukhari", number: "1" },
        },
    },
    // Dzikir endpoints
    {
        method: "GET",
        path: "/dzikirs",
        description: "Get dzikir types grouped with their counts",
        categories: ["dzikir"],
        parameters: [],
        example: {
            description: "Retrieve list of dzikir types",
        },
    },
    {
        method: "GET",
        path: "/dzikirs/all",
        description: "Get all dzikirs with pagination and search",
        categories: ["dzikir"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Retrieve all dzikirs",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/dzikirs/{uuid}",
        description: "Get specific dzikir by UUID",
        categories: ["dzikir"],
        parameters: [{ name: "uuid", type: "path", description: "Dzikir UUID", required: true }],
        example: {
            description: "Get dzikir by UUID",
            params: { uuid: "uuid-string" },
        },
    },
    // Doa endpoints
    {
        method: "GET",
        path: "/doas",
        description: "Get doa sources grouped with their counts",
        categories: ["doa"],
        parameters: [],
        example: {
            description: "Retrieve list of doa sources",
        },
    },
    {
        method: "GET",
        path: "/doas/all",
        description: "Get all doas with pagination, search, and source filtering",
        categories: ["doa"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
            { name: "source", type: "query", description: "Filter by source (e.g., quran, hadits)", required: false },
        ],
        example: {
            description: "Retrieve all doas",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/doas/{uuid}",
        description: "Get specific doa by UUID",
        categories: ["doa"],
        parameters: [{ name: "uuid", type: "path", description: "Doa UUID", required: true }],
        example: {
            description: "Get doa by UUID",
            params: { uuid: "uuid-string" },
        },
    },
    // Asmaul Husna endpoints
    {
        method: "GET",
        path: "/asmaulhusnas",
        description: "Get all Asmaul Husna with pagination and search",
        categories: ["asmaul-husna"],
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10, max: 100)", required: false },
            { name: "q", type: "query", description: "Search query (max 100 characters)", required: false },
        ],
        example: {
            description: "Retrieve all Asmaul Husna",
            params: { page: "1", limit: "10" },
        },
    },
    {
        method: "GET",
        path: "/asmaulhusnas/{uuid}",
        description: "Get specific Asmaul Husna by UUID",
        categories: ["asmaul-husna"],
        parameters: [{ name: "uuid", type: "path", description: "Asmaul Husna UUID", required: true }],
        example: {
            description: "Get Asmaul Husna by UUID",
            params: { uuid: "uuid-string" },
        },
    },
];
