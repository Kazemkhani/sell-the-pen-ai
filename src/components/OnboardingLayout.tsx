import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  question: string;
  subtext?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  showBack?: boolean;
}

export function OnboardingLayout({
  currentStep,
  totalSteps,
  question,
  subtext,
  children,
  onBack,
  onNext,
  nextDisabled = false,
  showBack = true,
}: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{question}</h1>
          {subtext && <p className="text-lg text-muted-foreground">{subtext}</p>}
        </div>

        {/* Content */}
        <div className="mb-12">{children}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {showBack && onBack ? (
            <Button variant="ghost" onClick={onBack} className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
          ) : (
            <div />
          )}
          {onNext && (
            <Button onClick={onNext} disabled={nextDisabled} size="lg" className="px-8">
              Continue →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
