import React from 'react';
import { PROGRAM_STEPS } from '../data/content';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ProgramTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-16 md:py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>המסלול שלכם</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            שלבי התוכנית — מהגשה ועד סיום
          </h2>
          <p className="text-gray-600 text-base">
            איך נראית שנת הפעילות כשגריר/ת סטודנטים של Google Gemini בישראל
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-5 gap-4 relative">
          {PROGRAM_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1A73E8] to-[#7C4DFF] text-white flex items-center justify-center font-extrabold text-lg mb-5 shadow-sm group-hover:scale-105 transition-transform">
                  {step.step}
                </div>
                <h4 className="font-extrabold text-gray-900 text-base mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center gap-1.5 text-blue-600 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>שלב {idx + 1} מתוך 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
