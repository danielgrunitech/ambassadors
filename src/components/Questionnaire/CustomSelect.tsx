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
    <div className="relative text-right" ref={dropdownRef}>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl border text-right text-sm transition-all duration-200 flex items-center justify-between gap-3 ${
          isOpen
            ? 'bg-white border-[#346BF1] ring-2 ring-blue-100 shadow-sm'
            : error
            ? 'bg-red-50/40 border-red-300 hover:border-red-400'
            : 'bg-[#F8FAFC] hover:bg-white border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
          <span className={`truncate ${value ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180 text-[#346BF1]' : ''
          }`}
        />
      </button>

      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-right">
          {/* Search Box */}
          {searchable && (
            <div className="p-2 border-b border-gray-100 bg-gray-50/60 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש באפשרויות..."
                  className="w-full pr-8 pl-3 py-1.5 text-xs bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1]"
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
                        ? 'bg-[#E8F0FE] text-[#346BF1] font-bold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#346BF1] shrink-0" />}
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
