export interface Persona {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  points: string[];
  gradient: string;
  bgLight: string;
}

export interface RewardTier {
  id: string;
  name: string;
  level: string;
  points: number;
  physicalReward: string;
  digitalReward: string;
  color: string;
  isTopTier?: boolean;
}

export interface SwagItem {
  name: string;
  category: string;
  tag: string;
  description: string;
  icon: string;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'eligibility' | 'time' | 'benefits';
}

export interface ApplicationFormData {
  // Step 1: Personal & Academic
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  customInstitution?: string;
  degree: string;
  fieldOfStudy: string;
  currentYear: string;
  expectedGraduation: string;
  city: string;
  linkedInUrl: string;
  githubOrPortfolioUrl: string;
  instagramUrl: string;

  // Step 2: Passion & Why Gemini
  whyAmbassador: string;
  currentGeminiUsage: string;
  favoriteGeminiFeature: string;

  // Step 3: Strengths & Skills
  primaryStrengths: string[];
  pastLeadershipExperience: string;
  technicalSkills: string[];

  // Step 4: Campus Vision
  proposedFirstEvent: string;
  nonTechOutreachStrategy: string;

  // Step 5: Commitment & Final
  weeklyCommitmentHours: string;
  videoPitchUrl?: string;
  agreedToTerms: boolean;
  allowSharingInfo: boolean;
}

export interface SubmissionRecord extends ApplicationFormData {
  id: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'accepted';
}
