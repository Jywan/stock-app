from flask import Blueprint, jsonify
from ..services.alphavantage_service import AlphaVantageService

news_bp = Blueprint('news', __name__)

@news_bp.get("/stock/news/<symbol>")
def get_stock_news(symbol: str):
    """특정 심볼 기준 뉴스 + 간단 요약/링크 반환"""
    data, _ = AlphaVantageService.news_sentiment(symbol)

    # AlphaVantage NEWS_SETIMENT 응답의 feed 부분만 가공
    feed = data.get("feed", [])

    # 프론트에서 필요한 필드만 추출
    articles = []
    for item in feed:
        articles.append({
            "title": item.get("title", ""),
            "summary": item.get("summary", ""),
            "source": item.get("source", ""),
            "url": item.get("url", ""),
            "time_published": item.get("time_published", ""),
            "overall_sentiment_score": item.get("overall_sentiment_score", ""),
            "overall_sentiment_label": item.get("overall_sentiment_label", ""),
        })

    return jsonify({
        "symbol": symbol,
        "count": len(articles),
        "articles": articles
    })