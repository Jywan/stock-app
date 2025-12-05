import type { StockData } from "../../types/StockTypes";
import "./RealtimeQuotePanel.css";

interface Props {
    loading: boolean;
    error: string | null;
    data: StockData | null;
}

function RealtimeQuotePanel({ loading, error, data }: Props) {

    // 숫자포맷 유틸
    const formatPrice = (v: string | number | undefined | null): string => {
        if (v === undefined || v === null || v === "") return "-";
        const n = Number(v);
        if (Number.isNaN(n)) return String(v)
        return n.toFixed(2);
    } 

    const formatNumber = (v: string | number | undefined | null): string => {
        if (v === undefined || v === null || v === "") return "-";
        const n = Number(v);
        if (Number.isNaN(n)) return String(v);
        return n.toLocaleString();
    }

    const lastestTradingDay =  data?.latest_trading_day ?? "-";

    const changeNum = data?.change !== undefined ? Number(data.change) : NaN;
    const isUp = !Number.isNaN(changeNum) && changeNum > 0;
    const isDown = !Number.isNaN(changeNum) && changeNum < 0;

    const changeIcon = isUp ? "▲" : isDown ? "▼" : "";
    const changeText = data && (data.change || data.change_percent) 
                    ? `${data.change ?? ""} ${data.change_percent ?? ""}`.trim()
                    : "-";

    const changeClass = isUp
                    ? "quote-change badge-up"
                    : isDown
                    ? "quote-change badge-down"
                    : "quote-change badge-flat"

    if (loading && !data) {
        return (
            <section className="panel realtime-panel">
                <h2 className="panel-title">실시간 시세</h2>
                <p className="placeholder-text">실시간 시세를 불러오는중입니다...</p>
            </section>
        )
    }

    if (error && !data) {
        return (
            <section className="panel realtime-panel">
                <h2 className="panel-title">실시간 시세</h2>
                <p className="error-text">에러: {error}</p>
            </section>
        )
    }

    if (!data) {
        return (
            <section className="panel realtime-panel">
                <h2 className="panel-title">실시간 시세</h2>
                <p className="placeholder-text">
                    좌측에서 종목을 검색하면 이 영역에 시세가 표시됩니다.
                </p>
            </section>
        )
    }

    return (
        <section className="panel realtime-panel fade-in">
            <h2 className="panel-title">실시간 시세</h2>

            <div className="quote-summary">
                <div className="quote-summary-left">
                    <div className="quote-symbol">{data.symbol}</div>
                    <div className="quote-date">{lastestTradingDay}</div>
                </div>

                <div className="quote-price-big">
                    {formatPrice(data.high)}
                </div>

                <div className={changeClass}>
                    {changeIcon && <span className="quote-change-icon">{changeIcon}</span>}
                    <span>{changeText}</span>
                </div>
            </div>

            <div className="quote-grid">
                <div className="quote-item">
                    <div className="quote-label">시가</div>
                    <div className="quote-value">
                        {formatPrice(data.open)}
                    </div>
                </div>
                <div className="quote-item">
                    <div className="quote-label">고가</div>
                    <div className="quote-value">
                        {formatPrice(data.high)}
                    </div>
                </div>
                <div className="quote-item">
                    <div className="quote-label">저가</div>
                    <div className="quote-value">
                        {formatPrice(data.low)}
                    </div>
                </div>
                <div className="quote-item">
                    <div className="quote-label">전일 종가</div>
                    <div className="quote-value">
                        {formatPrice(data.previous_close)}
                    </div>
                </div>
                <div className="quote-item">
                    <div className="quote-label">거래량</div>
                    <div className="quote-value">
                        {formatNumber(data.volume)}
                    </div>
                </div>
                <div className="quote-item">
                    <div className="quote-label">심볼</div>
                    <div className="quote-value">
                        {data.symbol}
                    </div>
                </div>
            </div>

            {loading && (
                <p className="quote-sub-text">시세를 갱신하는 중입니다...</p>
            )}
            {error && (
                <p className="quote-sub-text error-text">시세 갱신 에러: {error}</p>
            )}
        </section>
    )
}

export default RealtimeQuotePanel;