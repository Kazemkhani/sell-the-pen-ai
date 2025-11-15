"""Pydantic models mirroring the feedback JSON schema."""

from __future__ import annotations

from typing import List, Literal

from pydantic import BaseModel, Field

Grade = Literal[
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
]


class OpeningPoints(BaseModel):
    clear_intro: int
    used_name: int
    asked_permission: int
    value_prop: int


class QualifyingPoints(BaseModel):
    question_count: int
    pain_focused: int
    listen_ratio: int


class ObjectionPoints(BaseModel):
    looped_back: int
    persistence: int
    empathy_reframe: int


class AppointmentPoints(BaseModel):
    assumptive_close: int
    specific_times: int
    fair_technique: int


class TonalityPoints(BaseModel):
    energy: int
    name_usage: int
    pacing: int
    precision: int


class OpeningScore(BaseModel):
    score: int
    points_earned: OpeningPoints
    explanation: str


class QualifyingScore(BaseModel):
    score: int
    points_earned: QualifyingPoints
    questions_asked: List[str] = Field(default_factory=list)
    questions_missed: List[str] = Field(default_factory=list)
    explanation: str


class ObjectionHandlingScore(BaseModel):
    score: int
    points_earned: ObjectionPoints
    objections_encountered: List[str] = Field(default_factory=list)
    loops_attempted: int
    explanation: str


class AppointmentSettingScore(BaseModel):
    score: int
    points_earned: AppointmentPoints
    appointment_secured: bool
    explanation: str


class TonalityScore(BaseModel):
    score: int
    points_earned: TonalityPoints
    red_flags: List[str] = Field(default_factory=list)
    explanation: str


class DimensionScores(BaseModel):
    opening: OpeningScore
    qualifying: QualifyingScore
    objection_handling: ObjectionHandlingScore
    appointment_setting: AppointmentSettingScore
    tonality: TonalityScore


class StrengthHighlight(BaseModel):
    what: str
    timestamp: str
    quote: str
    why_good: str


class Correction(BaseModel):
    better_script: str
    principle: str
    practice_drill: str


class CriticalMistake(BaseModel):
    issue_type: Literal["opening", "qualifying", "objection", "appointment", "tonality"]
    timestamp: str
    what_they_said: str
    why_wrong: str
    impact: str
    correction: Correction


class CallFlowSummary(BaseModel):
    opening_quality: str
    discovery_quality: str
    objection_handling_quality: str
    closing_quality: str
    overall_impression: str


class NextSteps(BaseModel):
    primary_focus: str
    practice_drill: str
    script_to_memorize: str
    success_metric: str


class FeedbackAnalysis(BaseModel):
    overall_score: int
    grade: Grade
    dimension_scores: DimensionScores
    strengths: List[StrengthHighlight] = Field(default_factory=list)
    critical_mistakes: List[CriticalMistake] = Field(default_factory=list)
    call_flow_summary: CallFlowSummary
    next_steps: NextSteps
