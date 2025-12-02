from flask import current_app
from ..utils.api_error import ApiError
import requests

class AlphaVantageService:

    @staticmethod
    def global_quote(symbol: str):
        api_key = current_app.config['ALPHAVANTAGE_API_KEY']

        if not api_key:
            raise ApiError("API 키 확인 필요", 500)

        url = (
            "https://www.alphavantage.co/query"
            f"?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}"
        )
        resp = requests.get(url)
        data = resp.json()
    
        if "Error Message" in data:
            raise ApiError("알파벤티지 에러", 400, data["Error Message"])
        if "Note" in data:
            raise ApiError("호출 제한 초과", 429, data["Note"])

        return data, url
    
    @staticmethod
    def daily_price(symbol: str):
        api_key = current_app.config['ALPHAVANTAGE_API_KEY']

        if not api_key:
            raise ApiError("API 키 확인 필요", 500)
        if not symbol:
            raise ApiError("심볼 필요", 400)

        url = (
            "https://www.alphavantage.co/query"
            f"?function=TIME_SERIES_DAILY&symbol={symbol}"
            f"&outputsize=compact&apikey={api_key}"
        )

        try :
            resp = requests.get(url, timeout=10)
        except requests.exceptions.RequestException as e:
            raise ApiError("알파벤티지 API 통신 오류", 502, str(e))

        data = resp.json()

        # 알파벤티지에서 제공하는 공식 에러 포맷 처리
        if "Error Message" in data:
            raise ApiError("알파벤티지 에러", 400, data["Error Message"])

        if "Note" in data:
            raise ApiError("호출 제한 초과", 429, data["Note"])

        # TIME_SERIES_DAILY 응답이 없으면 예외 처리
        if "Time Series (Daily)" not in data:
            raise ApiError("일간 데이터 없음", 400, data)

        return data, url