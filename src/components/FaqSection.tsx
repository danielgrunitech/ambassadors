import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'general', label: 'כללי על התוכנית' },
    { id: 'eligibility', label: 'תנאי קבלה והתאמה' },
    { id: 'time', label: 'השקעת זמן ולימודים' },
    { id: 'benefits', label: 'הטבות והכשרות' },
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(f => f.category === selectedCategory);

  return (
    <section id="faq" className="py-16 md:py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-google-heading font-black text-3xl md:text-4xl mb-3 text-white leading-tight">
            שאלות נפוצות{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              (FAQ)
            </span>
          </h2>
          <p className="font-google-body text-gray-400 text-base">
            כל מה שחשוב לדעת על תוכנית שגרירי Google Gemini בישראל
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-google-heading font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#3186FF] text-white shadow-md'
                  : 'bg-[#131722] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#111215] rounded-2xl border border-white/10 overflow-hidden shadow-xl transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-google-heading font-bold text-base sm:text-lg text-white hover:text-[#3186FF] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#3186FF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 font-google-body text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
