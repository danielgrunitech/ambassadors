import React from 'react';
import { ELIGIBILITY_POINTS, WHAT_SETS_YOU_APART } from '../data/content';

interface EligibilityProps {
  onOpenApply: () => void;
}

export const Eligibility: React.FC<EligibilityProps> = ({ onOpenApply }) => {
  return (
    <section id="eligibility" className="py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto relative z-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden text-right p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
            האם אתם מתאימים{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #EA4335, #FBBC04, #34A853, #346BF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              לתוכנית?
            </span>
          </h2>
          <p className="text-gray-600 text-base">
            קריטריוני הסף והמאפיינים שיהפכו אתכם לשגרירים מובילים
          </p>
        </div>

        <div className="space-y-6">
          {/* Eligibility Box (Exact styling from reference) */}
          <div className="bg-[#F4F7FB] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              Eligibility Criteria (קריטריוני סף)
            </h3>
            <ul className="space-y-2.5 text-gray-700 list-disc list-inside text-[15px] leading-relaxed">
              {ELIGIBILITY_POINTS.map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Sets You Apart Box (Exact styling from reference) */}
          <div className="bg-[#E6F0FA] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              What Sets You Apart (מה יבליט אתכם)
            </h3>
            <ul className="space-y-2.5 text-gray-700 list-disc list-inside text-[15px] leading-relaxed">
              {WHAT_SETS_YOU_APART.map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-8 text-center">
          <button
            onClick={onOpenApply}
            className="bg-[#346BF1] hover:bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium transition-colors shadow-xs"
          >
            הגשת מועמדות לשגרירות 2026
          </button>
        </div>
      </div>
    </section>
  );
};
