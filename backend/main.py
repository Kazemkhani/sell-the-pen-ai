from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes import sessions, feedback

# Load environment variables
load_dotenv()

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
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["feedback"])

@app.get("/")
def root():
    return {"status": "ok", "message": "Sell The Pen AI Backend"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
