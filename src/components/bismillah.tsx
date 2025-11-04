"use client";

import Image from "next/image";

export default function Bismillah() {
    return (
        <div className="relative h-[50px] w-[320px] overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/5" />
            <Image src="/assets/bismillah.png" alt="Bismillah" fill priority className="object-contain object-center invert-100" />
        </div>
    );
}
