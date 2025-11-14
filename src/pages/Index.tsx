import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Brain, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-background -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance animate-fade-in-up">
            Become a Top-1% Sales Closer.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Practice live calls with AI personas, master the psychology of persuasion, and receive world-class feedback instantly.
          </p>
          <Link to="/try-now">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Try Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            The System That Rewires You Into a World-Class Sales Agent
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="feature-cell">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live AI Sales Calls</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simulate cold calls with aggressive, skeptical, or timid personas.
              </p>
            </div>

            <div className="feature-cell">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Psychology Coaching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Feedback based on negotiation science, Chris Voss, and elite SaaS sales frameworks.
              </p>
            </div>

            <div className="feature-cell">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precision Objection Handling</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn exactly how to respond under pressure.
              </p>
            </div>

            <div className="feature-cell">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transcript-based scoring that improves with every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card">
              <p className="text-lg italic text-foreground">
                "Closed a 30K AED client after one week of training."
              </p>
            </div>
            <div className="premium-card">
              <p className="text-lg italic text-foreground">
                "This feels painfully realistic — in the best way."
              </p>
            </div>
            <div className="premium-card">
              <p className="text-lg italic text-foreground">
                "The feedback engine is genius."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            The Numbers Behind the Transformation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary mb-2">37%</div>
              <p className="text-muted-foreground">increase in close rate</p>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary mb-2">52%</div>
              <p className="text-muted-foreground">faster from outreach to "yes"</p>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary mb-2">28K+</div>
              <p className="text-muted-foreground">conversations analysed</p>
            </div>
            <div className="stat-card">
              <div className="text-5xl font-bold text-primary mb-2">900+</div>
              <p className="text-muted-foreground">salespeople upskilled</p>
            </div>
          </div>
          <p className="mt-12 text-lg text-muted-foreground">
            Reverse-engineered from how the top 1% actually sell.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Start Your First AI Sales Call.
          </h2>
          <Link to="/try-now">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group">
              Try Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
