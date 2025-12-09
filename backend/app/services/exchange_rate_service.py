import requests
from flask import current_app
from app.utils.api_error import ApiError

class ExchangeRateService:
    """ ExchangeRate-API 기반 환율 조회 서비스 """
    
    _latest_rates = None
    _last_updated = None

    @classmethod
    def update_rates(cls):
        """외부 API 호출해서 최신 환율을 캐시에 저장"""

        api_key = current_app.config.get["EXCHANGE_API_KEY"]
        base = current_app.config.get["EXCHANGE_BASE_CURRENCY"]
        
        if not api_key:
            raise ApiError("EXCHANGE_API_KEY 설정 필요", 500)
        
        url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/{base}"

        try: 
            resp = requests.get(url, timeout=10)
        except requests.exceptions.RequestException as e:
            raise ApiError("환율 API 통신 오류", 502, str(e))
        
        try:
            data = resp.json()
        except Exception as e:
            raise ApiError("환율 API 응답 파싱 에러", 502, str(e))
        
        if data.get("result") != "success":
            raise ApiError("환율 API 에러", 502, data)
        
        conversion_rates = data.get("conversion_rates")
        if not isinstance(conversion_rates, dict):
            raise ApiError("환율 데이터 형식 오류", 502, data)
        
        # 4개 통화만 출력되게 필터링
        wanted_codes = ["KRW", "EUR", "JPY", "CNY"]
        filtered_rate = {
            code: conversion_rates[code]
            for code in wanted_codes
            if code in conversion_rates
        }


        cls._latest_rates = {
            "base": data.get("base_code", base),
            "rates": conversion_rates,
        }

        return cls._latest_rates
    
    @classmethod
    def get_cached_rates(cls, auto_fetch: bool = True):
        """캐시된 환율 반환"""
        if cls.get_cached_rates is None and auto_fetch:
            # 처음 한 번은 직접 채움 (스케쥴러보다 먼저 호출될 수 있으므로..)
            return cls.update_rates()
        if cls.get_cached_rates is None:
            raise ApiError("환율 데이터가 아직 초기화되지 않았습니다.", 503)
        return cls._latest_rates