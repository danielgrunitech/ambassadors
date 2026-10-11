import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface CustomSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  searchable?: boolean;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder,
  error,
  searchable = false,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  return (
    <div className="relative text-right font-google-body" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-200 mb-1.5 font-google-body">
        {label} {required && <span className="text-[#EA4335] font-bold">*</span>}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border text-right text-sm transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
          isOpen
            ? 'bg-[#18191E] border-[#3186FF] ring-2 ring-[#3186FF]/30 shadow-md text-white'
            : error
            ? 'bg-red-950/20 border-[#EA4335] text-white'
            : 'bg-[#16171B] hover:bg-[#1A1C22] border-white/15 hover:border-white/25 text-white'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
          <span className={`truncate ${value ? 'text-white font-medium' : 'text-gray-400'}`}>
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180 text-[#3186FF]' : ''
          }`}
        />
      </button>

      {error && <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{error}</p>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-[#16171B] rounded-2xl border border-white/15 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-right">
          {/* Search Box */}
          {searchable && (
            <div className="p-2 border-b border-white/10 bg-[#121316] sticky top-0 z-10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש באפשרויות..."
                  className="w-full pr-8 pl-3 py-1.5 text-xs bg-[#1E2026] text-white rounded-lg border border-white/15 focus:outline-none focus:border-[#3186FF] focus:ring-1 focus:ring-[#3186FF]/30 placeholder-gray-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-400">
                לא נמצאו תוצאות תואמות
              </div>
            ) : (
              filteredOptions.map((option, idx) => {
                const isSelected = value === option;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`px-3.5 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#131722] text-[#3186FF] font-bold border border-[#3186FF]/30'
                        : 'hover:bg-white/5 text-gray-200'
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#3186FF] shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
