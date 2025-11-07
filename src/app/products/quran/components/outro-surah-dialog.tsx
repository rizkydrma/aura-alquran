"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

interface OutroSurahProps {
    outroSurah: string | null;
}

const OutroSurahDialog = ({ outroSurah }: OutroSurahProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!outroSurah) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                size="sm"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-md border bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-purple-500/20"
            >
                <InfoIcon className="h-4 w-4" />
                Penutup
            </Button>

            <DialogContent className="max-w-md lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Penutup Surah</DialogTitle>
                </DialogHeader>

                <div className="max-h-[70vh] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] pb-16">
                    <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300" dangerouslySetInnerHTML={{ __html: outroSurah }} />
                </div>

                <DialogFooter className="justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Tutup
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default OutroSurahDialog;
