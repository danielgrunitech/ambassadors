import React from 'react';

export const MissionBanner: React.FC = () => {
  const images = [
    { src: '/carousel-2.jpg', alt: 'Gemini AI Study Buddy on Campus', position: 'object-top' },
    { src: '/carousel-3.jpg', alt: 'Gemini for University Life', position: 'object-center' },
    { src: '/carousel-4.jpg', alt: 'Ambassador Influencer Workshop', position: 'object-center' }
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
          מבט אל תוכנית{' '}
          <span style={{ backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC04, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Google Student Ambassadors
          </span>
        </h2>

        {/* Text */}
        <p className="font-google-body text-gray-300 max-w-3xl mx-auto mb-4 text-base sm:text-lg leading-relaxed">
          Google Student Ambassadors היא תוכנית הכשרה והובלה קהילתית רשמית של Google בישראל, המיועדת לסטודנטים וסטודנטיות לתואר ראשון (משנה ב' ומעלה) המבקשים להוביל חדשנות דיגיטלית בקמפוס שלהם. התוכנית מחברת בין עולמות הבינה המלאכותית לבין יצירת תוכן, סטוריטלינג והובלת קהילה – בספרינט ממוקד של 15 שבועות רצופים לאורך סמסטר ב' של שנת הלימודים תשפ"ז (ממרץ עד סוף יוני 2027, לפני תקופת המבחנים).
        </p>

        <p className="font-google-heading font-semibold text-sm sm:text-base text-[#3186FF] mb-10">
          מספר המקומות בתוכנית מוגבל
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/10 bg-[#16171B]">
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover ${img.position} hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
