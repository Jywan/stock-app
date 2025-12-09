import { useState, useEffect } from "react";
import { fetchMarketOverview } from "../../api/StockApi";
import type { MarketOverviewResponse, MarketIndex } from "../../types/MarketType";
import "./MarketOverviewPanel.css"

function MarketOverviewPanel() {
    const [data, setData] = useState<MarketOverviewResponse | null>(null);
    const [error, setError] = useState< string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            const res = await fetchMarketOverview();
            if ("error" in res) {
                setError(res.error);
                setData(null);
            } else {
                setData(res);
            }
            setLoading(false);
        };

        load();
    }, []);

    return (
        <div className="market-section">
            <h3 className="panel-subtitle" style={{ marginTop: 20 }}>
                주요 시장 지수
            </h3>
            
            {loading && <p className="placeholder-text">지수 로딩 중...</p>}

            {error && <p className="error-text">시장 지수 에러: {error}</p>}

            {!loading && !error && data && (
                <div className="market-grid">
                    {data.indices.map((idx: MarketIndex) => {
                        const isUp = idx.change !== null && idx.change > 0;
                        const isDown = idx.change !== null && idx.change < 0;

                        return (
                            <div key={idx.symbol} className="market-card">
                                <div className="market-main">
                                    <div className="market-name">
                                        <span className="market-symbol">{idx.symbol}</span>
                                        <span className="market-fullname">{idx.name}</span>
                                    </div>
                                    <div className="market-price">
                                        {idx.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </div>
                                </div>

                                <div className="market-sub">
                                    <span
                                        className={"market-change " +
                                            (isUp ? "up" : isDown ? "down" : "flat")
                                        }    
                                        >
                                            {idx.change !== null
                                                ? `${idx.change > 0 ? "+" : ""}${idx.change.toFixed(2)}`
                                                : "-"}
                                    </span>
                                    <span
                                        className={"market-change-pct " +
                                            (isUp ? "up" : isDown ? "down" : "flat")
                                        }
                                        >
                                            {idx.change_percent ?? "-"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!loading && !error && !data && (
                <p className="placeholder-text">시장 지수 데이터를 불러오지 못했습니다.</p>
            )}
        </div>
    );

}

export default MarketOverviewPanel;