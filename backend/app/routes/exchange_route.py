from flask import Blueprint, jsonify
from ..services.exchange_rate_service import ExchangeRateService

exchange_bp = Blueprint("exchange", __name__)

@exchange_bp.get("/exchange/latest")
def get_exchange_latest():
    data = ExchangeRateService.get_cached_rates(auto_fetch=True)
    return jsonify(data)