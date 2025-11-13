import HadisInfo from "../components/hadis-info";
import HadisList from "../components/hadis-list";
import SidebarHadis from "../components/sidebar-hadis";

interface PageProps {
    params: Promise<{ source: string }>;
}

const HadisBySourcePage = async ({ params }: PageProps) => {
    const { source } = await params;

    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                {/* Sticky Sidebar */}
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarHadis source={source} />
                    </div>
                </aside>
                <main className="min-w-0 flex-1 space-y-4">
                    <HadisInfo source={source} />
                    <HadisList source={source} />
                </main>
            </div>
        </section>
    );
};

export default HadisBySourcePage;
