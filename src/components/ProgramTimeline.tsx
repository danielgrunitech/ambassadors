import React from 'react';
import { PROGRAM_STEPS } from '../data/content';

export const ProgramTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
            שלבי התוכנית{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #EA4335, #FBBC04, #34A853, #346BF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              2026
            </span>
          </h2>
          <p className="text-gray-600 text-base">
            מהגשת השאלון ועד לקבלת הפרסים וסיום שנת הפעילות
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROGRAM_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#346BF1] font-bold text-base flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-50 text-[11px] text-gray-400 font-medium">
                שלב {idx + 1} מתוך 5
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
