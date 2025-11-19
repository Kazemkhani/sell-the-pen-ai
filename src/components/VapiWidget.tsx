import { useEffect, useMemo, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';

interface TranscriptLine {
  role: string;
  text: string;
}

export interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
  onCallStart?: () => void;
  onCallEnd?: (transcript: string) => void;
}

export const VapiWidget = ({ apiKey, assistantId, config, onCallStart, onCallEnd }: VapiWidgetProps) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const transcriptRef = useRef<TranscriptLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    transcriptRef.current = transcript;
    // Auto-scroll to bottom when transcript updates
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    if (!apiKey || typeof window === 'undefined') {
      console.log('VapiWidget: Missing apiKey or not in browser');
      return;
    }

    console.log('VapiWidget: Initializing Vapi with apiKey:', apiKey);

    try {
      // Only pass apiKey - Vapi SDK will connect to Vapi cloud by default
      const instance = new Vapi(apiKey);
      console.log('VapiWidget: Vapi instance created successfully');
      setVapi(instance);

      instance.on('call-start', () => {
        console.log('VapiWidget: Call started');
        setIsConnected(true);
        setTranscript([]);
        onCallStart?.();

        // Auto-end call after max duration
        const maxMinutes = parseInt(import.meta.env.VITE_MAX_CALL_DURATION_MINUTES || '5', 10);
        const maxMs = maxMinutes * 60 * 1000;
        console.log(`VapiWidget: Will auto-end call after ${maxMinutes} minutes`);

        callTimeoutRef.current = setTimeout(() => {
          console.log('VapiWidget: Max call duration reached, ending call');
          instance.stop();
        }, maxMs);
      });
      instance.on('call-end', () => {
        console.log('VapiWidget: Call ended');
        setIsConnected(false);
        setIsSpeaking(false);

        // Clear timeout if call ended early
        if (callTimeoutRef.current) {
          clearTimeout(callTimeoutRef.current);
          callTimeoutRef.current = null;
        }

        const finalTranscript = transcriptRef.current;
        if (finalTranscript.length > 0) {
          const joined = finalTranscript.map((line) => `${line.role.toUpperCase()}: ${line.text}`).join('\n');
          onCallEnd?.(joined);
        } else {
          onCallEnd?.('');
        }
      });
      instance.on('speech-start', () => {
        console.log('VapiWidget: Speech started');
        setIsSpeaking(true);
      });
      instance.on('speech-end', () => {
        console.log('VapiWidget: Speech ended');
        setIsSpeaking(false);
      });
      instance.on('message', (message) => {
        console.log('VapiWidget: Message received:', message);
        if (message.type === 'transcript') {
          setTranscript((prev) => [...prev, { role: message.role, text: message.transcript ?? '' }]);
        }
      });
      instance.on('error', (error) => {
        console.error('VapiWidget: Vapi error', error);
      });

      return () => {
        console.log('VapiWidget: Cleaning up Vapi instance');
        instance.stop();
        setVapi(null);
      };
    } catch (error) {
      console.error('VapiWidget: Failed to create Vapi instance', error);
    }
  }, [apiKey]);

  const startCall = () => {
    console.log('VapiWidget: startCall clicked');
    console.log('VapiWidget: vapi instance:', vapi);
    console.log('VapiWidget: assistantId:', assistantId);

    if (!vapi) {
      console.error('VapiWidget: No vapi instance available');
      return;
    }

    try {
      setTranscript([]);
      console.log('VapiWidget: Calling vapi.start() with assistantId:', assistantId);
      vapi.start(assistantId);
    } catch (error) {
      console.error('VapiWidget: Error starting call', error);
    }
  };

  const endCall = () => {
    if (!vapi) return;
    vapi.stop();
  };

  const statusText = useMemo(() => {
    if (!isConnected) return 'Ready';
    return isSpeaking ? 'Assistant speaking…' : 'Listening…';
  }, [isConnected, isSpeaking]);

  if (!apiKey || !assistantId) {
    return (
      <div className="rounded-lg border border-border/50 bg-muted/40 p-4 text-sm text-muted-foreground">
        Missing Vapi configuration. Provide both public API key and assistant ID.
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-sm">
      {!isConnected ? (
        <button
          onClick={startCall}
          className="rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-400"
        >
          🎤 Talk to Mukesh
        </button>
      ) : (
        <div className="w-80 rounded-2xl border border-border/60 bg-background p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <span className={`h-3 w-3 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="font-semibold">{statusText}</span>
            </div>
            <button
              onClick={endCall}
              className="rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white"
            >
              End Call
            </button>
          </div>
          <div ref={scrollRef} className="max-h-52 space-y-2 overflow-y-auto rounded-xl bg-muted/60 p-3">
            {transcript.length === 0 ? (
              <p className="text-muted-foreground">Conversation will appear here…</p>
            ) : (
              transcript.map((line, idx) => (
                <div key={`${line.role}-${idx}`} className={line.role === 'user' ? 'text-right' : 'text-left'}>
                  <span
                    className={`inline-block rounded-2xl px-3 py-1 text-sm text-white ${line.role === 'user' ? 'bg-primary' : 'bg-foreground/80'}`}
                  >
                    {line.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
