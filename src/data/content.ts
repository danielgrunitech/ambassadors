import { Persona, RewardTier, SwagItem, FaqItem } from '../types';

export const ISRAELI_INSTITUTIONS = [
  "הטכניון - מכון טכנולוגי לישראל",
  "אוניברסיטת תל אביב",
  "האוניברסיטה העברית בירושלים",
  "אוניברסיטת בן-גוריון בנגב",
  "אוניברסיטת בר-אילן",
  "אוניברסיטת רייכמן",
  "אוניברסיטת חיפה",
  "אוניברסיטת אריאל בשומרון",
  "האוניברסיטה הפתוחה",
  "המכון הטכנולוגי חולון (HIT)",
  "המכללה האקדמית תל אביב-יפו",
  "מכללת אפקה להנדסה",
  "שנקר - הנדסה. עיצוב. אמנות",
  "עזריאלי - מכללה אקדמית להנדסה ירושלים",
  "המסלול האקדמי המכללה למינהל",
  "המרכז האקדמי רופין",
  "המכללה האקדמית ספיר",
  "המכללה האקדמית להנדסה בראודה",
  "מוסד אקדמי אחר..."
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
      'חוקרים ומתנסים בכלים ובמודלים חדשים לפני כולם',
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

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'explorer',
    name: 'The Explorer (ארד)',
    level: 'ברונזה',
    points: 600,
    physicalReward: 'שובר מתנה + ערכת מחברת ועט פרימיום ממותגים של Google Gemini',
    digitalReward: 'תג דיגיטלי רשמי (Digital Badge) לפרופיל ה-LinkedIn',
    color: '#CD7F32'
  },
  {
    id: 'navigator',
    name: 'The Navigator (כסף)',
    level: 'כסף',
    points: 1200,
    physicalReward: 'שובר מתנה + תיק צד מעוצב (Sling Bag) של Google Gemini',
    digitalReward: 'תג דיגיטלי כסף + גישה מוקדמת לסדנאות AI פנימיות',
    color: '#9E9E9E'
  },
  {
    id: 'architect',
    name: 'The Architect (זהב)',
    level: 'זהב',
    points: 1800,
    physicalReward: 'שובר מתנה + בקבוק תרמי פרימיום Matt Black ממותג Google AI',
    digitalReward: 'תג דיגיטלי זהב + תעודת הערכה והצטיינות מ-Google',
    color: '#FFB300'
  },
  {
    id: 'visionary',
    name: 'The Visionary (ספיר)',
    level: 'ספיר',
    points: 2600,
    physicalReward: 'ג\'קט נבחרת יוקרתי (Varsity Jacket) של שגרירי Google Gemini',
    digitalReward: 'תג דיגיטלי ספיר + סשן מנטורינג אישי עם מהנדס/ת Google',
    color: '#1E88E5'
  },
  {
    id: 'titan',
    name: 'The Titan (פלטינה)',
    level: 'פלטינה',
    points: 3400,
    physicalReward: 'תיק גב יוקרתי למחשב (Laptop Bag) ממותג Google + מארז VIP',
    digitalReward: 'תג דיגיטלי טיטאן + הזמנה לאירוע חדשנות שנתי במשרדי Google ת"א',
    color: '#7B1FA2'
  },
  {
    id: 'catalyst',
    name: 'The Catalyst (טופ 10 שגרירים ארצי)',
    level: 'טופ ארצי',
    points: 4200,
    physicalReward: 'מכשיר Google Pixel חדש + אוזניות Pixel Buds Pro + חבילת מתנות על',
    digitalReward: 'Ambassador Spotlight בינלאומי בערוצי Google + המלצה מקצועית',
    color: '#E91E63',
    isTopTier: true
  }
];

export const SWAG_ITEMS: SwagItem[] = [
  {
    name: 'Google Pixel Smartphone',
    category: 'טכנולוגיית קצה',
    tag: 'פרס הטופ 10',
    description: 'מכשיר הדגל של Google עם יכולות Gemini AI מובנות בחומרה',
    icon: 'Smartphone',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'ג\'קט נבחרת Google Gemini',
    category: 'מרצ\'נדייז בלעדי',
    tag: 'דרגת ספיר ומעלה',
    description: 'Varsity Jacket איכותי ומעוצב לצוות שגרירי ה-AI המובילים',
    icon: 'Shirt',
    color: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Google Pixel Buds Pro',
    category: 'סאונד מתקדם',
    tag: 'פרס מיוחד',
    description: 'אוזניות אלחוטיות מתקדמות עם סינון רעשים אקטיבי ותרגום בזמן אמת',
    icon: 'Headphones',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    name: 'תיק גב למחשב פרימיום',
    category: 'ציוד שגרירים',
    tag: 'דרגת טיטאן',
    description: 'תיק עמיד ומרופד לנשיאת מחשב וציוד טכנולוגי בעיצוב נקי',
    icon: 'Briefcase',
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'תעודה רשמית מ-Google',
    category: 'הכרה מקצועית',
    tag: 'לכל הבוגרים',
    description: 'Certificate of Recognition רשמי חתום ע"י מנהלי קהילות Google AI',
    icon: 'Award',
    color: 'from-blue-600 to-cyan-500'
  }
];

export const ELIGIBILITY_POINTS = [
  "סטודנט/ית פעיל/ה לתואר ראשון או שני באוניברסיטה או מכללה מוכרת בישראל (שנת סיום 2026 ואילך).",
  "סקרנות ותשוקה עמוקה לעולם ה-AI, ושימוש יומיומי או שבועי ב-Gemini.",
  "רצון ונכונות להוביל יוזמות, סדנאות, הרצאות או האקתונים לסטודנטים בקמפוס שלכם.",
  "נוכחות פעילה ברשתות חברתיות או מקצועיות (LinkedIn, GitHub, Instagram, קבוצות לימוד).",
  "נכונות להקדיש בממוצע 3-5 שעות שבועיות לפעילות השגרירות, מפגשי הכשרה וקהילה.",
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
    title: 'הגשת מועמדות מקוונת',
    description: 'מילוי השאלון האינטראקטיבי, הצגת המוטיבציה, החוזקות והחזון שלכם לפעילות ה-AI בקמפוס.'
  },
  {
    step: '02',
    title: 'ראיון התאמה והיכרות',
    description: 'שיחה קצרה ונעימה עם צוות התוכנית של Google לבחינת ההתאמה ותיאום הציפיות.'
  },
  {
    step: '03',
    title: 'כנס הפתיחה (Kickoff Summit)',
    description: 'מפגש חגיגי (אונליין ופיזי) עם נבחרת השגרירים בישראל, קבלת ערכת שגריר והדרכות מקצועיות.'
  },
  {
    step: '04',
    title: 'הובלת פעילות ואיסוף נקודות',
    description: 'העברת סדנאות Gemini, סיוע לסטודנטים, הפקת אירועים וצבירת נקודות במדרגות ההטבות.'
  },
  {
    step: '05',
    title: 'אירוע סיום והענקת פרסים',
    description: 'טקס סיום חגיגי במשרדי Google, קבלת תעודות רשמיות וחלוקת פרסי ה-Catalyst המובילים.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'general',
    question: 'מהי בדיוק תוכנית Google Gemini Student Ambassador?',
    answer: 'זוהי תוכנית מנהיגות סטודנטיאלית יוקרתית שמובילה Google במטרה להכשיר את דור מנהיגי ה-AI הבא באקדמיה. השגרירים מייצגים את Gemini בקמפוס שלהם, זוכים להכשרות עומק Hands-on ישירות ממהנדסי Google, מנהלים פעילויות קהילתיות, ומקבלים מנטורינג ופרסים מיוחדים.'
  },
  {
    category: 'eligibility',
    question: 'האם חובה להגיע מפילוח של מדעי המחשב או הנדסה?',
    answer: 'ממש לא! התוכנית פתוחה לכל הסטודנטים מכל הפקולטות — כולל עיצוב, מנהל עסקים, רפואה, מדעי החברה, תקשורת ומשפטים. Gemini משרת יוצרים, חוקרים ואנשי מקצוע מכל התחומים, ואנו מחפשים שגרירים שמביאים זוויות מגוונות.'
  },
  {
    category: 'time',
    question: 'כמה שעות שבועיות דורשת התוכנית?',
    answer: 'ההתחייבות היא גמישה ומותאמת ללוח המבחנים של הסטודנטים — כ-3 עד 5 שעות בשבוע בממוצע. אתם קובעים את קצב הפעילות שלכם ואת מועדי הסדנאות שתרצו להרים.'
  },
  {
    category: 'benefits',
    question: 'אילו הטבות והזדמנויות מקבלים השגרירים?',
    answer: 'השגרירים מקבלים ערכות Swag מקוריות ובלעדיות של Google Gemini, תגים דיגיטליים מאומתים ל-LinkedIn, תעודת הצטיינות רשמית מ-Google, גישה מוקדמת (Beta Access) לחידושים האחרונים של Gemini, מנטורינג ממהנדסים ופרסים מובילים כולל מכשירי Google Pixel למובילי הנבחרת.'
  },
  {
    category: 'general',
    question: 'כיצד מנוהל תהליך צבירת הנקודות בדרגות?',
    answer: 'על כל פעילות (העברת סדנה בקמפוס, כתיבת פוסט מקצועי על מקרה בוחן ב-Gemini, עזרה לסטודנטים להשתמש ב-AI בלמידה) תצברו נקודות שמעלות אתכם בדרגות (The Explorer, Navigator, Architect, Visionary, Titan, Catalyst) ופותחות מתנות יקרות ערך.'
  },
  {
    category: 'eligibility',
    question: 'מתי נסגרת הגשת המועמדות ואיך מתבצע המיון?',
    answer: 'הגשת המועמדות נבחנת במתכונת Rolling Admissions (כל הקודם זוכה). אנו ממליצים להגיש בהקדם. מועמדים מתאימים יקבלו זימון לשיחת היכרות קצרה תוך מספר ימים לאחר הגשת השאלון.'
  }
];
