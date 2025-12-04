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

export interface DailyCandle {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface NewsArticle {
    title: string;
    summary: string;
    source: string;
    url: string;
    time_published: string;
    overall_sentiment_score: number;
    overall_sentiment_label: string;
}