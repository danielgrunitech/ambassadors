import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 relative z-10 text-center overflow-hidden">
      {/* 3D Floating Emoticons matching reference site */}
      <img
        src="/music-emoticon.png"
        alt="Music"
        className="absolute top-16 left-4 md:left-24 w-24 h-24 md:w-36 md:h-36 object-contain opacity-90 drop-shadow-xl pointer-events-none"
      />
      <img
        src="/star-emoticon.png"
        alt="Star"
        className="absolute top-12 right-4 md:right-32 w-28 h-28 md:w-40 md:h-40 object-contain opacity-90 drop-shadow-xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 leading-tight">
          Google Student<br />
          Ambassador <span className="text-[#346BF1]">2026</span>
          <span className="block text-2xl md:text-3xl text-gray-600 font-medium mt-3">
            בישראל
          </span>
        </h1>

        {/* Narrative */}
        <p className="text-xl text-gray-600 mb-3 font-medium">
          הקמפוס שלך מוכן למהפכת ה-AI הבאה. כל מה שחסר זה מי שיוביל אותה.
        </p>

        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          להביא חדשנות למציאות. להפוך רעיונות לפעולה.<br />
          לבנות את עתיד הטכנולוגיה יחד עם <span className="font-semibold text-gray-700">Google</span>.
        </p>

        {/* Clean Pill Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onOpenApply}
            className="bg-[#346BF1] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2.5 active:scale-95"
          >
            <span>הגשת מועמדות למחזור 2026</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
