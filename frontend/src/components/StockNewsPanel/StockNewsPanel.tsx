import type { NewsArticle } from "../../types/StockTypes";
import "./StockNewsPanel.css";

interface Props {
    symbol: string | null;
    articles: NewsArticle[];
    loading: boolean;
    error: string | null;
    onReload: () => void;
}

function StockNewsPanel({ symbol, articles, loading, error, onReload }: Props) {
    return (

        <section className="page-right panel">
            <div className="news-header">
                <h2 className="panel-title">관련 뉴스</h2>
                <button className="news-refresh-btn" onClick={onReload} disabled={!symbol || loading}>
                    새로고침
                </button>
            </div>

            {!symbol && (
                <p className="placeholder-text">
                    좌측에서 종목을 검색하면,
                    <br />
                    이 영역에 해당 종목 관련 뉴스가 표시됩니다.
                </p>
            )}

            {symbol && loading && (
                <p className="placeholder-text">뉴스 로딩 중....</p>
            )}

            {symbol && error && (
                <p className="error-text">뉴스 에러 {error}</p>
            )}

            {symbol && !loading && !error && articles.length === 0 && (
                <p className="placeholder-text">
                    현재 표시할 뉴스가 없습니다.
                </p>
            )}

            {symbol && !loading && !error && articles.length > 0 && (
                <ul className="news-list">
                    {articles.slice(0, 10).map((a, idx) => (
                        <li key={idx} className="news-item">
                            <a href={a.url} target="_blank" rel="noreferrer" className="news-title">
                                {a.title}
                            </a>
                            <div className="news-meta">
                                <span className="news-source">{a.source}</span>
                                {a.time_published && (
                                    <span className="news-time">
                                        {a.time_published}
                                    </span>
                                )}
                                {a.overall_sentiment_label && (
                                    <span className={`news-sentiment badge-${a.overall_sentiment_label.toLowerCase}`}>
                                        {a.overall_sentiment_label}
                                    </span>
                                )}
                            </div>
                            {a.summary && (
                                <p className="news-summary">
                                    {a.summary.length >120
                                        ? a.summary.slice(0, 120) + "..."
                                        : a.summary
                                    }
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default StockNewsPanel;