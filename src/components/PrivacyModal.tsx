import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, Building, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-google-heading font-black text-lg sm:text-xl text-white">
                מדיניות פרטיות ואבטחת מידע
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
          {/* Section 1 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <Building className="w-4 h-4 text-[#3186FF]" />
              <span>1. זהות בעלת המאגר ומנהלת התוכנית</span>
            </h4>
            <p>
              תוכנית שגרירי הסטודנטים של Google בישראל (2026) מופעלת ומנוהלת בישראל על ידי <strong>גרוניטק בע"מ</strong> (להלן: "החברה" או "מנהלת התוכנית") עבור חברת Google. אנו מחויבים להגנה קפדנית על פרטיות המועמדים והשגרירים בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 (לרבות תיקון מס' 13 לחוק) ותקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017.
            </p>
            <p className="text-xs text-gray-400">
              מסירת המידע בשאלון נעשית בהסכמתכם ומרצונכם החופשי, לצורך בחינת מועמדותכם והשתתפותכם בתוכנית.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>2. סוגי המידע הנאספים ומטרות השימוש</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
              <li><strong>פרטי זיהוי והתקשרות:</strong> שם מלא, מספר נייד (לוואטסאפ), ודוא"ל.</li>
              <li><strong>פרטים אקדמיים:</strong> מוסד לימודים, שנת לימודים, וחוג/פקולטה.</li>
              <li><strong>פרופיל מקצועי ויצירתי:</strong> תחומי עניין, קישורים לרשתות מקצועיות (LinkedIn, GitHub וכו') ומענה לאתגרי AI ותוכן.</li>
              <li><strong>סרטון היכרות:</strong> קישור לסרטון פיץ' קצר שהועלה על ידכם לענן.</li>
            </ul>
            <p className="pt-2 text-xs text-gray-400 border-t border-white/10">
              <strong>מטרות השימוש:</strong> בחינת התאמת המועמדים, ניהול תהליך המיון והראיונות, הענקת מנוי AI Plus למתקבלים, והפעלת מפגשי הלמידה וההסמכה של התוכנית.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>3. היכן נשמר המידע ומי מורשה לגשת אליו?</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>קליטה זמנית:</strong> המידע נקלט באופן מוצפן ומאובטח בגיליון נתונים ייעודי תחת הסביבה הארגונית המנוהלת של גרוניטק (Google Workspace Enterprise) המוגנת באימות דו-שלבי (MFA) ויומני ביקורת.
              </p>
              <p>
                <strong>יעד ניהול סופי:</strong> המידע מועבר ומנוהל במערכת ה-CRM הארגונית המאובטחת <strong>Salesforce</strong>.
              </p>
              <p>
                <strong>בקרת גישה הדוקה:</strong> הגישה למידע מוגבלת אך ורק למספר מצומצם של אנשי צוות ייעודיים שהוסמכו לכך מראש מתוך חשבונות ארגוניים מאומתים של גרוניטק (דניאל שגיב, שיר ולנה). אין גישה לעובדים אחרים או לצדדים שלישיים בלתי מורשים.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>4. תקופת שמירת המידע ומחיקתו (Data Retention)</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>ביעור גיליון הביניים:</strong> מיד עם השלמת המיון והקליטה ב-Salesforce (פרק זמן של 3–4 שבועות מסגירת ההרשמה), כל המידע בגיליון Google Sheets יימחק ויבוער לחלוטין.
              </p>
              <p>
                <strong>מועמדים שלא התקבלו:</strong> פרטיהם יימחקו ממערכות החברה בתוך 6 חודשים מתום המיון.
              </p>
              <p>
                <strong>שגרירי הנבחרת:</strong> פרטי השגרירים יישמרו ב-Salesforce למשך שנת הפעילות 2026 לצורך הפעלת התוכנית, סמינרים והנפקת תעודות רשמיות.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base">
              5. זכויות המועמד/ת לעיון ותיקון מידע (סעיפים 13–14 לחוק)
            </h4>
            <p className="text-xs sm:text-sm">
              כל מועמד/ת זכאי/ת לעיין במידע האישי השמור אודותיו/ה, ולבקש לתקנו או למחקו אם נמצא שאינו מדויק או מעודכן. כמו כן, ניתן לחזור מהסכמה ולהסיר את המועמדות בכל עת.
            </p>
            <p className="text-xs text-gray-400 pt-1 border-t border-white/10">
              למימוש זכויות או לפניות בנושאי פרטיות: <strong>daniel@grunitech.com</strong> | גרוניטק בע"מ, ישראל.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#111215] px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">
            תאריך עדכון: אוקטובר 2026
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
