import { useState, useMemo } from "react";
import StockChart from "../StockChart/StockChart";
import { calcSMA, calcEMA } from "../../utils/indicators";
import type { DailyCandle } from "../../types/StockTypes";
import type { Timeframe } from "../../api/StockApi";
import "./StockChartPanel.css";

type RangeOption = "1M" | "3M" | "6M" | "1Y" | "ALL";
type IndicatorMode = "SMA" | "EMA" | "ALL";
interface Props {
    symbol: string | null;
    daily: DailyCandle[];
    timeframe: Timeframe;
    loading: boolean;
    onChangeTimeframe: (next: Timeframe) => void;
}

function StockChartPanel({
    symbol,
    daily,
    timeframe,
    loading,
    onChangeTimeframe,
}: Props) {
    const [range, setRange] = useState<RangeOption>("3M");
    const [indicatorMode, setIndicatorMode] = useState<IndicatorMode>("SMA");

    // 기간mo 필터 적용
    const filteredData = useMemo(() => {
        if (!daily || daily.length === 0) return [];

        if (range === "ALL") return daily;

        const now = new Date();
        const days =
            range === "1M" ? 30 :
            range === "3M" ? 90 :
            range === "6M" ? 180 :
            365;

        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        return daily.filter(candle => {
            const d = new Date(candle.date);
            return d >= cutoff;
        });
    }, [daily, range]);

    // SMA
    const sma5 = useMemo(() => calcSMA(filteredData, 5), [filteredData]);
    const sma20 = useMemo(() => calcSMA(filteredData, 20), [filteredData]);
    const sma60 = useMemo(() => calcSMA(filteredData, 60), [filteredData]);

    // EMA
    const ema5 = useMemo(() => calcEMA(filteredData, 5), [filteredData])
    const ema20 = useMemo(() => calcEMA(filteredData, 20), [filteredData])
    const ema60 = useMemo(() => calcEMA(filteredData, 60), [filteredData])

    return (
        <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-header-row">
                <h2 className="panel-title">차트</h2>

                <div className="chart-header-controls">
                    {/* === 타임프레임 토글 === */}
                    <div className={`timeframe-toggle timeframe-${timeframe.toLowerCase()}`}>
                        <div className="timeframe-indicator" />

                        <button
                            className={`tf-btn ${timeframe === "DAILY" ? "active" : ""}`}
                            onClick={() => onChangeTimeframe("DAILY")}
                            disabled={loading}
                        >
                            일간
                        </button>
                        <button
                            className={`tf-btn ${timeframe === "WEEKLY" ? "active" : ""}`}
                            onClick={() => onChangeTimeframe("WEEKLY")}
                            disabled={loading}
                        >
                            주간
                        </button>
                        <button
                            className={`tf-btn ${timeframe === "MONTHLY" ? "active" : ""}`}
                            onClick={() => onChangeTimeframe("MONTHLY")}
                            disabled={loading}
                        >
                            월간
                        </button>
                    </div>

                    {/* === 기간 필터 === */}
                    <div className="range-toggle">
                        <button
                            className={`range-btn ${range === "1M" ? "active" : ""}`}
                            onClick={() => setRange("1M")}
                            disabled={loading}
                        >
                            1M
                        </button>
                        <button
                            className={`range-btn ${range === "3M" ? "active" : ""}`}
                            onClick={() => setRange("3M")}
                            disabled={loading}
                        >
                            3M
                        </button>
                        <button
                            className={`range-btn ${range === "6M" ? "active" : ""}`}
                            onClick={() => setRange("6M")}
                            disabled={loading}
                        >
                            6M
                        </button>
                        <button
                            className={`range-btn ${range === "1Y" ? "active" : ""}`}
                            onClick={() => setRange("1Y")}
                            disabled={loading}
                        >
                            1Y
                        </button>
                        <button
                            className={`range-btn ${range === "ALL" ? "active" : ""}`}
                            onClick={() => setRange("ALL")}
                            disabled={loading}
                        >
                            전체
                        </button>
                    </div>

                    <div className="indicator-toggle">
                        <button
                            className={`indicator-btn ${indicatorMode === "SMA" ? "active" : ""}`}
                            onClick={() =>setIndicatorMode("SMA")}
                            disabled={loading || timeframe !== "DAILY"}
                        >
                            SMA
                        </button>
                        <button
                            className={`indicator-btn ${indicatorMode === "EMA" ? "active" : ""}`}
                            onClick={() =>setIndicatorMode("EMA")}
                            disabled={loading || timeframe !== "DAILY"}
                        >
                            EMA
                        </button>
                        <button
                            className={`indicator-btn ${indicatorMode === "ALL" ? "all-active" : ""}`}
                            onClick={() => setIndicatorMode("ALL")}
                        >
                            전체
                        </button>
                    </div>
                </div>
            </div>

            {/* === 차트 본문 === */}
            {filteredData.length > 0 && symbol ? (
                <div className="fade-in" key={`${symbol}`}>
                    <StockChart 
                        symbol={symbol} 
                        data={filteredData} 
                        sma5={
                            timeframe === "DAILY" && (indicatorMode === "SMA" || indicatorMode === "ALL")
                                ? sma5
                                : undefined
                        }
                        sma20={
                            timeframe === "DAILY" && (indicatorMode === "SMA" || indicatorMode === "ALL")
                                ? sma20
                                : undefined
                        }
                        sma60={
                            timeframe === "DAILY" && (indicatorMode === "SMA" || indicatorMode === "ALL")
                                ? sma60
                                : undefined
                        }
                        ema5={
                            timeframe === "DAILY" && (indicatorMode === "EMA" || indicatorMode === "ALL")
                                ? ema5
                                : undefined
                        }
                        ema20={
                            timeframe === "DAILY" && (indicatorMode === "EMA" || indicatorMode === "ALL")
                                ? ema20
                                : undefined
                        }
                        ema60={
                            timeframe === "DAILY" && (indicatorMode === "EMA" || indicatorMode === "ALL")
                                ? ema60
                                : undefined
                        }
                        darkMode={true}
                    />
                </div>
            ) : (
                <div className="chart-placeholder">
                    좌측에서 종목을 검색하면 기간별 차트가 표시됩니다.
                </div>
            )}
        </div>
    );
}

export default StockChartPanel;