import { useEffect, useState } from "react";
import { fetchExchangeRates } from "../../api/StockApi";
import type { ExchangeData } from "../../types/ExchangeType";
import "./ExchangeRatePanel.css";

function ExchangeRatePanel() {
    const [data, setData] = useState<ExchangeData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchExchangeRates()
            .then(setData)
            .catch((e) => setError(e.message));
    }, []);

    if (error) {
        return (
            <div className="panel">
                <h2 className="panel-title">환율</h2>
                <p className="error-text">{error}</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="panel">
                <h2 className="panel-title">환율</h2>
                <p className="placeholder-text">불러오는 중...</p>
            </div>
        )
    }
    const { base, rates } = data;

    return (
            <div className="panel">
                <h2 className="panel-title">환율</h2>
                <p className="panel-subtitle">기준통화: {base}</p>

                <div className="rate-list">
                    <div className="rate-row">
                        <span>🇰🇷 KRW</span>
                        <span>{rates.KRW?.toLocaleString()}</span>
                    </div>
                    <div className="rate-row">
                        <span>🇪🇺 EUR</span>
                        <span>{rates.EUR?.toLocaleString()}</span>
                    </div>
                    <div className="rate-row">
                        <span>🇯🇵 JPY</span>
                        <span>{rates.JPY?.toLocaleString()}</span>
                    </div>
                    <div className="rate-row">
                        <span>🇨🇳 CNY</span>
                        <span>{rates.CNY?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }

export default ExchangeRatePanel;