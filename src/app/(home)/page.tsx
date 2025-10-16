import CTABottom from "./components/cta-bottom";
import ExampleSection from "./components/example";
import HeroSection from "./components/hero";
import USPSesction from "./components/usp";

export default function Home() {
    return (
        <div className="mb-14 min-h-screen">
            <HeroSection />
            <USPSesction />
            <ExampleSection />
            <CTABottom />
        </div>
    );
}
