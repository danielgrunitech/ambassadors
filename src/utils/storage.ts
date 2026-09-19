import { ApplicationFormData, SubmissionRecord } from '../types';

const DRAFT_KEY = 'gemini_ambassador_il_draft';
const SUBMISSIONS_KEY = 'gemini_ambassador_il_submissions';
const WEBHOOK_KEY = 'gemini_webhook_url';

export const INITIAL_FORM_DATA: ApplicationFormData = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  customInstitution: '',
  degree: 'תואר ראשון (B.Sc / B.A)',
  fieldOfStudy: '',
  currentYear: 'שנה ב\'',
  expectedGraduation: '2026',
  city: '',
  linkedInUrl: '',
  githubOrPortfolioUrl: '',
  instagramUrl: '',
  whyAmbassador: '',
  currentGeminiUsage: '',
  favoriteGeminiFeature: '',
  primaryStrengths: [],
  pastLeadershipExperience: '',
  technicalSkills: [],
  proposedFirstEvent: '',
  nonTechOutreachStrategy: '',
  weeklyCommitmentHours: '3-5 שעות שבועיות (מומלץ)',
  videoPitchUrl: '',
  agreedToTerms: false,
  allowSharingInfo: true,
};

const SAMPLE_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'IL-GEMINI-2026-8821',
    fullName: 'נועה לוי',
    email: 'noa.levi@campus.technion.ac.il',
    phone: '052-8941234',
    institution: 'הטכניון - מכון טכנולוגי לישראל',
    degree: 'תואר ראשון (B.Sc)',
    fieldOfStudy: 'מדעי המחשב / הנדסת תוכנה',
    currentYear: 'שנה ג\'',
    expectedGraduation: '2026',
    city: 'חיפה',
    linkedInUrl: 'https://linkedin.com/in/noa-levi-tech',
    githubOrPortfolioUrl: 'https://github.com/noalevi',
    instagramUrl: '',
    whyAmbassador: 'אני חיה ונושמת עולם ה-AI מהשנה הראשונה שלי בטכניון. השתמשתי ב-Gemini בכל פרויקטי הפיתוח שלי, ואני רוצה להביא את הידע הזה לסטודנטים נוספים, לעודד נשים בטכנולוגיה, ולהקים קהילת מפתחי AI צעירה וחזקה בחיפה ובצפון.',
    currentGeminiUsage: 'אני עובדת יומיומית עם Gemini 1.5 Pro דרך Google AI Studio. נעזרת בו לעיבוד קוד, ניתוח מסמכי מחקר אקדמיים ארוכים, ופיתוח סוכני שיחה מותאמים אישית לפרויקט הגמר שלי.',
    favoriteGeminiFeature: 'חלון ההקשר העצום (2M context window) והיכולת להעלות קובצי PDF וקוד מלאים.',
    primaryStrengths: ['עמידה מול קהל והעברת הרצאות / סדנאות', 'פיתוח Hands-on, שימוש ב-APIs וקוד', 'בניית קהילות וחיבור בין סטודנטים'],
    pastLeadershipExperience: 'ניהלתי צוות של 5 מפתחים בהאקתון הטכניון, זכינו במקום השני. בנוסף הדגמתי סדנת מבוא ל-Python עבור כ-60 סטודנטים חדשים.',
    technicalSkills: ['Gemini Web / Advanced', 'Google AI Studio / Gemini API', 'Python', 'Prompt Engineering'],
    proposedFirstEvent: 'סדנת Hands-on בטכניון: "בניית אפליקציית AI ראשונה עם Gemini API בתוך שעתיים" כולל הדגמת סוכנים מותאמים.',
    nonTechOutreachStrategy: 'יצירת סדנת "AI ללא קוד" לסטודנטים לארכיטקטורה ורפואה — הדגמת שימושים פרקטיים בניתוח תמונות והכנת מצגות.',
    weeklyCommitmentHours: '3-5 שעות שבועיות (מומלץ)',
    videoPitchUrl: 'https://loom.com/share/sample-pitch-noa',
    agreedToTerms: true,
    allowSharingInfo: true,
    submittedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    status: 'shortlisted'
  },
  {
    id: 'IL-GEMINI-2026-4192',
    fullName: 'יונתן שפירא',
    email: 'yonatan.s@tauex.tau.ac.il',
    phone: '054-6729011',
    institution: 'אוניברסיטת תל אביב',
    degree: 'תואר ראשון (B.A)',
    fieldOfStudy: 'מנהל עסקים / שיווק / יזמות',
    currentYear: 'שנה ב\'',
    expectedGraduation: '2027',
    city: 'תל אביב',
    linkedInUrl: 'https://linkedin.com/in/yonatan-shapira',
    githubOrPortfolioUrl: '',
    instagramUrl: 'https://instagram.com/yonatan_ai',
    whyAmbassador: 'אני מאמין שהעתיד של עסקים, שיווק וניהול מוצר תלוי ביכולת לשלוט בכלי AI. כמי שמוביל את מועדון היזמות הסטודנטיאלי באוניברסיטת תל אביב, אני רוצה להנגיש את Gemini לכלל הסטודנטים בפקולטה לניהול ולמדעי הרוח.',
    currentGeminiUsage: 'אני משתמש ב-Gemini Advanced לבניית תוכניות עסקיות, סיעור מוחות לפוסטים, ניתוח נתונים פיננסיים ויצירת Gems מותאמים אישית לניהול משימות.',
    favoriteGeminiFeature: 'האינטגרציה המובנית עם Google Workspace (Docs, Drive, Gmail) והיכולת לייצר תוכן מעוצב במהירות.',
    primaryStrengths: ['ארגון והפקת אירועים, מיטאפים והאקתונים', 'יצירת תוכן וידאו, פוסטים ומדיה חברתית', 'עמידה מול קהל והעברת הרצאות / סדנאות'],
    pastLeadershipExperience: 'הפקתי את כנס היזמות הסטודנטיאלי השנתי ב-TAU עם מעל 250 משתתפים, כולל גיוס חסויות ותיאום דוברים מחברות מובילות.',
    technicalSkills: ['Gemini Web / Advanced', 'Prompt Engineering', 'Canva / Figma', 'ניהול קהילות (Discord / WhatsApp / LinkedIn)'],
    proposedFirstEvent: 'מיטאפ באודיטוריום רקנאטי: "AI לעסקים ויוצרי תוכן — איך להזניק את הקריירה עם Gemini".',
    nonTechOutreachStrategy: 'הדגמות וידאו קצרות באינסטגרם ובטיקטוק שמראות איך סטודנטים למשפטים ולתקשורת מכינים עבודות פי 3 יותר מהר.',
    weeklyCommitmentHours: '3-5 שעות שבועיות (מומלץ)',
    videoPitchUrl: '',
    agreedToTerms: true,
    allowSharingInfo: true,
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'submitted'
  }
];

export const getWebhookUrl = (): string => {
  try {
    return localStorage.getItem(WEBHOOK_KEY) || (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';
  } catch (e) {
    return '';
  }
};

export const setWebhookUrl = (url: string) => {
  try {
    localStorage.setItem(WEBHOOK_KEY, url.trim());
  } catch (e) {
    console.error(e);
  }
};

export const sendToGoogleSheets = async (record: SubmissionRecord): Promise<boolean> => {
  const url = getWebhookUrl();
  if (!url || !url.startsWith('http')) {
    console.log('No Google Sheets Webhook URL configured. Submission saved locally.');
    return false;
  }

  try {
    // Send as plain text JSON to prevent CORS preflight in Google Apps Script
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(record),
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

export const saveSubmission = (data: ApplicationFormData): SubmissionRecord => {
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
    clearDraft();
  } catch (e) {
    console.error('Failed to save submission', e);
  }

  // Trigger Google Sheets dispatch in background
  sendToGoogleSheets(record).catch(console.error);

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
