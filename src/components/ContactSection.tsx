import React from 'react';
import { Mail, HelpCircle, Eye, ArrowLeft, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onOpenAccessibility: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenAccessibility
}) => {
  const handleFaqScroll = () => {
    const faqElement = document.querySelector('#faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-4 relative z-10 text-right">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131722] border border-[#3186FF]/30 text-[#3186FF] text-xs font-semibold mb-4 backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5 text-[#3186FF]" />
            <span>צוות התוכנית כאן בשבילכם</span>
          </div>

          <h2 className="font-google-heading font-black text-3xl md:text-5xl mb-4 text-white tracking-tight leading-tight">
            יצירת קשר{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ושאלות
            </span>
          </h2>
          <p className="font-google-body text-gray-400 text-base sm:text-lg leading-relaxed">
            יש לכם שאלה בנוגע לתהליך המיון, סרטון ההיכרות או תוכנית השגרירים? נשמח לעזור.
          </p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct Email (Blank / Placeholder for now) */}
          <div className="bg-[#111215] rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#3186FF]/40 transition-all shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#131722] border border-[#3186FF]/30 flex items-center justify-center text-[#3186FF] mb-5 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-google-heading font-bold text-lg text-white mb-2">
                פניות בדוא"ל
              </h3>
              <p className="font-google-body text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                לכל שאלה טכנית, בירור לגבי המועמדות או תיאום מיוחד מול צוות התוכנית.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-dashed border-white/20 text-center">
                <span className="font-mono text-xs text-gray-400 select-all">
                  {/* Email left blank as requested */}
                  [כתובת המייל תעודכן בקרוב]
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: FAQ Anchor */}
          <div className="bg-[#111215] rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#FBBC04]/40 transition-all shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1A1813] border border-[#FBBC04]/30 flex items-center justify-center text-[#FBBC04] mb-5 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-google-heading font-bold text-lg text-white mb-2">
                שאלות ותשובות נפוצות
              </h3>
              <p className="font-google-body text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                ריכזנו תשובות מפורטות על שעות ההתחייבות, תנאי הסף, מנוי ה-Plus והמפגשים ב-Google Campus.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleFaqScroll}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-google-heading font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>לצפייה בכל השאלות הנפוצות</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Accessibility Support */}
          <div className="bg-[#111215] rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#34A853]/40 transition-all shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#111C15] border border-[#34A853]/30 flex items-center justify-center text-[#34A853] mb-5 group-hover:scale-105 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-google-heading font-bold text-lg text-white mb-2">
                התאמות ונגישות
              </h3>
              <p className="font-google-body text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                אנו מחויבים להנגשה מלאה. מועמדים הזקוקים לחלופה נגישה או התאמות מוזמנים לפנות אלינו.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenAccessibility}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-google-heading font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>לצפייה בהצהרת הנגישות המלאה</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
