export interface ITafsir {
    id: number;
    ayatId: number;
    surahId: number | null;
    wajiz: string | null;
    tahlili: string | null;
    introSurah: string | null;
    outroSurah: string | null;
    munasabahPrevSurah: string | null;
    munasabahPrevTheme: string | null;
    themeGroup: string | null;
    kosakata: string | null;
    sababNuzul: string | null;
    conclusion: string | null;
    createdAt: string; // mode: string dari timestamp
    updatedAt: string;
    surah: {
        arabic: string;
        latin: string;
        translation: string;
    };
}
