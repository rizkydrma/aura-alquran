export interface IDoa {
    uuid: string;
    title: string;
    arab: string;
    indo: string;
    source: string;
    number: number;
}

export interface IDoaGroupedBySource {
    source: string;
    total_doa: number;
}
