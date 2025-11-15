export interface IDzikir {
    uuid: string;
    type: string;
    arab: string;
    indo: string;
    repeat: number;
    number: number;
}

export interface IDzikirGroupedByType {
    type: string;
    total_dzikir: number;
}
