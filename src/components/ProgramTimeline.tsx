import React from 'react';
import { Video, FileText, Sparkles, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import { PROGRAM_STEPS } from '../data/content';

export const ProgramTimeline: React.FC = () => {
  const stepIcons = [
    <Video className="w-5 h-5 text-[#EA4335]" />,
    <FileText className="w-5 h-5 text-[#3186FF]" />,
    <Sparkles className="w-5 h-5 text-[#FBBC04]" />,
    <GraduationCap className="w-5 h-5 text-[#34A853]" />,
    <Award className="w-5 h-5 text-[#3186FF]" />
  ];

  const stepBadges = [
    { text: 'לפני מילוי השאלון', bg: 'bg-[#1C1416] text-[#EA4335] border-red-500/30' },
    { text: 'הגשה מקוונת', bg: 'bg-[#131722] text-[#3186FF] border-[#3186FF]/30' },
    { text: 'קבלה והשקה', bg: 'bg-[#1C1914] text-amber-400 border-amber-500/30' },
    { text: 'הכשרה מעשית', bg: 'bg-[#121A15] text-[#34A853] border-emerald-500/30' },
    { text: 'הסמכה רשמית', bg: 'bg-[#131722] text-[#3186FF] border-[#3186FF]/30' }
  ];

  return (
    <section id="timeline" className="py-16 md:py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto text-right">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131722] border border-[#3186FF]/30 text-[#3186FF] text-xs font-semibold shadow-xs mb-3">
            <span>מסלול המועמדות וההכשרה</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3186FF]" />
            <span>2026</span>
          </div>

          <h2 className="font-google-heading font-black text-3xl md:text-5xl mb-4 text-white leading-tight">
            שלבי התוכנית{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              בישראל
            </span>
          </h2>
          <p className="font-google-body text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            תהליך קצר, שקוף ומובנה: מהקלטת סרטון ההיכרות ומילוי השאלון, דרך הסמינרים השבועיים ועד לקבלת תעודת ההסמכה מ-Google.
          </p>
        </div>

        {/* Video Requirement Callout Banner */}
        <div className="max-w-3xl mx-auto mb-10 bg-[#181316] border border-red-500/30 rounded-2xl p-4 sm:p-5 shadow-xl flex items-center gap-3 sm:gap-4 text-right">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0 text-[#EA4335]">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-google-heading font-bold text-sm text-white mb-0.5">
              דרישת חובה מקדימה: סרטון היכרות קצר (עד 2 דקות)
            </h4>
            <p className="font-google-body text-xs sm:text-sm text-gray-300 leading-relaxed">
              לפני מילוי שאלון המועמדות, יש להקליט סרטון קצר של עד 2 דקות שבו אתם מציגים את עצמכם ומסבירים מקרה שימוש מעשי ב-Gemini בלימודים או ביומיום. את הקישור לסרטון תתבקשו לצרף בשאלון.
            </p>
          </div>
        </div>

        {/* Steps Grid (5 steps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROGRAM_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`bg-[#111215] rounded-[1.75rem] p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${
                idx === 0
                  ? 'border-red-500/40 ring-1 ring-red-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Step Top Bar: Number + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#131722] text-[#3186FF] font-google-heading font-bold text-base flex items-center justify-center shadow-xs border border-[#3186FF]/20">
                    {step.step}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-3">
                  <span className={`text-[10px] font-google-heading font-semibold px-2.5 py-0.5 rounded-full border inline-block ${stepBadges[idx]?.bg}`}>
                    {stepBadges[idx]?.text}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-google-heading font-bold text-white text-base mb-2 leading-snug">
                  {step.title}
                </h4>

                {/* Step Description */}
                <p className="font-google-body text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer */}
              <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>שלב {idx + 1} מתוך 5</span>
                {idx < 4 && <ArrowLeft className="w-3.5 h-3.5 text-gray-500 hidden lg:block" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
