import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Bot,
  Video,
  Smartphone,
  Users,
  Lightbulb,
  Heart,
  Coffee,
  Mic,
  Send,
  Maximize2,
  Minimize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApplicationFormData, SubmissionRecord } from '../../types';
import {
  ISRAELI_INSTITUTIONS,
  STUDY_YEARS,
  DIGITAL_PLATFORMS
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

const TOTAL_STEPS = 3;

const STEP_DEFINITIONS = [
  { step: 1, title: 'חלק 1', subtitle: 'נעים להכיר ☕' },
  { step: 2, title: 'חלק 2', subtitle: 'הניצוץ שלכם ✨' },
  { step: 3, title: 'חלק 3', subtitle: 'רגע הפיץ\' 🎙️' },
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const draft = getDraft();
      setFormData(draft);
      setSubmittedRecord(null);
      setCurrentStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

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

  const togglePlatform = (platform: string) => {
    setFormData((prev) => {
      const currentList = prev.preferredPlatforms || [];
      const updatedList = currentList.includes(platform)
        ? currentList.filter((p) => p !== platform)
        : [...currentList, platform];
      const updated = { ...prev, preferredPlatforms: updatedList };
      saveDraft(updated);
      return updated;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'נא להזין שם מלא';
      if (!formData.phone.trim()) {
        newErrors.phone = 'נא להזין מספר טלפון נייד (לוואטסאפ)';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'נא להזין כתובת דוא"ל';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'כתובת דוא"ל אינה תקינה';
      }
      if (!formData.institution) newErrors.institution = 'נא לבחור מוסד לימודים';
      if (formData.institution === 'מוסד לימודים אחר...' && !formData.customInstitution?.trim()) {
        newErrors.customInstitution = 'נא לציין את שם מוסד הלימודים';
      }
      if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'נא לציין חוג / פקולטה';
      if (!formData.hobbiesAndInterests.trim()) {
        newErrors.hobbiesAndInterests = 'ספרו לנו קצת על התחביבים ותחומי העניין שלכם!';
      }
    }

    if (step === 2) {
      if (!formData.canvasCampusProblem.trim()) {
        newErrors.canvasCampusProblem = 'נא לתאר את הבעיה או הצורך בקמפוס (אתגר 1)';
      }
      if (!formData.canvasSolutionDetails.trim()) {
        newErrors.canvasSolutionDetails = 'נא להסביר כיצד הכלי ב-Canvas יעבוד (אתגר 1)';
      }
      if (!formData.viralContentDescription.trim()) {
        newErrors.viralContentDescription = 'נא לפרט מה הפך את התוכן למוצלח ואיזה ערך הקהל קיבל (אתגר 2)';
      }
      if (!formData.communityLeadershipStory.trim()) {
        newErrors.communityLeadershipStory = 'נא לספר על מיזם או פרויקט שהובלתם מאפס (אתגר 3)';
      }
      if (!formData.campusPopUpIdea.trim()) {
        newErrors.campusPopUpIdea = 'נא להציע רעיון לפעילות פופ-אפ בקמפוס (אתגר 4)';
      }
      if (!formData.whyGoogleGeminiAmbassador.trim()) {
        newErrors.whyGoogleGeminiAmbassador = 'ספרו לנו למה אתם באמת רוצים להיות שגרירי Gemini (אתגר 5)';
      }
    }

    if (step === 3) {
      if (!formData.videoPitchUrl.trim()) {
        newErrors.videoPitchUrl = 'נא לצרף קישור לסרטון הפיץ\' (60–90 שניות)';
      }
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
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record = saveSubmission(formData);
      setSubmittedRecord(record);
      setIsSubmitting(false);
      onSubmissionSuccess();

      try {
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isFullscreen
          ? 'p-0 bg-white'
          : 'p-2 sm:p-4 md:p-6 bg-gray-900/50 backdrop-blur-xs overflow-y-auto'
      }`}
    >
      <div
        className={`bg-white text-right flex flex-col transition-all duration-200 overflow-hidden ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0 shadow-none'
            : 'w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-gray-100 my-auto max-h-[92vh]'
        }`}
      >
        {/* Header */}
        <div className="bg-[#E8F0FE] p-5 sm:p-7 relative shrink-0 border-b border-blue-100/70">
          {/* Header Action Buttons (Fullscreen & Close) */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#346BF1] border border-blue-200/80 shadow-2xs transition-all text-xs font-semibold cursor-pointer"
              title={isFullscreen ? 'חזרה לתצוגה רגילה' : 'מסך מלא'}
              aria-label={isFullscreen ? 'חזרה לתצוגה רגילה' : 'מסך מלא'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-gray-600" />
                  <span className="hidden sm:inline">תצוגה רגילה</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#346BF1]" />
                  <span className="hidden sm:inline">מסך מלא</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 border border-blue-100/80 transition-colors cursor-pointer"
              aria-label="סגירה"
              title="סגירה"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className={isFullscreen ? 'max-w-4xl mx-auto w-full pl-28 sm:pl-36' : 'pl-24 sm:pl-32'}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#346BF1] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                #TeamGemini
              </span>
              <span className="text-xs font-semibold text-gray-600">
                שגרירי הסטודנטים של Google בישראל 2026
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              שאלון הגשת מועמדות
            </h3>

            {/* Stepper Tabs */}
            {!submittedRecord && (
              <div className="mt-5">
                <div className="grid grid-cols-3 gap-2 text-center mb-2.5">
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
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCurrent
                              ? 'bg-[#346BF1] text-white ring-4 ring-blue-100'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/80 text-gray-400 border border-gray-200'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : def.step}
                        </div>
                        <span
                          className={`text-xs font-bold transition-colors ${
                            isCurrent
                              ? 'text-gray-900'
                              : isPassed
                              ? 'text-emerald-700'
                              : 'text-gray-400'
                          }`}
                        >
                          {def.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-blue-200/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#346BF1] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div id="modal-scroll-area" className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-1 space-y-6">
          <div className={isFullscreen ? 'max-w-4xl mx-auto w-full' : 'w-full'}>
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
                  השאלון שלך התקבל בנבחרת שגרירי Google Gemini בישראל ונשמר במערכת. נחזור אליך בהקדם בוואטסאפ ובמייל.
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 max-w-md mx-auto">
                <div className="text-xs text-gray-500 mb-1 font-medium">מספר מועמדות למעקב:</div>
                <div className="font-mono text-lg font-bold text-[#346BF1] tracking-wider">
                  {submittedRecord.id}
                </div>
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
              {/* Welcome Banner */}
              {currentStep === 1 && (
                <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/80 border border-blue-200/80 rounded-2xl p-5 text-right shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-bold text-[#346BF1]">#TeamGemini</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-semibold text-gray-600">הגשת מועמדות 2026</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-gray-900 mb-1.5">
                    היי לכל השגרירים לעתיד של #TeamGemini! 🚀
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
                    מוכנים להוביל, לחדש ולחבר קהילה שלמה של חובבי טכנולוגיה ו-AI? אם אתם עפים על העולמות של Google ושל בינה מלאכותית, ורוצים להביא את האנרגיה הזו ישירות לקמפוס שלכם – הגעתם בדיוק למקום הנכון!
                  </p>
                  <p className="text-xs text-gray-500">
                    אנחנו מחפשים את הטיפוסים שמזיזים עניינים, יזמים בנשמה ומובילי דעה שמוכנים לצלול לעומק ה-AI ולהביא את היצירתיות הייחודית שלהם לקדמת הבמה.
                  </p>
                </div>
              )}

              {/* ================= חלק 1: נעים להכיר ☕ ================= */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-amber-600" />
                        <span>חלק 1: נעים להכיר ☕ (קצת עליכם!)</span>
                      </h4>
                      <p className="text-xs text-gray-500">פרטי קשר, לימודים ותחומי עניין</p>
                    </div>
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

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        מספר טלפון נייד (לעדכוני WhatsApp) <span className="text-red-500">*</span>
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

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        כתובת דוא"ל (עדיפות למייל אקדמי) <span className="text-red-500">*</span>
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

                    {/* Institution */}
                    <div className="sm:col-span-2">
                      <CustomSelect
                        label="מוסד לימודים"
                        required
                        searchable
                        options={ISRAELI_INSTITUTIONS}
                        value={formData.institution}
                        onChange={(val) => handleChange('institution', val)}
                        placeholder="בחרו את מוסד הלימודים שלכם..."
                        error={errors.institution}
                      />

                      {formData.institution === 'מוסד לימודים אחר...' && (
                        <div className="mt-2.5">
                          <input
                            type="text"
                            value={formData.customInstitution || ''}
                            onChange={(e) => handleChange('customInstitution', e.target.value)}
                            placeholder="הזינו את שם המוסד האקדמי שלכם..."
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#346BF1] text-sm"
                          />
                          {errors.customInstitution && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.customInstitution}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Current Year */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        שנת לימודים נוכחית <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {STUDY_YEARS.map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            onClick={() => handleChange('currentYear', yr)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                              formData.currentYear === yr
                                ? 'bg-[#346BF1] text-white border-[#346BF1] shadow-xs'
                                : 'bg-[#F8FAFC] text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Field of Study */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        חוג / פקולטה <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                        placeholder="למשל: מדעי המחשב, משפטים, פסיכולוגיה, הנדסת תעשייה וניהול..."
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                      />
                      {errors.fieldOfStudy && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fieldOfStudy}</p>}
                    </div>

                    {/* Hobbies and Interests */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        תחביבים ותחומי עניין (מעבר לספרי הלימוד!) <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[11px] text-gray-400 mb-2">
                        מה עושה לכם את זה? בינג' סדרות, פרויקטים של קוד לתוך הלילה, יצירת תוכן ב-TikTok, או אימונים במכון? בא לנו לדעת!
                      </p>
                      <textarea
                        rows={3}
                        value={formData.hobbiesAndInterests}
                        onChange={(e) => handleChange('hobbiesAndInterests', e.target.value)}
                        placeholder="ספרו לנו קצת על מה שאתם אוהבים לעשות..."
                        className="w-full p-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed transition-all"
                      />
                      {errors.hobbiesAndInterests && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.hobbiesAndInterests}</p>
                      )}
                    </div>

                    {/* Digital Platforms */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        איפה אתם הכי אוהבים לשתף מחשבות ויצירות שלכם ברשת?
                        <span className="text-xs text-gray-400 font-normal mr-1.5">(Totally optional, but we're curious!)</span>
                      </label>
                      <p className="text-[11px] text-gray-400 mb-2.5">
                        בלוג, YouTube, LinkedIn, Instagram, TikTok, GitHub, אתר אישי או כל מקום אחר שבו הנוכחות הדיגיטלית שלכם בולטת.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {DIGITAL_PLATFORMS.map((plat) => {
                          const isSelected = formData.preferredPlatforms?.includes(plat);
                          return (
                            <button
                              key={plat}
                              type="button"
                              onClick={() => togglePlatform(plat)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-[#346BF1] text-white shadow-xs'
                                  : 'bg-[#F1F5F9] text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {isSelected ? `✓ ${plat}` : `+ ${plat}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-100">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        קישורים לפרופילים ברשתות החברתיות (מומלץ):
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="url"
                          value={formData.linkedInUrl || ''}
                          onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                          placeholder="קישור לפרופיל LinkedIn"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1]"
                        />
                        <input
                          type="url"
                          value={formData.tiktokUrl || ''}
                          onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                          placeholder="קישור ל-TikTok"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1]"
                        />
                        <input
                          type="url"
                          value={formData.instagramUrl || ''}
                          onChange={(e) => handleChange('instagramUrl', e.target.value)}
                          placeholder="קישור ל-Instagram"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1]"
                        />
                        <input
                          type="url"
                          value={formData.youtubeUrl || ''}
                          onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                          placeholder="קישור ל-YouTube / GitHub / אתר אישי"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#346BF1]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= חלק 2: הניצוץ שלכם ✨ ================= */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#FBBC04]" />
                      <span>חלק 2: תראו לנו את הניצוץ שלכם! ✨</span>
                    </h4>
                    <p className="text-xs text-gray-500">
                      בלי חפירות ומאמרים ארוכים – תראו לנו את הניסיון, היכולות והחשיבה המקורית שלכם דרך האתגרים הבאים:
                    </p>
                  </div>

                  {/* אתגר 1: חוקרי ג'מיניי (Gemini Canvas) */}
                  <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-200/80 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#346BF1] flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          אתגר 1: חוקרי ג'מיניי (חובבי ה-AI) 🤖
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                          ל-Gemini יש פיצ'ר סופר חזק שנקרא <strong>Gemini Canvas</strong> – מרחב עבודה אינטראקטיבי שבו אפשר לבנות מסמכים דינמיים, שאלונים, כלי עבודה או "אפליקציות פשוטות" רק באמצעות פרומפטים בטקסט פשוט (ללא שום צורך ברקע בטכנולוגיה או בקוד!).
                        </p>
                        <p className="text-xs text-blue-800 font-semibold mt-1">
                          המשימה שלכם: דמיינו שאתם רוצים לפתור בעיה או ליצור כלי עזר קטן ביום-יום של הסטודנטים בקמפוס שלכם בלחיצת כפתור.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        1. מה הבעיה או הצורך בקמפוס שאתם רוצים לפתור? <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[11px] text-gray-500 mb-2">
                        (לדוגמה: מחולל סימולציות מבחן למשפטים/רפואה, מפת דרכים לסיכום מאמרים אקדמיים, כלי הרשמה מהיר לאירוע חברתי, או לוח משימות אינטראקטיבי לעבודה קבוצתית).
                      </p>
                      <textarea
                        rows={2}
                        value={formData.canvasCampusProblem}
                        onChange={(e) => handleChange('canvasCampusProblem', e.target.value)}
                        placeholder="הבעיה שאני רוצה לפתור היא..."
                        className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#346BF1]"
                      />
                      {errors.canvasCampusProblem && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.canvasCampusProblem}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        2. איך הכלי האינטראקטיבי שלכם ב-Canvas יעבוד בפועל, ולמה Canvas מתאים לזה? <span className="text-red-500">*</span>
                      </label>
                      <p className="text-[11px] text-gray-500 mb-2">
                        מה המשתמשים יראו, איזה פרומפט/הנחיה תגדירו ל-Gemini, ואיך הסטודנטים יפעלו מול התוצר? למה לדעתכם פיצ'ר כמו Canvas מתאים לזה במיוחד בהשוואה לכלים אחרים?
                      </p>
                      <textarea
                        rows={3}
                        value={formData.canvasSolutionDetails}
                        onChange={(e) => handleChange('canvasSolutionDetails', e.target.value)}
                        placeholder="הכלי יאפשר לסטודנט להזין... והתוצר ב-Canvas יציג... בחרתי ב-Canvas כי..."
                        className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#346BF1]"
                      />
                      {errors.canvasSolutionDetails && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.canvasSolutionDetails}</p>
                      )}
                    </div>
                  </div>

                  {/* אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) */}
                  <div className="bg-purple-50/40 p-5 rounded-2xl border border-purple-200/80 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) 📲
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                          שתפו קישור לפוסט, סרטון (Reels / TikTok / LinkedIn) או תוכן שיצרתם בעבר שאתם ממש גאים בו.
                        </p>
                      </div>
                    </div>

                    <div>
                      <input
                        type="url"
                        value={formData.viralContentUrl}
                        onChange={(e) => handleChange('viralContentUrl', e.target.value)}
                        placeholder="קישור לפוסט / סרטון (אופציונלי אך מומלץ)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        מה הפך את התוכן למוצלח, ואיזה ערך הקהל שלכם קיבל ממנו? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={formData.viralContentDescription}
                        onChange={(e) => handleChange('viralContentDescription', e.target.value)}
                        placeholder="התוכן הצליח כי... הערך שהעוקבים קיבלו היה..."
                        className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-purple-500"
                      />
                      {errors.viralContentDescription && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.viralContentDescription}</p>
                      )}
                    </div>
                  </div>

                  {/* אתגר 3: בוני הקהילה (מחברי הקמפוס) */}
                  <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-200/80 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          אתגר 3: בוני הקהילה (מחברי הקמפוס) 🤝
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                          ספרו לנו על פעם שבה הובלתם פרויקט, יוזמה או אירוע מאפס (באקדמיה, בצבא, או בקהילת סטודנטים). מה היה האתגר הכי מורכב בדרך, ואיך רתמתם אנשים לעבודה משותפת כדי להגיע לתוצאה? <span className="text-red-500">*</span>
                        </p>
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={formData.communityLeadershipStory}
                      onChange={(e) => handleChange('communityLeadershipStory', e.target.value)}
                      placeholder="הקמתי / הובלתי את... האתגר המרכזי היה... הצלחתי לרתום אנשים על ידי..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    {errors.communityLeadershipStory && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.communityLeadershipStory}</p>
                    )}
                  </div>

                  {/* אתגר 4: ניצוץ בקמפוס (המפעילים היצירתיים) */}
                  <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200/80 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          אתגר 4: ניצוץ בקמפוס (המפעילים היצירתיים) 💡
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                          אנחנו רוצים לשנות מהקצה לקצה את הדרך שבה סטודנטים נעזרים ב-AI בקמפוס! תציעו רעיון מפתיע ומחוץ לקופסה לאירוע שטח או פעילות פופ-אפ בקמפוס (בדשא, בספריה, או בין ההרצאות) שתשנה לחלוטין את האופן שבו סטודנטים משתמשים ב-Gemini וב-NotebookLM ביום-יום האקדמי שלהם.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        מה הרעיון, איך הוא נראה בפועל, ומה יגרום לסטודנטים לעצור הכל ולהשתתף? (זקקו את זה ל-2–4 משפטים חדים!) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.campusPopUpIdea}
                        onChange={(e) => handleChange('campusPopUpIdea', e.target.value)}
                        placeholder="הרעיון שלי הוא אירוע שבו... הסטודנטים יחוו... ומה שימשוך אותם לעצור הוא..."
                        className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-amber-500"
                      />
                      {errors.campusPopUpIdea && (
                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.campusPopUpIdea}</p>
                      )}
                    </div>
                  </div>

                  {/* אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) */}
                  <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-200/80 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) 💙
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed mt-1">
                          למה אתם באמת רוצים להיות שגרירי Google Gemini? <span className="text-red-500">*</span>
                        </p>
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={formData.whyGoogleGeminiAmbassador}
                      onChange={(e) => handleChange('whyGoogleGeminiAmbassador', e.target.value)}
                      placeholder="החיבור שלי ל-Google ול-AI התחיל כאשר... חשוב לי להוביל את התוכנית הזו כי..."
                      className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-rose-500"
                    />
                    {errors.whyGoogleGeminiAmbassador && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.whyGoogleGeminiAmbassador}</p>
                    )}
                  </div>
                </div>
              )}

              {/* ================= חלק 3: רגע הפיץ' 🎙️ ================= */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-[#EA4335]" />
                      <span>חלק 3: רגע הפיץ' 🎙️</span>
                    </h4>
                    <p className="text-xs text-gray-500">הסרטון האישי, תקציר ואישור סופי</p>
                  </div>

                  {/* Video Instructions Banner */}
                  <div className="bg-gradient-to-r from-red-50/90 via-amber-50/70 to-blue-50/80 border border-red-200/90 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#EA4335]" />
                      <span className="font-bold text-sm text-gray-900">
                        אל תתביישו מהמצלמה! העלו סרטון קצר (60–90 שניות)
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      העלו סרטון בקישור פתוח (Google Drive / YouTube Unlisted / TikTok / Reels) הכולל:
                    </p>

                    <div className="space-y-1.5 text-xs text-gray-700 bg-white/70 p-3 rounded-xl border border-red-100">
                      <div>
                        <strong>• חלק א': היכרות מהירה</strong> — מי אתם ומה האנרגיה והוייב שאתם מביאים לשולחן?
                      </div>
                      <div>
                        <strong>• חלק ב': ה-Study Hack שלכם ב-AI</strong> — תספרו לנו על Gemini / NotebookLM Study Hack חכם, פרקטי ומפתיע שפותר משימה אקדמית אמיתית, אתגר לימודי, או באג בקוד.
                      </div>
                      <div className="text-amber-800 font-semibold pt-1">
                        💡 טיפ ובונוס למעזים: יתרון למי שישלבו בסרטון גם הדגמה בלייב על המסך!
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 italic">
                      (מדביקים את הקישור לסרטון ישירות בטופס – אין צורך להעלות קבצים!)
                    </p>
                  </div>

                  {/* Video URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                      קישור לסרטון הפיץ' (60–90 שניות) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={formData.videoPitchUrl}
                      onChange={(e) => handleChange('videoPitchUrl', e.target.value)}
                      placeholder="https://drive.google.com/... או קישור ל-YouTube / Loom / Reels"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:border-[#346BF1] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.videoPitchUrl && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.videoPitchUrl}</p>
                    )}
                  </div>

                  {/* Study Hack Summary (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                      תקציר ה-Study Hack שלכם במשפט או שניים (אופציונלי):
                    </label>
                    <input
                      type="text"
                      value={formData.studyHackSummary || ''}
                      onChange={(e) => handleChange('studyHackSummary', e.target.value)}
                      placeholder="למשל: יצירת פודקאסט שמע ב-NotebookLM ממאמר באנגלית לבחינה בביולוגיה..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm focus:bg-white focus:outline-none focus:border-[#346BF1]"
                    />
                  </div>

                  {/* Candidate Summary Card */}
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200 space-y-2.5 text-xs text-gray-700">
                    <div className="font-bold text-gray-900 pb-1.5 border-b border-gray-200 flex items-center justify-between">
                      <span>תמצית המועמדות שלך:</span>
                      <span className="text-[#346BF1] text-[11px]">בדקו את הפרטים לפני שליחה</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="font-semibold text-gray-500">שם:</span> {formData.fullName}</div>
                      <div><span className="font-semibold text-gray-500">טלפון:</span> {formData.phone}</div>
                      <div><span className="font-semibold text-gray-500">אימייל:</span> {formData.email}</div>
                      <div><span className="font-semibold text-gray-500">מוסד:</span> {formData.institution}</div>
                      <div><span className="font-semibold text-gray-500">חוג ושנה:</span> {formData.fieldOfStudy} ({formData.currentYear})</div>
                    </div>
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#346BF1] focus:ring-blue-400 cursor-pointer"
                      />
                      <span className="text-xs text-gray-700 leading-relaxed select-none">
                        אני מאשר/ת שהפרטים שמילאתי נכונים ומדויקים, ומביע/ה את נכונותי לקחת חלק פעיל בתוכנית שגרירי Google Gemini בישראל לשנת 2026.
                      </span>
                    </label>
                    {errors.agreedToTerms && (
                      <p className="text-xs text-red-500 mt-2 font-medium">{errors.agreedToTerms}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
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
                    className="bg-[#346BF1] hover:bg-blue-600 text-white px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>המשך לשלב הבא</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#346BF1] to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? (
                      <span>שולח מועמדות...</span>
                    ) : (
                      <>
                        <span>שליחת מועמדות ל-#TeamGemini 🚀</span>
                        <Send className="w-4 h-4" />
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
    </div>
  );
};
