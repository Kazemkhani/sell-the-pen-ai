import logging
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field, validator
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services import FeedbackService

router = APIRouter()
logger = logging.getLogger(__name__)

feedback_service = FeedbackService()
limiter = Limiter(key_func=get_remote_address)


class FeedbackRequest(BaseModel):
    session_id: str | None = None

    transcript_text: str | None = Field(
        None,
        max_length=50000,  # Prevents memory exhaustion (~30 min call)
        description="Call transcript text"
    )

    user_profile: dict | None = None

    @validator('user_profile')
    def validate_profile_size(cls, v):
        if v and len(str(v)) > 10000:  # 10KB limit
            raise ValueError('User profile too large')
        return v


@router.post("/generate")
@limiter.limit("10/hour")  # Max 10 requests per hour per IP
async def generate_feedback(request: Request, feedback_req: FeedbackRequest):
    """
    Generate feedback report from call transcript

    Process:
    1. Get transcript from session
    2. Analyze with LLM + RAG (Mike Ferry concepts)
    3. Generate scores (4 categories)
    4. Create PDF report
    5. Return feedback + PDF path
    """
    logger.info("/feedback/generate called", extra={"session_id": feedback_req.session_id})

    if not feedback_req.transcript_text:
        raise HTTPException(
            status_code=400,
            detail="transcript_text is required until session transcripts are stored",
        )

    try:
        logger.info("Dispatching transcript to FeedbackService", extra={"transcript_preview": feedback_req.transcript_text[:120]})
        analysis = await feedback_service.analyze_transcript(
            transcript=feedback_req.transcript_text
        )
        logger.info("FeedbackService returned analysis")
    except HTTPException as http_exc:
        logger.error("FeedbackService raised HTTPException: %s", http_exc.detail)
        raise
    except Exception as exc:  # pragma: no cover - surfacing to client
        logger.exception("FeedbackService failed to analyze transcript")
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return {
        "session_id": feedback_req.session_id,
        "analysis": analysis,
    }


@router.post("/chat")
async def feedback_chat(session_id: str, question: str):
    raise HTTPException(status_code=501, detail="Feedback chat not implemented")
