# Flask application factory

from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes import register_routes
from .utils.error_handlers import register_error_handlers

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    register_routes(app)
    register_error_handlers(app)

    return app