const testCandidate = {
  id: "IL-GEMINI-2026-" + Math.floor(1000 + Math.random() * 9000),
  fullName: "דניאל שגיב (בדיקת מערכת)",
  email: "danielsagiv.test@gmail.com",
  phone: "050-9876543",
  city: "תל אביב",
  institution: "אוניברסיטת תל אביב",
  degree: "תואר ראשון (B.Sc)",
  fieldOfStudy: "מדעי המחשב / הנדסת תוכנה",
  currentYear: "שנה ב'",
  linkedInUrl: "https://linkedin.com/in/danielsagiv",
  whyAmbassador: "זוהי בדיקת מערכת אוטומטית לווידוא חיבור תקין בין אתר שגרירי Google Gemini ל-Google Sheets. הכל פועל מצוין!",
  currentGeminiUsage: "שימוש יומיומי ב-Gemini Advanced וב-Google AI Studio לפיתוח ומחקר.",
  favoriteGeminiFeature: "חלון הקשר של 2M טוקנים וניתוח מולטי-מודאלי בזמן אמת.",
  primaryStrengths: ["פיתוח Hands-on, שימוש ב-APIs וקוד", "עמידה מול קהל והעברת הרצאות / סדנאות"],
  pastLeadershipExperience: "הובלת פרויקט שגרירי הסטודנטים בישראל 2026 והקמת תשתית הרישום.",
  technicalSkills: ["Gemini Web / Advanced", "Google AI Studio / Gemini API", "Python", "TypeScript"],
  proposedFirstEvent: "סדנת Kickoff: 'בניית אפליקציית AI ראשונה עם Gemini' לסטודנטים מכל הפקולטות.",
  nonTechOutreachStrategy: "הדגמות וידאו קצרות של Gemini למחקר ולימודים.",
  weeklyCommitmentHours: "3-5 שעות שבועיות (מומלץ)",
  videoPitchUrl: "",
  submittedAt: new Date().toISOString()
};

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyhF8tLJfCVkxe6xS1pjdoxIA2DNro43Ll7xAb1BRKxoA-a0iFHit5AqXV2__HmvHaMpg/exec";

console.log("Submitting test candidate:", testCandidate.fullName, "(" + testCandidate.id + ")...");

fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify(testCandidate)
})
  .then(res => res.text())
  .then(text => {
    console.log("Response from Google Apps Script:", text);
    console.log("SUCCESS! Test application submitted.");
  })
  .catch(err => {
    console.error("Error submitting test:", err);
  });
