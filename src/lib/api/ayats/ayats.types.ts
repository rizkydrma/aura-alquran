export interface IAyat {
    ayatNumber: string;
    surahId: string;
    arabic: string;
    translation: string;
    transliteration: string;
    latin: string;
    audio: string;
    location: string;
    uuid: string;
    footnotes?: string;
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
