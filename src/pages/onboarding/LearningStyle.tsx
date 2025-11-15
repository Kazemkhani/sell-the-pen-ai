import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { LearningStyle as LearningStyleType } from "@/types/profile";

const LearningStyle = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<LearningStyleType>(profile.learningStyle);

  const options = [
    {
      value: "trial-error" as LearningStyleType,
      icon: "🎯",
      title: "Trial & Error",
      description: "Let me jump in and learn by doing",
    },
    {
      value: "guided" as LearningStyleType,
      icon: "📚",
      title: "Guided Practice",
      description: "Show me examples first, then I'll try",
    },
    {
      value: "analytical" as LearningStyleType,
      icon: "🔬",
      title: "Deep Analysis",
      description: "I want detailed breakdowns and explanations",
    },
    {
      value: "quick-wins" as LearningStyleType,
      icon: "🏃",
      title: "Quick Wins",
      description: "Give me fast, actionable tips I can use today",
    },
  ];

  const handleNext = () => {
    updateProfile({ learningStyle: selected });
    navigate("/onboarding/goals");
  };

  return (
    <OnboardingLayout
      currentStep={7}
      totalSteps={8}
      question="How do you learn best?"
      subtext="We'll tailor feedback to match your learning style"
      onBack={() => navigate("/onboarding/challenges")}
      onNext={handleNext}
      nextDisabled={!selected}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={`premium-card text-left hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
              selected === option.value
                ? "border-2 border-primary shadow-lg"
                : "hover:border-primary/40"
            }`}
          >
            <div className="text-5xl mb-4">{option.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
            <p className="text-muted-foreground italic">{option.description}</p>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default LearningStyle;
