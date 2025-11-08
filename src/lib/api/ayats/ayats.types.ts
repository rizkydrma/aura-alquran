export interface IAyat {
    id: string;
    ayatNumber: number;
    surahId: string;
    arabic: string;
    translation: string;
    transliteration: string;
    latin: string;
    audio: string;
    location: string;
    footnotes?: string;
    surah: {
        arabic: string;
        latin: string;
        translation: string;
    };
}

export interface IJuz {
    juz: number;
    total_ayat: number;
    surahs: {
        id: number;
        arabic: string;
        latin: string;
        translation: string;
    }[];
}
