from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
dotenv_paths = [BASE_DIR / ".env.local", BASE_DIR / ".env"]
for dotenv_path in dotenv_paths:
    if dotenv_path.exists():
        load_dotenv(dotenv_path=dotenv_path, override=True)
        break

from app.routes import feedback

app = FastAPI(title="Sell The Pen AI - Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(feedback.router, prefix="/api/feedback", tags=["feedback"])

@app.get("/")
def root():
    return {"status": "ok", "message": "Sell The Pen AI Backend"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
