import React from 'react';
import { ELIGIBILITY_POINTS, WHAT_SETS_YOU_APART } from '../data/content';
import { CheckCircle, Star, Sparkles, ArrowLeft } from 'lucide-react';

interface EligibilityProps {
  onOpenApply: () => void;
}

export const Eligibility: React.FC<EligibilityProps> = ({ onOpenApply }) => {
  return (
    <section id="eligibility" className="py-16 px-4 relative z-10">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-gray-100 text-right">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>תנאי קבלה ופרופיל מועמד</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            האם אתם מתאימים לתוכנית?
          </h2>
          <p className="text-gray-600 text-base">
            הדרישות המרכזיות ומה שהופך מועמד למוביל אמיתי בקהילת ה-AI של Google
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {/* Card 1: Eligibility Criteria */}
          <div className="bg-[#F4F7FB] rounded-3xl p-7 sm:p-9 border border-blue-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  קריטריוני סף (Eligibility)
                </h3>
              </div>

              <ul className="space-y-4">
                {ELIGIBILITY_POINTS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: What Sets You Apart */}
          <div className="bg-[#EAF2FD] rounded-3xl p-7 sm:p-9 border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  מה יבליט אתכם (What Sets You Apart)
                </h3>
              </div>

              <ul className="space-y-4">
                {WHAT_SETS_YOU_APART.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <div className="font-bold text-gray-900 text-base">עומדים בקריטריונים ורוצים להשפיע?</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-0.5">
              מילוי השאלון לוקח כ-7 דקות בלבד ויכול להוביל אתכם למחזור שגרירי 2026.
            </div>
          </div>
          <button
            onClick={onOpenApply}
            className="shrink-0 bg-[#1A73E8] hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>התחלת מילוי שאלון</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
