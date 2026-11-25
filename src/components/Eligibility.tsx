import React from 'react';
import { ELIGIBILITY_POINTS, WHAT_SETS_YOU_APART } from '../data/content';

export const Eligibility: React.FC = () => {
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
            מיועד לסטודנטים לתואר ראשון משנה ב' ומעלה מכלל הפקולטות (טכנולוגיות ולא-טכנולוגיות)
          </p>
        </div>

        <div className="space-y-6">
          {/* Eligibility Box */}
          <div className="bg-[#16171B] rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="font-google-heading font-bold text-lg mb-4 text-white">
              קריטריוני סף
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
              מה שם אתכם צעד אחד קדימה?
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
      </div>
    </section>
  );
};
