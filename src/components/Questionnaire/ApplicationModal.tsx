import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Clock } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      const draft = getDraft();
      setFormData(draft);
      setSubmittedRecord(null);
      setCurrentStep(1);
    }
  }, [isOpen]);

  const handleChange = (field: keyof ApplicationFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });

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
      if (!formData.phone.trim()) newErrors.phone = 'נא להזין מספר טלפון';
      if (!formData.institution) newErrors.institution = 'נא לבחור מוסד אקדמי';
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
        newErrors.currentGeminiUsage = 'נא לספר על השימוש שלכם ב-Gemini כיום';
      }
    }

    if (step === 3) {
      if (formData.primaryStrengths.length === 0) {
        newErrors.primaryStrengths = 'נא לבחור לפחות תחום חוזק אחד';
      }
      if (!formData.pastLeadershipExperience.trim()) {
        newErrors.pastLeadershipExperience = 'נא לתאר בקצרה ניסיון קודם או יוזמה שהובלתם';
      }
    }

    if (step === 4) {
      if (!formData.proposedFirstEvent.trim()) {
        newErrors.proposedFirstEvent = 'נא להציע רעיון לפעילות או סדנה ראשונה בקמפוס';
      }
    }

    if (step === 5) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'יש לאשר את תנאי התוכנית להגשת המועמדות';
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

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-xl border border-gray-100 my-8 overflow-hidden relative text-right flex flex-col max-h-[92vh]">
        {/* Minimal Google Header */}
        <div className="bg-[#E8F0FE] p-6 sm:p-8 relative shrink-0 border-b border-blue-100/60">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full hover:bg-blue-100 text-gray-500 transition-colors"
            aria-label="סגירה"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs font-semibold text-[#346BF1] mb-1">
            Google Student Ambassador 2026 | ישראל
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            שאלון מועמדות לשגרירות
          </h3>

          {!submittedRecord && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1.5">
                <span>שלב {currentStep} מתוך {TOTAL_STEPS}</span>
                <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}% הושלם</span>
              </div>
              <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#346BF1] transition-all duration-300 rounded-full"
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
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  תודה רבה, {submittedRecord.fullName}!
                </h4>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  השאלון שלך התקבל בהצלחה בנבחרת שגרירי Google Gemini בישראל. קיבלנו את פנייתך ונחזור אליך במייל ובטלפון בהקדם.
                </p>
              </div>

              {/* Submission Code Box */}
              <div className="bg-[#F4F7FC] border border-gray-200 rounded-2xl p-4 max-w-md mx-auto">
                <div className="text-xs text-gray-500 mb-1 font-medium">מספר מועמדות למעקב:</div>
                <div className="font-mono text-xl font-bold text-[#346BF1] tracking-wider">
                  {submittedRecord.id}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  מוסד אקדמי: {submittedRecord.institution}
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-gray-50 rounded-2xl p-4 max-w-md mx-auto text-right text-xs sm:text-sm text-gray-600 space-y-1.5 border border-gray-100">
                <div className="font-semibold text-gray-800 flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-[#346BF1]" />
                  <span>השלבים הבאים:</span>
                </div>
                <p>• בדיקת השאלון והחזון שהצגת ע"י צוות התוכנית.</p>
                <p>• מועמדים מתאימים יקבלו זימון לשיחת היכרות קצרה (Zoom).</p>
                <p>• פרטים על כנס הפתיחה וערכת השגריר יישלחו למתקבלים.</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#346BF1] hover:bg-blue-600 text-white font-medium px-8 py-2.5 rounded-full transition-colors text-sm"
                >
                  חזרה לאתר
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Personal & Academic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      שלב 1: פרטים אישיים ואקדמיים
                    </h4>
                    <p className="text-xs text-gray-500">ספרו לנו מי אתם והיכן אתם לומדים</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        שם מלא <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="ישראל ישראלי"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        כתובת אימייל <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="name@campus.ac.il"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        טלפון נייד <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="050-1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        עיר מגורים
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="תל אביב / חיפה / ירושלים..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        מוסד אקדמי <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.institution}
                        onChange={(e) => handleChange('institution', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm bg-white"
                      >
                        <option value="">-- בחרו מוסד לימודים --</option>
                        {ISRAELI_INSTITUTIONS.map((inst, i) => (
                          <option key={i} value={inst}>{inst}</option>
                        ))}
                      </select>
                      {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
                    </div>

                    {formData.institution === 'מוסד אקדמי אחר...' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          ציינו את שם המוסד האקדמי <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.customInstitution || ''}
                          onChange={(e) => handleChange('customInstitution', e.target.value)}
                          placeholder="שם המכללה או המוסד"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                        />
                        {errors.customInstitution && <p className="text-xs text-red-500 mt-1">{errors.customInstitution}</p>}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        תחום לימודים / חוג <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm bg-white"
                      >
                        <option value="">-- בחרו תחום לימודים --</option>
                        {FIELDS_OF_STUDY.map((field, i) => (
                          <option key={i} value={field}>{field}</option>
                        ))}
                      </select>
                      {errors.fieldOfStudy && <p className="text-xs text-red-500 mt-1">{errors.fieldOfStudy}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        שנת לימודים
                      </label>
                      <select
                        value={formData.currentYear}
                        onChange={(e) => handleChange('currentYear', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm bg-white"
                      >
                        <option value="שנה א'">שנה א'</option>
                        <option value="שנה ב'">שנה ב'</option>
                        <option value="שנה ג'">שנה ג'</option>
                        <option value="שנה ד'">שנה ד'</option>
                        <option value="תואר שני">תואר שני</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        קישור לפרופיל LinkedIn (מומלץ)
                      </label>
                      <input
                        type="url"
                        value={formData.linkedInUrl}
                        onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Passion & Why Gemini */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      שלב 2: תשוקה ולמה שגריר/ת Gemini?
                    </h4>
                    <p className="text-xs text-gray-500">החיבור האישי שלכם לטכנולוגיה ולתוכנית</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      מדוע את/ה רוצה להיות שגריר/ת Google Gemini בקמפוס שלך? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.whyAmbassador}
                      onChange={(e) => handleChange('whyAmbassador', e.target.value)}
                      placeholder="ספרו מה מניע אתכם ואיזה שינוי תרצו להוביל בקמפוס שלכם..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm leading-relaxed"
                    />
                    {errors.whyAmbassador && <p className="text-xs text-red-500 mt-1">{errors.whyAmbassador}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      כיצד את/ה משתמש/ת כיום ב-Gemini בלימודים או ביומיום? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.currentGeminiUsage}
                      onChange={(e) => handleChange('currentGeminiUsage', e.target.value)}
                      placeholder="דוגמה לשימוש מעשי, כתיבת קוד, ניתוח מאמרים או סיעור מוחות..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm leading-relaxed"
                    />
                    {errors.currentGeminiUsage && <p className="text-xs text-red-500 mt-1">{errors.currentGeminiUsage}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      מה הפיצ'ר האהוב עליך ביותר ב-Gemini?
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteGeminiFeature}
                      onChange={(e) => handleChange('favoriteGeminiFeature', e.target.value)}
                      placeholder="לדוגמה: ניתוח קבצי PDF ארוכים, Multimodal, Gems מותאמים..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Strengths & Skills */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      שלב 3: במה את/ה הכי טוב/ה?
                    </h4>
                    <p className="text-xs text-gray-500">החוזקות והמיומנויות שאתם מביאים לצוות</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      תחומי החוזק הבולטים שלך (ניתן לבחור יותר מאחד) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {STRENGTH_OPTIONS.map((strength) => {
                        const isChecked = formData.primaryStrengths.includes(strength.label);
                        return (
                          <div
                            key={strength.id}
                            onClick={() => toggleArrayItem('primaryStrengths', strength.label)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 text-xs sm:text-sm ${
                              isChecked
                                ? 'bg-[#E8F0FE] border-[#346BF1] text-[#346BF1] font-semibold'
                                : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-[#346BF1] border-[#346BF1] text-white' : 'border-gray-300'
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

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      ספרו על מיזם, אירוע או פעילות שהובלתם בעבר <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.pastLeadershipExperience}
                      onChange={(e) => handleChange('pastLeadershipExperience', e.target.value)}
                      placeholder="בלימודים, בשירות הצבאי/לאומי, בעבודה או בפרויקט קהילתי..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm leading-relaxed"
                    />
                    {errors.pastLeadershipExperience && <p className="text-xs text-red-500 mt-1">{errors.pastLeadershipExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      כלים ומיומנויות (אופציונלי):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TECHNICAL_SKILL_OPTIONS.map((skill, i) => {
                        const isSelected = formData.technicalSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => toggleArrayItem('technicalSkills', skill)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              isSelected
                                ? 'bg-[#346BF1] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

              {/* STEP 4: Campus Vision */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      שלב 4: חזון ויוזמה בקמפוס
                    </h4>
                    <p className="text-xs text-gray-500">איך תהפכו את Gemini למוביל אצלכם</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      איזה אירוע או סדנה ראשונה תרצו להפיק בקמפוס? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.proposedFirstEvent}
                      onChange={(e) => handleChange('proposedFirstEvent', e.target.value)}
                      placeholder="לדוגמה: סדנת כתיבת פרומפטים, האקתון פיתוח עם Gemini API, מפגש מבוא..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm leading-relaxed"
                    />
                    {errors.proposedFirstEvent && <p className="text-xs text-red-500 mt-1">{errors.proposedFirstEvent}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      איך תרתמו סטודנטים שלא מגיעים מרקע טכנולוגי (עיצוב, עסקים, משפטים)?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.nonTechOutreachStrategy}
                      onChange={(e) => handleChange('nonTechOutreachStrategy', e.target.value)}
                      placeholder="הדגמות מותאמות לתחום שלהם, כמו סיכום מאמרים, ניתוח נתונים או יצירת תוכן..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      קישור לסרטון היכרות קצר (אופציונלי - יתרון משמעותי)
                    </label>
                    <input
                      type="url"
                      value={formData.videoPitchUrl || ''}
                      onChange={(e) => handleChange('videoPitchUrl', e.target.value)}
                      placeholder="קישור ל-Loom, YouTube או Drive..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2 mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      שלב 5: סיכום ואישור
                    </h4>
                    <p className="text-xs text-gray-500">סקירת הפרטים לפני שליחה לצוות</p>
                  </div>

                  <div className="bg-[#F4F7FC] p-4 rounded-xl border border-gray-200 text-xs sm:text-sm space-y-2 text-gray-700">
                    <div className="font-bold text-gray-900">פרטי מועמדות:</div>
                    <div><span className="font-semibold">שם:</span> {formData.fullName}</div>
                    <div><span className="font-semibold">אימייל:</span> {formData.email}</div>
                    <div><span className="font-semibold">מוסד אקדמי:</span> {formData.institution}</div>
                    <div><span className="font-semibold">חוג:</span> {formData.fieldOfStudy}</div>
                    {formData.primaryStrengths.length > 0 && (
                      <div><span className="font-semibold">חוזקות:</span> {formData.primaryStrengths.join(', ')}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      היקף שעות שבועי שתוכלו להקדיש:
                    </label>
                    <select
                      value={formData.weeklyCommitmentHours}
                      onChange={(e) => handleChange('weeklyCommitmentHours', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#346BF1] text-sm bg-white"
                    >
                      <option value="2-3 שעות שבועיות">2-3 שעות שבועיות</option>
                      <option value="3-5 שעות שבועיות (מומלץ)">3-5 שעות שבועיות (מומלץ)</option>
                      <option value="6+ שעות שבועיות">6+ שעות שבועיות</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="w-4 h-4 text-[#346BF1] rounded mt-0.5 border-gray-300 focus:ring-[#346BF1]"
                      />
                      <span className="text-xs text-gray-600 leading-normal">
                        אני מאשר/ת כי הפרטים שנמסרו נכונים, כי אני סטודנט/ית פעיל/ה באקדמיה, ומסכים/ה לקבל עדכונים מנבחרת שגרירי Google Gemini בנוגע למיון התוכנית. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-xs text-red-500 mt-1">{errors.agreedToTerms}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>הקודם</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#346BF1] hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>הבא</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#346BF1] hover:bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'שולח...' : 'שליחת מועמדות לתוכנית 2026'}
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
