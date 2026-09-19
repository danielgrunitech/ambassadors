import React from 'react';

export const RewardsSection: React.FC = () => {
  const swagItems = [
    { src: '/sling-bag.png', name: 'תיק צד Sling Bag' },
    { src: '/premium-diary.png', name: 'מחברת פרימיום ועט' },
    { src: '/matt-black-bottle.png', name: 'בקבוק Matt Black' },
    { src: '/vasity-jacket.png', name: 'ג\'קט נבחרת Varsity' },
    { src: '/laptop-bag.png', name: 'תיק מחשב Laptop Bag' },
    { src: '/pixel-10a.png', name: 'Pixel Phone 10a' },
    { src: '/pixel-buds-2a.png', name: 'Pixel Buds 2a' }
  ];

  return (
    <section id="rewards" className="pt-4 pb-20 px-4 relative z-10">
      {/* What You Earn Section (Exact reference styling) */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
            מה שאתם{' '}
            <span className="text-[#FBBC04]">מ</span>
            <span className="text-[#34A853]">ר</span>
            <span className="text-[#EA4335]">ו</span>
            <span className="text-[#346BF1]">ו</span>
            <span className="text-[#FBBC04]">י</span>
            <span className="text-[#34A853]">ח</span>
            <span className="text-[#EA4335]">י</span>
            <span className="text-[#346BF1]">ם</span>
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-10 text-base">
            הטבות בלעדיות, ציוד ממותג Google Gemini, מכשירי Pixel והכרה רשמית למובילי הנבחרת
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {swagItems.map((item, idx) => (
              <div
                key={idx}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1.2rem)] flex flex-col group hover:-translate-y-1 transition-transform duration-300 mt-10 sm:mt-12"
              >
                <div className="bg-white rounded-2xl shadow-sm flex flex-col relative pt-16 sm:pt-20 h-full border border-gray-100">
                  <div className="absolute -top-10 sm:-top-12 left-0 right-0 h-28 sm:h-32 flex items-center justify-center px-4 pointer-events-none">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 pointer-events-auto"
                    />
                  </div>
                  <div className="bg-[#346BF1] text-white text-center py-3 px-2 text-xs sm:text-sm font-medium rounded-b-2xl flex-1 flex items-center justify-center mt-auto">
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ambassador Tiered Reward Structure (Exact reference table) */}
      <div className="max-w-5xl mx-auto relative z-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden text-right">
        {/* Blue Header with Artwork */}
        <div className="bg-[#346BF1] text-white p-8 md:p-12 text-center relative overflow-hidden rounded-t-[2rem]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-t-[2rem] flex justify-center pt-6">
            <img
              src="/rewards-header.png"
              alt="Header Graphic"
              className="w-full max-w-2xl h-full object-contain object-top opacity-90"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight relative z-10 mt-16 md:mt-24">
            Ambassador Tiered Reward Structure
          </h2>
          <p className="text-blue-50 text-base md:text-xl font-light relative z-10">
            מדרגות התקדמות מבוססות נקודות שנצברו לאורך תקופת התוכנית
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-center border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#346BF1] text-white text-sm sm:text-base">
                <th className="py-4 px-6 border border-white/20 font-semibold text-right w-1/4">
                  דרגת שגריר
                </th>
                <th className="py-4 px-4 border border-white/20 font-semibold w-1/6">
                  נקודות
                </th>
                <th className="py-4 px-4 border border-white/20 font-semibold w-1/3">
                  שוברים ופרסים פיזיים
                </th>
                <th className="py-4 px-6 border border-white/20 font-semibold w-1/4">
                  פרסים דיגיטליים והכרה
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm sm:text-base">
              {/* Explorer */}
              <tr className="bg-white">
                <td className="py-5 px-6 border border-gray-200 font-semibold text-right text-gray-700">
                  The Explorer (ארד)
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-gray-800">
                  600
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="font-bold text-base text-gray-800">₪ 200</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">שובר מתנה + מחברת פרימיום</div>
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-600">
                  Digital Badge, תעודת השתתפות
                </td>
              </tr>

              {/* Navigator */}
              <tr className="bg-[#F4F7FC]">
                <td className="py-5 px-6 border border-gray-200 font-semibold text-right text-gray-700">
                  The Navigator (כסף)
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-gray-800">
                  1200
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="font-bold text-base text-gray-800">₪ 350</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">שובר מתנה + תיק צד Sling Bag</div>
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-600">
                  Digital Badge
                </td>
              </tr>

              {/* Architect */}
              <tr className="bg-white">
                <td className="py-5 px-6 border border-gray-200 font-semibold text-right text-gray-700">
                  The Architect (זהב)
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-gray-800">
                  1800
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="font-bold text-base text-gray-800">₪ 500</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">שובר מתנה + בקבוק Matt Black</div>
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-600">
                  Digital Badge + Certificate of Recognition
                </td>
              </tr>

              {/* Visionary */}
              <tr className="bg-[#F4F7FC]">
                <td className="py-5 px-6 border border-gray-200 font-semibold text-right text-gray-700">
                  The Visionary (ספיר)
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-gray-800">
                  2600
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="font-bold text-base text-gray-800">₪ 750</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">שובר מתנה + ג'קט נבחרת Varsity</div>
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-600">
                  Digital Badge + סשן מנטורינג אישי מ-Google
                </td>
              </tr>

              {/* Titan */}
              <tr className="bg-white">
                <td className="py-5 px-6 border border-gray-200 font-semibold text-right text-gray-700">
                  The Titan (פלטינה)
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-gray-800">
                  3400
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="font-bold text-base text-gray-800">₪ 1,000</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">שובר מתנה + תיק Laptop Bag ממותג</div>
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-600">
                  Digital Badge + הזמנה ל-Google Campus
                </td>
              </tr>

              {/* Catalyst (Top 10) */}
              <tr className="bg-blue-50/70 font-semibold">
                <td className="py-5 px-6 border border-gray-200 text-right text-gray-900">
                  <div className="flex items-center gap-2 justify-end">
                    <span>The Catalyst (Celestial)</span>
                    <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
                      טופ 10 ארצי
                    </span>
                  </div>
                </td>
                <td className="py-5 px-4 border border-gray-200">
                  <div className="text-gray-900 font-bold">4200</div>
                  <div className="text-xs text-gray-500">(טופ 10 שגרירים)</div>
                </td>
                <td className="py-5 px-4 border border-gray-200 font-bold text-lg text-blue-700">
                  Pixel Phone 10a + Pixel Buds 2a
                </td>
                <td className="py-5 px-6 border border-gray-200 text-sm text-gray-700">
                  Digital Badge + Ambassador Spotlight Post בינלאומי
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note bar */}
        <div className="bg-[#346BF1] text-white text-sm py-3 px-6 text-right font-medium rounded-b-[2rem]">
          הערה: תעודות רשמיות יוענקו עם סיום מוצלח של התוכנית.
        </div>
      </div>
    </section>
  );
};
