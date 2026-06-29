import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./emi.db")

DEFAULT_CORS_ORIGINS = (
    "http://localhost:5173,"
    "http://127.0.0.1:5173,"
    "https://emi-loan-calculator-nine.vercel.app"
)

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", DEFAULT_CORS_ORIGINS).split(",")
    if origin.strip()
]

APP_TITLE = os.getenv("APP_TITLE", "EMI Loan Calculator")
DOCS_ENABLED = os.getenv("DOCS_ENABLED", "true").lower() == "true"
