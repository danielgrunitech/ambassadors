import { ApplicationFormData, SubmissionRecord } from '../types';

const DRAFT_KEY = 'gemini_ambassador_il_draft';
const SUBMISSIONS_KEY = 'gemini_ambassador_il_submissions';
const MY_SUBMISSION_KEY = 'gemini_ambassador_il_my_submission';
const WEBHOOK_KEY = 'gemini_webhook_url';

export const INITIAL_FORM_DATA: ApplicationFormData = {
  // חלק 1: נעים להכיר ☕
  fullName: '',
  phone: '',
  email: '',
  institution: '',
  customInstitution: '',
  currentYear: 'שנה א\'',
  fieldOfStudy: '',
  hobbiesAndInterests: '',
  preferredPlatforms: [],
  linkedInUrl: '',
  tiktokUrl: '',
  instagramUrl: '',
  youtubeUrl: '',

  // חלק 2: תראו לנו את הניצוץ שלכם! ✨
  canvasCampusProblem: '',
  canvasSolutionDetails: '',
  viralContentUrl: '',
  viralContentDescription: '',
  communityLeadershipStory: '',
  campusPopUpIdea: '',
  whyGoogleGeminiAmbassador: '',

  // חלק 3: רגע הפיץ' 🎙️
  videoPitchUrl: '',
  studyHackSummary: '',
  agreedToTerms: false,
};

const SAMPLE_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'IL-GEMINI-2026-8821',
    fullName: 'נועה לוי',
    phone: '052-8941234',
    email: 'noa.levi@campus.technion.ac.il',
    institution: 'הטכניון - מכון טכנולוגי לישראל',
    currentYear: 'שנה ב\'',
    fieldOfStudy: 'מדעי המחשב / הנדסת תוכנה',
    hobbiesAndInterests: 'ריצות בוקר על חוף הכרמל, פרויקטים של Open Source לתוך הלילה, ובינג\' של סדרות Sci-Fi.',
    preferredPlatforms: ['LinkedIn', 'GitHub', 'TikTok'],
    linkedInUrl: 'https://linkedin.com/in/noa-levi-tech',
    tiktokUrl: 'https://tiktok.com/@noa_codes',
    instagramUrl: '',
    youtubeUrl: '',

    canvasCampusProblem: 'בחינות גמר ופתרון מבחני עבר: סטודנטים בטכניון טובעים בפתרונות ישנים בקבצי PDF ללא הסברים אינטראקטיביים שלב-אחר-שלב.',
    canvasSolutionDetails: 'בניית "מחולל סימולציות מבחן אישי" ב-Canvas: הסטודנט מעלה את נושא המבחן או קובץ שאלות, ו-Gemini בונה מסמך חי עם שאלות תרגול, רמזים מודרכים ובדיקה אוטומטית של דרך הפתרון בזמן אמת. Canvas מושלם לכך כי הוא מאפשר אינטראקציה דו-כיוונית מתמשכת על גבי המסמך.',
    viralContentUrl: 'https://tiktok.com/@noa_codes/video/sample123',
    viralContentDescription: 'סרטון טיקטוק קצר (45 שניות) שהראה איך לנתח מאמר אקדמי מורכב ב-10 דקות בעזרת Gemini. הסרטון הגיע ל-35K צפיות והמון סטודנטים כתבו שזה הציל להם את הסמינר.',
    communityLeadershipStory: 'הקמתי קבוצת למידה לפיתוח אפליקציות AI בטכניון עם 80 משתתפים. האתגר היה לשמור על מעורבות לאורך תקופת מבחנים – רתמתי אותם דרך האקתון פנימי קצר של סופ"ש עם חלוקה לצוותים ומנטורינג הדדי.',
    campusPopUpIdea: 'עמדת "Study Hack בדשא": דוכן פופ-אפ ליד בית הסטודנט עם מסכי מגע, שבו כל סטודנט שמביא סיכום שיעור מקבל בתוך 60 שניות פודקאסט שמע מותאם אישית (Audio Overview מ-NotebookLM) ואוזניות להאזנה במקום.',
    whyGoogleGeminiAmbassador: 'אני רוצה להפוך את כלי ה-AI מסתם "טרנד" לחלק בלתי נפרד מארגז הכלים של כל סטודנט וסטודנטית בקמפוס, לחבר קהילה חזקה ולהוביל חדשנות יחד עם Google.',

    videoPitchUrl: 'https://loom.com/share/sample-pitch-noa',
    studyHackSummary: 'יצירת מדריך לימוד אינטראקטיבי עם NotebookLM מתוך סיכומי הרצאות מבולגנים.',
    agreedToTerms: true,
    submittedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    status: 'shortlisted'
  }
];

export const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyhF8tLJfCVkxe6xS1pjdoxIA2DNro43Ll7xAb1BRKxoA-a0iFHit5AqXV2__HmvHaMpg/exec';

export const getWebhookUrl = (): string => {
  try {
    localStorage.removeItem(WEBHOOK_KEY);
  } catch (e) {}
  return DEFAULT_WEBHOOK_URL;
};

export const setWebhookUrl = (url: string) => {
  try {
    localStorage.setItem(WEBHOOK_KEY, url.trim());
  } catch (e) {
    console.error(e);
  }
};

export const sendToGoogleSheets = async (record: SubmissionRecord & { website_trap?: string }): Promise<boolean> => {
  const url = DEFAULT_WEBHOOK_URL;
  if (!url || !url.startsWith('http')) {
    console.log('No Google Sheets Webhook URL configured. Submission saved locally.');
    return false;
  }

  try {
    // Send as plain text JSON to prevent CORS preflight in Google Apps Script
    // Include empty website_trap honeypot so normal users are marked legitimate
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        ...record,
        website_trap: '',
      }),
      mode: 'no-cors',
    });
    console.log('Successfully posted submission to Google Sheets Webhook.');
    return true;
  } catch (err) {
    console.error('Error posting to Google Sheets:', err);
    return false;
  }
};

export const saveDraft = (data: Partial<ApplicationFormData>) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save draft to localStorage', e);
  }
};

export const getDraft = (): ApplicationFormData => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return INITIAL_FORM_DATA;
    return { ...INITIAL_FORM_DATA, ...JSON.parse(raw) };
  } catch (e) {
    return INITIAL_FORM_DATA;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    console.error(e);
  }
};

export const getSubmissions = (): SubmissionRecord[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SAMPLE_SUBMISSIONS));
      return SAMPLE_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SAMPLE_SUBMISSIONS;
  }
};

export const getMySubmission = (): SubmissionRecord | null => {
  try {
    const raw = localStorage.getItem(MY_SUBMISSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setMySubmission = (record: SubmissionRecord) => {
  try {
    localStorage.setItem(MY_SUBMISSION_KEY, JSON.stringify(record));
  } catch (e) {
    console.error('Failed to set my submission in localStorage', e);
  }
};

export const clearMySubmission = () => {
  try {
    localStorage.removeItem(MY_SUBMISSION_KEY);
  } catch (e) {}
};

export const saveSubmission = async (data: ApplicationFormData): Promise<SubmissionRecord> => {
  const submissions = getSubmissions();
  const idNumber = Math.floor(1000 + Math.random() * 9000);
  const record: SubmissionRecord = {
    ...data,
    id: `IL-GEMINI-2026-${idNumber}`,
    submittedAt: new Date().toISOString(),
    status: 'submitted'
  };

  submissions.unshift(record);
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    setMySubmission(record);
    clearDraft();
  } catch (e) {
    console.error('Failed to save submission', e);
  }

  // Await Google Sheets dispatch directly
  try {
    await sendToGoogleSheets(record);
  } catch (e) {
    console.error('Google Sheets dispatch failed', e);
  }

  return record;
};

export const exportSubmissionsAsJSON = () => {
  const submissions = getSubmissions();
  const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gemini-ambassador-submissions-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
