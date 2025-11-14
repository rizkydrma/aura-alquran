import { cn } from "@/lib/utils";
import * as React from "react";

interface ExpandableTextProps {
    text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
    const [expanded, setExpanded] = React.useState(false);
    const contentRef = React.useRef<HTMLParagraphElement>(null);
    const [isLongText, setIsLongText] = React.useState(false);

    React.useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * 4;
            setIsLongText(el.scrollHeight > maxHeight);
        }
    }, [text]);

    return (
        <React.Fragment>
            <p ref={contentRef} className={cn("text-justify text-sm text-neutral-300", !expanded && "line-clamp-4")}>
                {text}
            </p>

            {isLongText && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="self-start text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
                    type="button"
                >
                    {expanded ? "Tutup" : "Baca selengkapnya"}
                </button>
            )}
        </React.Fragment>
    );
};

export default ExpandableText;
