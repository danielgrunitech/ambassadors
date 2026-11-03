import React from 'react';
import { Video, FileText, Sparkles, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import { PROGRAM_STEPS } from '../data/content';

export const ProgramTimeline: React.FC = () => {
  const stepBadges = [
    'לפני מילוי השאלון',
    'הגשה מקוונת',
    'קבלה והשקה',
    'הכשרה מעשית',
    'הסמכה רשמית'
  ];

  const stepIcons = [
    <Video className="w-5 h-5 text-white" />,
    <FileText className="w-5 h-5 text-white" />,
    <Sparkles className="w-5 h-5 text-white" />,
    <GraduationCap className="w-5 h-5 text-white" />,
    <Award className="w-5 h-5 text-white" />
  ];

  return (
    <section id="timeline" className="py-16 md:py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto text-right">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-200 text-xs font-google-heading font-semibold shadow-xs mb-4 backdrop-blur-md">
            <span>מסלול המועמדות וההכשרה</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] shadow-[0_0_6px_#4285F4]" />
            <span className="text-gray-400">2026</span>
          </div>

          <h2 className="font-google-heading font-black text-4xl sm:text-5xl md:text-6xl mb-4 text-white tracking-tight leading-[1.15]">
            שלבי התוכנית{' '}
            <span className="text-google-quad">
              בישראל
            </span>
          </h2>
          <p className="font-google-body text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            תהליך קצר, שקוף ומובנה: מהקלטת סרטון ההיכרות ומילוי השאלון, דרך מפגשי יום בחודש ב-Google Campus, סדנאות מעשיות והרצאות, ועד לקבלת תעודת ההסמכה מ-Google.
          </p>
        </div>

        {/* Video Requirement Callout Banner - Black Box Aesthetic */}
        <div className="max-w-3xl mx-auto mb-12 bg-[#16171B] border border-white/10 hover:border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl flex items-start sm:items-center gap-4 text-right transition-all group overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
            <Video className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-gray-200 text-[10px] font-google-heading font-extrabold uppercase tracking-wide mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>דרישת חובה מקדימה</span>
            </div>
            <h4 className="font-google-heading font-black text-base sm:text-lg text-white mb-1 tracking-tight">
              הקלטת סרטון היכרות קצר (עד 2 דקות)
            </h4>
            <p className="font-google-body text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              לפני מילוי שאלון המועמדות, יש להקליט סרטון קצר של עד 2 דקות שבו אתם מציגים את עצמכם ומסבירים מקרה שימוש מעשי ב-Gemini בלימודים או ביומיום. את הקישור לסרטון תתבקשו לצרף בשאלון.
            </p>
          </div>
        </div>

        {/* 5 Steps Grid - Consistent Black Box Aesthetic with White Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROGRAM_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#16171B] rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Step Top Bar: Squircle Number + Matching Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.08] text-white font-google-heading font-black text-base flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:border-white/20 transition-all">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/90 shadow-xs">
                    {stepIcons[idx]}
                  </div>
                </div>

                {/* Badge Chip */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-google-heading font-bold px-3 py-0.5 rounded-full bg-white/[0.06] text-gray-200 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <span>{stepBadges[idx]}</span>
                  </span>
                </div>

                {/* Step Title in White */}
                <h4 className="font-google-heading font-black text-white text-base sm:text-[17px] mb-2 leading-snug tracking-tight">
                  {step.title}
                </h4>

                {/* Step Description in Light Gray */}
                <p className="font-google-body text-xs sm:text-[13px] text-gray-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Step Footer */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-google-heading font-bold text-gray-400">
                <span>שלב {idx + 1} מתוך 5</span>
                {idx < 4 && (
                  <ArrowLeft className="w-3.5 h-3.5 opacity-60 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all hidden lg:block" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
