import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Heading Component
const headingVariants = cva("font-bold leading-tight tracking-tight", {
    variants: {
        size: {
            h1: "text-4xl md:text-5xl lg:text-6xl",
            h2: "text-3xl md:text-4xl lg:text-5xl",
            h3: "text-2xl md:text-3xl lg:text-4xl",
            h4: "text-xl md:text-2xl lg:text-3xl",
            h5: "text-lg md:text-xl lg:text-2xl",
            h6: "text-base md:text-lg lg:text-xl",
        },
        alignment: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
        },
    },
    defaultVariants: {
        size: "h1",
        alignment: "left",
        weight: "bold",
    },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ className, size, alignment, weight, as = "h1", children, ...props }, ref) => {
    const Component = as;

    return (
        <Component className={cn(headingVariants({ size, alignment, weight, className }))} ref={ref} {...props}>
            {children}
        </Component>
    );
});
Heading.displayName = "Heading";

// Paragraph Component
const paragraphVariants = cva("text-gray-900 dark:text-gray-300", {
    variants: {
        size: {
            xxs: "text-[0.6rem] md:text-xs",
            xs: "text-xs md:text-sm",
            sm: "text-sm md:text-base",
            base: "text-base md:text-lg",
            lg: "text-lg md:text-xl",
            xl: "text-xl md:text-2xl",
        },
        alignment: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
            justify: "text-justify",
        },
        weight: {
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        },
        leading: {
            tight: "leading-tight",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
    defaultVariants: {
        size: "base",
        alignment: "left",
        weight: "normal",
        leading: "normal",
    },
});

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, size, alignment, weight, leading, children, ...props }, ref) => {
        return (
            <p
                className={cn(
                    paragraphVariants({
                        size,
                        alignment,
                        weight,
                        leading,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            >
                {children}
            </p>
        );
    },
);
Paragraph.displayName = "Paragraph";

export { Heading, Paragraph, headingVariants, paragraphVariants };
