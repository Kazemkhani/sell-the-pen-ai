import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
const Index = lazy(() => import("./pages/Index"));
const PersonaSelection = lazy(() => import("./pages/PersonaSelection"));
const CallSimulation = lazy(() => import("./pages/CallSimulation"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const ProposalCrafting = lazy(() => import("./pages/ProposalCrafting"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BasicInfo = lazy(() => import("./pages/onboarding/BasicInfo"));
const Experience = lazy(() => import("./pages/onboarding/Experience"));
const Role = lazy(() => import("./pages/onboarding/Role"));
const Personality = lazy(() => import("./pages/onboarding/Personality"));
const CommunicationStyle = lazy(() => import("./pages/onboarding/CommunicationStyle"));
const Challenges = lazy(() => import("./pages/onboarding/Challenges"));
const LearningStyle = lazy(() => import("./pages/onboarding/LearningStyle"));
const Goals = lazy(() => import("./pages/onboarding/Goals"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProfileProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading" />}>
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </UserProfileProvider>
  </QueryClientProvider>
);

export default App;
