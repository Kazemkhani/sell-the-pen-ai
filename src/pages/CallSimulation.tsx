import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallSimulation = () => {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const navigate = useNavigate();

  const startCall = () => {
    setIsCallStarted(true);
    // Simulate call timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Auto-end call after 30 seconds for demo purposes
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {!isCallStarted ? (
          <div className="animate-fade-in-up">
            {/* Animated Phone Icon */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring blur-xl" />
              <div className="relative w-32 h-32 bg-primary rounded-full flex items-center justify-center animate-vibrate">
                <Phone className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Call Is About to Begin
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              You're calling the <span className="text-foreground font-semibold">Dominant & Aggressive Persona</span>.
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              Speak naturally. The AI responds like a real prospect.
            </p>

            <Button
              size="lg"
              onClick={startCall}
              className="text-lg px-12 py-6 rounded-full"
            >
              <Phone className="mr-2 h-5 w-5" />
              Start Call
            </Button>
          </div>
        ) : (
          <div className="animate-scale-in">
            {/* Live Call Interface */}
            <div className="premium-card max-w-xl mx-auto">
              <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Phone className="h-12 w-12 text-destructive" />
              </div>

              <h2 className="text-3xl font-bold mb-2">Call in Progress</h2>
              <p className="text-muted-foreground mb-8">
                Dominant & Aggressive Persona
              </p>

              <div className="text-5xl font-bold mb-12 text-primary">
                {formatTime(callDuration)}
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-center justify-center gap-1 h-16 mb-12">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 60 + 20}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Transcript Box */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left max-h-64 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-primary">You:</span>
                    <span className="ml-2 text-foreground">
                      Hi, this is calling from Sell The Pen...
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-destructive">Prospect:</span>
                    <span className="ml-2 text-foreground">
                      I'm busy. What do you want?
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">You:</span>
                    <span className="ml-2 text-foreground">
                      I understand. I'll keep this brief...
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                variant="destructive"
                onClick={endCall}
                className="rounded-full px-8"
              >
                <PhoneOff className="mr-2 h-5 w-5" />
                End Call
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallSimulation;
