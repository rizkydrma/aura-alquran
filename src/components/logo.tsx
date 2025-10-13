import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 40, height = 40 }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/assets/aura-logo.png" alt="Aura Al-Quran Logo" width={width} height={height} priority />
      <span className="font-bold text-lg">Aura Alquran</span>
    </div>
  );
};

export default Logo;
