import React from 'react';
import { GeminiLogo } from './GeminiLogo';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 px-4 text-right">
      <div className="max-w-6xl mx-auto">
        {/* Pre-Footer Call to action Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-[2rem] p-8 md:p-12 text-white text-center mb-16 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-4">
              מחזור ישראל 2026 פתוח להגשה
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">
              מוכנים להוביל את מהפכת ה-AI בקמפוס שלכם?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mb-8">
              הצטרפו למשפחת שגרירי Google Gemini בישראל, קבלו גישה ישירה למהנדסים, הכשרות בלעדיות ופרסים.
            </p>
            <button
              onClick={onOpenApply}
              className="bg-white text-blue-800 hover:bg-blue-50 font-extrabold px-8 py-4 rounded-full text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>הגשת מועמדות עכשיו</span>
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <GeminiLogo size={32} />
            <p className="text-gray-500 text-sm mt-4 max-w-md leading-relaxed">
              תוכנית שגרירי הסטודנטים של Google Gemini בישראל מקדמת ידע, חדשנות ומנהיגות בבינה מלאכותית ברחבי האקדמיה הישראלית.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#about" className="hover:text-blue-600">על התוכנית</a></li>
              <li><a href="#personas" className="hover:text-blue-600">פרופיל השגריר</a></li>
              <li><a href="#rewards" className="hover:text-blue-600">הטבות ופרסים</a></li>
              <li><a href="#eligibility" className="hover:text-blue-600">תנאי סף</a></li>
              <li><a href="#faq" className="hover:text-blue-600">שאלות נפוצות</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-4">משאבי למידה ו-AI</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Google Gemini Web &rarr;
                </a>
              </li>
              <li>
                <a href="https://ai.google.dev" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Google AI Studio &rarr;
                </a>
              </li>
              <li>
                <a href="https://developers.google.com/community" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  Google Developer Student Clubs &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 Google Student Ambassador Program Israel. כל הזכויות שמורות.
          </div>
          <div className="flex items-center gap-4">
            <span>מדיניות פרטיות</span>
            <span>•</span>
            <span>תנאי שימוש</span>
            <span>•</span>
            <span>קוד אתי</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
