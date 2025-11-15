import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile, DEMO_PROFILE } from "@/types/profile";

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const STORAGE_KEY = "sell-pen-user-profile";

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    // Load from localStorage or use demo profile
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...parsed, createdAt: new Date(parsed.createdAt) };
      } catch {
        return DEMO_PROFILE;
      }
    }
    return DEMO_PROFILE;
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    setProfile((prev) => ({ ...prev, completedOnboarding: true }));
  };

  const resetProfile = () => {
    setProfile(DEMO_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserProfileContext.Provider
      value={{ profile, updateProfile, completeOnboarding, resetProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
