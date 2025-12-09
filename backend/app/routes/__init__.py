from .stock_route import stock_bp
from .news_route import news_bp
from .exchange_route import exchange_bp

def register_routes(app):
    app.register_blueprint(stock_bp, url_prefix="/api")
    app.register_blueprint(news_bp, url_prefix="/api")
    app.register_blueprint(exchange_bp, url_prefix="/api")
