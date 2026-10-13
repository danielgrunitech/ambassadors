import React from 'react';
import { Video, FileText, Sparkles, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import { PROGRAM_STEPS } from '../data/content';

export const ProgramTimeline: React.FC = () => {
  const stepConfigs = [
    {
      // Step 1: Google Red / Coral (Video requirement)
      accent: '#EA4335',
      bgGradient: 'bg-gradient-to-b from-[#221316] via-[#170C0E] to-[#0D0708]',
      border: 'border-red-500/40 hover:border-red-500/70',
      shadow: 'hover:shadow-[0_20px_50px_rgba(234,67,53,0.22)]',
      glow: 'from-red-500/25 to-transparent',
      topRim: 'via-red-400/40',
      badge: 'לפני מילוי השאלון',
      badgeBg: 'bg-red-500/15 text-red-200 border-red-500/35',
      dotColor: 'bg-[#EA4335] shadow-[0_0_8px_#EA4335]',
      numBg: 'bg-red-500/20 text-[#EA4335] border-red-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
      iconContainer: 'bg-red-500/15 border-red-500/30 text-[#EA4335]',
      icon: <Video className="w-5 h-5 text-[#EA4335]" />,
      footerText: 'text-red-300/80'
    },
    {
      // Step 2: Google Blue (Online Application)
      accent: '#4285F4',
      bgGradient: 'bg-gradient-to-b from-[#111B30] via-[#0C1322] to-[#070B14]',
      border: 'border-blue-500/40 hover:border-blue-500/70',
      shadow: 'hover:shadow-[0_20px_50px_rgba(66,133,244,0.22)]',
      glow: 'from-blue-500/25 to-transparent',
      topRim: 'via-blue-400/40',
      badge: 'הגשה מקוונת',
      badgeBg: 'bg-blue-500/15 text-blue-200 border-blue-500/35',
      dotColor: 'bg-[#4285F4] shadow-[0_0_8px_#4285F4]',
      numBg: 'bg-blue-500/20 text-[#4285F4] border-blue-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
      iconContainer: 'bg-blue-500/15 border-blue-500/30 text-[#4285F4]',
      icon: <FileText className="w-5 h-5 text-[#4285F4]" />,
      footerText: 'text-blue-300/80'
    },
    {
      // Step 3: Google Yellow / Amber (Kickoff & Celebration)
      accent: '#FBBC04',
      bgGradient: 'bg-gradient-to-b from-[#251D10] via-[#1A140A] to-[#0F0B05]',
      border: 'border-amber-500/40 hover:border-amber-500/70',
      shadow: 'hover:shadow-[0_20px_50px_rgba(251,188,4,0.22)]',
      glow: 'from-amber-500/25 to-transparent',
      topRim: 'via-amber-400/40',
      badge: 'קבלה והשקה',
      badgeBg: 'bg-amber-500/15 text-amber-200 border-amber-500/35',
      dotColor: 'bg-[#FBBC04] shadow-[0_0_8px_#FBBC04]',
      numBg: 'bg-amber-500/20 text-[#FBBC04] border-amber-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
      iconContainer: 'bg-amber-500/15 border-amber-500/30 text-[#FBBC04]',
      icon: <Sparkles className="w-5 h-5 text-[#FBBC04]" />,
      footerText: 'text-amber-300/80'
    },
    {
      // Step 4: Google Green (Hands-on Seminars & Campus Growth)
      accent: '#34A853',
      bgGradient: 'bg-gradient-to-b from-[#102417] via-[#0B1A10] to-[#060F09]',
      border: 'border-emerald-500/40 hover:border-emerald-500/70',
      shadow: 'hover:shadow-[0_20px_50px_rgba(52,168,83,0.22)]',
      glow: 'from-emerald-500/25 to-transparent',
      topRim: 'via-emerald-400/40',
      badge: 'הכשרה מעשית',
      badgeBg: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/35',
      dotColor: 'bg-[#34A853] shadow-[0_0_8px_#34A853]',
      numBg: 'bg-emerald-500/20 text-[#34A853] border-emerald-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
      iconContainer: 'bg-emerald-500/15 border-emerald-500/30 text-[#34A853]',
      icon: <GraduationCap className="w-5 h-5 text-[#34A853]" />,
      footerText: 'text-emerald-300/80'
    },
    {
      // Step 5: Gemini Purple / Iris (Graduation & Formal Certification)
      accent: '#7C4DFF',
      bgGradient: 'bg-gradient-to-b from-[#201335] via-[#160D25] to-[#0C0615]',
      border: 'border-purple-500/40 hover:border-purple-500/70',
      shadow: 'hover:shadow-[0_20px_50px_rgba(124,77,255,0.22)]',
      glow: 'from-purple-500/25 to-transparent',
      topRim: 'via-purple-400/40',
      badge: 'הסמכה רשמית',
      badgeBg: 'bg-purple-500/15 text-purple-200 border-purple-500/35',
      dotColor: 'bg-[#7C4DFF] shadow-[0_0_8px_#7C4DFF]',
      numBg: 'bg-purple-500/20 text-[#A78BFA] border-purple-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
      iconContainer: 'bg-purple-500/15 border-purple-500/30 text-[#A78BFA]',
      icon: <Award className="w-5 h-5 text-[#A78BFA]" />,
      footerText: 'text-purple-300/80'
    }
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
            תהליך קצר, שקוף ומובנה: מהקלטת סרטון ההיכרות ומילוי השאלון, דרך הסמינרים השבועיים ועד לקבלת תעודת ההסמכה מ-Google.
          </p>
        </div>

        {/* Video Requirement Callout Banner - Sleek Crimson Glass Ribbon */}
        <div className="max-w-3xl mx-auto mb-12 relative bg-gradient-to-r from-[#2B1418] via-[#1E0F12] to-[#140A0C] border border-red-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(234,67,53,0.18)] flex items-start sm:items-center gap-4 text-right overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 text-[#EA4335] shadow-[0_0_15px_rgba(234,67,53,0.3)] group-hover:scale-105 transition-transform">
            <Video className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-200 text-[10px] font-google-heading font-extrabold uppercase tracking-wide mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span>דרישת חובה מקדימה</span>
            </div>
            <h4 className="font-google-heading font-black text-base sm:text-lg text-white mb-1 tracking-tight">
              הקלטת סרטון היכרות קצר (עד 2 דקות)
            </h4>
            <p className="font-google-body text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              לפני מילוי שאלון המועמדות, יש להקליט סרטון קצר של עד 2 דקות שבו אתם מציגים את עצמכם ומסבירים מקרה שימוש מעשי ב-Gemini בלימודים או ביומיום. את הקישור לסרטון תתבקשו לצרף בשאלון.
            </p>
          </div>
        </div>

        {/* 5 Distinct Colored Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROGRAM_STEPS.map((step, idx) => {
            const config = stepConfigs[idx] || stepConfigs[0];

            return (
              <div
                key={idx}
                className={`relative ${config.bgGradient} rounded-[2rem] p-6 sm:p-7 shadow-xl border ${config.border} transition-all duration-300 ${config.shadow} hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group`}
              >
                {/* Specular Top Rim Light */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${config.topRim} to-transparent pointer-events-none`} />

                {/* Ambient Radial Accent Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500 bg-gradient-to-bl ${config.glow}`}
                />

                <div className="relative z-10">
                  {/* Step Top Bar: Hardware Squircle Number + Matching Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-2xl ${config.numBg} font-google-heading font-black text-base flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform`}>
                      {step.step}
                    </div>
                    <div className={`w-10 h-10 rounded-2xl ${config.iconContainer} border flex items-center justify-center shadow-xs backdrop-blur-md`}>
                      {config.icon}
                    </div>
                  </div>

                  {/* Google Material 3 Badge Chip */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-google-heading font-extrabold px-3 py-0.5 rounded-full border ${config.badgeBg} shadow-xs`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                      <span>{config.badge}</span>
                    </span>
                  </div>

                  {/* Step Title in Google Sans Flex */}
                  <h4 className="font-google-heading font-black text-white text-base sm:text-[17px] mb-2 leading-snug tracking-tight">
                    {step.title}
                  </h4>

                  {/* Step Description in Google Sans Regular */}
                  <p className="font-google-body text-xs sm:text-[13px] text-gray-200 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer */}
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-google-heading font-bold relative z-10">
                  <span className={config.footerText}>שלב {idx + 1} מתוך 5</span>
                  {idx < 4 && (
                    <ArrowLeft className="w-3.5 h-3.5 opacity-60 text-white/50 group-hover:text-white group-hover:-translate-x-1 transition-all hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
