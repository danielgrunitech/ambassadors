import React, { useState } from 'react';
import { Menu, X, ArrowLeft, ClipboardList } from 'lucide-react';
import { GoogleGIcon } from './GeminiLogo';

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
    { label: 'מה מקבלים?', href: '#benefits' },
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
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/10 transition-all">
      {/* Google 4-Color Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - Official Dark Mode Lockup (Page 3 & 4 of brand book) */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform">
              <GoogleGIcon size={20} />
            </div>
            <span className="font-google-heading font-semibold text-white text-base sm:text-lg tracking-tight">
              Google Student Ambassador
            </span>
          </a>
          <span className="bg-[#131722] text-[#3186FF] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#3186FF]/30 hidden sm:inline-flex items-center gap-1">
            <span>✦</span>
            <span>ישראל</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-google-heading text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
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
              className="relative p-2 rounded-full text-[#3186FF] bg-blue-950/40 hover:bg-blue-900/60 transition-colors border border-blue-500/30"
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
            className="bg-[#3186FF] hover:bg-[#2563EB] text-white px-5 sm:px-6 py-2 rounded-full font-google-heading text-sm font-bold transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-[#3186FF]/30 active:scale-95 cursor-pointer"
          >
            <span>הגשת מועמדות</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0C0E] border-b border-white/10 px-6 py-4 shadow-2xl text-right">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-google-heading text-sm font-medium text-gray-300 hover:text-white py-1.5 text-right"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full bg-[#3186FF] text-white py-2.5 rounded-full font-google-heading text-sm font-bold"
              >
                הגשת מועמדות לשגרירות 2026
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubmissions();
                  }}
                  className="text-xs text-blue-400 py-1"
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
