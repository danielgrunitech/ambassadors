import React from 'react';
import { GeminiLogo } from './GeminiLogo';
import { Sparkles, ClipboardList, Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenSubmissions: () => void;
  submissionsCount: number;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onOpenSubmissions,
  submissionsCount,
  isAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'על התוכנית', href: '#about' },
    { label: 'למי זה מתאים?', href: '#personas' },
    { label: 'הטבות ופרסים', href: '#rewards' },
    { label: 'תנאי סף', href: '#eligibility' },
    { label: 'שלבי התוכנית', href: '#timeline' },
    { label: 'שאלות נפוצות', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>ההרשמה למחזור 2026 של שגרירי Google Gemini בישראל נפתחה רשמית!</span>
        <span className="hidden md:inline text-blue-200">| מספר המקומות מוגבל לכל מוסד אקדמי</span>
        <button
          onClick={onOpenApply}
          className="underline hover:text-yellow-300 transition-colors font-bold mr-1"
        >
          הגש מועמדות עכשיו &larr;
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="cursor-pointer">
            <GeminiLogo size={32} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-600 hover:text-[#346BF1] transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#346BF1] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Panel Trigger (ONLY visible in Admin mode, hidden from public visitors) */}
            {isAdmin && (
              <button
                onClick={onOpenSubmissions}
                title="פאנל ניהול ובקרה (גלוי רק למנהל)"
                className="relative p-2.5 rounded-full text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <ClipboardList className="w-5 h-5" />
                {submissionsCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                    {submissionsCount}
                  </span>
                )}
              </button>
            )}

            {/* Apply CTA Button */}
            <button
              onClick={onOpenApply}
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#1A73E8] via-[#346BF1] to-[#7C4DFF] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>הגשת מועמדות</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
              aria-label="תפריט"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-5 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-right text-base font-medium text-gray-700 hover:text-[#346BF1] py-2 border-b border-gray-100 last:border-none"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApply();
                  }}
                  className="w-full bg-gradient-to-r from-[#1A73E8] to-[#7C4DFF] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>הגשת מועמדות לשגרירות</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSubmissions();
                    }}
                    className="w-full text-center text-xs text-blue-600 font-bold py-2 hover:text-blue-800"
                  >
                    פאנל מנהל: צפייה במועמדים ({submissionsCount})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
