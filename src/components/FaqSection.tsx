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
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
            שאלות נפוצות{' '}
            <span style={{ backgroundImage: "linear-gradient(to right, #EA4335, #FBBC04, #34A853, #346BF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              (FAQ)
            </span>
          </h2>
          <p className="text-gray-600 text-base">
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
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#346BF1] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
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
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-gray-900 hover:text-[#346BF1] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#346BF1]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50">
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
