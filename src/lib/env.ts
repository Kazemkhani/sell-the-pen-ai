const normalizeBool = (value: string | boolean | undefined): boolean => {
  if (typeof value === 'boolean') return value;
  if (!value) return false;
  const normalized = value.toString().trim().toLowerCase();
  return ['1', 'true', 'yes', 'on'].includes(normalized);
};

const getEnv = (key: string): string | undefined => {
  const env = import.meta.env as Record<string, string | undefined>;
  return env[key];
};

export const USE_DUMMY_TRANSCRIPT = normalizeBool(
  getEnv('VITE_DUMMY') ?? getEnv('DUMMY') ?? 'true'
);

export type DummyTranscriptType = 'GOOD' | 'BAD';

const rawType = (getEnv('VITE_TYPE') ?? getEnv('TYPE') ?? 'GOOD').toUpperCase();

export const DUMMY_TRANSCRIPT_TYPE: DummyTranscriptType =
  rawType === 'BAD' ? 'BAD' : 'GOOD';

const defaultApiBase = 'http://localhost:3000/api';

export const API_BASE_URL = (getEnv('VITE_API_BASE_URL') ?? defaultApiBase).replace(/\/$/, '');

export const SESSION_TRANSCRIPT_KEY = 'sell-pen-session-transcript';
