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
  // חלק 1: נעים להכיר ☕ (קצת עליכם!)
  fullName: string;
  phone: string;
  email: string;
  institution: string;
  customInstitution?: string;
  currentYear: string;
  fieldOfStudy: string;
  hobbiesAndInterests: string;
  preferredPlatforms: string[];
  linkedInUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;

  // חלק 2: תראו לנו את הניצוץ שלכם! ✨
  // אתגר 1: חוקרי ג'מיניי (חובבי ה-AI) 🤖
  canvasCampusProblem: string;
  canvasSolutionDetails: string;

  // אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) 📲
  viralContentUrl: string;
  viralContentDescription: string;

  // אתגר 3: בוני הקהילה (מחברי הקמפוס) 🤝
  communityLeadershipStory: string;

  // אתגר 4: ניצוץ בקמפוס (המפעילים היצירתיים) 💡
  campusPopUpIdea: string;

  // אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) 💙
  whyGoogleGeminiAmbassador: string;

  // חלק 3: רגע הפיץ' 🎙️
  videoPitchUrl: string;
  studyHackSummary?: string;
  agreedToTerms: boolean;

  // Backward compatibility fields
  city?: string;
  degree?: string;
  expectedGraduation?: string;
  githubOrPortfolioUrl?: string;
  whyAmbassador?: string;
  currentGeminiUsage?: string;
  favoriteGeminiFeature?: string;
  primaryStrengths?: string[];
  pastLeadershipExperience?: string;
  technicalSkills?: string[];
  proposedFirstEvent?: string;
  nonTechOutreachStrategy?: string;
  weeklyCommitmentHours?: string;
  allowSharingInfo?: boolean;
}

export interface SubmissionRecord extends ApplicationFormData {
  id: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'accepted';
}
