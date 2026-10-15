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
    description: 'שגרירי התוכנית מקבלים מנוי Google AI Plus מלא ללא תשלום, המעניק גישה מורחבת לכל יכולות Gemini, אינטגרציה מעמיקה עם סביבת העבודה ושימוש בכלים מתקדמים.',
    details: [
      'מנוי Google AI Plus מלא ללא עלות לאורך שנת הפעילות',
      'יכולות עיבוד מתקדמות וחלון הקשר רחב לניתוח מאמרים, מסמכים ומחקר',
      'אינטגרציה חלקה עם Google Workspace (Docs, Sheets, Drive)',
      'יצירת Gems מותאמים אישית ללמידה ולפרויקטים'
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
    description: 'תעודת הסמכה והערכה רשמית מבית Google המעידה על מנהיגות טכנולוגית, הובלת קהילה ומומחיות ביישומי AI.',
    details: [
      'תעודת סיום רשמית ויוקרתית (Certificate of Recognition)',
      'Digital Badge מאומת לפרופיל ה-LinkedIn שלכם',
      'תוספת משמעותית ומבדלת לקורות החיים להשתלבות בהייטק'
    ]
  },
  {
    id: 'weekly-seminars',
    title: 'סמינרים והכשרות שבועיות',
    subtitle: 'Weekly Learning Seminars',
    badge: 'העשרת עומק',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'מפגשי למידה שבועיים בלעדיים בהנחיית מהנדסי AI, מנהלי מוצר וחוקרים ממרכז הפיתוח של Google ישראל והעולם.',
    details: [
      'סדנאות Hands-on מתקדמות ב-Prompt Engineering',
      'היכרות מעמיקה עם סוכני AI ופיתוח אפליקציות מעשיות',
      'חיבור ל-Google AI Studio ושימוש ב-Gemini API',
      'מפגשי שאלות-תשובות פתוחים וייעוץ מקצועי לפרויקטים אישיים'
    ]
  },
  {
    id: 'surprises-and-access',
    title: 'הפתעות והזדמנויות בלעדיות',
    subtitle: 'Exclusive Access & Surprises',
    badge: 'רק לשגרירים',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'דלת פתוחה לאירועים מיוחדים, גישה מוקדמת לחידושים טכנולוגיים לפני שהם נפתחים לקהל הרחב, והפתעות שונות לאורך השנה.',
    details: [
      "הזמנות לאירועים וכנסי חדשנות סגורים ב-Google Campus",
      "גישה מוקדמת (Beta / Early Access) לפיצ'רים חדשים ב-Gemini",
      "חיבור ונטוורקינג ישיר עם קהילת השגרירים ומפתחי Google בישראל",
      "הפתעות מיוחדות ומשאבי למידה בלעדיים לאורך שנת הפעילות"
    ]
  }
];

export const ELIGIBILITY_POINTS = [
  "סטודנט/ית פעיל/ה לתואר ראשון או שני באוניברסיטה או מכללה מוכרת בישראל.",
  "סקרנות ותשוקה עמוקה לעולם ה-AI, ושימוש קבוע ב-Gemini בלימודים או ביומיום.",
  "הקלטת סרטון היכרות קצר (עד 2 דקות) המציג אתכם ואת אופן השימוש שלכם ב-Gemini לפני הגשת השאלון.",
  "רצון ונכונות להוביל יוזמות, סדנאות, הרצאות או מפגשי למידה לסטודנטים בקמפוס שלכם.",
  "נוכחות פעילה ברשתות חברתיות או מקצועיות (LinkedIn, קבוצות סטודנטים, GitHub).",
  "יחסי אנוש מעולים, יכולת הנעה והתלהבות לחלוק ידע עם אחרים."
];

export const WHAT_SETS_YOU_APART = [
  "יכולת להסביר רעיונות טכנולוגיים מורכבים במילים פשוטות ונגישות.",
  "ביטחון ורצון לעמוד מול קהל ולהדריך עמיתים בלימודים.",
  "חשיבה מקורית: יצירת תכנים, סרטונים, דוגמאות או הדגמות חיות.",
  "חיבור חזק לקהילת הסטודנטים בקמפוס שלך (אגודות סטודנטים, מועדוני יזמות, קבוצות מחקר).",
  "יוזמה עצמאית — אתם אלו שדוחפים דברים קדימה ולא מחכים להוראות."
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
    description: 'מילוי השאלון המקוון וצירוף הקישור לסרטון שהקלטתם (Loom, YouTube או Google Drive), כולל הצגת המוטיבציה והחזון שלכם להובלת הקהילה.'
  },
  {
    step: '03',
    title: 'קבלה לנבחרת וכנס פתיחה',
    description: 'בחינת המועמדויות, קבלת הודעת קבלה רשמית לנבחרת השגרירים בישראל וכנס פתיחה חגיגי (Kickoff Summit) להשקת שנת הפעילות.'
  },
  {
    step: '04',
    title: 'סמינרים שבועיים ופעילות בקמפוס',
    description: 'השתתפות בסמינרי עומק שבועיים בהנחיית מומחי ומהנדסי Google, העברת סדנאות Gemini והובלת קהילת ה-AI במוסד הלימודים.'
  },
  {
    step: '05',
    title: 'אירוע סיום והענקת תעודות הסמכה',
    description: 'טקס סיום חגיגי במשרדי Google, קבלת תעודות הסמכה רשמיות וצירוף לרשת בוגרי התוכנית.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'general',
    question: 'מהי בדיוק תוכנית Google Gemini Student Ambassador בישראל?',
    answer: 'זוהי תוכנית מנהיגות סטודנטיאלית יוקרתית שמובילה Google במטרה להכשיר את דור מנהיגי ה-AI הבא באקדמיה הישראלית. השגרירים מייצגים את Gemini בקמפוס שלהם, זוכים להכשרות עומק Hands-on שבועיות ישירות ממהנדסי Google, מנהלים פעילויות קהילתיות, ומקבלים מנוי AI Plus חינם ותעודת הסמכה רשמית.'
  },
  {
    category: 'benefits',
    question: 'מה מקבלים השגרירים במסגרת התוכנית?',
    answer: 'השגרירים בישראל זוכים למנוי Google AI Plus בחינם, תעודת שגריר רשמית מ-Google (Formal Certification) לפרופיל ה-LinkedIn ולקורות החיים, סמינרים והכשרות מקצועיות שבועיות עם מהנדסי וחוקרי AI, והפתעות והזדמנויות בלעדיות לאורך השנה.'
  },
  {
    category: 'eligibility',
    question: 'האם חובה להגיע מפילוח של מדעי המחשב או הנדסה?',
    answer: 'ממש לא! התוכנית פתוחה לכל הסטודנטים מכל הפקולטות — כולל עיצוב, מנהל עסקים, רפואה, מדעי החברה, תקשורת ומשפטים. Gemini משרת יוצרים, חוקרים ואנשי מקצוע מכל התחומים, ואנו מחפשים שגרירים שמביאים זוויות מגוונות.'
  },
  {
    category: 'time',
    question: 'מהי מידת ההשקעה והמחויבות הנדרשת בתוכנית?',
    answer: 'ההתחייבות היא גמישה ומותאמת לעומס האקדמי וללוח הבחינות של הסטודנטים. הפעילות כוללת השתתפות בסמינרים השבועיים והובלת פעילויות או סדנאות בקמפוס בקצב שמתאים לכם.'
  },
  {
    category: 'general',
    question: 'כיצד מתקיימים הסמינרים השבועיים?',
    answer: 'הסמינרים השבועיים מתקיימים במתכונת היברידית — מפגשים חיים אונליין עם מומחי ומהנדסי Google, לצד מפגשים וסדנאות פיזיות במרכז הפיתוח של Google. כל הסמינרים מלווים בהתנסות מעשית (Hands-on) ובחומרי לימוד ייחודיים.'
  },
  {
    category: 'eligibility',
    question: 'איך מתבצע תהליך המיון ומה צריך להכין מראש?',
    answer: 'תהליך המועמדות פשוט וממוקד: לפני מילוי השאלון, מקליטים סרטון קצר של עד 2 דקות שבו אתם מציגים את עצמכם ומסבירים מקרה שימוש (Use-case) או דרך שבה אתם נעזרים ב-Gemini בשגרה. לאחר מכן, ממלאים את השאלון המקוון ומצרפים את הקישור לסרטון. מועמדים מתאימים יקבלו הודעת קבלה ישירות לנבחרת השגרירים.'
  }
];
