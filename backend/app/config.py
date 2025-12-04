import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
evn_path = os.path.join(BASE_DIR, "..", ".env")
load_dotenv(evn_path)

class Config:
    ALPHAVANTAGE_API_KEY = os.getenv("ALPHAVANTAGE_API_KEY")
    DEBUG = True