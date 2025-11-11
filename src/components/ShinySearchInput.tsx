import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface ShinySeachInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Delay waktu debounce dalam ms */
    delay?: number;
    /** Callback saat value hasil debounce berubah */
    onDebouncedChange?: (value: string) => void;
    /** Menampilkan animasi loading di border */
    isLoading?: boolean;
}

const ShinySeachInput: React.FC<ShinySeachInputProps> = ({ delay = 500, onDebouncedChange, isLoading = false, ...props }) => {
    const [value, setValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [show, setShow] = useState(isLoading);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (isLoading) {
            // langsung tampil
            setShow(true);
        } else {
            // tunda hilangnya 1 detik
            timer = setTimeout(() => setShow(false), 1500);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isLoading]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    useEffect(() => {
        if (onDebouncedChange) onDebouncedChange(debouncedValue);
    }, [debouncedValue, onDebouncedChange]);

    return (
        <div className="relative w-full max-w-[400px] overflow-hidden rounded-md bg-neutral-950 py-5">
            <div
                className={cn("absolute top-1/2 left-1/2 aspect-square w-full rounded-full", show ? "rotate-animation" : "hidden")}
                style={{
                    transform: "translate(-50%, -50%) scale(1.4)",
                    background: "conic-gradient(from 180deg, transparent 135deg, #d8b4fe, transparent 225deg, transparent)",
                }}
            />

            <div
                className={cn("absolute top-1/2 left-1/2 aspect-square w-full rounded-full", show ? "-rotate-animation" : "hidden")}
                style={{
                    transform: "translate(-50%, -50%) scale(1.4)",
                    background: "conic-gradient(from 180deg, transparent 135deg, #d8b4fe, transparent 225deg, transparent)",
                }}
            />

            {/* Inner overlay (like ::after) */}
            <div className="absolute inset-[1.5px] rounded-[inherit] bg-neutral-950" />

            {/* Input */}
            <Input
                {...props}
                name="search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="absolute inset-0 z-10 h-full w-full bg-transparent text-xs text-white outline-none focus:border-none focus:ring-0"
            />
        </div>
    );
};

export default ShinySeachInput;
