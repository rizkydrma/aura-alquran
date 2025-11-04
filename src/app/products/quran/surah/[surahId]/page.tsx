import SidebarSurah from "../../components/sidebar-surah";
import SurahDetail from "../../components/surah-detail";

export default function AyatListPage() {
    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                {/* Sticky Sidebar */}
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarSurah />
                    </div>
                </aside>
                <main className="min-w-0 flex-1">
                    <SurahDetail />
                </main>
            </div>
        </section>
    );
}
