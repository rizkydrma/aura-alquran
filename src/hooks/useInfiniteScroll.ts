"use client";

import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
    enabled?: boolean;
    onIntersect: () => void;
    threshold?: number;
}

/**
 * Reusable infinite scroll hook using IntersectionObserver.
 */
export const useInfiniteScroll = ({ enabled = true, onIntersect, threshold = 1 }: UseInfiniteScrollProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) onIntersect();
            },
            { threshold },
        );

        const current = ref.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, [enabled, onIntersect, threshold]);

    return ref;
};
