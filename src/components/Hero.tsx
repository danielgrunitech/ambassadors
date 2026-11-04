import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GoogleGIcon } from './GeminiLogo';

interface HeroProps {
  onOpenApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-4 relative z-10 text-center overflow-hidden">
      {/* 3D Floating Emoticons matching Google Brand Toolkit */}
      <img
        src="/music-emoticon.png"
        alt="Music"
        className="absolute top-16 left-4 md:left-24 w-24 h-24 md:w-36 md:h-36 object-contain opacity-95 drop-shadow-[0_20px_40px_rgba(49,134,255,0.25)] pointer-events-none animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <img
        src="/star-emoticon.png"
        alt="Star"
        className="absolute top-12 right-4 md:right-28 w-28 h-28 md:w-40 md:h-40 object-contain opacity-95 drop-shadow-[0_20px_40px_rgba(251,188,4,0.25)] pointer-events-none animate-pulse"
        style={{ animationDuration: '5s' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131722] border border-[#3186FF]/30 text-[#3186FF] text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#3186FF]" />
          <span>תוכנית שגרירי הסטודנטים הרשמית של Google בישראל</span>
        </div>

        {/* Main Title - Google Sans Flex */}
        <h1 className="font-google-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.08] mb-6">
          Google Student<br />
          Ambassador <span className="text-[#3186FF]">2026</span>
          <span className="block text-2xl md:text-4xl text-gray-300 font-bold mt-4 tracking-normal">
            בישראל
          </span>
        </h1>

        {/* Narrative - Google Sans Regular */}
        <p className="font-google-body text-xl md:text-2xl text-gray-200 mb-4 font-normal leading-relaxed max-w-2xl mx-auto">
          הקמפוס שלך מוכן למהפכת ה-AI הבאה. כל מה שחסר זה מי שיוביל אותה.
        </p>

        <p className="font-google-body text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
          להביא חדשנות למציאות. להפוך רעיונות לפעולה.<br />
          לבנות את עתיד הטכנולוגיה יחד עם <span className="font-semibold text-white">Google</span>.
        </p>

        {/* Clean Signature Blue Pill Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto bg-[#3186FF] hover:bg-[#2563EB] text-white px-9 py-4 rounded-full font-google-heading text-lg font-bold transition-all shadow-[0_10px_30px_rgba(49,134,255,0.35)] hover:shadow-[0_15px_40px_rgba(49,134,255,0.5)] inline-flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
          >
            <span>הגשת מועמדות למחזור 2026</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Deadline Urgency Banner */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-google-heading font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>מועד אחרון להגשת מועמדות: 1 בפברואר 2027 (23:59)</span>
        </div>

        {/* Dark Mode Bottom Sub-Lockup */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-center gap-2.5 text-gray-400 text-sm">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-0.5">
            <GoogleGIcon size={14} />
          </div>
          <span className="font-google-heading text-gray-300 font-medium">
            Google Student Ambassador Program • Israel Chapter
          </span>
        </div>
      </div>
    </section>
  );
};
