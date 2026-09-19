import React, { useState } from 'react';
import { Menu, X, ArrowLeft, ClipboardList } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo matching reference site */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/logo-04-header.png"
              alt="Google Student Ambassador 2026"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>
          <span className="bg-[#E8F0FE] text-[#346BF1] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-100 hidden sm:inline-block">
            ישראל
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-gray-600 hover:text-[#346BF1] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Admin Panel Trigger (Only in admin mode) */}
          {isAdmin && (
            <button
              onClick={onOpenSubmissions}
              title="פאנל ניהול (מנהל בלבד)"
              className="relative p-2 rounded-full text-[#346BF1] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <ClipboardList className="w-4 h-4" />
              {submissionsCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {submissionsCount}
                </span>
              )}
            </button>
          )}

          {/* Primary CTA Button */}
          <button
            onClick={onOpenApply}
            className="bg-[#346BF1] hover:bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <span>הגשת מועמדות</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 shadow-lg text-right">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-700 hover:text-[#346BF1] py-1.5 text-right"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full bg-[#346BF1] text-white py-2.5 rounded-full text-sm font-medium"
              >
                הגשת מועמדות לשגרירות 2026
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubmissions();
                  }}
                  className="text-xs text-blue-600 py-1"
                >
                  פאנל מנהל ({submissionsCount})
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
