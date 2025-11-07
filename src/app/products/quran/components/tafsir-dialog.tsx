"use client";

import { TafsirSkeleton } from "@/components/skeleton/skeleton-tafsir";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IAyat } from "@/lib/api/ayats";
import { useTafsirByAyat } from "@/lib/api/tafsirs/tafsirs.query";
import { BookTextIcon } from "lucide-react";
import { Fragment, useState } from "react";

interface TafsirDialogProps {
    ayat: IAyat;
}

const TafsirDialog = ({ ayat }: TafsirDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, isError, error } = useTafsirByAyat(ayat?.id, { enabled: isOpen });

    if (isError) return <div>Gagal {(error as Error).message}</div>;

    const tafsir = data?.data;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button size="sm" onClick={() => setIsOpen(true)}>
                <BookTextIcon className="h-4 w-4" />
            </Button>

            <DialogContent className="max-w-md lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Tafsir</DialogTitle>

                    {!isLoading && (
                        <DialogDescription>
                            Surah {tafsir?.surah?.latin} - Ayat {tafsir?.ayatId}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {isLoading ? (
                    <TafsirSkeleton />
                ) : (
                    <Fragment>
                        <div className="max-h-[70vh] space-y-6 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] pb-16">
                            <h3 className="text-right text-2xl font-bold text-neutral-200">{ayat?.arabic}</h3>

                            <div className="space-y-2">
                                <h1 className="text-base leading-relaxed font-semibold text-neutral-100">Tafsir Ringkas</h1>
                                <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-300">{tafsir?.wajiz}</p>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-base leading-relaxed font-semibold text-neutral-100">Tafsir Tahlili</h1>
                                <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-300">{tafsir?.tahlili}</p>
                            </div>
                        </div>
                    </Fragment>
                )}

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

export default TafsirDialog;
