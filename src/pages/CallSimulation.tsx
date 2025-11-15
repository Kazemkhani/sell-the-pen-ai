import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, ArrowLeft, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserGreeting } from "@/components/UserGreeting";
import { VapiWidget } from "@/components/VapiWidget";
import { USE_DUMMY_TRANSCRIPT, VAPI_ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@/lib/env";
import { clearSessionTranscript, saveSessionTranscript } from "@/lib/transcript-source";

const CallSimulation = () => {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const navigate = useNavigate();

  const startCall = () => {
    setIsCallStarted(true);
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      endCall();
    }, 30000);
  };

  const endCall = () => {
    navigate("/feedback");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderDummyFlow = () => (
    <div className="max-w-2xl w-full text-center">
      {!isCallStarted ? (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <Flame className="h-5 w-5 text-destructive" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-medium">Customer Persona</p>
              <p className="text-sm font-semibold text-foreground">Dominant & Aggressive</p>
            </div>
          </div>

          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring blur-xl" />
            <div className="relative w-32 h-32 bg-primary rounded-full flex items-center justify-center animate-vibrate">
              <Phone className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Call Is About to Begin</h1>
          <p className="text-xl text-muted-foreground mb-4">
            You're calling the <span className="text-foreground font-semibold">Dominant & Aggressive Persona</span>.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            Speak naturally. The AI responds like a real prospect.
          </p>

          <Button size="lg" onClick={startCall} className="text-lg px-12 py-6 rounded-full">
            <Phone className="mr-2 h-5 w-5" />
            Start Call
          </Button>
        </div>
      ) : (
        <div className="animate-scale-in">
          <div className="premium-card max-w-xl mx-auto">
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Phone className="h-12 w-12 text-destructive" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Call in Progress</h2>
            <p className="text-muted-foreground mb-8">Dominant & Aggressive Persona</p>

            <div className="text-5xl font-bold mb-12 text-primary">{formatTime(callDuration)}</div>

            <div className="flex items-center justify-center gap-1 h-16 mb-12">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <Button size="lg" variant="destructive" onClick={endCall} className="rounded-full px-8">
              <PhoneOff className="mr-2 h-5 w-5" />
              End Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const handleVapiCallStart = () => {
    clearSessionTranscript();
  };

  const handleVapiCallEnd = (fullTranscript: string) => {
    if (fullTranscript?.trim()) {
      saveSessionTranscript(fullTranscript.trim());
    } else {
      clearSessionTranscript();
    }
    navigate("/feedback");
  };

  const renderVapiFlow = () => (
    <div className="max-w-2xl w-full text-center">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 max-w-md mx-auto">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <Flame className="h-5 w-5 text-destructive" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground font-medium">Customer Persona</p>
            <p className="text-sm font-semibold text-foreground">Dominant & Aggressive</p>
          </div>
        </div>

        <div className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring blur-xl" />
          <div className="relative w-32 h-32 bg-primary rounded-full flex items-center justify-center animate-vibrate">
            <Phone className="h-16 w-16 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Call Is About to Begin</h1>
        <p className="text-xl text-muted-foreground mb-4">
          You're calling the <span className="text-foreground font-semibold">Dominant & Aggressive Persona</span>.
        </p>
        <p className="text-lg text-muted-foreground mb-12">
          Click the button below to start a live conversation powered by Vapi and OpenAI.
        </p>

        {!VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID ? (
          <div className="rounded-2xl border border-dashed border-destructive/50 bg-destructive/10 p-6 text-left max-w-md mx-auto">
            <p className="font-semibold text-destructive">Vapi configuration missing</p>
            <p className="text-sm text-muted-foreground">
              Set both <code>VITE_VAPI_PUBLIC_KEY</code> and <code>VITE_VAPI_ASSISTANT_ID</code> to enable live calls.
            </p>
          </div>
        ) : null}
      </div>

      {VAPI_PUBLIC_KEY && VAPI_ASSISTANT_ID && (
        <VapiWidget
          apiKey={VAPI_PUBLIC_KEY}
          assistantId={VAPI_ASSISTANT_ID}
          onCallStart={handleVapiCallStart}
          onCallEnd={handleVapiCallEnd}
          // Don't pass config - let it use Vapi cloud defaults
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <UserGreeting />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/persona-selection")}
        className="absolute top-6 left-6 rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      {USE_DUMMY_TRANSCRIPT ? renderDummyFlow() : renderVapiFlow()}
    </div>
  );
};

export default CallSimulation;
