/* eslint-disable import/no-anonymous-default-export */
export default {
    index: {
        title: "Home",
        type: "page",
    },
    docs: {
        title: "Documentation",
        type: "page",
    },
    products: {
        type: "menu",
        title: "Produk",
        items: {
            quran: {
                title: "Quran",
                href: "/products/quran",
            },
            hadis: {
                title: "Hadis",
                href: "/products/hadis",
            },
            doa: {
                title: "Doa",
                href: "/products/doa",
            },
            dzikir: {
                title: "Dzikir",
                href: "/products/dzikir",
            },
            asmaulhusna: {
                title: "Asmaul Husna",
                href: "/products/asmaulhusna",
            },
        },
    },
};
