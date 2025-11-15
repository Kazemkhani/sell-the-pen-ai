import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Recommendations = () => {
  const { profile } = useUserProfile();

  // Calculate match scores based on profile
  const getLeadOutreachMatch = () => {
    let score = 70; // base score
    if (profile.topChallenges.includes("fear")) score += 15;
    if (profile.topChallenges.includes("gatekeepers")) score += 10;
    if (profile.topChallenges.includes("rapport")) score += 5;
    if (profile.experienceLevel === "beginner") score += 5;
    return Math.min(score, 98);
  };

  const getObjectionHandlingMatch = () => {
    let score = 60;
    if (profile.topChallenges.includes("objections")) score += 20;
    if (profile.topChallenges.includes("control")) score += 10;
    if (profile.communicationStyle === "assertive") score += 5;
    return Math.min(score, 95);
  };

  const getPitchingMatch = () => {
    let score = 50;
    if (profile.topChallenges.includes("value")) score += 20;
    if (profile.communicationStyle === "analytical") score += 10;
    if (profile.topChallenges.includes("closing")) score += 5;
    return Math.min(score, 90);
  };

  const leadOutreachMatch = getLeadOutreachMatch();
  const objectionHandlingMatch = getObjectionHandlingMatch();
  const pitchingMatch = getPitchingMatch();

  // Fixed order: Lead Outreach → Pitching & Positioning → Objection Handling & Closing
  const recommendations = [
    {
      skill: "Lead Outreach",
      path: "/persona-selection", // Direct to persona selection for active skill
      icon: "📞",
      match: leadOutreachMatch,
      priority: leadOutreachMatch >= 85 ? "high" : "medium",
      reason: profile.topChallenges.includes("fear")
        ? "Perfect for overcoming call anxiety and building confidence"
        : "Master the art of first contact and cold calling",
    },
    {
      skill: "Pitching & Positioning",
      path: "/try-now", // Not implemented yet
      icon: "💼",
      match: pitchingMatch,
      priority: pitchingMatch >= 85 ? "high" : "medium",
      reason: profile.topChallenges.includes("value")
        ? "Helps you articulate value propositions clearly"
        : "Communicate value with precision and impact",
    },
    {
      skill: "Objection Handling & Closing",
      path: "/try-now", // Not implemented yet
      icon: "🛡️",
      match: objectionHandlingMatch,
      priority: objectionHandlingMatch >= 85 ? "high" : "medium",
      reason: profile.topChallenges.includes("objections")
        ? "Directly addresses your challenge with handling pushback"
        : "Learn to handle objections and close deals confidently",
    },
  ];

  const experienceLabels = {
    beginner: "Just Starting Out",
    intermediate: "Building Momentum",
    experienced: "Experienced Seller",
    veteran: "Sales Veteran",
  };

  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Profile Complete!</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome, {profile.name}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your profile, here's your personalized training path
          </p>
        </div>

        {/* Profile Summary */}
        <div className="premium-card mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-xl font-semibold mb-4">Your Training Profile</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Experience:</span>
              <p className="font-medium mt-1">{experienceLabels[profile.experienceLevel]}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Communication Style:</span>
              <p className="font-medium mt-1 capitalize">{profile.communicationStyle}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Top Challenges:</span>
              <p className="font-medium mt-1 capitalize">
                {profile.topChallenges.map(c => c.replace('-', ' ')).join(", ")}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Goal:</span>
              <p className="font-medium mt-1 capitalize">{profile.primaryGoal.replace('-', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-8">Recommended Training Path</h2>
          {recommendations.map((rec, index) => (
            <Link
              key={rec.skill}
              to={rec.path}
              className="block group"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div
                className={`premium-card hover:scale-[1.02] transition-all duration-300 ${
                  rec.priority === "high" ? "border-2 border-primary/30" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-4xl">{rec.icon}</div>
                      <div>
                        <h3 className="text-2xl font-semibold">{rec.skill}</h3>
                        {rec.priority === "high" && (
                          <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-1">
                            Highly Recommended
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{rec.reason}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{ width: `${rec.match}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{rec.match}% match</span>
                    </div>
                  </div>
                  <Button className="group-hover:translate-x-1 transition-transform">
                    Start Training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
