import { useUserProfile } from "@/contexts/UserProfileContext";
import { User } from "lucide-react";

export function UserGreeting() {
  const { profile } = useUserProfile();

  if (!profile.completedOnboarding) return null;

  return (
    <div className="absolute top-6 right-6 flex items-center gap-2 text-sm animate-fade-in">
      <div className="flex items-center gap-2 bg-muted/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Hello,</span>
        <span className="font-semibold text-foreground">{profile.name}</span>
      </div>
    </div>
  );
}
