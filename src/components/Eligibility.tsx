import React from 'react';
import { ELIGIBILITY_POINTS, WHAT_SETS_YOU_APART } from '../data/content';

interface EligibilityProps {
  onOpenApply: () => void;
}

export const Eligibility: React.FC<EligibilityProps> = ({ onOpenApply }) => {
  return (
    <section id="eligibility" className="py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto relative z-10 bg-[#111215] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden text-right p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-google-heading font-black text-3xl md:text-4xl mb-3 text-white leading-tight">
            האם אתם מתאימים{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              לתוכנית?
            </span>
          </h2>
          <p className="font-google-body text-gray-400 text-base">
            קריטריוני הסף והמאפיינים שיהפכו אתכם לשגרירים מובילים
          </p>
        </div>

        <div className="space-y-6">
          {/* Eligibility Box */}
          <div className="bg-[#16171B] rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="font-google-heading font-bold text-lg mb-4 text-white">
              Eligibility Criteria (קריטריוני סף)
            </h3>
            <ul className="font-google-body space-y-2.5 text-gray-300 list-disc list-inside text-[15px] leading-relaxed">
              {ELIGIBILITY_POINTS.map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Sets You Apart Box */}
          <div className="bg-[#131722] rounded-2xl p-6 md:p-8 border border-[#3186FF]/30">
            <h3 className="font-google-heading font-bold text-lg mb-4 text-[#3186FF]">
              What Sets You Apart (מה יבליט אתכם)
            </h3>
            <ul className="font-google-body space-y-2.5 text-gray-300 list-disc list-inside text-[15px] leading-relaxed">
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
            className="bg-[#3186FF] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-full font-google-heading font-bold text-base transition-all shadow-[0_10px_25px_rgba(49,134,255,0.3)] hover:shadow-[0_12px_30px_rgba(49,134,255,0.45)] cursor-pointer active:scale-95"
          >
            הגשת מועמדות לשגרירות 2026
          </button>
        </div>
      </div>
    </section>
  );
};
