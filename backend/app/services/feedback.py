"""Feedback analysis service using OpenAI structured outputs."""

from __future__ import annotations

import asyncio
import os
from pathlib import Path
from typing import Dict, Optional

from openai import OpenAI

from .feedback_models import FeedbackAnalysis

BASE_DIR = Path(__file__).resolve().parents[2]
PROMPTS_DIR = BASE_DIR / "prompts"
DEFAULT_MODEL = os.getenv("OPENAI_FEEDBACK_MODEL", "gpt-4o-mini-2024-07-18")


def _load_prompt(filename: str) -> str:
    path = PROMPTS_DIR / filename
    if not path.exists():
        raise FileNotFoundError(f"Prompt file not found: {path}")
    return path.read_text(encoding="utf-8").strip()


class FeedbackService:
    """Generate rubric-aligned feedback for a transcript via OpenAI."""

    def __init__(
        self,
        *,
        model: str = DEFAULT_MODEL,
        client: Optional[OpenAI] = None,
    ) -> None:
        self.model = model
        self.client = client
        self.system_prompt = _load_prompt("feedback_system.txt")
        self.analysis_prompt_template = _load_prompt("feedback_analysis.txt")

    def _get_client(self) -> OpenAI:
        if self.client is not None:
            return self.client

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError("Feedback analysis is not configured")

        self.client = OpenAI(api_key=api_key)
        return self.client

    async def analyze_transcript(self, transcript: str) -> Dict:
        if not transcript or not transcript.strip():
            raise ValueError("Transcript text is required")

        user_prompt = self.analysis_prompt_template.format(transcript=transcript.strip())
        analysis_model = await asyncio.to_thread(self._invoke_model, user_prompt)
        return analysis_model.model_dump()

    def _invoke_model(self, user_prompt: str) -> FeedbackAnalysis:
        response = self._get_client().responses.parse(
            model=self.model,
            input=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            text_format=FeedbackAnalysis,
        )
        return response.output_parsed
