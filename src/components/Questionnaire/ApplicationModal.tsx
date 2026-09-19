import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, Check, Award, BookOpen, User, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApplicationFormData, SubmissionRecord } from '../../types';
import {
  ISRAELI_INSTITUTIONS,
  FIELDS_OF_STUDY,
  STRENGTH_OPTIONS,
  TECHNICAL_SKILL_OPTIONS
} from '../../data/content';
import {
  getDraft,
  saveDraft,
  saveSubmission,
  INITIAL_FORM_DATA
} from '../../utils/storage';
import { GeminiSparkle } from '../GeminiLogo';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmissionSuccess: () => void;
}

const TOTAL_STEPS = 5;

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmissionSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedRecord, setSubmittedRecord] = useState<SubmissionRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load draft on mount
  useEffect(() => {
    if (isOpen) {
      const draft = getDraft();
      setFormData(draft);
      setSubmittedRecord(null);
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Auto-save draft on form change
  const handleChange = (
    field: keyof ApplicationFormData,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleArrayItem = (field: 'primaryStrengths' | 'technicalSkills', item: string) => {
    setFormData((prev) => {
      const currentList = prev[field] || [];
      const updatedList = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      const updated = { ...prev, [field]: updatedList };
      saveDraft(updated);
      return updated;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'נא להזין שם מלא';
      if (!formData.email.trim()) {
        newErrors.email = 'נא להזין כתובת אימייל';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'כתובת אימייל אינה תקינה';
      }
      if (!formData.phone.trim()) newErrors.phone = 'נא להזין מספר טלפון לחזרה';
      if (!formData.institution) newErrors.institution = 'נא לבחור מוסד לימודים';
      if (formData.institution === 'מוסד אקדמי אחר...' && !formData.customInstitution?.trim()) {
        newErrors.customInstitution = 'נא לציין את שם המוסד';
      }
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'נא לבחור תחום לימודים';
    }

    if (step === 2) {
      if (!formData.whyAmbassador.trim() || formData.whyAmbassador.trim().length < 20) {
        newErrors.whyAmbassador = 'נא לפרט לפחות 20 תווים מדוע תרצו להיות שגרירי Gemini';
      }
      if (!formData.currentGeminiUsage.trim()) {
        newErrors.currentGeminiUsage = 'נא לספר בקצרה על השימוש שלכם ב-Gemini כיום';
      }
    }

    if (step === 3) {
      if (formData.primaryStrengths.length === 0) {
        newErrors.primaryStrengths = 'נא לבחור לפחות תחום חוזק אחד';
      }
      if (!formData.pastLeadershipExperience.trim()) {
        newErrors.pastLeadershipExperience = 'נא לתאר בקצרה ניסיון קודם או פעילות שהובלתם';
      }
    }

    if (step === 4) {
      if (!formData.proposedFirstEvent.trim()) {
        newErrors.proposedFirstEvent = 'נא להציע רעיון לפעילות או סדנה ראשונה';
      }
    }

    if (step === 5) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'יש לאשר את תנאי התוכנית והפרטיות להגשת המועמדות';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record = saveSubmission(formData);
      setSubmittedRecord(record);
      setIsSubmitting(false);
      onSubmissionSuccess();

      // Confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-gray-100 my-8 overflow-hidden relative text-right flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="סגירה"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <GeminiSparkle size={20} />
            <span className="text-xs uppercase tracking-wider font-bold text-blue-200">
              הגשת מועמדות | Google Gemini Ambassador 2026
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            שאלון מועמדות לשגרירות ה-AI של Google בישראל
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            הזדמנות להוביל את מהפכת ה-AI בקמפוס שלכם, ללמוד מהטובים ביותר ולהשפיע.
          </p>

          {/* Progress Steps (Only if not submitted yet) */}
          {!submittedRecord && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-200 mb-2">
                <span>שלב {currentStep} מתוך {TOTAL_STEPS}</span>
                <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}% הושלם</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-yellow-300 via-emerald-400 to-cyan-300 transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {submittedRecord ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
                  המועמדות נקלטה בהצלחה!
                </span>
                <h4 className="text-3xl font-extrabold text-gray-900 mb-2">
                  תודה רבה, {submittedRecord.fullName}!
                </h4>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                  השאלון שלך התקבל בצוות שגרירי Google Gemini בישראל. קיבלנו את פרטיך ונחזור אליך במייל ובטלפון בקרוב מאוד.
                </p>
              </div>

              {/* Submission Code Box */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 max-w-md mx-auto">
                <div className="text-xs text-blue-600 font-semibold mb-1">מספר מועמדות ייחודי למעקב:</div>
                <div className="font-mono text-xl font-extrabold text-blue-900 tracking-wider">
                  {submittedRecord.id}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  מוסד לימודים: {submittedRecord.institution}
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-gray-50 rounded-2xl p-5 max-w-md mx-auto text-right text-xs sm:text-sm text-gray-700 space-y-2 border border-gray-100">
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>מה קורה עכשיו?</span>
                </div>
                <p>1. הצוות בוחן את התשובות והחזון שהצגת בשאלון.</p>
                <p>2. מועמדים מתאימים יקבלו הזמנה לשיחת היכרות קצרה (Zoom) תוך מספר ימים.</p>
                <p>3. לקראת כנס הפתיחה יישלחו פרטים על ערכת השגריר ושלבי ההכשרה.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto bg-[#1A73E8] hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition-all text-sm"
                >
                  חזרה לאתר התוכנית
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Personal & Academic Info */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>שלב 1: פרטים אישיים ואקדמיים</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      ספרו לנו מי אתם ואיפה אתם לומדים
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        שם מלא <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="ישראל ישראלי"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        כתובת אימייל (רצוי סטודנטיאלית) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="yourname@post.tau.ac.il"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        טלפון נייד (לוואטסאפ ולעדכונים) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="050-1234567"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        עיר מגורים
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="תל אביב / ירושלים / חיפה..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    {/* Institution */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        מוסד אקדמי <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.institution}
                        onChange={(e) => handleChange('institution', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="">-- בחרו את מוסד הלימודים שלכם --</option>
                        {ISRAELI_INSTITUTIONS.map((inst, i) => (
                          <option key={i} value={inst}>{inst}</option>
                        ))}
                      </select>
                      {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
                    </div>

                    {/* Custom Institution if selected */}
                    {formData.institution === 'מוסד אקדמי אחר...' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          ציינו את שם המוסד האקדמי <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.customInstitution || ''}
                          onChange={(e) => handleChange('customInstitution', e.target.value)}
                          placeholder="שם המכללה או האוניברסיטה"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.customInstitution && <p className="text-xs text-red-500 mt-1">{errors.customInstitution}</p>}
                      </div>
                    )}

                    {/* Field of Study */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        תחום לימודים / חוג <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="">-- בחרו תחום לימודים --</option>
                        {FIELDS_OF_STUDY.map((field, i) => (
                          <option key={i} value={field}>{field}</option>
                        ))}
                      </select>
                      {errors.fieldOfStudy && <p className="text-xs text-red-500 mt-1">{errors.fieldOfStudy}</p>}
                    </div>

                    {/* Study Year */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        שנת לימודים נוכחית
                      </label>
                      <select
                        value={formData.currentYear}
                        onChange={(e) => handleChange('currentYear', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="שנה א'">שנה א'</option>
                        <option value="שנה ב'">שנה ב'</option>
                        <option value="שנה ג'">שנה ג'</option>
                        <option value="שנה ד'">שנה ד'</option>
                        <option value="תואר שני">תואר שני (M.Sc / MBA)</option>
                      </select>
                    </div>

                    {/* LinkedIn Profile */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        פרופיל LinkedIn (מומלץ מאוד)
                      </label>
                      <input
                        type="url"
                        value={formData.linkedInUrl}
                        onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Passion & Why Gemini */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span>שלב 2: תשוקה ולמה שגריר/ת Gemini?</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      מה מחבר אתכם ל-Google Gemini ומה המוטיבציה שלכם להוביל
                    </p>
                  </div>

                  {/* Question: Why Ambassador */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      מדוע את/ה רוצה להיות שגריר/ת Google Gemini בקמפוס שלך? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      ספרו מה מניע אתכם, איזה חותם תרצו להשאיר וכיצד התפקיד יתרום להתפתחותכם האישית והמקצועית.
                    </p>
                    <textarea
                      rows={4}
                      value={formData.whyAmbassador}
                      onChange={(e) => handleChange('whyAmbassador', e.target.value)}
                      placeholder="התשוקה שלי לבינה מלאכותית התחילה כאשר... אני רוצה להיות שגריר כי..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                    />
                    {errors.whyAmbassador && <p className="text-xs text-red-500 mt-1">{errors.whyAmbassador}</p>}
                  </div>

                  {/* Question: Current Usage */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      כיצד את/ה משתמש/ת כיום ב-Gemini בלימודים, בעבודה או בחיי היומיום? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      דוגמה למשימה, פרומפט מיוחד, כתיבת קוד, ניתוח מאמרים אקדמיים או פרויקט אישי שיצרתם.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.currentGeminiUsage}
                      onChange={(e) => handleChange('currentGeminiUsage', e.target.value)}
                      placeholder="לדוגמה: אני נעזר ב-Gemini לסיכום מאמרים מורכבים במחקר שלי, או לכתיבת סקריפטים ב-Python..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                    />
                    {errors.currentGeminiUsage && <p className="text-xs text-red-500 mt-1">{errors.currentGeminiUsage}</p>}
                  </div>

                  {/* Question: Favorite Feature */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      מה הפיצ'ר האהוב עליך ביותר ב-Gemini (למשל: Context Window ארוך, Multimodal, Workspace integration, Gems)?
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteGeminiFeature}
                      onChange={(e) => handleChange('favoriteGeminiFeature', e.target.value)}
                      placeholder="לדוגמה: היכולת להעלות קבצי PDF גדולים ולשאול שאלות מעמיקות / ניתוח וידאו"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Strengths & Skills */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span>שלב 3: במה את/ה הכי טוב/ה? חוזקות וכישורים</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      כל שגריר מביא ערך ייחודי — ספרו לנו איפה החוזקות שלכם בולטות
                    </p>
                  </div>

                  {/* Strengths Multi-Select */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      תחומי החוזק הבולטים שלכם (ניתן לבחור יותר מאחד) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {STRENGTH_OPTIONS.map((strength) => {
                        const isChecked = formData.primaryStrengths.includes(strength.label);
                        return (
                          <div
                            key={strength.id}
                            onClick={() => toggleArrayItem('primaryStrengths', strength.label)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 text-xs sm:text-sm font-medium ${
                              isChecked
                                ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-xs'
                                : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{strength.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.primaryStrengths && <p className="text-xs text-red-500 mt-1">{errors.primaryStrengths}</p>}
                  </div>

                  {/* Past Leadership & Initiative */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ספרו על פרויקט, אירוע, צוות או יוזמה שהובלתם בעבר <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      זה יכול להיות באוניברסיטה, בשירות הצבאי/לאומי, בעבודה, בתנועת נוער או בפרויקט קוד פתוח.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.pastLeadershipExperience}
                      onChange={(e) => handleChange('pastLeadershipExperience', e.target.value)}
                      placeholder="במסגרת הלימודים / השירות יזמתי... האתגר היה... והתוצאה הייתה..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                    />
                    {errors.pastLeadershipExperience && <p className="text-xs text-red-500 mt-1">{errors.pastLeadershipExperience}</p>}
                  </div>

                  {/* Technical & Community Skills Chips */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      כלים ומיומנויות טכניות שאתם שולטים בהם (אופציונלי):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TECHNICAL_SKILL_OPTIONS.map((skill, i) => {
                        const isSelected = formData.technicalSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => toggleArrayItem('technicalSkills', skill)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Campus Vision & Outreach */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                      <span>שלב 4: חזון ויוזמה בקמפוס</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      כיצד תהפכו את Gemini לחלק מחיי הסטודנטים במוסד שלכם
                    </p>
                  </div>

                  {/* First Event Idea */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      איזה אירוע או סדנה ראשונה תרצו להפיק בקמפוס שלכם? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      לדוגמה: "סדנת Prompt Engineering למדעי החברה", "האקתון פיתוח עם Gemini API", "אירוע AI לעיצוב ויצירתיות".
                    </p>
                    <textarea
                      rows={3}
                      value={formData.proposedFirstEvent}
                      onChange={(e) => handleChange('proposedFirstEvent', e.target.value)}
                      placeholder="הייתי מקים סדנה של שעתיים שבה כל סטודנט בונה עוזר אישי למבחנים בעזרת Gemini..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                    />
                    {errors.proposedFirstEvent && <p className="text-xs text-red-500 mt-1">{errors.proposedFirstEvent}</p>}
                  </div>

                  {/* Non-Tech Outreach */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      איך תרתמו סטודנטים שלא מגיעים מרקע טכנולוגי (משפטים, מנהל עסקים, עיצוב) להשתמש ב-Gemini?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.nonTechOutreachStrategy}
                      onChange={(e) => handleChange('nonTechOutreachStrategy', e.target.value)}
                      placeholder="אראה להם דוגמאות מותאמות לתחום שלהם, כמו סיכום תקדימים משפטיים או ניתוח דוחות שוק פיננסיים..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                    />
                  </div>

                  {/* Video Pitch (Optional) */}
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <label className="block text-xs font-bold text-blue-900 mb-1">
                      סרטון היכרות קצר (אופציונלי - יתרון משמעותי)
                    </label>
                    <p className="text-[11px] text-gray-500 mb-2">
                      קישור לסרטון של 60 שניות (Loom, YouTube, Drive) שבו אתם מספרים על עצמכם ועל ההתלהבות שלכם מ-AI.
                    </p>
                    <input
                      type="url"
                      value={formData.videoPitchUrl || ''}
                      onChange={(e) => handleChange('videoPitchUrl', e.target.value)}
                      placeholder="https://www.loom.com/share/... או YouTube link"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Commitment & Final Review */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Check className="w-5 h-5 text-blue-600" />
                      <span>שלב 5: זמינות, התחייבות וסיכום לפני שליחה</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      סקירה מהירה של פרטי המועמדות ואישור התנאים
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2 text-xs sm:text-sm">
                    <div className="font-bold text-gray-900 mb-2">תמצית המועמדות:</div>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div><span className="font-semibold">שם:</span> {formData.fullName || '—'}</div>
                      <div><span className="font-semibold">אימייל:</span> {formData.email || '—'}</div>
                      <div><span className="font-semibold">מוסד:</span> {formData.institution || '—'}</div>
                      <div><span className="font-semibold">תחום:</span> {formData.fieldOfStudy || '—'}</div>
                    </div>
                    {formData.primaryStrengths.length > 0 && (
                      <div className="pt-2 text-gray-700">
                        <span className="font-semibold">חוזקות שנבחרו: </span>
                        {formData.primaryStrengths.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Weekly Hours */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      היקף שעות שבועי שתוכלו להקדיש לפעילות:
                    </label>
                    <select
                      value={formData.weeklyCommitmentHours}
                      onChange={(e) => handleChange('weeklyCommitmentHours', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="2-3 שעות שבועיות">2-3 שעות שבועיות (גמיש)</option>
                      <option value="3-5 שעות שבועיות">3-5 שעות שבועיות (מומלץ)</option>
                      <option value="6+ שעות שבועיות">6+ שעות שבועיות (הובלה אינטנסיבית)</option>
                    </select>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-2 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded mt-1 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 leading-normal">
                        אני מאשר/ת כי הפרטים שנמסרו נכונים, כי אני סטודנט/ית פעיל/ה באקדמיה, ומסכים/ה לקבל עדכונים מנבחרת שגרירי Google Gemini בנוגע למיון התוכנית. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-xs text-red-500">{errors.agreedToTerms}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allowSharingInfo}
                        onChange={(e) => handleChange('allowSharingInfo', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded mt-1 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-500 leading-normal">
                        אני מאשר/ת שיתוף פרטי הקשר שלי עם שותפי הפעילות של Google בישראל לצורך הפקת אירועי הקמפוס.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-sm flex items-center gap-1.5 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>חזרה לשלב הקודם</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1A73E8] hover:bg-blue-700 text-white px-7 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>המשך לשלב הבא</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#1A73E8] via-[#346BF1] to-[#7C4DFF] hover:from-blue-700 hover:to-purple-800 text-white px-8 py-3 rounded-full font-bold text-base flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>שולח מועמדות...</span>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span>שליחת מועמדות לתוכנית 2026</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
