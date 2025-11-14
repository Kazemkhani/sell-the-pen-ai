import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Presentation, Target } from "lucide-react";
import { Link } from "react-router-dom";

const TryNow = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Which skill do you want to improve today?
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose where you want immediate growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Option 1: Lead Outreach */}
          <Link to="/persona-selection" className="group">
            <div className="premium-card h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lead Outreach</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Master the art of first contact.
              </p>
              <Button className="w-full rounded-full group-hover:translate-x-1 transition-transform">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          {/* Option 2: Pitching & Positioning */}
          <Link to="/persona-selection" className="group">
            <div className="premium-card h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <Presentation className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Pitching & Positioning</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Communicate value with precision.
              </p>
              <Button className="w-full rounded-full group-hover:translate-x-1 transition-transform">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          {/* Option 3: Objection Handling & Closing */}
          <Link to="/persona-selection" className="group">
            <div className="premium-card h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Objection Handling & Closing</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Turn resistance into momentum.
              </p>
              <Button className="w-full rounded-full group-hover:translate-x-1 transition-transform">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TryNow;
