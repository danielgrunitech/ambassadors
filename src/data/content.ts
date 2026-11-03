import { Persona, FaqItem } from '../types';

export const ISRAELI_INSTITUTIONS = [
  "אוניברסיטת תל אביב",
  "אוניברסיטת רייכמן",
  "הטכניון - מכון טכנולוגי לישראל",
  "האוניברסיטה העברית בירושלים",
  "אוניברסיטת בן-גוריון בנגב",
  "אוניברסיטת בר-אילן",
  "אוניברסיטת חיפה",
  "אוניברסיטת אריאל בשומרון",
  "האוניברסיטה הפתוחה",
  "המכון הטכנולוגי חולון (HIT)",
  "המכללה האקדמית תל אביב-יפו",
  "מכללת אפקה להנדסה",
  "שנקר - הנדסה. עיצוב. אמנות",
  "המסלול האקדמי המכללה למינהל",
  "המרכז האקדמי רופין",
  "מוסד לימודים אחר..."
];

export const STUDY_YEARS = [
  "שנה א'",
  "שנה ב'",
  "שנה ג'",
  "שנה ד'",
  "תואר שני",
  "אחר"
];

export const DIGITAL_PLATFORMS = [
  "LinkedIn",
  "TikTok",
  "Instagram",
  "YouTube",
  "GitHub",
  "בלוג אישי",
  "אתר אישי",
  "אחר"
];

export const FIELDS_OF_STUDY = [
  "מדעי המחשב / הנדסת תוכנה",
  "מדעי הנתונים ו-AI (Data Science)",
  "הנדסת חשמל / מחשבים",
  "מערכות מידע",
  "הנדסת תעשייה וניהול",
  "מנהל עסקים / שיווק / יזמות",
  "עיצוב, תקשורת חזותית ו-UI/UX",
  "מדעי החיים / ביו-אינפורמטיקה",
  "פסיכולוגיה / מדעי המוח",
  "משפטים / ממשל ומדיניות ציבורית",
  "תחום לימודים אחר"
];

export const STRENGTH_OPTIONS = [
  { id: 'speaking', label: 'עמידה מול קהל והעברת הרצאות / סדנאות' },
  { id: 'organizing', label: 'ארגון והפקת אירועים, מיטאפים והאקתונים' },
  { id: 'coding', label: 'פיתוח Hands-on, שימוש ב-APIs וקוד' },
  { id: 'content', label: 'יצירת תוכן וידאו, פוסטים ומדיה חברתית' },
  { id: 'community', label: 'בניית קהילות וחיבור בין סטודנטים' },
  { id: 'prompting', label: 'מומחיות ב-Prompt Engineering ו-AI Tools' }
];

export const TECHNICAL_SKILL_OPTIONS = [
  "Gemini Web / Advanced",
  "Google AI Studio / Gemini API",
  "Python",
  "JavaScript / TypeScript",
  "Prompt Engineering",
  "Git / GitHub",
  "Canva / Figma",
  "ניהול קהילות (Discord / WhatsApp / LinkedIn)"
];

export const PERSONAS: Persona[] = [
  {
    id: 'ai-enthusiast',
    title: 'חובב/ת ה-AI',
    subtitle: 'The AI Enthusiast',
    badge: 'סקרנות טכנולוגית',
    iconName: 'Sparkles',
    points: [
      'סקרנים לגבי איך טכנולוגיה עובדת מתחת למכסה המנוע',
      'חוקרים ומתנסים בכלים ובפיצ\'רים חדשים לפני כולם',
      'בינה מלאכותית לא מפחידה אתכם — היא מרגשת ומעוררת השראה'
    ],
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    bgLight: 'bg-[#E8F0FE]'
  },
  {
    id: 'creative-thinker',
    title: 'החושב/ת היצירתי/ת',
    subtitle: 'The Creative Thinker',
    badge: 'חשיבה מקורית',
    iconName: 'Lightbulb',
    points: [
      'רואים הזדמנויות ופתרונות במקומות שאחרים רואים רק מגבלות',
      'ממציאים רעיונות ושימושים חדשים שאף אחד עדיין לא חשב עליהם',
      'לא רק עוקבים אחרי טרנדים ב-AI — מתחילים אותם בקמפוס'
    ],
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgLight: 'bg-[#FEF7E0]'
  },
  {
    id: 'communicator',
    title: 'המחבר/ת והמדריך/ה',
    subtitle: 'The Communicator',
    badge: 'הובלת קהילה',
    iconName: 'Megaphone',
    points: [
      'אוהבים לחבר בין אנשים, מוחות ורעיונות שונים',
      'יודעים לקחת מושגי AI מורכבים ולהפוך אותם לפשוטים ומובנים',
      'חולקים בשמחה ידע וטיפים עם סטודנטים מכל הפקולטות'
    ],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    bgLight: 'bg-[#E6F4EA]'
  },
  {
    id: 'impact-maker',
    title: 'יוצר/ת האימפקט',
    subtitle: 'The Impact Maker',
    badge: 'מנהיגות ועשייה',
    iconName: 'Rocket',
    points: [
      'לא רק משתתפים באירועים — יוזמים ומניעים תהליכים בעצמכם',
      'מזהים צרכים אמיתיים בקמפוס ומשפרים את חוויית הסטודנטים',
      'מחויבים להשאיר את הקמפוס והסביבה הטכנולוגית טובה יותר'
    ],
    gradient: 'from-purple-600 via-pink-600 to-rose-500',
    bgLight: 'bg-[#F3E8FD]'
  }
];

export interface ProgramBenefit {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  details: string[];
  link?: {
    url: string;
    text: string;
  };
}

export const PROGRAM_BENEFITS: ProgramBenefit[] = [
  {
    id: 'gemini-advanced',
    title: 'מנוי Google AI Plus בחינם',
    subtitle: 'Google AI Plus Access',
    badge: 'מנוי AI Plus',
    badgeColor: 'bg-blue-100 text-[#346BF1]',
    description: 'שגרירי התוכנית מקבלים מנוי Google AI Plus מלא (מודל ה-Plus) ללא תשלום, המעניק גישה לכל הפונקציות והיכולות המתקדמות של Gemini ללימודים, מחקר ופרויקטים.',
    details: [
      'מנוי Google AI Plus מלא ללא עלות לאורך שנת הפעילות',
      'שליטה בכל הפונקציות של Gemini לניתוח מאמרים, קוד, מסמכים ומחקר',
      'אינטגרציה חלקה עם כלי העבודה של Google Workspace',
      'יצירת Gems והתאמה אישית של עוזרי AI ללמידה אקדמית'
    ],
    link: {
      url: 'https://gemini.google/students/',
      text: 'למידע על תוכנית הסטודנטים הרשמית של Gemini'
    }
  },
  {
    id: 'certification',
    title: 'תעודת שגריר/ה רשמית מ-Google',
    subtitle: 'Formal Ambassador Certification',
    badge: 'הכרה מקצועית',
    badgeColor: 'bg-amber-100 text-amber-800',
    description: 'תעודת הסמכה והערכה רשמית מבית Google המעידה על מנהיגות טכנולוגית, הובלת קהילה, יצירת תוכן ומומחיות ביישומי AI.',
    details: [
      'תעודת סיום רשמית ויוקרתית (Certificate of Recognition)',
      'Digital Badge מאומת לפרופיל ה-LinkedIn שלכם',
      'תוספת משמעותית ומבדלת לקורות החיים להשתלבות בתעשיית ההייטק'
    ]
  },
  {
    id: 'weekly-seminars',
    title: 'סדנאות מעשיות והרצאות ב-Google Campus',
    subtitle: 'Hands-on Workshops & Lectures',
    badge: 'העשרת עומק',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'סדנאות Hands-on אינטראקטיביות והרצאות עומק בלעדיות במתחם ה-Google Campus בהנחיית מומחי תוכן, מהנדסים וחוקרי AI.',
    details: [
      'מפגשים חודשיים מרתקים במתחם Google Campus',
      'סדנאות מעשיות (Hands-on) לשליטה בכל הפונקציות של Gemini',
      'הרצאות העשרה מעמיקות וכלים לפיתוח תוכן מקצועי לסטודנטים',
      'סביבת למידה מעוררת השראה והתנסות בטכנולוגיות המתקדמות ביותר'
    ]
  },
  {
    id: 'surprises-and-access',
    title: 'נטוורקינג והזדמנויות בלעדיות',
    subtitle: 'Networking & Community',
    badge: 'רק לשגרירים',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'חיבור בלתי אמצעי לרשת נטוורקינג יוקרתית עם מהנדסי Google, מנטורים מקצועיים וקהילת שגרירי סטודנטים מובילים מכל הארץ.',
    details: [
      'נטוורקינג ישיר עם אנשי מפתח ומהנדסי Google בישראל',
      'קהילת עמיתים חזקה של סטודנטים מובילים ויוצרי תוכן',
      'ליווי מקצועי ופידבק ממוקד על תכנים ופרויקטים אישיים',
      'הזמנות לאירועים מיוחדים והפתעות בלעדיות לאורך השנה'
    ]
  }
];

export const ELIGIBILITY_POINTS = [
  "סטודנט/ית פעיל/ה לתואר ראשון או שני באוניברסיטה או מכללה מוכרת בישראל.",
  "סקרנות ותשוקה עמוקה לעולם ה-AI, ורצון ללמוד את כל יכולות ופונקציות Gemini.",
  "רצון ויכולת ליצור תוכן איכותי המדגים כיצד Gemini מסייע לסטודנטים בלימודים ובקמפוס.",
  "נכונות למחויבות של יום אחד בחודש (ב-Google Campus) וכ-2 שעות שבועיות של השתתפות.",
  "הקלטת סרטון היכרות קצר (עד 2 דקות) המציג אתכם ואת התשוקה שלכם לתוכנית.",
  "יחסי אנוש מעולים, התלהבות לחלוק ידע ורצון לקחת חלק בקהילת שגרירים ארצית."
];

export const WHAT_SETS_YOU_APART = [
  "יכולת לתרגם יכולות טכנולוגיות מורכבות לתוכן יצירתי, בהיר ומעשי לסטודנטים.",
  "תשוקה ליצירת תוכן (פוסטים, סרטונים, הדרכות, טיפים) ברשתות חברתיות ובקמפוס.",
  "יוזמה עצמאית — רצון לחקור פיצ'רים חדשים ב-Gemini ולשתף תובנות עם אחרים.",
  "חיבור מעולה לקהילת הסטודנטים במוסד הלימודים שלך.",
  "יכולת התמדה ומחויבות ללמידה שוטפת ולמפגשי התוכנית ב-Google Campus."
];

export const PROGRAM_STEPS = [
  {
    step: '01',
    title: 'הקלטת סרטון היכרות (עד 2 דקות)',
    description: 'לפני מילוי השאלון, מקליטים סרטון קצר (עד 2 דקות) שבו מציגים את עצמכם ומסבירים מקרה שימוש (Use-case) או דרך שבה אתם נעזרים ב-Gemini ביומיום או בלימודים.'
  },
  {
    step: '02',
    title: 'הגשת שאלון המועמדות',
    description: 'מילוי השאלון המקוון וצירוף הקישור לסרטון שהקלטתם (Loom, YouTube או Google Drive), כולל הצגת המוטיבציה והחזון שלכם להובלת הקהילה ויצירת תוכן.'
  },
  {
    step: '03',
    title: 'קבלה לנבחרת וכנס פתיחה',
    description: 'בחינת המועמדויות, קבלת הודעת קבלה רשמית לנבחרת השגרירים בישראל וכנס פתיחה חגיגי (Kickoff Summit) להשקת שנת הפעילות.'
  },
  {
    step: '04',
    title: 'סדנאות, הרצאות ומפגשים ב-Google Campus',
    description: 'השתתפות במפגש מרוכז של יום אחד בחודש ב-Google Campus, סדנאות Hands-on, הרצאות מקצועיות וכ-2 שעות שבועיות של למידה ויצירת תוכן לסטודנטים.'
  },
  {
    step: '05',
    title: 'אירוע סיום והענקת תעודות הסמכה',
    description: 'טקס סיום חגיגי במשרדי Google, קבלת תעודות הסמכה רשמיות (Certificate) וצירוף לרשת בוגרי התוכנית.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'general',
    question: 'מהי בדיוק מטרת התוכנית ומה עושים כשגרירי Gemini?',
    answer: 'מטרת התוכנית היא להכשיר אתכם להפוך לשגרירי Gemini מובילים (Gemini Ambassadors). במסגרת התוכנית תלמדו להשתמש בכל הפונקציות והיכולות המתקדמות של Gemini, ותיצרו תוכן איכותי ומעשי שמדגים איך Gemini יכול לסייע לסטודנטים בלימודים, במחקר ובחיי היומיום באקדמיה.'
  },
  {
    category: 'benefits',
    question: 'מה הסטודנטים מקבלים במסגרת התוכנית?',
    answer: 'השגרירים בתוכנית נהנים ממעטפת הטבות והכשרה יוקרתית מבית Google: מנוי Google AI Plus מלא (מודל ה-Plus) בחינם, נטוורקינג (Networking) איכותי עם מהנדסי Google ומובילי תחום, סדנאות מעשיות (Hands-on Workshops), הרצאות העשרה מקצועיות (Lectures), ותעודת הסמכה רשמית (Certificate) מ-Google לפרופיל ה-LinkedIn ולקורות החיים.'
  },
  {
    category: 'time',
    question: 'מהי מידת ההשקעה והמחויבות הנדרשת בתוכנית?',
    answer: 'ההשקעה והמחויבות בתוכנית מוגדרות ונוחות לשילוב עם תואר אקדמי: יום אחד בחודש (One day a month) למפגש פיזי והכשרה מרוכזת, ובנוסף כ-2 שעות שבועיות של השתתפות, למידה ויצירת תוכן.'
  },
  {
    category: 'general',
    question: 'היכן מתקיימים המפגשים של התוכנית?',
    answer: 'המפגשים מתקיימים ישירות במתחם ה-Google Campus! זוהי הזדמנות מדהימה להגיע למרכז הפעילות והחדשנות של Google, לחוות את האווירה מקרוב, לפגוש את המנטורים ומהנדסי Google פנים אל פנים, ולהשתתף בסדנאות Hands-on בסביבה טכנולוגית מעוררת השראה.'
  },
  {
    category: 'eligibility',
    question: 'האם חובה להגיע מפילוח של מדעי המחשב או הנדסה?',
    answer: 'ממש לא! התוכנית פתוחה לכל הסטודנטים מכל הפקולטות — כולל מנהל עסקים, עיצוב, תקשורת, מדעי החברה והרוח, רפואה, משפטים ומדעים מדויקים. Gemini מסייע לסטודנטים וליוצרים מכל תחום, ואנו מחפשים שגרירים סקרנים ונלהבים שרוצים ללמוד את כל יכולות הכלי וליצור תוכן מעשי ומעניין לקמפוס שלהם.'
  },
  {
    category: 'eligibility',
    question: 'איך מתבצע תהליך המיון ומה צריך להכין מראש?',
    answer: 'תהליך המועמדות פשוט וממוקד: לפני מילוי השאלון, מקליטים סרטון קצר של עד 2 דקות שבו אתם מציגים את עצמכם ומסבירים מקרה שימוש או רעיון לשימוש ב-Gemini כסטודנטים. לאחר מכן, ממלאים את השאלון המקוון באתר ומצרפים את הקישור לסרטון (Loom, YouTube, Drive וכו\'). מועמדים מתאימים יקבלו הודעת קבלה ישירות לנבחרת השגרירים.'
  }
];
