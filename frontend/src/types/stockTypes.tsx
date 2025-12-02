export interface StockData {
    symbol: string;
    open: string;
    high: string;
    low: string;
    price: string;
    previous_close: string;
    change_percent: string;
    volume: string;
    latest_trading_day: string;
}

export interface DailyCandel {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}