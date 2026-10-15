import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GoogleGIcon } from './GeminiLogo';

interface FooterProps {
  onOpenApply: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply, onOpenPrivacy }) => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 px-4 text-right">
      <div className="max-w-5xl mx-auto">
        {/* Pre-footer Action Card */}
        <div className="bg-gradient-to-b from-[#131722] to-[#0A0B0E] rounded-[2.5rem] p-8 md:p-12 text-center mb-12 border border-[#3186FF]/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#3186FF]/15 blur-2xl pointer-events-none" />

          <h3 className="font-google-heading font-black text-2xl sm:text-4xl text-white mb-3 tracking-tight">
            הקמפוס שלך מחכה למובילים הבאים
          </h3>
          <p className="font-google-body text-gray-300 max-w-lg mx-auto text-sm sm:text-base mb-7 leading-relaxed">
            הצטרפו לנבחרת שגרירי Google Gemini בישראל, קבלו מנוי AI Plus חינם, סמינרים שבועיים מקצועיים והסמכה רשמית מ-Google.
          </p>
          <button
            onClick={onOpenApply}
            className="bg-[#3186FF] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-full font-google-heading text-base font-bold transition-all shadow-[0_10px_25px_rgba(49,134,255,0.35)] hover:shadow-[0_12px_30px_rgba(49,134,255,0.5)] inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>הגשת מועמדות למחזור 2026</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Brand & Legal matching brand book dark mode lockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-google-body text-gray-400 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center p-1 shrink-0">
              <GoogleGIcon size={16} />
            </div>
            <span className="font-google-heading text-white font-medium">Google Student Ambassador</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">© 2026 כל הזכויות שמורות.</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              מדיניות פרטיות
            </button>
            <span>•</span>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              תנאי שימוש
            </a>
            <span>•</span>
            <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Google Gemini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
