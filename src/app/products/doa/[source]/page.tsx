import DoaInfo from "../components/doa-info";
import DoaList from "../components/doa-list";
import SidebarDoa from "../components/doa-sidebar";

interface Props {
    params: Promise<{ source: string }>;
}

const DoaBySource = async ({ params }: Props) => {
    const { source } = await params;

    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarDoa source={source} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1 space-y-4">
                    <DoaInfo source={source} />
                    <DoaList source={source} />
                </main>
            </div>
        </section>
    );
};

export default DoaBySource;
