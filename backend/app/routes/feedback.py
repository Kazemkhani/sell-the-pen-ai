import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.services import FeedbackService

router = APIRouter()
logger = logging.getLogger(__name__)

feedback_service = FeedbackService()


class FeedbackRequest(BaseModel):
    session_id: str | None = None
    transcript_text: str | None = None
    user_profile: dict | None = None  # Optional user profile from frontend


@router.post("/generate")
async def generate_feedback(request: FeedbackRequest):
    """
    Generate feedback report from call transcript

    Process:
    1. Get transcript from session
    2. Analyze with LLM + RAG (Mike Ferry concepts)
    3. Generate scores (4 categories)
    4. Create PDF report
    5. Return feedback + PDF path
    """
    logger.info("/feedback/generate called", extra={"session_id": request.session_id})

    if not request.transcript_text:
        raise HTTPException(
            status_code=400,
            detail="transcript_text is required until session transcripts are stored",
        )

    try:
        logger.info("Dispatching transcript to FeedbackService", extra={"transcript_preview": request.transcript_text[:120]})
        analysis = await feedback_service.analyze_transcript(
            transcript=request.transcript_text
        )
        logger.info("FeedbackService returned analysis")
    except HTTPException as http_exc:
        logger.error("FeedbackService raised HTTPException: %s", http_exc.detail)
        raise
    except Exception as exc:  # pragma: no cover - surfacing to client
        logger.exception("FeedbackService failed to analyze transcript")
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return {
        "session_id": request.session_id,
        "analysis": analysis,
    }


@router.get("/pdf/{session_id}")
async def download_pdf(session_id: str):
    """Download PDF feedback report"""
    pdf_path = f"./data/pdfs/{session_id}.pdf"

    # TODO: Check if file exists
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"feedback_{session_id}.pdf"
    )


@router.post("/chat")
async def feedback_chat(session_id: str, question: str):
    raise HTTPException(status_code=501, detail="Feedback chat not implemented")
