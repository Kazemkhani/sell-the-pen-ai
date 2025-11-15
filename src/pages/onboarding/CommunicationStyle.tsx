import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { CommunicationStyle as CommunicationStyleType } from "@/types/profile";

const CommunicationStyle = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<CommunicationStyleType>(profile.communicationStyle);

  const options = [
    {
      value: "analytical" as CommunicationStyleType,
      icon: "🎯",
      title: "Strategic & Analytical",
      description: "I prefer data, facts, and logical arguments",
      subtitle: "I take my time to build a solid case",
    },
    {
      value: "relationship" as CommunicationStyleType,
      icon: "💬",
      title: "Relationship-Focused",
      description: "I lead with empathy and connection",
      subtitle: "Building trust comes naturally to me",
    },
    {
      value: "assertive" as CommunicationStyleType,
      icon: "⚡",
      title: "High-Energy & Assertive",
      description: "I'm direct, confident, and move fast",
      subtitle: "I like to take charge of conversations",
    },
    {
      value: "patient" as CommunicationStyleType,
      icon: "🧘",
      title: "Calm & Patient",
      description: "I listen more than I talk",
      subtitle: "I let the prospect lead, then guide gently",
    },
  ];

  const handleNext = () => {
    updateProfile({ communicationStyle: selected });
    navigate("/onboarding/challenges");
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={8}
      question="Which sales conversation feels most natural to you?"
      onBack={() => navigate("/onboarding/personality")}
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
            <p className="text-muted-foreground mb-2 italic">{option.description}</p>
            <p className="text-sm text-muted-foreground">{option.subtitle}</p>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default CommunicationStyle;
