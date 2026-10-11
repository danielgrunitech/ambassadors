import React from 'react';

export const MissionBanner: React.FC = () => {
  const images = [
    { src: '/carousel-2.jpg', alt: 'Google AI Workshop' },
    { src: '/carousel-3.jpg', alt: 'Campus Hackathon' },
    { src: '/carousel-4.jpg', alt: 'Student Community' }
  ];

  return (
    <section id="about" className="py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto bg-[#111215] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10 text-center relative overflow-visible">
        {/* Speech Emoticon from reference site */}
        <img
          src="/speach-light-emoticon.png"
          alt="Speech"
          className="absolute -top-10 -right-4 md:-right-8 w-24 h-24 md:w-32 md:h-32 object-contain z-20 drop-shadow-2xl pointer-events-none"
        />

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-google-heading font-black mb-6 text-white tracking-tight">
          מבט אל תוכנית השגרירים{' '}
          <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            2026 בישראל
          </span>
        </h2>

        {/* Text */}
        <p className="font-google-body text-gray-300 max-w-3xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
          תוכנית שגרירי הסטודנטים של Google יוצרת דור חדש של מובילי AI באקדמיה הישראלית.<br />
          מהטכניון ועד בן-גוריון, מאוניברסיטת תל אביב ועד האוניברסיטה העברית והמכללות המובילות — מנהיגי סטודנטים מביאים את Gemini ישירות לכיתות הלימוד, מעבדות המחקר, ההאקתונים וחיי היומיום בקמפוס.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/10 bg-[#16171B]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
