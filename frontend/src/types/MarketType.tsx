export interface MarketIndex {
    symbol: string;
    name: string;
    price: number;
    change: number | null;
    change_percent: string | null;
}

export interface MarketOverviewResponse {
    indices: MarketIndex[];
}