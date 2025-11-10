import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import ShinyText from "./ShinyText";

const logoTextVariants = cva("font-bold tracking-tight", {
    variants: {
        size: {
            small: "text-sm",
            default: "text-base",
            medium: "text-lg",
            large: "text-xl",
            xl: "text-5xl",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface LogoProps extends VariantProps<typeof logoTextVariants> {
    width?: number;
    height?: number;
    showText?: boolean;
    className?: string;
}

const Logo = ({ width = 40, height = 40, showText = true, size = "default", className }: LogoProps) => {
    return (
        <div className={clsx("flex items-center gap-2", className)}>
            <Image src="/assets/nnx-logo.png" alt="NNX Logo" width={width} height={height} priority />
            {showText && <ShinyText text="NN X API Muslim" disabled={false} speed={3} className={logoTextVariants({ size })} />}
        </div>
    );
};

export default Logo;
