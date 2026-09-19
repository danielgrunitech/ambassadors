import React from 'react';
import { Sparkles, Terminal, Code2, Users, BookOpen } from 'lucide-react';

export const MissionBanner: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 relative z-10">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-gray-100 relative overflow-hidden text-right">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>החזון שלנו בישראל</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            להוביל את דור מנהיגי ה-AI הבא{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#346BF1]">
              באקדמיה הישראלית
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            מהטכניון ועד אוניברסיטת בן-גוריון, מאוניברסיטת תל אביב והאוניברסיטה העברית ועד למכללות המובילות בארץ —
            תוכנית השגרירים מחברת את הכישרונות הסטודנטיאליים המבריקים ביותר לטכנולוגיות ה-AI פורצות הדרך של Google.
            שגרירי Gemini מובילים סדנאות Hands-on, מארגנים האקתונים, מנגישים כלי בינה מלאכותית לחוקרים וסטודנטים מכל התחומים,
            ומקבלים כלים מקצועיים שיפתחו להם דלתות בתעשיית ההייטק הגלובלית.
          </p>

          {/* Impact Pillars Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Terminal className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">סדנאות AI מעשיות</h4>
              <p className="text-xs text-gray-500 leading-normal">
                העברת תכנים על Gemini API, כתיבת פרומפטים ופיתוח אפליקציות AI
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">בניית קהילות קמפוס</h4>
              <p className="text-xs text-gray-500 leading-normal">
                חיבור בין סטודנטים מכל הפקולטות ויצירת קהילת יוצרי ומפתחי בינה מלאכותית
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">האקתונים ופרויקטים</h4>
              <p className="text-xs text-gray-500 leading-normal">
                הובלת תחרויות פיתוח עם מנטורינג ישיר ממהנדסי Google ישראל
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">הנגשת AI לכולם</h4>
              <p className="text-xs text-gray-500 leading-normal">
                שימוש ב-Gemini למחקר אקדמי, כתיבה, עיצוב ולימודים רב-תחומיים
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
