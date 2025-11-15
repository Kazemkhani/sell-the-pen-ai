import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { ExperienceLevel } from "@/types/profile";

const Experience = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<ExperienceLevel>(profile.experienceLevel);

  const options = [
    {
      value: "beginner" as ExperienceLevel,
      icon: "🌱",
      title: "Just Starting Out",
      subtitle: "0-6 months",
      description: "I'm new to sales or changing careers",
    },
    {
      value: "intermediate" as ExperienceLevel,
      icon: "🚀",
      title: "Building Momentum",
      subtitle: "6 months - 2 years",
      description: "I'm finding my groove but want to improve",
    },
    {
      value: "experienced" as ExperienceLevel,
      icon: "💼",
      title: "Experienced Seller",
      subtitle: "2-5 years",
      description: "I know the basics, looking to master my craft",
    },
    {
      value: "veteran" as ExperienceLevel,
      icon: "🏆",
      title: "Sales Veteran",
      subtitle: "5+ years",
      description: "I want to sharpen specific skills and stay sharp",
    },
  ];

  const handleNext = () => {
    updateProfile({ experienceLevel: selected });
    navigate("/onboarding/role");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={8}
      question="What's your current sales experience?"
      onBack={() => navigate("/onboarding/basic-info")}
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
            <h3 className="text-xl font-semibold mb-1">{option.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{option.subtitle}</p>
            <p className="text-muted-foreground">{option.description}</p>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default Experience;
