export interface IHadisBySource {
    source: string;
    total_hadis: number;
}

export interface IHadis {
    uuid: string;
    source: string;
    number: number;
    title: string;
    arab: string;
    indo: string;
}
