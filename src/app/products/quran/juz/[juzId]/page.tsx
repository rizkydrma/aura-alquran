import * as React from "react";
import JuzDetail from "../../components/juz-detail";
import SidebarJuz from "../../components/sidebar-juz";

const ComponentName: React.FC = () => {
    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                {/* Sticky Sidebar */}
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarJuz />
                    </div>
                </aside>
                <main className="min-w-0 flex-1">
                    <JuzDetail />
                </main>
            </div>
        </section>
    );
};

export default ComponentName;
