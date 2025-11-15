export type Grade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F';

export interface OpeningPoints {
  clear_intro: number;
  used_name: number;
  asked_permission: number;
  value_prop: number;
}

export interface QualifyingPoints {
  question_count: number;
  pain_focused: number;
  listen_ratio: number;
}

export interface ObjectionPoints {
  looped_back: number;
  persistence: number;
  empathy_reframe: number;
}

export interface AppointmentPoints {
  assumptive_close: number;
  specific_times: number;
  fair_technique: number;
}

export interface TonalityPoints {
  energy: number;
  name_usage: number;
  pacing: number;
  precision: number;
}

export interface OpeningScore {
  score: number;
  points_earned: OpeningPoints;
  explanation: string;
}

export interface QualifyingScore {
  score: number;
  points_earned: QualifyingPoints;
  questions_asked: string[];
  questions_missed: string[];
  explanation: string;
}

export interface ObjectionHandlingScore {
  score: number;
  points_earned: ObjectionPoints;
  objections_encountered: string[];
  loops_attempted: number;
  explanation: string;
}

export interface AppointmentSettingScore {
  score: number;
  points_earned: AppointmentPoints;
  appointment_secured: boolean;
  explanation: string;
}

export interface TonalityScore {
  score: number;
  points_earned: TonalityPoints;
  red_flags: string[];
  explanation: string;
}

export interface DimensionScores {
  opening: OpeningScore;
  qualifying: QualifyingScore;
  objection_handling: ObjectionHandlingScore;
  appointment_setting: AppointmentSettingScore;
  tonality: TonalityScore;
}

export interface StrengthHighlight {
  what: string;
  timestamp: string;
  quote: string;
  why_good: string;
}

export interface CriticalMistake {
  issue_type: 'opening' | 'qualifying' | 'objection' | 'appointment' | 'tonality';
  timestamp: string;
  what_they_said: string;
  why_wrong: string;
  impact: string;
  correction: {
    better_script: string;
    principle: string;
    practice_drill: string;
  };
}

export interface CallFlowSummary {
  opening_quality: string;
  discovery_quality: string;
  objection_handling_quality: string;
  closing_quality: string;
  overall_impression: string;
}

export interface NextSteps {
  primary_focus: string;
  practice_drill: string;
  script_to_memorize: string;
  success_metric: string;
}

export interface FeedbackAnalysis {
  overall_score: number;
  grade: Grade;
  dimension_scores: DimensionScores;
  strengths: StrengthHighlight[];
  critical_mistakes: CriticalMistake[];
  call_flow_summary: CallFlowSummary;
  next_steps: NextSteps;
}
