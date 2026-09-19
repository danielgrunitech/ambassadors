import React, { useState } from 'react';
import { REWARD_TIERS, SWAG_ITEMS } from '../data/content';
import { Award, Smartphone, Shirt, Headphones, Briefcase, Sparkles, ChevronLeft } from 'lucide-react';

interface RewardsSectionProps {
  onOpenApply: () => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ onOpenApply }) => {
  const [selectedTier, setSelectedTier] = useState<string>('catalyst');

  const getSwagIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-8 h-8 text-blue-600" />;
      case 'Shirt':
        return <Shirt className="w-8 h-8 text-purple-600" />;
      case 'Headphones':
        return <Headphones className="w-8 h-8 text-emerald-600" />;
      case 'Briefcase':
        return <Briefcase className="w-8 h-8 text-amber-600" />;
      case 'Award':
      default:
        return <Award className="w-8 h-8 text-indigo-600" />;
    }
  };

  return (
    <section id="rewards" className="py-16 md:py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto text-right">
        {/* Top Header: What You Earn */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-blue-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>הטבות, פרסים והכרה רשמית</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            מה אתם{' '}
            <span>
              <span className="text-[#FBBC04]">מ</span>
              <span className="text-[#34A853]">ר</span>
              <span className="text-[#EA4335]">ו</span>
              <span className="text-[#346BF1]">ו</span>
              <span className="text-[#7C4DFF]">י</span>
              <span className="text-[#FBBC04]">ח</span>
              <span className="text-[#34A853]">י</span>
              <span className="text-[#EA4335]">ם</span>
            </span>
            ؟
          </h2>
          <p className="text-lg text-gray-600">
            ההשתתפות בתוכנית מעניקה תגמול והכרה רשמית מ-Google בכל שלב של העשייה בקמפוס
          </p>
        </div>

        {/* Swag Cards Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {SWAG_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                {getSwagIcon(item.icon)}
              </div>
              <span className="text-[11px] font-bold text-[#1A73E8] bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
                {item.tag}
              </span>
              <h4 className="font-bold text-gray-900 text-sm mb-1 leading-snug">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500 leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tiered Reward Structure Table Card (Exact Style of geministudentambassador.com) */}
        <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 overflow-hidden">
          {/* Table Hero Header */}
          <div className="bg-gradient-to-r from-[#1A73E8] via-[#346BF1] to-[#7C4DFF] text-white p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
                תוכנית צבירת הנקודות והדרגות
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 tracking-tight">
                Ambassador Tiered Reward Structure
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
                צבירת נקודות לאורך השנה באמצעות סדנאות, יוזמות קהילה וקידום Gemini בקמפוס
              </p>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#346BF1] text-white text-sm">
                  <th className="py-4 px-6 font-semibold w-1/4">דרגת שגריר (Tier)</th>
                  <th className="py-4 px-4 font-semibold text-center w-1/6">יעד נקודות</th>
                  <th className="py-4 px-6 font-semibold w-1/3">תגמולים פיזיים ו-Swag</th>
                  <th className="py-4 px-6 font-semibold w-1/4">תגים והכרה דיגיטלית</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
                {REWARD_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <tr
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`cursor-pointer transition-colors ${
                        tier.isTopTier
                          ? 'bg-amber-50/70 hover:bg-amber-100/60 font-semibold'
                          : isSelected
                          ? 'bg-blue-50/80'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-5 px-6 font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: tier.color }}
                          />
                          <span>{tier.name}</span>
                          {tier.isTopTier && (
                            <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full mr-2">
                              טופ 10
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center font-bold text-blue-700">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                          {tier.points} נק'
                        </div>
                      </td>
                      <td className="py-5 px-6 text-gray-700 font-medium leading-relaxed">
                        {tier.physicalReward}
                      </td>
                      <td className="py-5 px-6 text-gray-600 leading-relaxed">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>{tier.digitalReward}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer note */}
          <div className="bg-[#E8F0FE] py-3.5 px-6 text-xs sm:text-sm text-blue-900 font-medium flex items-center justify-between border-t border-blue-100">
            <span>* תעודות רשמיות מוענקות לכל בוגרי התוכנית שישלימו את דרישות המינימום בסיום המחזור.</span>
            <button
              onClick={onOpenApply}
              className="text-[#1A73E8] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>הצטרפו לנבחרת השגרירים</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
