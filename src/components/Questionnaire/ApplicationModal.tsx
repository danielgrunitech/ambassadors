import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  User,
  Sparkles,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Video,
  FileCheck
} from 'lucide-react';
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
import { CustomSelect } from './CustomSelect';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmissionSuccess: () => void;
}

const TOTAL_STEPS = 5;

const STEP_DEFINITIONS = [
  { step: 1, title: 'פרטים אישיים', icon: User },
  { step: 2, title: 'מוטיבציה ו-AI', icon: Sparkles },
  { step: 3, title: 'חוזקות וכישורים', icon: Award },
  { step: 4, title: 'חזון בקמפוס', icon: BookOpen },
  { step: 5, title: 'סיכום והגשה', icon: FileCheck },
];

const STUDY_YEARS = [
  "שנה א'",
  "שנה ב'",
  "שנה ג'",
  "שנה ד'",
  "תואר שני"
];

const COMMITMENT_OPTIONS = [
  {
    id: '2-3 שעות שבועיות',
    title: '2-3 שעות',
    subtitle: 'השתתפות גמישה',
    badge: 'בסיסי'
  },
  {
    id: '3-5 שעות שבועיות (מומלץ)',
    title: '3-5 שעות',
    subtitle: 'היקף אידיאלי לסדנאות וקהילה',
    badge: 'מומלץ ★',
    recommended: true
  },
  {
    id: '6+ שעות שבועיות',
    title: '6+ שעות',
    subtitle: 'הובלת פרויקטים אינטנסיבית',
    badge: 'מנהיגות'
  }
];

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
        const modalContainer = document.getElementById('modal-scroll-area');
        if (modalContainer) modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const modalContainer = document.getElementById('modal-scroll-area');
      if (modalContainer) modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
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
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 my-6 overflow-hidden relative text-right flex flex-col max-h-[90vh]">
        {/* Minimal Google Header */}
        <div className="bg-[#E8F0FE] p-6 sm:p-7 relative shrink-0 border-b border-blue-100/70">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full hover:bg-blue-100/80 text-gray-500 transition-colors"
            aria-label="סגירה"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#346BF1] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              2026
            </span>
            <span className="text-xs font-semibold text-gray-600">
              Google Student Ambassador | שגרירות ישראל
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            שאלון הגשת מועמדות
          </h3>

          {/* Elevated Stepper Header */}
          {!submittedRecord && (
            <div className="mt-5">
              {/* Stepper Tabs */}
              <div className="grid grid-cols-5 gap-1 text-center mb-2.5">
                {STEP_DEFINITIONS.map((def) => {
                  const isPassed = currentStep > def.step;
                  const isCurrent = currentStep === def.step;
                  return (
                    <button
                      key={def.step}
                      type="button"
                      onClick={() => {
                        if (def.step < currentStep) setCurrentStep(def.step);
                      }}
                      className={`flex flex-col items-center gap-1 transition-all ${
                        isPassed ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#346BF1] text-white ring-4 ring-blue-100'
                            : isPassed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/80 text-gray-400 border border-gray-200'
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : def.step}
                      </div>
                      <span
                        className={`text-[10px] hidden sm:inline-block font-semibold transition-colors ${
                          isCurrent
                            ? 'text-gray-900'
                            : isPassed
                            ? 'text-emerald-700'
                            : 'text-gray-400'
                        }`}
                      >
                        {def.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#346BF1] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div id="modal-scroll-area" className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {submittedRecord ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
                  המועמדות הוגשה בהצלחה!
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                  תודה רבה, {submittedRecord.fullName}!
                </h4>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  השאלון שלך התקבל בנבחרת שגרירי Google Gemini בישראל ונשמר בטבלת המועמדים. נחזור אליך במייל ובטלפון בהקדם.
                </p>
              </div>

              {/* Unique ID Box */}
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 max-w-md mx-auto">
                <div className="text-xs text-gray-500 mb-1 font-medium">מספר מועמדות למעקב:</div>
                <div className="font-mono text-xl font-extrabold text-[#346BF1] tracking-wider">
                  {submittedRecord.id}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  מוסד אקדמי: {submittedRecord.institution}
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-gray-50 rounded-2xl p-4 max-w-md mx-auto text-right text-xs sm:text-sm text-gray-600 space-y-2 border border-gray-100">
                <div className="font-bold text-gray-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#346BF1]" />
                  <span>מה השלבים הבאים?</span>
                </div>
                <p>1. הצוות יבחן את השאלון, החוזקות והרעיונות שהצגת.</p>
                <p>2. מועמדים מתאימים יוזמנו לשיחת היכרות קצרה (Zoom).</p>
                <p>3. פרטי אירוע הפתיחה וערכות השגריר יישלחו לקראת ההשקה.</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="bg-[#346BF1] hover:bg-blue-600 text-white font-medium px-8 py-2.5 rounded-full transition-colors text-sm shadow-xs"
                >
                  חזרה לאתר התוכנית
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ================= STEP 1: Personal & Academic Info ================= */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      פרטים אישיים ואקדמיים
                    </h4>
                    <p className="text-xs text-gray-500">ספרו לנו מי אתם והיכן אתם לומדים</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        שם מלא <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="ישראל ישראלי"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        כתובת אימייל <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="name@campus.ac.il"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        טלפון נייד <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="050-1234567"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        עיר מגורים
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="תל אביב / חיפה / ירושלים..."
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                    </div>

                    {/* Institution (Custom Searchable Dropdown) */}
                    <div className="sm:col-span-2">
                      <CustomSelect
                        label="מוסד אקדמי"
                        required
                        value={formData.institution}
                        onChange={(val) => handleChange('institution', val)}
                        options={ISRAELI_INSTITUTIONS}
                        placeholder="בחרו את האוניברסיטה או המכללה שלכם"
                        searchable
                        icon={<GraduationCap className="w-4 h-4" />}
                        error={errors.institution}
                      />
                    </div>

                    {/* Custom Institution (if 'other' selected) */}
                    {formData.institution === 'מוסד אקדמי אחר...' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          ציינו את שם המוסד האקדמי <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.customInstitution || ''}
                          onChange={(e) => handleChange('customInstitution', e.target.value)}
                          placeholder="שם המכללה או המוסד"
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] text-sm"
                        />
                        {errors.customInstitution && <p className="text-xs text-red-500 mt-1 font-medium">{errors.customInstitution}</p>}
                      </div>
                    )}

                    {/* Field of Study (Custom Dropdown) */}
                    <div className="sm:col-span-2">
                      <CustomSelect
                        label="תחום לימודים / חוג"
                        required
                        value={formData.fieldOfStudy}
                        onChange={(val) => handleChange('fieldOfStudy', val)}
                        options={FIELDS_OF_STUDY}
                        placeholder="בחרו תחום לימודים"
                        searchable
                        icon={<Briefcase className="w-4 h-4" />}
                        error={errors.fieldOfStudy}
                      />
                    </div>

                    {/* Current Year - Modern Segmented Control */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        שנת לימודים נוכחית
                      </label>
                      <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-[#F1F5F9] rounded-2xl">
                        {STUDY_YEARS.map((year) => {
                          const isSelected = formData.currentYear === year;
                          return (
                            <button
                              key={year}
                              type="button"
                              onClick={() => handleChange('currentYear', year)}
                              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                                isSelected
                                  ? 'bg-white text-[#346BF1] shadow-xs'
                                  : 'text-gray-500 hover:text-gray-900'
                              }`}
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* LinkedIn URL */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                        <span>פרופיל LinkedIn (מומלץ מאוד)</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </label>
                      <input
                        type="url"
                        value={formData.linkedInUrl}
                        onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: Motivation & Passion ================= */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      תשוקה ומוטיבציה לשגרירות
                    </h4>
                    <p className="text-xs text-gray-500">מה החיבור שלכם ל-Google Gemini ולמה חשוב לכם להוביל</p>
                  </div>

                  {/* Why Ambassador */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      מדוע את/ה רוצה להיות שגריר/ת Google Gemini בקמפוס שלך? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      ספרו מה מניע אתכם, איזה חותם תרצו להשאיר וכיצד התפקיד יתרום להתפתחותכם.
                    </p>
                    <textarea
                      rows={4}
                      value={formData.whyAmbassador}
                      onChange={(e) => handleChange('whyAmbassador', e.target.value)}
                      placeholder="התשוקה שלי לבינה מלאכותית התחילה כאשר... אני רוצה להוביל את התוכנית בקמפוס כי..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                    />
                    {errors.whyAmbassador && <p className="text-xs text-red-500 mt-1 font-medium">{errors.whyAmbassador}</p>}
                  </div>

                  {/* Current Gemini Usage */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      כיצד את/ה משתמש/ת כיום ב-Gemini בלימודים או ביומיום? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      דוגמה מעשית למשימה, פרומפט מיוחד, כתיבת קוד, ניתוח מאמרים או פרויקט אישי.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.currentGeminiUsage}
                      onChange={(e) => handleChange('currentGeminiUsage', e.target.value)}
                      placeholder="לדוגמה: אני נעזר/ת ב-Gemini לסיכום מאמרים אקדמיים, לכתיבת סקריפטים ב-Python, או לסיעור מוחות..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                    />
                    {errors.currentGeminiUsage && <p className="text-xs text-red-500 mt-1 font-medium">{errors.currentGeminiUsage}</p>}
                  </div>

                  {/* Favorite Feature */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      מה הפיצ'ר האהוב עליך ביותר ב-Gemini?
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteGeminiFeature}
                      onChange={(e) => handleChange('favoriteGeminiFeature', e.target.value)}
                      placeholder="לדוגמה: חלון הקשר של 2M טוקנים, Multimodal (וידאו ותמונות), Google Workspace integration..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                    />
                  </div>
                </div>
              )}

              {/* ================= STEP 3: Strengths & Skills ================= */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      במה את/ה הכי טוב/ה? חוזקות וכישורים
                    </h4>
                    <p className="text-xs text-gray-500">בחרו את התחומים שבהם אתם מביאים ערך מיוחד</p>
                  </div>

                  {/* Interactive Strength Cards */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      תחומי החוזק הבולטים שלך (ניתן לבחור יותר מאחד) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {STRENGTH_OPTIONS.map((strength) => {
                        const isChecked = formData.primaryStrengths.includes(strength.label);
                        return (
                          <div
                            key={strength.id}
                            onClick={() => toggleArrayItem('primaryStrengths', strength.label)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 text-xs sm:text-sm font-medium ${
                              isChecked
                                ? 'bg-[#E8F0FE] border-[#346BF1] text-[#346BF1] shadow-xs'
                                : 'bg-[#F8FAFC] border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-white'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                                isChecked
                                  ? 'bg-[#346BF1] border-[#346BF1] text-white'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{strength.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.primaryStrengths && <p className="text-xs text-red-500 mt-1 font-medium">{errors.primaryStrengths}</p>}
                  </div>

                  {/* Past Leadership Experience */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      ספרו על מיזם, אירוע או פעילות שהובלתם בעבר <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      בלימודים, בשירות הצבאי/לאומי, בעבודה, בתנועת נוער או בפרויקט קהילתי.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.pastLeadershipExperience}
                      onChange={(e) => handleChange('pastLeadershipExperience', e.target.value)}
                      placeholder="במסגרת... הובלתי... האתגר המרכזי היה... והשגנו תוצאה של..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                    />
                    {errors.pastLeadershipExperience && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pastLeadershipExperience}</p>}
                  </div>

                  {/* Technical & Community Skills Chips */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      כלים ומיומנויות נוספים:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TECHNICAL_SKILL_OPTIONS.map((skill, i) => {
                        const isSelected = formData.technicalSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => toggleArrayItem('technicalSkills', skill)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-[#346BF1] text-white shadow-xs'
                                : 'bg-[#F1F5F9] text-gray-600 hover:bg-gray-200'
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

              {/* ================= STEP 4: Campus Vision ================= */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      חזון ויוזמה בקמפוס
                    </h4>
                    <p className="text-xs text-gray-500">איך תביאו את מהפכת ה-AI לקהילת הסטודנטים אצלכם</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      איזה אירוע או סדנה ראשונה תרצו להפיק בקמפוס? <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-gray-400 mb-2">
                      לדוגמה: "סדנת Prompt Engineering לבניית עוזר אישי למבחנים", "האקתון פיתוח עם Gemini API", "אירוע AI לעסקים".
                    </p>
                    <textarea
                      rows={3}
                      value={formData.proposedFirstEvent}
                      onChange={(e) => handleChange('proposedFirstEvent', e.target.value)}
                      placeholder="הייתי מארגן/ת סדנה של שעתיים שבה כל סטודנט בונה..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                    />
                    {errors.proposedFirstEvent && <p className="text-xs text-red-500 mt-1 font-medium">{errors.proposedFirstEvent}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      איך תרתמו סטודנטים שלא מגיעים מרקע טכנולוגי (משפטים, מנהל עסקים, עיצוב)?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.nonTechOutreachStrategy}
                      onChange={(e) => handleChange('nonTechOutreachStrategy', e.target.value)}
                      placeholder="אציג דוגמאות מותאמות לתחום שלהם, כמו סיכום תקדימים משפטיים או ניתוח דוחות שוק..."
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                    />
                  </div>

                  {/* Video Pitch */}
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-[#346BF1]" />
                        <span>סרטון היכרות קצר של 60 שניות (אופציונלי - יתרון גדול)</span>
                      </span>
                    </label>
                    <p className="text-[11px] text-gray-500 mb-2">
                      קישור לסרטון קצר (Loom, YouTube, Google Drive) שבו אתם מציגים את עצמכם ואת התשוקה שלכם ל-AI.
                    </p>
                    <input
                      type="url"
                      value={formData.videoPitchUrl || ''}
                      onChange={(e) => handleChange('videoPitchUrl', e.target.value)}
                      placeholder="https://www.loom.com/share/... או YouTube link"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#346BF1] text-sm"
                    />
                  </div>
                </div>
              )}

              {/* ================= STEP 5: Review & Commitment ================= */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      זמינות, התחייבות וסיכום
                    </h4>
                    <p className="text-xs text-gray-500">סקירה מהירה של פרטי המועמדות לפני שליחה</p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200 space-y-2.5 text-xs sm:text-sm">
                    <div className="font-bold text-gray-900 pb-1 border-b border-gray-200/60">
                      תמצית המועמדות שלך:
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-gray-700">
                      <div><span className="font-semibold text-gray-500">שם:</span> {formData.fullName}</div>
                      <div><span className="font-semibold text-gray-500">אימייל:</span> {formData.email}</div>
                      <div><span className="font-semibold text-gray-500">מוסד:</span> {formData.institution}</div>
                      <div><span className="font-semibold text-gray-500">חוג:</span> {formData.fieldOfStudy} ({formData.currentYear})</div>
                    </div>
                    {formData.primaryStrengths.length > 0 && (
                      <div className="pt-2 text-gray-700">
                        <span className="font-semibold text-gray-500">חוזקות שנבחרו: </span>
                        {formData.primaryStrengths.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Weekly Commitment - Rich Selectable Cards */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      היקף שעות שבועי שתוכלו להקדיש לפעילות:
                    </label>
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      {COMMITMENT_OPTIONS.map((opt) => {
                        const isSelected = formData.weeklyCommitmentHours === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleChange('weeklyCommitmentHours', opt.id)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-center flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#E8F0FE] border-[#346BF1] text-[#346BF1] shadow-xs'
                                : 'bg-[#F8FAFC] border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-white'
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mx-auto mb-1.5 ${
                                opt.recommended
                                  ? 'bg-[#346BF1] text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {opt.badge}
                            </span>
                            <div className="font-bold text-sm text-gray-900 mb-0.5">
                              {opt.title}
                            </div>
                            <div className="text-[11px] text-gray-500 leading-snug">
                              {opt.subtitle}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Terms & Declarations */}
                  <div className="pt-2 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="w-4 h-4 text-[#346BF1] rounded mt-0.5 border-gray-300 focus:ring-[#346BF1]"
                      />
                      <span className="text-xs text-gray-700 leading-normal">
                        אני מאשר/ת כי הפרטים שנמסרו נכונים, כי אני סטודנט/ית פעיל/ה באקדמיה, ומסכים/ה לקבל עדכונים מנבחרת שגרירי Google Gemini בנוגע למיון התוכנית. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-xs text-red-500 font-medium">{errors.agreedToTerms}</p>}
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-1.5 transition-colors"
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
                    className="bg-[#346BF1] hover:bg-blue-600 text-white px-7 py-2.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>המשך לשלב הבא</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#346BF1] hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'שולח מועמדות...' : 'שליחת מועמדות לתוכנית 2026 🚀'}
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
