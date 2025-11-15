import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { SalesRole } from "@/types/profile";

const Role = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [selected, setSelected] = useState<SalesRole>(profile.salesRole || "RealEstate");

  const options = [
    {
      value: "SDR" as SalesRole,
      icon: "📞",
      title: "SDR/BDR",
      description: "Lead generation, cold outreach",
      available: false,
    },
    {
      value: "AE" as SalesRole,
      icon: "💰",
      title: "Account Executive",
      description: "Full cycle sales",
      available: false,
    },
    {
      value: "AM" as SalesRole,
      icon: "🤝",
      title: "Account Manager",
      description: "Relationship management, upsells",
      available: false,
    },
    {
      value: "RealEstate" as SalesRole,
      icon: "🏠",
      title: "Real Estate Agent",
      description: "Property sales",
      available: true,
    },
    {
      value: "B2BSaaS" as SalesRole,
      icon: "📊",
      title: "B2B SaaS",
      description: "Software/technology sales",
      available: false,
    },
    {
      value: "Retail" as SalesRole,
      icon: "🛍️",
      title: "Retail/B2C",
      description: "Direct to consumer",
      available: false,
    },
  ];

  const handleNext = () => {
    updateProfile({
      salesRole: selected,
      customRole: undefined,
    });
    navigate("/onboarding/personality");
  };

  const isValid = selected === "RealEstate";

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={8}
      question="What type of sales do you do?"
      onBack={() => navigate("/onboarding/experience")}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => option.available && setSelected(option.value)}
            disabled={!option.available}
            className={`premium-card text-left transition-all duration-300 relative ${
              option.available
                ? "hover:scale-[1.02] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } ${
              selected === option.value
                ? "border-2 border-primary shadow-lg"
                : option.available
                ? "hover:border-primary/40"
                : ""
            }`}
          >
            <div className="text-4xl mb-4">{option.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
            <p className="text-sm text-muted-foreground">{option.description}</p>
            {!option.available && (
              <span className="absolute top-3 right-3 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </button>
        ))}

        {/* Other option with custom input - grayed out */}
        <button
          disabled
          className="premium-card text-left transition-all duration-300 relative opacity-50 cursor-not-allowed"
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">Other</h3>
          <p className="text-sm text-muted-foreground">Custom role</p>
          <span className="absolute top-3 right-3 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default Role;
