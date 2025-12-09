export interface ExchangeRates {
    KRW?: number;
    EUR?: number;
    JPY?: number;
    CNY?: number;
}

export interface ExchangeData {
    base: string;
    rates: ExchangeRates;   // <= 여기 무조건 rates
}