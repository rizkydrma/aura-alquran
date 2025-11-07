import SidebarSurah from "../../components/sidebar-surah";
import SurahDetail from "../../components/surah-detail";
import SurahInfo from "../../components/surah-info";

interface PageProps {
    params: Promise<{ surahId: string }>;
}

const AyatListPage = async ({ params }: PageProps) => {
    const { surahId } = await params;
    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                {/* Sticky Sidebar */}
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarSurah />
                    </div>
                </aside>
                <main className="min-w-0 flex-1 space-y-4">
                    <SurahInfo surahId={surahId} />
                    <SurahDetail surahId={surahId} />
                </main>
            </div>
        </section>
    );
};

export default AyatListPage;
