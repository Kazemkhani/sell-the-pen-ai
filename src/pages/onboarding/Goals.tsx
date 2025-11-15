import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { PrimaryGoal, Timeline } from "@/types/profile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Goals = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, completeOnboarding } = useUserProfile();
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal>(profile.primaryGoal);
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline>(profile.timeline);

  const goalOptions = [
    {
      value: "confidence" as PrimaryGoal,
      icon: "🎯",
      title: "Confidence boost",
      description: "I want to feel comfortable on calls",
    },
    {
      value: "quota" as PrimaryGoal,
      icon: "📊",
      title: "Hit my quota",
      description: "I need to close more deals this month",
    },
    {
      value: "top-performer" as PrimaryGoal,
      icon: "🏆",
      title: "Become top performer",
      description: "I want to be in the top 10%",
    },
    {
      value: "mastery" as PrimaryGoal,
      icon: "🧠",
      title: "Master a technique",
      description: "I'm here to learn specific skills",
    },
    {
      value: "advancement" as PrimaryGoal,
      icon: "💼",
      title: "Career advancement",
      description: "I want a promotion or new role",
    },
  ];

  const handleNext = () => {
    updateProfile({
      primaryGoal: selectedGoal,
      timeline: selectedTimeline,
    });
    completeOnboarding();
    navigate("/recommendations");
  };

  return (
    <OnboardingLayout
      currentStep={8}
      totalSteps={8}
      question="What does success look like for you?"
      subtext="Set your goal and timeline"
      onBack={() => navigate("/onboarding/learning")}
      onNext={handleNext}
      nextDisabled={!selectedGoal || !selectedTimeline}
    >
      <div className="space-y-8">
        {/* Goal Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedGoal(option.value)}
              className={`premium-card text-left hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
                selectedGoal === option.value
                  ? "border-2 border-primary shadow-lg"
                  : "hover:border-primary/40"
              }`}
            >
              <div className="text-4xl mb-3">{option.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </button>
          ))}
        </div>

        {/* Timeline Selection */}
        {selectedGoal && (
          <div className="premium-card max-w-md mx-auto animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">What's your target timeline?</h3>
            <RadioGroup value={selectedTimeline} onValueChange={(value) => setSelectedTimeline(value as Timeline)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="week" id="week" />
                  <Label htmlFor="week" className="cursor-pointer flex-1">
                    This week
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="month" id="month" />
                  <Label htmlFor="month" className="cursor-pointer flex-1">
                    This month
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="quarter" id="quarter" />
                  <Label htmlFor="quarter" className="cursor-pointer flex-1">
                    This quarter
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="long-term" id="long-term" />
                  <Label htmlFor="long-term" className="cursor-pointer flex-1">
                    Long-term mastery
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Goals;
