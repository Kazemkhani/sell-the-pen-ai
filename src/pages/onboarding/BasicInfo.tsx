import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/contexts/UserProfileContext";

const BasicInfo = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserProfile();
  const [name, setName] = useState(profile.name);
  const [company, setCompany] = useState(profile.company);

  const handleNext = () => {
    updateProfile({ name, company });
    navigate("/onboarding/experience");
  };

  const isValid = name.trim().length > 0 && company.trim().length > 0;

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={8}
      question="Let's get to know you"
      subtext="Help us personalize your training experience"
      onNext={handleNext}
      nextDisabled={!isValid}
      showBack={false}
    >
      <div className="max-w-md mx-auto space-y-6 animate-fade-in-up">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">
            Your Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-base">
            Company Name
          </Label>
          <Input
            id="company"
            type="text"
            placeholder="Enter your company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="text-lg py-6"
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            💡 Your information is stored locally and never shared. We use it to personalize
            your AI training experience.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BasicInfo;
