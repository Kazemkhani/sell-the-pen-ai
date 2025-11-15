import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { UserGreeting } from "@/components/UserGreeting";
import { requestFeedbackAnalysis } from "@/lib/feedback-api";
import { resolveTranscriptForFeedback, TranscriptPayload } from "@/lib/transcript-source";
import type { FeedbackAnalysis } from "@/types/feedback";

const dimensionConfig = {
  opening: {
    title: "Opening",
    maxScore: 20,
    description: "First 30 seconds to establish authority and value.",
    pointLabels: {
      clear_intro: "Clear intro",
      used_name: "Used name",
      asked_permission: "Asked permission",
      value_prop: "Value prop",
    },
  },
  qualifying: {
    title: "Qualifying Questions",
    maxScore: 25,
    description: "Mike Ferry's four must-ask questions and follow-ups.",
    pointLabels: {
      question_count: "Question count",
      pain_focused: "Pain focused",
      listen_ratio: "Listen ratio",
    },
  },
  objection_handling: {
    title: "Objection Handling",
    maxScore: 25,
    description: "Looping, empathy, and persistence when challenged.",
    pointLabels: {
      looped_back: "Looped back",
      persistence: "Persistence",
      empathy_reframe: "Empathy & reframe",
    },
  },
  appointment_setting: {
    title: "Appointment Setting",
    maxScore: 20,
    description: "Selling time slots with assumptive closes.",
    pointLabels: {
      assumptive_close: "Assumptive close",
      specific_times: "Specific times",
      fair_technique: "Fair technique",
    },
  },
  tonality: {
    title: "Tonality & Energy",
    maxScore: 10,
    description: "Energy, pacing, precision, and name usage.",
    pointLabels: {
      energy: "Energy",
      name_usage: "Name usage",
      pacing: "Pacing",
      precision: "Precision",
    },
  },
} as const;

type DimensionKey = keyof typeof dimensionConfig;

const Feedback = () => {
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transcriptMeta, setTranscriptMeta] = useState<TranscriptPayload | null>(null);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);

    const payload = resolveTranscriptForFeedback();
    setTranscriptMeta(payload);

    if (!payload.transcript?.trim()) {
      setLoading(false);
      setError("No call transcript available. Start a call first.");
      return;
    }

    try {
      const result = await requestFeedbackAnalysis({
        sessionId: crypto?.randomUUID?.() ? crypto.randomUUID() : `session-${Date.now()}`,
        transcript: payload.transcript,
      });

      setAnalysis(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  const dimensionEntries = useMemo(() => {
    if (!analysis) return [];
    return Object.entries(dimensionConfig).map(([key, config]) => ({
      key: key as DimensionKey,
      config,
      data: analysis.dimension_scores[key as DimensionKey],
    }));
  }, [analysis]);

  const renderPoints = (data: Record<string, number>, labels: Record<string, string>) => (
    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
      {Object.entries(data).map(([metric, value]) => (
        <li key={metric} className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2">
          <span className="text-muted-foreground">{labels[metric] ?? metric}</span>
          <span className="font-semibold text-foreground">{value}</span>
        </li>
      ))}
    </ul>
  );

  const renderLoading = () => (
    <div className="premium-card text-center py-16 animate-pulse">
      <p className="text-lg text-muted-foreground">Scoring your call. This takes ~10 seconds.</p>
    </div>
  );

  const renderError = () => (
    <div className="premium-card text-center py-12">
      <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-4" />
      <p className="text-lg font-semibold mb-2">We couldn’t score this transcript.</p>
      <p className="text-muted-foreground mb-4">{error}</p>
      <Button onClick={runAnalysis} className="rounded-full">
        <RefreshCw className="mr-2 h-4 w-4" />Retry
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background px-6 py-24 relative">
      <UserGreeting />
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center animate-fade-in-up">
          <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground mb-4">
            Mike Ferry Certified Scoring
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Sales Breakdown</h1>
          <p className="text-lg text-muted-foreground">
            Feedback generated from your transcript using OpenAI structured outputs.
          </p>
          {transcriptMeta && (
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-1 mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Source:</span>
              {transcriptMeta.source === "dummy" && `Dummy (${transcriptMeta.type}) transcript`}
              {transcriptMeta.source === "session" && "Recent Vapi session"}
              {transcriptMeta.source === "fallback" && "Fallback sample"}
              {transcriptMeta.source === "placeholder" && "Awaiting live call transcript"}
            </div>
          )}
        </div>

        {loading && renderLoading()}
        {!loading && error && renderError()}

        {!loading && !error && analysis && (
          <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="premium-card p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-2">
                  Overall Score
                </p>
                <div className="text-6xl font-black text-primary">
                  {analysis.overall_score}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <p className="text-muted-foreground mt-4">
                  Grade <span className="font-semibold text-foreground">{analysis.grade}</span> — weighted blend of opening,
                  qualifying, objections, appointment setting, and tonality.
                </p>
              </div>
              <div className="bg-muted/40 rounded-2xl p-6">
                <p className="text-sm font-semibold mb-2">Call Flow Summary</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li><strong className="text-foreground">Opening:</strong> {analysis.call_flow_summary.opening_quality}</li>
                  <li><strong className="text-foreground">Discovery:</strong> {analysis.call_flow_summary.discovery_quality}</li>
                  <li><strong className="text-foreground">Objections:</strong> {analysis.call_flow_summary.objection_handling_quality}</li>
                  <li><strong className="text-foreground">Closing:</strong> {analysis.call_flow_summary.closing_quality}</li>
                  <li><strong className="text-foreground">Overall:</strong> {analysis.call_flow_summary.overall_impression}</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {dimensionEntries.map(({ key, config, data }, index) => (
                <div key={key} className="premium-card" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="uppercase text-xs tracking-[0.3em] text-muted-foreground">{config.title}</p>
                      <h3 className="text-3xl font-semibold">{data.score}/{config.maxScore}</h3>
                    </div>
                    <div className="text-4xl font-black text-primary">{Math.round((data.score / config.maxScore) * 100)}%</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{config.description}</p>
                  <Progress value={(data.score / config.maxScore) * 100} className="h-2" />
                  {renderPoints(data.points_earned, config.pointLabels)}

                  {key === "qualifying" && (
                    <div className="mt-4 text-sm space-y-2">
                      <div>
                        <p className="font-semibold text-foreground">Questions asked</p>
                        <p className="text-muted-foreground">{data.questions_asked.join(", ") || "None"}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Questions missed</p>
                        <p className="text-muted-foreground">{data.questions_missed.join(", ") || "None flagged"}</p>
                      </div>
                    </div>
                  )}

                  {key === "objection_handling" && (
                    <div className="mt-4 text-sm space-y-2">
                      <div>
                        <p className="font-semibold text-foreground">Objections encountered</p>
                        <p className="text-muted-foreground">{data.objections_encountered.join(", ") || "Not logged"}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Loops attempted</p>
                        <p className="text-muted-foreground">{data.loops_attempted}</p>
                      </div>
                    </div>
                  )}

                  {key === "appointment_setting" && (
                    <p className="mt-4 text-sm text-muted-foreground">Appointment secured: {data.appointment_secured ? "Yes" : "No"}</p>
                  )}

                  {key === "tonality" && (
                    <div className="mt-4 text-sm">
                      <p className="font-semibold text-foreground">Red flags</p>
                      <p className="text-muted-foreground">{data.red_flags.length ? data.red_flags.join(", ") : "None"}</p>
                    </div>
                  )}

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{data.explanation}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="premium-card">
                <h2 className="text-2xl font-bold mb-2">Strength Highlights</h2>
                <p className="text-sm text-muted-foreground mb-4">Moments to repeat verbatim.</p>
                <div className="space-y-4">
                  {analysis.strengths.map((item, idx) => (
                    <div key={`${item.timestamp}-${idx}`} className="rounded-xl border border-border/50 p-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>{item.timestamp}</span>
                        <span className="font-medium text-foreground">{item.what}</span>
                      </div>
                      <blockquote className="text-base text-foreground italic border-l-2 border-primary pl-3">
                        “{item.quote}”
                      </blockquote>
                      <p className="text-sm text-muted-foreground mt-2">{item.why_good}</p>
                    </div>
                  ))}
                  {!analysis.strengths.length && (
                    <p className="text-sm text-muted-foreground">No strengths logged.</p>
                  )}
                </div>
              </div>

              <div className="premium-card">
                <h2 className="text-2xl font-bold mb-2">Critical Mistakes</h2>
                <p className="text-sm text-muted-foreground mb-4">Fix these to unlock the next score tier.</p>
                <div className="space-y-4">
                  {analysis.critical_mistakes.map((mistake, idx) => (
                    <div key={`${mistake.timestamp}-${idx}`} className="rounded-xl border border-destructive/30 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-destructive mb-2">
                        <span>{mistake.issue_type}</span>
                        <span>{mistake.timestamp}</span>
                      </div>
                      <p className="font-semibold text-foreground mb-1">“{mistake.what_they_said}”</p>
                      <p className="text-sm text-muted-foreground mb-2">{mistake.why_wrong}</p>
                      <p className="text-sm text-muted-foreground mb-2">Impact: {mistake.impact}</p>
                      <div className="bg-muted/60 rounded-lg p-3 text-sm">
                        <p className="font-semibold text-foreground">Better script</p>
                        <p className="text-muted-foreground mb-2">{mistake.correction.better_script}</p>
                        <p className="text-xs text-muted-foreground">
                          Principle: {mistake.correction.principle} • Drill: {mistake.correction.practice_drill}
                        </p>
                      </div>
                    </div>
                  ))}
                  {!analysis.critical_mistakes.length && (
                    <p className="text-sm text-muted-foreground">No mistakes logged. Keep sharpening.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="premium-card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="uppercase text-xs tracking-[0.3em] text-muted-foreground">Next Focus</p>
                  <h2 className="text-3xl font-bold mt-2">{analysis.next_steps.primary_focus}</h2>
                  <p className="text-muted-foreground mt-2">{analysis.next_steps.practice_drill}</p>
                </div>
                <div className="bg-muted/50 rounded-2xl p-6 max-w-md">
                  <p className="text-sm font-semibold mb-1 text-foreground">Script to memorize</p>
                  <p className="text-muted-foreground italic">“{analysis.next_steps.script_to_memorize}”</p>
                  <p className="text-xs text-muted-foreground mt-4">Success metric: {analysis.next_steps.success_metric}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="ghost" className="text-lg px-8 rounded-full" onClick={runAnalysis}>
            <RefreshCw className="mr-2 h-5 w-5" /> Re-run analysis
          </Button>
          <Link to="/recommendations">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full">
              Choose Different Skill
            </Button>
          </Link>
          <Link to="/persona-selection">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group">
              Practice Again
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
