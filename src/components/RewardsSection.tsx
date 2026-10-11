import React from 'react';
import { Sparkles, Award, GraduationCap, Zap, CheckCircle2, ExternalLink } from 'lucide-react';
import { PROGRAM_BENEFITS } from '../data/content';

export const RewardsSection: React.FC = () => {
  const benefitIcons: Record<string, React.ReactNode> = {
    'gemini-advanced': <Sparkles className="w-6 h-6 text-[#3186FF]" />,
    'certification': <Award className="w-6 h-6 text-[#EA4335]" />,
    'weekly-seminars': <GraduationCap className="w-6 h-6 text-[#FBBC04]" />,
    'surprises-and-access': <Zap className="w-6 h-6 text-[#34A853]" />
  };

  const benefitColorClasses: Record<
    string,
    { border: string; iconBg: string; badgeBg: string; pillBg: string }
  > = {
    'gemini-advanced': {
      border: 'hover:border-[#3186FF]/50',
      iconBg: 'bg-[#3186FF]/15 text-[#3186FF]',
      badgeBg: 'bg-[#131722] text-[#3186FF] border-[#3186FF]/30',
      pillBg: 'bg-[#3186FF]'
    },
    'certification': {
      border: 'hover:border-[#EA4335]/50',
      iconBg: 'bg-[#EA4335]/15 text-[#EA4335]',
      badgeBg: 'bg-[#1D1416] text-[#EA4335] border-red-500/30',
      pillBg: 'bg-[#EA4335]'
    },
    'weekly-seminars': {
      border: 'hover:border-[#FBBC04]/50',
      iconBg: 'bg-[#FBBC04]/15 text-[#FBBC04]',
      badgeBg: 'bg-[#1D1A14] text-amber-400 border-amber-500/30',
      pillBg: 'bg-[#FBBC04]'
    },
    'surprises-and-access': {
      border: 'hover:border-[#34A853]/50',
      iconBg: 'bg-[#34A853]/15 text-[#34A853]',
      badgeBg: 'bg-[#121A15] text-[#34A853] border-emerald-500/30',
      pillBg: 'bg-[#34A853]'
    }
  };

  return (
    <section id="benefits" className="pt-8 pb-20 px-4 relative z-10 text-right">
      {/* Target anchor for backwards compatibility if linked via #rewards */}
      <div id="rewards" className="absolute -top-20" />

      <div className="max-w-6xl mx-auto relative">
        {/* Decorative Floating Emoticon */}
        <img
          src="/speaker-emoticon.png"
          alt="Announcement"
          className="absolute -top-12 -left-4 sm:left-4 w-20 h-20 md:w-28 md:h-28 object-contain opacity-90 drop-shadow-xl pointer-events-none hidden sm:block"
        />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131722] border border-[#3186FF]/30 text-[#3186FF] text-xs font-semibold shadow-xs mb-4">
            <span>מה מקבלים השגרירים</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3186FF]" />
            <span>תוכנית ישראל 2026</span>
          </div>

          <h2 className="font-google-heading font-black text-3xl md:text-5xl text-white mb-4 tracking-tight">
            מה מקבלים{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              שגרירי Google Gemini?
            </span>
          </h2>

          <p className="font-google-body text-gray-300 text-base md:text-lg leading-relaxed">
            התוכנית בישראל מתמקדת בהעצמת מנהיגות טכנולוגית אקדמית.
            שגרירי הנבחרת זוכים במעטפת למידה יוקרתית, מנוי מלא, הכשרות עומק ישירות מ-Google והכרה מקצועית.
          </p>
        </div>

        {/* 4 Core Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAM_BENEFITS.map((benefit) => {
            const colors = benefitColorClasses[benefit.id] || benefitColorClasses['gemini-advanced'];
            const icon = benefitIcons[benefit.id] || <Sparkles className="w-6 h-6 text-[#3186FF]" />;

            return (
              <div
                key={benefit.id}
                className={`bg-[#111215] rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${colors.border}`}
              >
                <div>
                  {/* Card Header with Icon & Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg} shadow-xs`}>
                      {icon}
                    </div>
                    <span className={`text-xs font-google-heading font-semibold px-3 py-1 rounded-full border ${colors.badgeBg}`}>
                      {benefit.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-google-heading font-bold text-2xl text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="font-google-body text-xs font-medium text-gray-400 mb-4 tracking-wider uppercase">
                    {benefit.subtitle}
                  </p>

                  {/* Description */}
                  <p className="font-google-body text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Bullet points list */}
                  <div className="space-y-3 pt-2 border-t border-white/10 mb-6">
                    {benefit.details.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
                        <span className="font-google-body text-sm text-gray-200 leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Action / Link */}
                {benefit.link && (
                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={benefit.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-google-heading font-semibold text-[#3186FF] hover:text-[#2563EB] transition-colors group cursor-pointer"
                    >
                      <span>{benefit.link.text}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Learning & Campus Focus */}
        <div className="mt-12 bg-[#111215] rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <h4 className="font-google-heading font-bold text-xl text-white">
              למידה מעשית, נטוורקינג ומנהיגות בקמפוס
            </h4>
            <p className="font-google-body text-sm text-gray-300 max-w-2xl leading-relaxed">
              התוכנית מיועדת לסטודנטים שרוצים להשאיר חותם: לרכוש ידע מתקדם ישירות מחוקרי ומהנדסי Google, לבנות כלים עם Gemini API, ולהוביל קהילה טכנולוגית במוסד הלימודים.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-[#131722] text-[#3186FF] font-google-heading font-semibold text-sm border border-[#3186FF]/30">
              ללא עלות
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#121A15] text-[#34A853] font-google-heading font-semibold text-sm border border-emerald-500/30">
              הסמכה רשמית
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
