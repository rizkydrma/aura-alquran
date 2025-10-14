import ExampleSection from "./components/example";
import HeroSection from "./components/hero";
import USPSesction from "./components/usp";

export default function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <USPSesction />
            <ExampleSection />
        </div>
    );
}
