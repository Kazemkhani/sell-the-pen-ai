import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { Challenge } from "@/types/profile";
import { Check } from "lucide-react";

const Challenges = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<Challenge[]>(profile.topChallenges);

  const options = [
    {
      value: "fear" as Challenge,
      icon: "😬",
      title: "Fear of calling",
      description: "Anxiety, procrastination, avoiding the phone",
    },
    {
      value: "gatekeepers" as Challenge,
      icon: "🚪",
      title: "Getting past gatekeepers",
      description: "Can't reach decision-makers",
    },
    {
      value: "rapport" as Challenge,
      icon: "🎭",
      title: "Building instant rapport",
      description: "Conversations feel robotic",
    },
    {
      value: "objections" as Challenge,
      icon: "🛡️",
      title: "Handling objections",
      description: "I freeze when prospects push back",
    },
    {
      value: "control" as Challenge,
      icon: "⏱️",
      title: "Controlling the conversation",
      description: "Prospects take over or ghost me",
    },
    {
      value: "value" as Challenge,
      icon: "💼",
      title: "Articulating value",
      description: "I struggle to explain why they should care",
    },
    {
      value: "closing" as Challenge,
      icon: "🤝",
      title: "Closing deals",
      description: "I get to the end but can't seal it",
    },
    {
      value: "consistency" as Challenge,
      icon: "📈",
      title: "Consistency",
      description: "My performance varies wildly week to week",
    },
  ];

  const toggleChallenge = (value: Challenge) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else if (selected.length < 2) {
      setSelected([...selected, value]);
    }
  };

  const handleNext = () => {
    updateProfile({ topChallenges: selected });
    navigate("/onboarding/learning");
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={8}
      question="What's your biggest struggle right now?"
      subtext="Choose up to 2 challenges"
      onBack={() => navigate("/onboarding/style")}
      onNext={handleNext}
      nextDisabled={selected.length === 0}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleChallenge(option.value)}
              className={`premium-card text-left hover:scale-[1.02] transition-all duration-300 cursor-pointer relative ${
                isSelected
                  ? "border-2 border-primary shadow-lg"
                  : "hover:border-primary/40"
              } ${selected.length >= 2 && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selected.length >= 2 && !isSelected}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className="text-4xl mb-3">{option.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          {selected.length === 0 && "Select at least 1 challenge"}
          {selected.length === 1 && "You can select 1 more challenge"}
          {selected.length === 2 && "Maximum of 2 challenges selected"}
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default Challenges;
