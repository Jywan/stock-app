import type { DailyCandle } from "../types/StockTypes";


/**
 * 단순 이동 평균 (SMA)
 * - candle[i].close 기준
 * - period 이전 구간은 null로 채움 (차트에서 자연스럽게 빠짐)
 */
export function calcSMA( candle: DailyCandle[], period: number): (number | null)[] {
    const len = candle.length;
    const result: (number | null)[] = new Array(len).fill(null);

    if (period <= 0 || candle.length === 0) return result;

    let sum = 0;
    
    for (let i = 0; i < len; i++) {
        sum += candle[i].close;

        if (i >= period) {
            sum -= candle[i -period].close;
        }

        if (i >= period - 1) {
            result[i] = sum / period;
        }
    }

    return result;
}


