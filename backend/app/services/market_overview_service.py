import requests
from flask import current_app
from app.utils.api_error import ApiError

class MarketOverviewService:

    """
    - 주요 지수/ETF 요약정보를 AlphaVantage GLOBAL_QUOTE로 조회
    - 필요시 TICKERS 리스트만 수정해서 대상 변경
    """

    TICKER = [
        {"symbol": "SPY", "name": "S&P 500 (SPY)"},
        {"symbol": "QQQ", "name": "NASDAQ 100 (QQQ)"},
        {"symbol": "DIA", "name": "Dow Jones (DIA)"}
    ]

    @classmethod
    def _fetch_global_quote(cls, symbol: str) -> dict:
        api_key = current_app.config.get("ALPHAVANTAGE_API_KEY")
        if not api_key:
            raise ApiError("ALPHAVANTAGE_API_KEY 설정 필요", 500)
        
        url = (
            "https://www.alphavantage.co/query"
            f"?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}"
        )

        try:
            resp = requests.get(url, timeout=10)
        except Exception as e:
            raise ApiError("시장 지수 API 통신 오류", 502, str(e))
        
        try:
            data = resp.json()
        except Exception as e:
            raise ApiError("시장 지수 API 응답 파싱 오류", 502, str(e))
        
        # AlphaVantage 표준 에러 처리
        if "Error Massage" in data:
            raise ApiError("시장 지수 조회 에러", 400, data["Error Massage"])
        if "Note" in data:
            raise ApiError("시장 지수 API 호출 제한 초과", 429, data["Note"])
        
        quote = data.get("Global Quote") or data.get("Global_Quote")
        if not isinstance(quote, dict):
            raise ApiError("시장 지수 데이터 형식 오류", 502, data)
        
        # GLOBAL QUOTE 필드명 규칙
        price_str = quote.get("05. price")
        change_str = quote.get("09. change")
        change_pct_str = quote.get("10. change percent")

        if price_str is None:
            raise ApiError("시장 지수 가격 데이터 누락", 502, quote)

        try:
            price = float(price_str)
        except ValueError:
            raise ApiError("시장 지수 가격 파싱 오류", quote)
        
        change = None
        if change_str is not None:
            try:
                change = float(change_str)
            except ValueError:
                change = None

        change_percent = change_pct_str

        return {
            "symbol": symbol,
            "price": price,
            "change": change,
            "change_percent": change_percent,
        }
    
    @classmethod
    def get_market_snapshot(cls) -> dict:
        indices = []

        for item in cls.TICKER:
            symbol = item["symbol"]
            name = item["name"]

            quote = cls._fetch_global_quote(symbol)
            quote["name"] = name
            indices.append(quote)
        
        return {
            "indices": indices
        }
