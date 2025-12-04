import StockChart from "../StockChart/StockChart";
import type { DailyCandle } from "../../types/StockTypes";
import type { Timeframe } from "../../api/StockApi";

interface Props {
    symbol: string | null;
    daily: DailyCandle[];
    timeframe: Timeframe;
    loading: boolean;
    onChangeTimeframe: (next: Timeframe) => void;
}

function StockChartPanel({symbol, daily, timeframe, loading, onChangeTimeframe,}: Props) {
    return (
        <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-header-row">
                <h2 className="panel-title">차트</h2>
                    <div className={`timeframe-toggle timeframe-${timeframe.toLowerCase()}`}>
                        <div className="timeframe-indicator" />
                            <button className={`tf-btn ${timeframe === "DAILY" ? "active" : ""}`}
                                                onClick={() => onChangeTimeframe("DAILY")}
                                                disabled={loading}
                            >
                                일간
                            </button>
                            <button className={`tf-btn ${timeframe === "WEEKLY" ? "active" : ""}`} 
                                                onClick={() => onChangeTimeframe("WEEKLY")}
                                                disabled={loading}
                            >
                                주간
                            </button>
                            <button className={`tf-btn ${timeframe === "MONTHLY" ? "active" : ""}`} 
                                                onClick={() => onChangeTimeframe("MONTHLY")}
                                                disabled={loading}
                            >
                                월간
                            </button>
                        </div>
                    </div>
                        
                    {daily.length > 0 && symbol ? (
                        <div className="fade-in" key={`${symbol}-${timeframe}`}>
                            <StockChart symbol={symbol} data={daily} darkMode={true} />
                        </div> ) : (
                        <div className="chart-placeholder">
                            좌측에서 종목을 검색하면 기간별 차트가 표시됩니다.
                        </div>
                        )}
                </div>
    )
}

export default StockChartPanel;