import ExpandableText from "@/components/ExpandableText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { IDoa } from "@/lib/api/doas";
import * as React from "react";

interface DoaItemProps {
    doa: IDoa;
}

const DoaItem: React.FC<DoaItemProps> = ({ doa }) => {
    return (
        <SpotlightCard className="rounded-xl border bg-white p-8 dark:bg-neutral-900" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="flex flex-col gap-4">
                {/* Nomor hadis */}
                <div className="flex items-start justify-between gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-800 text-sm font-semibold text-neutral-100">
                        {doa?.number}
                    </div>

                    <div className="space-y-4">
                        {doa?.title && <h2 className="text-right text-lg leading-relaxed font-bold text-neutral-300">{doa?.title}</h2>}
                        <h3 className="text-right text-xl leading-relaxed font-bold text-neutral-200">{doa?.arab}</h3>

                        <ExpandableText text={doa?.indo} />
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default DoaItem;
