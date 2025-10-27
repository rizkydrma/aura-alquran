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
}

export interface IJuz {
    juz: number;
    total_ayat: number;
    surahs: {
        surah_id: number;
        arabic: string;
        latin: string;
        translation: string;
    }[];
}
