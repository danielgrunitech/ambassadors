import React from 'react';
import { PERSONAS } from '../data/content';
import { Sparkles, Lightbulb, Megaphone, Rocket, CheckCircle2, ArrowLeft } from 'lucide-react';

interface PersonaCardsProps {
  onSelectPersona?: (personaId: string) => void;
  onOpenApply: () => void;
}

export const PersonaCards: React.FC<PersonaCardsProps> = ({ onOpenApply }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-600" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-emerald-600" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="personas" className="py-16 md:py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto text-right">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-blue-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>התאמה לשגרירות</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            את מי אנחנו{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#346BF1]">
              מחפשים?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            בכל קמפוס יש מי שמוביל שינוי, יוצר הזדמנויות ומחבר אנשים. האם זה אתם?
          </p>
        </div>

        {/* 4 Personas Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PERSONAS.map((persona) => {
            return (
              <div
                key={persona.id}
                className="bg-white rounded-[2rem] p-7 sm:p-9 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-gray-100 shadow-sm">
                      {getIcon(persona.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {persona.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                      {persona.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-400">
                      {persona.subtitle}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3.5 mb-8">
                    {persona.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-[#346BF1] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">מתחברים להגדרה הזו?</span>
                  <button
                    onClick={onOpenApply}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#346BF1] hover:text-blue-800 transition-colors group-hover:translate-x-[-4px]"
                  >
                    <span>הגישו מועמדות</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
