import type { FeedbackAnalysis } from '@/types/feedback';
import { API_BASE_URL } from './env';

export interface FeedbackRequestPayload {
  sessionId?: string | null;
  transcript: string;
}

const FEEDBACK_ENDPOINT = `${API_BASE_URL}/feedback/generate`;

export const requestFeedbackAnalysis = async (
  payload: FeedbackRequestPayload
): Promise<FeedbackAnalysis> => {
  if (!payload.transcript?.trim()) {
    throw new Error('Transcript text is required for feedback analysis.');
  }

  const response = await fetch(FEEDBACK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: payload.sessionId,
      transcript_text: payload.transcript,
    }),
  });

  if (!response.ok) {
    const detail = await safeJson(response);
    const detailMessage = detail?.detail ?? response.statusText;
    throw new Error(`Feedback API error: ${detailMessage}`);
  }

  const data = await response.json();
  const analysis = data?.analysis ?? data;
  return analysis as FeedbackAnalysis;
};

const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch (error) {
    return null;
  }
};
