import React, { useEffect } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Scale, Award } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy?: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onOpenPrivacy }) => {
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
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-google-heading font-black text-lg sm:text-xl text-white">
                תנאי שימוש והשתתפות בתוכנית
              </h3>
              <p className="text-xs text-gray-400 font-google-body">
                תוכנית שגרירי הסטודנטים 2026 בישראל • גרוניטק בע"מ בשיתוף Google
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

        {/* Scrollable Terms Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm leading-relaxed text-gray-300">
          {/* Section 1 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3186FF]" />
              <span>1. מבוא והגדרת הצדדים</span>
            </h4>
            <p>
              ברוכים הבאים לתוכנית שגרירי הסטודנטים של Google בישראל (2026). התוכנית מופעלת ומנוהלת בישראל על ידי <strong>גרוניטק בע"מ</strong> (להלן: "החברה" או "מנהלת התוכנית") עבור חברת Google.
            </p>
            <p className="text-xs text-gray-400">
              הגשת מועמדות לתוכנית ומילוי השאלון מהווים הסכמה מלאה ומפורשת לתנאי שימוש אלה, וכן להוראות{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPrivacy?.();
                }}
                className="text-[#3186FF] underline hover:text-[#5B9BFF] inline font-medium"
              >
                מדיניות הפרטיות
              </button>{' '}
              של התוכנית.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>2. תנאי סף וכשירות להגשת מועמדות</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
              <li>המועמדות פתוחה לסטודנטים וסטודנטיות פעילים לתואר ראשון או שני במוסד לימודים אקדמי מוכר בישראל (אוניברסיטה או מכללה).</li>
              <li>המועמד/ת מצהיר/ה כי כל הפרטים, הקישורים והמידע שנמסרו בשאלון הינם אמיתיים, מלאים ומדויקים.</li>
              <li>מסירת פרטים כוזבים או מטעים תביא לפסילה מיידית של המועמדות.</li>
              <li>הקבלה לתוכנית הינה אישית, על בסיס הליך מיון תחרותי, ונתונה לשיקול דעתה הבלעדי של מנהלת התוכנית.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>3. אחסון המידע במערכות גרוניטק ומדיניות מחיקה תוך 60 יום</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>אחסון בסביבות מנוהלות:</strong> כל המידע הנמסר על ידכם נשמר ומעובד באופן מאובטח במערכות המידע המנוהלות של <strong>גרוניטק בע"מ</strong> (לרבות מסד נתונים מאובטח ומערכת CRM ארגונית מוגנת ב-MFA), ואינו מועבר לצדדים שלישיים לצרכים מסחריים.
              </p>
              <p className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 font-medium">
                ⏱️ <strong>מחיקת נתונים למועמדים שלא התקבלו:</strong> לשמירה מלאה על פרטיותכם ובהתאם לדין, פרטיהם וכלל הנתונים של מועמדים שלא יתקבלו לנבחרת השגרירים <strong>יימחקו ויבוערו לחלוטין ממערכות גרוניטק בתוך 60 ימים</strong> ממועד סיום הליך המיון.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>4. זכויות, הטבות והתנהלות שגרירים</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
              <li>ההטבות המוענקות במסגרת התוכנית (לרבות מנוי Gemini לסטודנטים, השתתפות בסמינרים, גישה ל-Google Campus וערכות שגריר) הינן אישיות ואינן ניתנות להעברה או למכירה.</li>
              <li>ההשתתפות בתוכנית נעשית בהתנדבות כחלק מפעילות סטודנטיאלית קהילתית, ואינה יוצרת יחסי עובד-מעביד בין השגריר לבין גרוניטק או Google.</li>
              <li>השגרירים מתחייבים לייצג את הקהילה האקדמית בכבוד, בהתאם לקוד האתיקה והנחיות הפעילות של Google.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-[#111215] p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-google-heading font-bold text-white text-base">
              5. שינויים בתוכנית וסמכות שיפוט
            </h4>
            <p className="text-xs sm:text-sm">
              מנהלת התוכנית שומרת לעצמה את הזכות לעדכן את תנאי התוכנית, לוחות הזמנים ומערך ההכשרות מעת לעת. על תנאי שימוש אלה יחולו אך ורק דיני מדינת ישראל, וסמכות השיפוט הבלעדית בכל מחלוקת נתונה לבתי המשפט המוסמכים במחוז תל אביב-יפו.
            </p>
            <p className="text-xs text-gray-400 pt-1 border-t border-white/10">
              לשאלות ובירורים: <strong>daniel@grunitech.com</strong> | גרוניטק בע"מ, ישראל.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#111215] px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">
            תאריך עדכון: נובמבר 2026
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
