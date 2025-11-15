import DzikirInfo from "../components/dzikir-info";
import DzikirList from "../components/dzikir-list";
import SidebarDzikir from "../components/dzikir-sidebar";

interface Props {
    params: Promise<{ type: string }>;
}

const DzikirByType = async ({ params }: Props) => {
    const { type } = await params;

    return (
        <section className="relative mx-auto max-w-7xl p-4">
            <div className="flex gap-8">
                <aside className="w-64 shrink-0">
                    <div className="sticky top-4">
                        <SidebarDzikir type={type} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1 space-y-4">
                    <DzikirInfo type={type} />
                    <DzikirList type={type} />
                </main>
            </div>
        </section>
    );
};

export default DzikirByType;
