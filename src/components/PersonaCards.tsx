import React from 'react';

interface PersonaCardsProps {
  onOpenApply: () => void;
}

export const PersonaCards: React.FC<PersonaCardsProps> = ({ onOpenApply }) => {
  return (
    <section id="personas" className="py-16 md:py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 lg:gap-14 items-start relative z-10 text-right">
          {/* Header Column */}
          <div className="relative sticky top-24">
            <h2 className="font-google-heading font-black text-4xl md:text-5xl mb-5 leading-[1.15] tracking-tight text-white">
              האם אתם אלו<br />
              <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                שאנחנו מחפשים?
              </span>
            </h2>
            <p className="font-google-body text-gray-300 text-lg leading-relaxed mb-6">
              בכל קמפוס יש מי שמוביל שינוי. האם זה אתם?
            </p>
            <button
              onClick={onOpenApply}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-google-heading font-bold text-[#3186FF] hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <span>הגשת מועמדות עכשיו &larr;</span>
            </button>
          </div>

          {/* 2x2 Persona Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6 relative">
            {/* Card 1: The AI Enthusiast */}
            <div className="bg-[#131722] p-8 rounded-3xl shadow-xl border border-[#3186FF]/30 relative z-10 transition-transform duration-200 hover:-translate-y-1">
              <img
                src="/smile-dark-emoticon.png"
                alt="Smile"
                className="absolute -top-16 left-4 md:-top-20 md:left-8 w-20 h-20 md:w-28 md:h-28 z-20 drop-shadow-2xl transform -rotate-12 hidden md:block object-contain pointer-events-none"
              />
              <h3 className="font-google-heading font-bold text-2xl mb-1 text-white leading-tight">
                The AI Enthusiast
              </h3>
              <div className="font-google-heading text-xs font-semibold text-[#3186FF] mb-5">
                חובב/ת ה-AI
              </div>
              <ul className="font-google-body space-y-3 text-gray-300 text-sm sm:text-base leading-snug">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3186FF] mt-2 shrink-0" />
                  <span>סקרנים לגבי איך דברים עובדים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3186FF] mt-2 shrink-0" />
                  <span>חוקרים כלים חדשים לפני כולם.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3186FF] mt-2 shrink-0" />
                  <span>AI לא מפחיד אתכם — הוא מרגש.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: The Creative Thinker */}
            <div className="bg-[#181512] p-8 rounded-3xl shadow-xl border border-amber-500/30 relative z-10 transition-transform duration-200 hover:-translate-y-1">
              <h3 className="font-google-heading font-bold text-2xl mb-1 text-white leading-tight">
                The Creative Thinker
              </h3>
              <div className="font-google-heading text-xs font-semibold text-amber-400 mb-5">
                החושב/ת היצירתי/ת
              </div>
              <ul className="font-google-body space-y-3 text-gray-300 text-sm sm:text-base leading-snug">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>רואים אפשרויות היכן שאחרים רואים מגבלות.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>מעלים רעיונות שאנשים לא ידעו שהם צריכים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>לא עוקבים אחרי טרנדים. מתחילים אותם.</span>
                </li>
              </ul>
            </div>

            {/* Card 3: The Communicator */}
            <div className="bg-[#111A14] p-8 rounded-3xl shadow-xl border border-emerald-500/30 relative z-10 transition-transform duration-200 hover:-translate-y-1">
              <img
                src="/speaker-emoticon.png"
                alt="Speaker"
                className="absolute -bottom-16 -right-12 md:-right-16 w-32 h-32 md:w-36 md:h-36 z-20 drop-shadow-2xl transform rotate-12 hidden md:block object-contain pointer-events-none"
              />
              <h3 className="font-google-heading font-bold text-2xl mb-1 text-white leading-tight">
                The Communicator
              </h3>
              <div className="font-google-heading text-xs font-semibold text-emerald-400 mb-5">
                המחבר/ת והמדריך/ה
              </div>
              <ul className="font-google-body space-y-3 text-gray-300 text-sm sm:text-base leading-snug">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>אוהבים לחבר בין אנשים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>חולקים בשמחה את מה שאתם לומדים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>הופכים דברים מורכבים לפשוטים.</span>
                </li>
              </ul>
            </div>

            {/* Card 4: The Impact Maker */}
            <div className="bg-[#181320] p-8 rounded-3xl shadow-xl border border-purple-500/30 relative z-10 transition-transform duration-200 hover:-translate-y-1">
              <h3 className="font-google-heading font-bold text-2xl mb-1 text-white leading-tight">
                The Impact Maker
              </h3>
              <div className="font-google-heading text-xs font-semibold text-purple-400 mb-5">
                יוצר/ת האימפקט
              </div>
              <ul className="font-google-body space-y-3 text-gray-300 text-sm sm:text-base leading-snug">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>לא רק משתתפים — יוזמים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>משפרים ומקדמים דברים.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>רוצים להשאיר את הקמפוס טוב יותר ממה שמצאתם אותו.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
