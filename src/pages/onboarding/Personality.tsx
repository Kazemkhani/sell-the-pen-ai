import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { RejectionResponse } from "@/types/profile";

const Personality = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<RejectionResponse>(profile.rejectionResponse);

  const options = [
    {
      value: "deeply-affected" as RejectionResponse,
      icon: "😰",
      title: "It affects me deeply",
      description: "I take it personally and need time to recover",
      resilienceScore: 1,
    },
    {
      value: "bothered" as RejectionResponse,
      icon: "😕",
      title: "It bothers me",
      description: "I feel discouraged but bounce back within hours",
      resilienceScore: 2,
    },
    {
      value: "accepting" as RejectionResponse,
      icon: "😐",
      title: "I accept it",
      description: "It's part of the job, doesn't faze me much",
      resilienceScore: 3,
    },
    {
      value: "thrives" as RejectionResponse,
      icon: "😎",
      title: "I thrive on it",
      description: "Rejection motivates me to improve and try harder",
      resilienceScore: 4,
    },
  ];

  const handleNext = () => {
    const selectedOption = options.find((opt) => opt.value === selected);
    updateProfile({
      rejectionResponse: selected,
      resilienceScore: selectedOption?.resilienceScore || 1,
    });
    navigate("/onboarding/style");
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={8}
      question="How do you typically handle rejection?"
      subtext="This helps us calibrate your AI training experience"
      onBack={() => navigate("/onboarding/role")}
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

export default Personality;
