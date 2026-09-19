import React from 'react';
import { Sparkles, ArrowLeft, Award, Users, Cpu, Rocket } from 'lucide-react';
import { GeminiSparkle } from './GeminiLogo';

interface HeroProps {
  onOpenApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 px-4 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-blue-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-blue-100 shadow-sm text-xs sm:text-sm font-semibold text-gray-800 mb-8 backdrop-blur-sm">
          <GeminiSparkle size={18} />
          <span>תוכנית שגרירי הסטודנטים הרשמית של Google</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="text-[#1A73E8] font-bold">מחזור ישראל 2026</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
          <span>Google Student</span>
          <br />
          <span>Ambassador </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A73E8] via-[#7C4DFF] to-[#EA4335]">
            2026 בישראל
          </span>
        </h1>

        {/* Subtitles & Narrative */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-4 max-w-3xl mx-auto leading-snug">
          הקמפוס שלך מוכן למהפכת ה-AI הבאה.
          <br className="hidden sm:inline" />
          {' '}כל מה שחסר זה מי שיוביל אותה.
        </p>

        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          להביא חדשנות למציאות. להפוך רעיונות לעשייה בשטח.
          <br />
          להכשיר את הקהילה האקדמית ולבנות את עתיד הטכנולוגיה יחד עם <span className="font-bold text-gray-900">Google</span>.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto bg-gradient-to-r from-[#1A73E8] via-[#346BF1] to-[#7C4DFF] hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span>הגש מועמדות לתוכנית עכשיו</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>

          <a
            href="#rewards"
            className="w-full sm:w-auto bg-white/90 hover:bg-white text-gray-800 border border-gray-200 px-7 py-4 rounded-full text-base font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 hover:border-blue-300"
          >
            <span>גלה את ההטבות והפרסים</span>
            <Award className="w-5 h-5 text-[#346BF1]" />
          </a>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto text-right">
          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">20+ קמפוסים</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">אוניברסיטאות ומכללות ברחבי ישראל</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">Gemini 2.0</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">התנסות בלעדית במודלים וב-APIs מתקדמים</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">מנטורינג Google</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">חיבור ישיר למומחי Google R&D בישראל</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">Swag & Pixel</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">ציוד יוקרתי, מכשירי Pixel 10a ותעודות</div>
          </div>
        </div>
      </div>
    </section>
  );
};
