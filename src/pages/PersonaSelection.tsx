import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Flame, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { UserGreeting } from "@/components/UserGreeting";

const PersonaSelection = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-24 relative">
      <UserGreeting />
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex justify-start">
          <Link to="/recommendations">
            <Button variant="ghost" className="rounded-full px-4 py-2 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recommendations
            </Button>
          </Link>
        </div>
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your Customer Persona
          </h1>
          <p className="text-xl text-muted-foreground">
            Train with the persona you find most challenging.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Persona 1: Dominant & Aggressive - DEMO PERSONA */}
          <Link to="/call-simulation" className="group">
            <div className="premium-card h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 border-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-8 group-hover:bg-destructive/20 transition-colors">
                <Flame className="h-8 w-8 text-destructive" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Demo Persona
              </div>
              <h3 className="text-2xl font-semibold mb-4">Dominant & Aggressive</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Interrupts you, challenges your authority, pushes back hard.
              </p>
              <Button className="w-full rounded-full group-hover:translate-x-1 transition-transform">
                Select Persona
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          {/* Persona 2: Analytical & Skeptical */}
          <div className="group opacity-60 cursor-not-allowed">
            <div className="premium-card h-full">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
                Coming Soon
              </div>
              <h3 className="text-2xl font-semibold mb-4">Analytical & Skeptical</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Asks for details, slow decision-maker, needs facts.
              </p>
              <Button className="w-full rounded-full" disabled>
                Select Persona
              </Button>
            </div>
          </div>

          {/* Persona 3: Timid & Uncertain */}
          <div className="group opacity-60 cursor-not-allowed">
            <div className="premium-card h-full">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
                Coming Soon
              </div>
              <h3 className="text-2xl font-semibold mb-4">Timid & Uncertain</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Nervous, indecisive, price-sensitive.
              </p>
              <Button className="w-full rounded-full" disabled>
                Select Persona
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaSelection;
