import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { UserGreeting } from "@/components/UserGreeting";

const Feedback = () => {
  const scores = [
    {
      title: "Opening Score",
      score: 72,
      description: "How well you established authority + rapport.",
      trend: "neutral",
    },
    {
      title: "Conversation Control Score",
      score: 58,
      description: "How well you navigated the aggressive persona.",
      trend: "down",
    },
    {
      title: "Objection Handling Score",
      score: 81,
      description: "How you responded to friction.",
      trend: "up",
    },
    {
      title: "Closing Momentum Score",
      score: 65,
      description: "How effectively you moved toward the close.",
      trend: "neutral",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-destructive" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-600";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-background px-6 py-24 relative">
      <UserGreeting />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Sales Breakdown
          </h1>
          <p className="text-xl text-muted-foreground">
            Feedback generated from the transcript of your call.
          </p>
        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {scores.map((item, index) => (
            <div
              key={index}
              className="premium-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                {getTrendIcon(item.trend)}
              </div>
              <div className="text-5xl font-bold mb-4 text-primary">
                {item.score}
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <Progress
                value={item.score}
                className="h-3 mb-4"
                indicatorClassName={getScoreColor(item.score)}
              />
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Narrative Analysis */}
        <div className="premium-card mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl font-bold mb-6">Detailed Analysis</h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="mb-4 leading-relaxed">
              <strong>Opening (72/100):</strong> Your introduction was clear but lacked the tactical empathy emphasized in <em>Never Split the Difference</em> by Chris Voss. When the prospect said "I'm busy," you could have mirrored their statement ("You're busy?") to create a pause and show understanding before moving forward.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Conversation Control (58/100):</strong> The aggressive persona interrupted you multiple times, and you fell into a reactive pattern. Top performers use the <em>Challenger Sale</em> approach—taking control by teaching something unexpected rather than defending your position. You needed to reframe the conversation around their business challenges, not your solution.
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>Objection Handling (81/100):</strong> Strong performance here. You acknowledged concerns without becoming defensive, and you asked clarifying questions—a core principle of <em>SPIN Selling</em>. Your problem questions helped uncover pain points that justified your solution.
            </p>
            <p className="leading-relaxed">
              <strong>Closing Momentum (65/100):</strong> You moved toward a commitment but didn't create urgency. In B2B SaaS sales, successful closers tie next steps to specific business outcomes and timelines. Consider using calibrated questions like "What happens if you don't solve this by Q2?" to build natural urgency without pressure.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <Link to="/recommendations">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full">
              Choose Different Skill
            </Button>
          </Link>
          <Link to="/persona-selection">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group">
              Practice Again
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
