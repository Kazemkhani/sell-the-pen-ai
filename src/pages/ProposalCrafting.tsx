import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserGreeting } from "@/components/UserGreeting";
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

const ProposalCrafting = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file.type === "application/pdf") {
      setUploadedFile(file);
      setShowResults(false);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleMockUpload = () => {
    // Create a mock PDF file for demo purposes
    const mockFile = new File(
      ["Mock PDF content"],
      "Business_Proposal_Q4_2024.pdf",
      { type: "application/pdf" }
    );
    setUploadedFile(mockFile);
    setShowResults(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // For demo, just use mock upload
    handleMockUpload();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  // Dummy analysis results based on Tom Sant's "Persuasive Business Proposals"
  const analysisResults = {
    overall_score: 72,
    grade: "B-",
    strengths: [
      "Executive Summary leads with business outcomes (Sant's 'Lead with results, not process')",
      "Strong proof points: 3 case studies with quantified results reinforce credibility",
      "AIDA structure followed: Attention hook → Interest builder → Desire creator → Clear CTA",
    ],
    improvements: [
      "Customer-centric language ratio is 40/60 (you/we). Sant recommends 70/30 - shift focus to client benefits",
      "Win themes missing: No clear differentiation from competitors. Add 'Why us vs. them?' section",
      "Value-based pricing weak: Shows costs without ROI calculator or payback period (Sant's 'Business case, not price list')",
      "Risk mitigation absent: No addressing of potential objections or implementation concerns",
    ],
    scores: {
      customer_centric: 65,
      executive_summary: 82,
      proof_points: 88,
      win_themes: 45,
      value_pricing: 58,
    },
    sant_concepts: [
      {
        concept: "Customer-Centric Language",
        quote: "Write to express, not to impress. Focus on 'you' and 'your business,' not 'we' and 'our solution.'",
        status: "needs_work",
      },
      {
        concept: "Executive Summary",
        quote: "The executive summary is not an introduction. It's a summary of your recommendations and their value.",
        status: "strong",
      },
      {
        concept: "Proof Points",
        quote: "Claims without proof are just advertising. Proof without claims is just data.",
        status: "strong",
      },
      {
        concept: "Win Themes",
        quote: "A win theme answers: Why should the customer choose you instead of a competitor?",
        status: "missing",
      },
    ],
    next_steps: {
      primary_focus: "Add Win Themes section",
      action_items: [
        "Create a 'Why Choose Us' section comparing your solution to alternatives",
        "Rewrite 10 'we' statements to 'you' statements (increase customer-centric ratio)",
        "Add an ROI calculator or payback period table to pricing section",
      ],
      sant_resource: "Persuasive Business Proposals, Chapter 7: 'Creating Win Themes That Resonate'",
    },
  };

  return (
    <div className="min-h-screen bg-background px-6 py-24 relative">
      <UserGreeting />
      <div className="max-w-4xl mx-auto">
        {/* Demo Notice Banner */}
        <div className="mb-8 p-4 rounded-lg border-2 border-orange-500/30 bg-orange-500/10 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 dark:text-orange-400">Demo Mode</h3>
              <p className="text-sm text-muted-foreground">
                This is a mock demonstration using sample data. No actual AI analysis is performed. Real analysis coming soon!
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-12 flex justify-start">
          <Link to="/recommendations">
            <Button variant="ghost" className="rounded-full px-4 py-2 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recommendations
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Proposal Crafting Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your proposal and get AI-powered feedback to win more deals
          </p>
        </div>

        {/* Upload Area */}
        {!showResults && (
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div
              className={`premium-card border-2 border-dashed transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-muted-foreground/20"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  {uploadedFile ? (
                    <FileText className="h-10 w-10 text-primary" />
                  ) : (
                    <Upload className="h-10 w-10 text-primary" />
                  )}
                </div>

                {uploadedFile ? (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="text-xl font-semibold">{uploadedFile.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {(uploadedFile.size / 1024).toFixed(2)} KB • PDF
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        size="lg"
                        className="px-8"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Proposal"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setUploadedFile(null)}
                        size="lg"
                      >
                        Remove
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold mb-3">
                      Drop your proposal here
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      or click to upload a sample proposal
                    </p>
                    <Button onClick={handleMockUpload} size="lg">
                      Upload Sample PDF
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Demo mode: Uploads a sample business proposal
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {showResults && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Overall Score */}
            <div className="premium-card text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full mb-4">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Analysis Complete</span>
              </div>
              <h2 className="text-6xl font-bold mb-2">{analysisResults.overall_score}</h2>
              <p className="text-2xl text-muted-foreground mb-1">Tom Sant Persuasion Score</p>
              <p className="text-lg font-semibold text-primary">Grade: {analysisResults.grade}</p>
              <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                Evaluated against Tom Sant's "Persuasive Business Proposals" framework
              </p>
            </div>

            {/* Tom Sant Principles */}
            <div className="premium-card">
              <h3 className="text-2xl font-semibold mb-2">Tom Sant's Framework Analysis</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Based on "Persuasive Business Proposals"
              </p>
              <div className="space-y-4">
                {analysisResults.sant_concepts.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{item.concept}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "strong"
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : item.status === "needs_work"
                            ? "bg-orange-500/10 text-orange-700 dark:text-orange-400"
                            : "bg-red-500/10 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {item.status === "strong"
                          ? "✓ Strong"
                          : item.status === "needs_work"
                          ? "⚠ Needs Work"
                          : "✗ Missing"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{item.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="premium-card">
              <h3 className="text-2xl font-semibold mb-6">Sant Score Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(analysisResults.scores).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium capitalize">
                        {category.replace(/_/g, " ")}
                      </span>
                      <span className="font-bold">{score}/100</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          score >= 80
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : score >= 60
                            ? "bg-gradient-to-r from-orange-500 to-primary"
                            : "bg-gradient-to-r from-red-500 to-orange-500"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <h3 className="text-2xl font-semibold">What You're Doing Right</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Sant principles you've already mastered
              </p>
              <ul className="space-y-3">
                {analysisResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <h3 className="text-2xl font-semibold">Tom Sant Recommendations</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Actionable improvements based on Sant's proven principles
              </p>
              <ul className="space-y-4">
                {analysisResults.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="premium-card border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold">Your Next Steps</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                <strong>Primary Focus:</strong> {analysisResults.next_steps.primary_focus}
              </p>
              <div className="space-y-3 mb-6">
                {analysisResults.next_steps.action_items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  📚 <strong>Recommended Reading:</strong>{" "}
                  {analysisResults.next_steps.sant_resource}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              <Button
                onClick={() => {
                  setUploadedFile(null);
                  setShowResults(false);
                }}
                size="lg"
                variant="outline"
              >
                Analyze Another Proposal
              </Button>
              <Link to="/recommendations">
                <Button size="lg">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalCrafting;
