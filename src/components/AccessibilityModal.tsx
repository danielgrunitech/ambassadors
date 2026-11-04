import React, { useEffect } from 'react';
import { X, Eye, CheckCircle2, ShieldCheck, Mail, Laptop } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0B0C0E] w-full max-w-3xl rounded-[2.25rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh] text-right font-google-body text-white">
        {/* Google 4-Color Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] shrink-0" />

        {/* Modal Header */}
        <div className="bg-[#111215] px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#131722] border border-[#3186FF]/30 flex items-center justify-center text-[#3186FF] shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-google-heading font-black text-lg sm:text-xl text-white">
                הצהרת נגישות
              </h3>
              <p className="text-xs text-gray-400 font-google-body">
                תוכנית שגרירי הסטודנטים 2026 בישראל • גרוניטק בע"מ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="סגירה"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm leading-relaxed text-gray-300">
          {/* Section 1: Introduction */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3186FF]" />
              <span>1. מבוא ומחויבות לנגישות</span>
            </h4>
            <p>
              גרוניטק בע"מ ומנהלת תוכנית שגרירי Google בישראל רואות חשיבות עליונה בהנגשת שירותיהן הדיגיטליים עבור אנשים עם מוגבלות. אנו פועלים ללא הרף כדי להבטיח כי האתר יהיה נגיש, שוויוני ונוח לשימוש עבור כלל הסטודנטים והמועמדים, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנותיו.
            </p>
            <p className="text-xs text-gray-400">
              האתר מותאם לתקן הישראלי ת"י 5568 ברמת AA, המבוסס על הנחיות הנגישות הבינלאומיות של ארגון W3C (תקן WCAG 2.1).
            </p>
          </div>

          {/* Section 2: Adjustments implemented */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>2. התאמות הנגישות שבוצעו באתר</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
              <li><strong>ניווט מקלדת מלא:</strong> ניתן לנווט בכל חלקי האתר והטופס באמצעות המקלדת (מקש Tab למעבר קדימה, Shift+Tab למעבר אחורה, Enter ו-Space להפעלה, ומקש Escape לסגירת חלונות ומודלים).</li>
              <li><strong>ניגודיות חזותית:</strong> שימוש ביחסי ניגודיות צבעים מחמירים לקריאות אופטימלית בערכת הנושא הכהה (Dark Mode).</li>
              <li><strong>התאמה לקוראי מסך:</strong> האתר נבנה בתגיות סמנטיות מובנות (Semantic HTML5) ומאפייני ARIA המספקים מידע ברור לתוכנות הקראת מסך (Screen Readers).</li>
              <li><strong>הגדלת תצוגה (Zoom):</strong> תמיכה בהגדלת תצוגת הדפדפן עד 200% ללא פגיעה במבנה התוכן או בפונקציונליות הטופס.</li>
              <li><strong>טפסים נגישים:</strong> שדות טופס ההרשמה מלווים בתוויות ברורות (Labels), הודעות שגיאה מפורשות והנחיות מילוי נגישות.</li>
            </ul>
          </div>

          {/* Section 3: Third party components */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>3. שירותים ורכיבי צד שלישי</span>
            </h4>
            <p className="text-xs sm:text-sm">
              במסגרת הגשת המועמדות מתבקשים המועמדים לצרף קישור לצפייה בסרטון היכרות שהועלה על ידם לשירותי ענן חיצוניים (כגון YouTube, Google Drive או Loom). פלטפורמות אלו תומכות בכתוביות אוטומטיות ובהנגשת וידאו, אך אינן בשליטתנו הבלעדית. מועמד/ת הנתקל/ת בקושי בהגשת סרטון או מעדיף/ה חלופה נגישה מוזמן/ת לפנות אלינו ישירות.
            </p>
          </div>

          {/* Section 4: Contact and Coordinator */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>4. פניות בנושאי נגישות ורכז/ת הנגישות</span>
            </h4>
            <p className="text-xs sm:text-sm">
              למרות מאמצינו להנגיש את כלל חלקי האתר, ייתכן ויתגלו חלקים או עמודים שטרם הונגשו במלואם. אם נתקלתם בבעיית נגישות, תקלה או שיש לכם הצעה לשיפור, נשמח אם תיידעו אותנו ונעשה כל שביכולתנו לפתור את הבעיה בהקדם:
            </p>
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1 text-xs text-gray-300">
              <p>• <strong>גורם אחראי:</strong> מנהלת תוכנית שגרירי Google בישראל, גרוניטק בע"מ</p>
              <p>• <strong>כתובת:</strong> גרוניטק בע"מ, ישראל</p>
              <p>• <strong>פניות נגישות בדוא"ל:</strong> פניות יטופלו בהקדם ובהתאם לדרישות החוק.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#111215] px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">
            תאריך עדכון הצהרת הנגישות: נובמבר 2026
          </span>
          <button
            onClick={onClose}
            className="bg-[#3186FF] hover:bg-[#2563EB] text-white px-6 py-2 rounded-full font-google-heading text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
