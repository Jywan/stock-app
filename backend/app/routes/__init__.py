from .stock_route import stock_bp

def register_routes(app):
    app.register_blueprint(stock_bp, url_prefix='/api')