import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import Index from "./pages/Index";
import PersonaSelection from "./pages/PersonaSelection";
import CallSimulation from "./pages/CallSimulation";
import Feedback from "./pages/Feedback";
import Recommendations from "./pages/Recommendations";
import ProposalCrafting from "./pages/ProposalCrafting";
import NotFound from "./pages/NotFound";

// Onboarding pages
import BasicInfo from "./pages/onboarding/BasicInfo";
import Experience from "./pages/onboarding/Experience";
import Role from "./pages/onboarding/Role";
import Personality from "./pages/onboarding/Personality";
import CommunicationStyle from "./pages/onboarding/CommunicationStyle";
import Challenges from "./pages/onboarding/Challenges";
import LearningStyle from "./pages/onboarding/LearningStyle";
import Goals from "./pages/onboarding/Goals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProfileProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Onboarding flow */}
            <Route path="/onboarding/basic-info" element={<BasicInfo />} />
            <Route path="/onboarding/experience" element={<Experience />} />
            <Route path="/onboarding/role" element={<Role />} />
            <Route path="/onboarding/personality" element={<Personality />} />
            <Route path="/onboarding/style" element={<CommunicationStyle />} />
            <Route path="/onboarding/challenges" element={<Challenges />} />
            <Route path="/onboarding/learning" element={<LearningStyle />} />
            <Route path="/onboarding/goals" element={<Goals />} />

            {/* Post-onboarding */}
            <Route path="/recommendations" element={<Recommendations />} />

            {/* Main flow */}
            <Route path="/persona-selection" element={<PersonaSelection />} />
            <Route path="/proposal-crafting" element={<ProposalCrafting />} />
            <Route path="/call-simulation" element={<CallSimulation />} />
            <Route path="/feedback" element={<Feedback />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProfileProvider>
  </QueryClientProvider>
);

export default App;
