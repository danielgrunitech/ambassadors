import React from 'react';
import { Award, GraduationCap, Zap, Check, ArrowLeft } from 'lucide-react';
import { PROGRAM_BENEFITS } from '../data/content';
import { GeminiSparkle } from './GeminiLogo';

export const RewardsSection: React.FC = () => {
  const benefitConfig: Record<
    string,
    {
      icon: React.ReactNode;
      accentColor: string;
      glowGradient: string;
      hoverBorder: string;
      dotColor: string;
      checkColor: string;
      badgeText: string;
      categoryCode: string;
      isFeatured?: boolean;
    }
  > = {
    'gemini-advanced': {
      icon: <GeminiSparkle size={26} />,
      accentColor: '#4285F4',
      glowGradient: 'from-[#4285F4]/25 via-[#7C4DFF]/15 to-transparent',
      hoverBorder: 'hover:border-[#4285F4]/60 hover:shadow-[0_20px_60px_rgba(66,133,244,0.2)]',
      dotColor: 'bg-[#4285F4] shadow-[0_0_8px_#4285F4]',
      checkColor: 'text-[#4285F4]',
      badgeText: 'הטבת הדגל ✦',
      categoryCode: '01 // GOOGLE AI PLUS ACCESS',
      isFeatured: true
    },
    'certification': {
      icon: <Award className="w-6 h-6 text-[#EA4335]" />,
      accentColor: '#EA4335',
      glowGradient: 'from-[#EA4335]/25 via-[#FBBC04]/10 to-transparent',
      hoverBorder: 'hover:border-[#EA4335]/60 hover:shadow-[0_20px_60px_rgba(234,67,53,0.2)]',
      dotColor: 'bg-[#EA4335] shadow-[0_0_8px_#EA4335]',
      checkColor: 'text-[#EA4335]',
      badgeText: 'הכרה מקצועית',
      categoryCode: '02 // FORMAL CERTIFICATION'
    },
    'weekly-seminars': {
      icon: <GraduationCap className="w-6 h-6 text-[#FBBC04]" />,
      accentColor: '#FBBC04',
      glowGradient: 'from-[#FBBC04]/25 via-[#EA4335]/10 to-transparent',
      hoverBorder: 'hover:border-[#FBBC04]/60 hover:shadow-[0_20px_60px_rgba(251,188,4,0.2)]',
      dotColor: 'bg-[#FBBC04] shadow-[0_0_8px_#FBBC04]',
      checkColor: 'text-[#FBBC04]',
      badgeText: 'סדנאות והרצאות',
      categoryCode: '03 // HANDS-ON WORKSHOPS & LECTURES'
    },
    'surprises-and-access': {
      icon: <Zap className="w-6 h-6 text-[#34A853]" />,
      accentColor: '#34A853',
      glowGradient: 'from-[#34A853]/25 via-[#4285F4]/10 to-transparent',
      hoverBorder: 'hover:border-[#34A853]/60 hover:shadow-[0_20px_60px_rgba(52,168,83,0.2)]',
      dotColor: 'bg-[#34A853] shadow-[0_0_8px_#34A853]',
      checkColor: 'text-[#34A853]',
      badgeText: 'נטוורקינג וקהילה',
      categoryCode: '04 // NETWORKING & ACCESS'
    }
  };

  return (
    <section id="benefits" className="pt-12 pb-24 px-4 relative z-10 text-right">
      {/* Target anchor for backwards compatibility if linked via #rewards */}
      <div id="rewards" className="absolute -top-20" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header with Flawless BiDi Formatting & Google Sans Flex */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-200 text-xs font-google-heading font-semibold shadow-xs mb-5 backdrop-blur-md">
            <span>מה מקבלים השגרירים</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] shadow-[0_0_6px_#4285F4]" />
            <span className="text-gray-400">מחזור ישראל 2026</span>
          </div>

          <h2 className="font-google-heading font-black text-4xl sm:text-5xl md:text-6xl text-white mb-5 tracking-tight leading-[1.15]">
            <span>מה מקבלים שגרירי </span>
            <bdi dir="ltr" className="inline-block whitespace-nowrap">
              <span className="text-white">Google </span>
              <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Gemini
              </span>
              <span className="text-white">?</span>
            </bdi>
          </h2>

          <p className="font-google-body text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            שגרירי הנבחרת זוכים במעטפת למידה והכשרה יוקרתית מבית Google:
            מנוי Plus מלא, סדנאות Hands-on והרצאות עומק ב-Google Campus, נטוורקינג עם מהנדסים ומובילי תחום, ותעודת הסמכה רשמית.
          </p>
        </div>

        {/* 4 Core Benefits Grid - Redesigned Obsidian Glass Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAM_BENEFITS.map((benefit) => {
            const config = benefitConfig[benefit.id] || benefitConfig['gemini-advanced'];

            return (
              <div
                key={benefit.id}
                className={`relative bg-gradient-to-b from-[#101218]/95 via-[#0A0B10]/95 to-[#040507] rounded-[2.25rem] p-8 sm:p-10 border border-white/[0.12] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group overflow-hidden flex flex-col justify-between ${config.hoverBorder}`}
              >
                {/* Specular Top Rim Light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Iconic Google 4-Color Gradient Accent Line for Featured Card */}
                {config.isFeatured && (
                  <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] pointer-events-none shadow-[0_0_12px_rgba(66,133,244,0.5)]" />
                )}

                {/* Ambient Radial Accent Glow in Top-Right Corner */}
                <div
                  className={`absolute -top-16 -right-16 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-bl ${config.glowGradient}`}
                />

                <div className="relative z-10">
                  {/* Card Header: Emblem Icon & Google Material 3 Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Hardware Squircle Emblem with Metallic Rim */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:border-white/30 transition-all duration-300 relative shrink-0">
                      <div className={`absolute inset-0 rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${config.glowGradient}`} />
                      <div className="relative z-10">{config.icon}</div>
                    </div>

                    {/* Google Material 3 Expressive Badge Chip */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/12 backdrop-blur-md text-xs font-google-heading font-extrabold text-white/95 shadow-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                      <span>{config.badgeText}</span>
                    </div>
                  </div>

                  {/* Kicker / Category Code in Google Sans Flex */}
                  <div className="font-google-heading font-black text-[11px] tracking-widest uppercase text-white/50 mb-2">
                    {config.categoryCode}
                  </div>

                  {/* Main Title in Ultra-Bold Google Sans Flex */}
                  <h3 className="font-google-heading font-black text-2xl sm:text-3xl text-white mb-3 tracking-tight leading-snug">
                    {benefit.title}
                  </h3>

                  {/* Description in Google Sans Regular */}
                  <p className="font-google-body text-gray-300 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                    {benefit.description}
                  </p>

                  {/* High-Contrast Feature Points List with Custom Hardware Checkmarks */}
                  <div className="space-y-3.5 pt-5 border-t border-white/[0.08] mb-6">
                    {benefit.details.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3.5 group/item">
                        <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-white/40 group-hover/item:bg-white/[0.1] transition-all shadow-xs">
                          <Check className={`w-3 h-3 ${config.checkColor}`} strokeWidth={3} />
                        </div>
                        <span className="font-google-body text-sm sm:text-[15px] text-gray-200 leading-snug group-hover/item:text-white transition-colors">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Action / Link with Google-Styled Pill Button */}
                {benefit.link && (
                  <div className="pt-4 border-t border-white/[0.08] relative z-10">
                    <a
                      href={benefit.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4285F4]/20 via-[#7C4DFF]/15 to-[#3186FF]/20 hover:from-[#4285F4]/30 hover:to-[#7C4DFF]/30 border border-[#4285F4]/40 hover:border-[#4285F4]/70 text-xs sm:text-sm font-google-heading font-extrabold text-white transition-all shadow-[0_0_20px_rgba(66,133,244,0.18)] group/btn cursor-pointer active:scale-95"
                    >
                      <span>{benefit.link.text}</span>
                      <ArrowLeft className="w-4 h-4 text-[#4285F4] group-hover/btn:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Learning & Campus Focus - Redesigned Studio Ribbon */}
        <div className="mt-12 relative bg-gradient-to-b from-[#101218]/95 via-[#0A0B10]/95 to-[#040507] rounded-[2.25rem] p-8 sm:p-10 border border-white/[0.12] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-right relative z-10">
            <h4 className="font-google-heading font-black text-xl sm:text-2xl text-white tracking-tight">
              למידה מעשית, נטוורקינג ומנהיגות בקמפוס
            </h4>
            <p className="font-google-body text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-normal">
              התוכנית מיועדת לסטודנטים שרוצים להשאיר חותם: לרכוש ידע מתקדם ישירות מחוקרי ומהנדסי Google, לבנות כלים עם Gemini API, ולהוביל קהילה טכנולוגית במוסד הלימודים.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="px-4 py-2 rounded-full bg-white/[0.05] text-[#4285F4] font-google-heading font-extrabold text-xs sm:text-sm border border-[#4285F4]/30 shadow-xs">
              ללא עלות
            </div>
            <div className="px-4 py-2 rounded-full bg-white/[0.05] text-[#34A853] font-google-heading font-extrabold text-xs sm:text-sm border border-[#34A853]/30 shadow-xs">
              הסמכה רשמית
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
