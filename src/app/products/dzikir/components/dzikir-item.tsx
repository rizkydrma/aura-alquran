import ExpandableText from "@/components/ExpandableText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { IDzikir } from "@/lib/api/dzikir";
import * as React from "react";

interface DzikirItemProps {
    dzikir: IDzikir;
}

const DzikirItem: React.FC<DzikirItemProps> = ({ dzikir }) => {
    return (
        <SpotlightCard className="rounded-xl border bg-white p-8 dark:bg-neutral-900" spotlightColor="rgba(96, 16, 221, 0.4)">
            <div className="flex flex-col gap-4">
                {/* Nomor hadis */}
                <div className="flex items-start justify-between gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-purple-800 text-sm font-semibold text-neutral-100">
                        {dzikir?.number}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-right text-xl leading-relaxed font-bold text-neutral-200">{dzikir?.arab}</h3>

                        <ExpandableText text={dzikir?.indo} />
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default DzikirItem;
