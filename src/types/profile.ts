export type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced' | 'veteran';

export type SalesRole = 'SDR' | 'AE' | 'AM' | 'RealEstate' | 'B2BSaaS' | 'Retail' | 'Other';

export type RejectionResponse = 'deeply-affected' | 'bothered' | 'accepting' | 'thrives';

export type CommunicationStyle = 'analytical' | 'relationship' | 'assertive' | 'patient';

export type Challenge =
  | 'fear'
  | 'gatekeepers'
  | 'rapport'
  | 'objections'
  | 'control'
  | 'value'
  | 'closing'
  | 'consistency';

export type LearningStyle = 'trial-error' | 'guided' | 'analytical' | 'quick-wins';

export type PrimaryGoal = 'confidence' | 'quota' | 'top-performer' | 'mastery' | 'advancement';

export type Timeline = 'week' | 'month' | 'quarter' | 'long-term';

export interface UserProfile {
  // Basic info
  name: string;
  company: string;

  // Step 1
  experienceLevel: ExperienceLevel;

  // Step 2
  salesRole: SalesRole;
  customRole?: string;

  // Step 3
  rejectionResponse: RejectionResponse;
  resilienceScore: number; // 1-4 derived from rejectionResponse

  // Step 4
  communicationStyle: CommunicationStyle;

  // Step 5
  topChallenges: Challenge[]; // max 2

  // Step 6
  learningStyle: LearningStyle;

  // Step 7
  primaryGoal: PrimaryGoal;
  timeline: Timeline;

  // Metadata
  createdAt: Date;
  completedOnboarding: boolean;
}

// Demo profile for Amir Kazamkhani
export const DEMO_PROFILE: UserProfile = {
  name: "Amir Kazamkhani",
  company: "Nova Real Estate",
  experienceLevel: "beginner",
  salesRole: "SDR",
  rejectionResponse: "deeply-affected",
  resilienceScore: 1,
  communicationStyle: "assertive",
  topChallenges: ["fear", "objections"],
  learningStyle: "trial-error",
  primaryGoal: "quota",
  timeline: "month",
  createdAt: new Date(),
  completedOnboarding: false,
};
