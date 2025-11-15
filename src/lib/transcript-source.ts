import { DUMMY_TRANSCRIPT_TYPE, DummyTranscriptType, SESSION_TRANSCRIPT_KEY, USE_DUMMY_TRANSCRIPT } from './env';

import goodTranscript from '../../transcripts/DUMMY_GOOD_TRANSCRIPT.txt?raw';
import badTranscript from '../../transcripts/DUMMY_BAD_TRANSCRIPT.txt?raw';

const transcriptMap: Record<DummyTranscriptType, string> = {
  GOOD: goodTranscript.trim(),
  BAD: badTranscript.trim(),
};

export type TranscriptSource = 'dummy' | 'session' | 'fallback' | 'placeholder';

export interface TranscriptPayload {
  transcript: string;
  source: TranscriptSource;
  type: DummyTranscriptType;
}

const isBrowser = () => typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

export const saveSessionTranscript = (transcript: string) => {
  if (!isBrowser()) return;
  sessionStorage.setItem(SESSION_TRANSCRIPT_KEY, transcript);
};

export const clearSessionTranscript = () => {
  if (!isBrowser()) return;
  sessionStorage.removeItem(SESSION_TRANSCRIPT_KEY);
};

export const loadSessionTranscript = (): string | null => {
  if (!isBrowser()) return null;
  return sessionStorage.getItem(SESSION_TRANSCRIPT_KEY);
};

export const getDummyTranscript = (type: DummyTranscriptType = DUMMY_TRANSCRIPT_TYPE): string => {
  return transcriptMap[type] ?? transcriptMap.GOOD;
};

export const resolveTranscriptForFeedback = (): TranscriptPayload => {
  if (USE_DUMMY_TRANSCRIPT) {
    return {
      transcript: getDummyTranscript(DUMMY_TRANSCRIPT_TYPE),
      source: 'dummy',
      type: DUMMY_TRANSCRIPT_TYPE,
    };
  }

  const stored = loadSessionTranscript();
  if (stored) {
    return {
      transcript: stored,
      source: 'session',
      type: DUMMY_TRANSCRIPT_TYPE,
    };
  }

  return {
    transcript: '',
    source: 'placeholder',
    type: DUMMY_TRANSCRIPT_TYPE,
  };
};
