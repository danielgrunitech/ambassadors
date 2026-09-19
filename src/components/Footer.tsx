import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FooterProps {
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-10 px-4 text-right">
      <div className="max-w-5xl mx-auto">
        {/* Pre-footer Action Card */}
        <div className="bg-[#E8F0FE] rounded-[2rem] p-8 md:p-12 text-center mb-12 border border-blue-100/60">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            הקמפוס שלך מחכה למובילים הבאים
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base mb-6 leading-relaxed">
            הצטרפו לנבחרת שגרירי Google Gemini בישראל, קבלו מנוי חינם, סמינרים שבועיים מקצועיים והסמכה רשמית מ-Google.
          </p>
          <button
            onClick={onOpenApply}
            className="bg-[#346BF1] hover:bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <span>הגשת מועמדות למחזור 2026</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Brand & Legal matching reference site */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/logo-04-header.png"
              alt="Google Student Ambassador 2026"
              className="h-7 w-auto object-contain"
            />
            <span>© 2026 Google Student Ambassador Program. כל הזכויות שמורות.</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-gray-600">
              פרטיות
            </a>
            <span>•</span>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-gray-600">
              תנאי שימוש
            </a>
            <span>•</span>
            <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="hover:text-gray-600">
              Google Gemini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
