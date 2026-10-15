import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Video,
  Send,
  Maximize2,
  Minimize2,
  CheckCircle2
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
import { GeminiSparkle } from '../GeminiLogo';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmissionSuccess: () => void;
  onOpenPrivacy?: () => void;
}

const TOTAL_STEPS = 3;

const STEP_DEFINITIONS = [
  { step: 1, title: '01', label: 'נעים להכיר ☕', subtitle: 'פרטים אישיים ואקדמיים' },
  { step: 2, title: '02', label: 'הניצוץ שלכם ✨', subtitle: '5 אתגרי יצירתיות ו-AI' },
  { step: 3, title: '03', label: 'רגע הפיץ\' 🎙️', subtitle: 'סרטון קצר והגשה' },
];

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmissionSuccess,
  onOpenPrivacy
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

  // Handle ESC key for fullscreen & modal close
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const record = await saveSubmission(formData);
      setSubmittedRecord(record);
      onSubmissionSuccess();

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isFullscreen
          ? 'p-0 bg-white'
          : 'p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto'
      }`}
    >
      <div
        className={`bg-white font-google-body text-right flex flex-col transition-all duration-200 overflow-hidden ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0 shadow-none'
            : 'w-full max-w-4xl rounded-[2.25rem] shadow-2xl border border-gray-200 my-auto max-h-[94vh]'
        }`}
      >
        {/* Google Signature 4-Color Accent Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] shrink-0" />

        {/* Clean White Brand Header */}
        <div className="bg-white px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-200 relative shrink-0">
          {/* Header Action Buttons (Fullscreen & Close) */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-6 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-2xs transition-all text-xs font-google-heading font-medium cursor-pointer"
              title={isFullscreen ? 'חזרה לתצוגה רגילה' : 'הגדל למסך מלא'}
              aria-label={isFullscreen ? 'חזרה לתצוגה רגילה' : 'הגדל למסך מלא'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="hidden sm:inline">תצוגה רגילה</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                  <span className="hidden sm:inline">מסך מלא</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="סגירה"
              title="סגירה"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={isFullscreen ? 'max-w-3xl mx-auto w-full pl-28 sm:pl-36' : 'pl-24 sm:pl-32'}>
            {/* Google Brand Identity Lockup */}
            <div className="flex items-center gap-3 mb-2 flex-wrap sm:flex-nowrap">
              <span className="font-google-heading font-bold text-gray-900 text-base sm:text-lg tracking-tight">
                Google Student Ambassador
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-google-heading font-bold bg-blue-50 text-[#1a73e8] border border-blue-200 shadow-2xs">
                <span>✦</span>
                <span>תוכנית השגרירים 2026 | ישראל</span>
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-xl sm:text-2xl font-google-heading font-black text-gray-900 tracking-tight">
                שאלון הגשת מועמדות
              </h3>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                • מחזור שגרירי הסטודנטים 2026
              </span>
            </div>

            {/* Google Segmented Stepper */}
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
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-2xl transition-all text-xs font-google-heading font-semibold ${
                          isCurrent
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : isPassed
                            ? 'bg-blue-50 text-[#1a73e8] cursor-pointer hover:bg-blue-100 border border-blue-200'
                            : 'bg-gray-100 text-gray-500 cursor-default'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                            isCurrent
                              ? 'bg-white text-[#1a73e8]'
                              : isPassed
                              ? 'bg-[#1a73e8] text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : def.step}
                        </span>
                        <span className="hidden sm:inline">{def.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Micro Progress Line */}
                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1a73e8] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Scrollable Canvas */}
        <div id="modal-scroll-area" className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 bg-gray-50/70">
          <div className={isFullscreen ? 'max-w-3xl mx-auto w-full' : 'max-w-3xl mx-auto w-full'}>
            {submittedRecord ? (
              /* Google Success Confirmation Screen */
              <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center shadow-lg space-y-6 relative overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] absolute top-0 left-0" />

                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  <img
                    src="/star-emoticon.png"
                    alt="Success"
                    className="w-20 h-20 object-contain drop-shadow-md animate-bounce"
                  />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-google-heading font-semibold border border-emerald-200 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>המועמדות הוגשה ונרשמה בהצלחה</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-google-heading font-black text-gray-900 mb-2 tracking-tight">
                    תודה רבה, {submittedRecord.fullName}!
                  </h4>
                  <p className="font-google-body text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
                    הפרטים שלך נקלטו בהצלחה בנבחרת שגרירי Google Student Ambassadors בישראל לשנת 2026. ניצור איתך קשר בהקדם בוואטסאפ ובמייל.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 max-w-sm mx-auto shadow-inner">
                  <div className="text-xs text-gray-500 mb-1 font-medium font-google-body">מספר מועמדות למעקב:</div>
                  <div className="font-mono text-xl font-extrabold text-[#1a73e8] tracking-wider">
                    {submittedRecord.id}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-google-heading font-bold px-8 py-3 rounded-full transition-all text-sm shadow-md cursor-pointer active:scale-95"
                  >
                    חזרה לאתר התוכנית
                  </button>
                </div>
              </div>
            ) : (
              /* Google Multi-step Form */
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ================= חלק 1: נעים להכיר ☕ ================= */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Brand Welcome Card */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-[#1a73e8] via-[#7C4DFF] to-[#EA4335] absolute top-0 left-0" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-google-heading font-black text-[#1a73e8] text-xs tracking-wider uppercase">
                              LOOK WHAT YOU CAN DO ✦
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500 font-medium font-google-body">תוכנית שגרירי Gemini 2026</span>
                          </div>

                          <h4 className="text-xl sm:text-2xl font-google-heading font-black text-gray-900 tracking-tight">
                            היי לשגרירי העתיד של Gemini! 🚀
                          </h4>

                          <p className="font-google-body text-sm text-gray-700 leading-relaxed pt-1">
                            מוכנים להוביל, לחדש ולחבר קהילה שלמה של חובבי טכנולוגיה ו-AI? אם אתם עפים על העולמות של Google ושל בינה מלאכותית, ורוצים להביא את האנרגיה הזו ישירות לקמפוס שלכם – הגעתם בדיוק למקום הנכון!
                          </p>

                          <p className="font-google-body text-xs text-gray-500 leading-relaxed">
                            אנחנו מחפשים את מחזור שגרירי הסטודנטים הבא של Google – הטיפוסים שמזיזים עניינים, יזמים בנשמה ומובילי דעה שמוכנים לצלול לעומק ה-AI, לחבר את הקמפוס ולהביא את היצירתיות הייחודית שלהם לקדמת הבמה.
                          </p>
                        </div>

                        {/* Nano Banana 3D Sticker Accent */}
                        <div className="hidden sm:block shrink-0 pt-2">
                          <img
                            src="/speach-light-emoticon.png"
                            alt="Welcome"
                            className="w-16 h-16 object-contain drop-shadow-md"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#EA4335] font-medium pt-3 mt-3 border-t border-gray-100 font-google-body">
                        <span>*</span>
                        <span>מסמן שאלות חובה</span>
                      </div>
                    </div>

                    {/* Card A: פרטי קשר אישיים */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                        <span className="w-1.5 h-5 bg-[#1a73e8] rounded-full inline-block" />
                        <h4 className="text-base font-google-heading font-bold text-gray-900">
                          פרטי קשר ותקשורת
                        </h4>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                            שם מלא <span className="text-[#EA4335] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="ישראל ישראלי"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm transition-all outline-none font-google-body placeholder-gray-400"
                          />
                          {errors.fullName && <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.fullName}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                            מספר טלפון נייד (לוואטסאפ) <span className="text-[#EA4335] font-bold">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="050-1234567"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm transition-all outline-none font-google-body placeholder-gray-400"
                          />
                          {errors.phone && <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                            כתובת דוא"ל (עדיפות למייל אקדמי) <span className="text-[#EA4335] font-bold">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="student@campus.ac.il"
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm transition-all outline-none font-google-body placeholder-gray-400"
                          />
                          {errors.email && <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.email}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Card B: רקע אקדמי */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                        <span className="w-1.5 h-5 bg-[#34A853] rounded-full inline-block" />
                        <h4 className="text-base font-google-heading font-bold text-gray-900">
                          רקע אקדמי
                        </h4>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Institution */}
                        <div>
                          <CustomSelect
                            label="מוסד לימודים"
                            required
                            value={formData.institution}
                            onChange={(val) => handleChange('institution', val)}
                            options={ISRAELI_INSTITUTIONS}
                            placeholder="בחר/י מוסד לימודים מהרשימה..."
                            error={errors.institution}
                            searchable
                          />
                          {formData.institution === 'מוסד לימודים אחר...' && (
                            <div className="mt-3">
                              <label className="block text-xs font-google-heading font-medium text-gray-700 mb-1">
                                שם מוסד הלימודים: <span className="text-[#EA4335]">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.customInstitution || ''}
                                onChange={(e) => handleChange('customInstitution', e.target.value)}
                                placeholder="למשל: המכללה למינהל, מכללת ספיר..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-500/10 bg-gray-50 hover:bg-white focus:bg-white text-gray-900 text-sm outline-none font-google-body placeholder-gray-400"
                              />
                              {errors.customInstitution && (
                                <p className="text-xs text-[#EA4335] mt-1 font-medium">{errors.customInstitution}</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Current Year */}
                        <div>
                          <CustomSelect
                            label="שנת לימודים נוכחית"
                            required
                            value={formData.currentYear}
                            onChange={(val) => handleChange('currentYear', val)}
                            options={STUDY_YEARS}
                            placeholder="בחר/י שנת לימודים..."
                            error={errors.currentYear}
                          />
                        </div>

                        {/* Field of Study */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                            חוג / פקולטה <span className="text-[#EA4335] font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fieldOfStudy}
                            onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                            placeholder="למשל: מדעי המחשב, משפטים, פסיכולוגיה, הנדסת תעשייה וניהול..."
                            className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm transition-all outline-none font-google-body placeholder-gray-400"
                          />
                          {errors.fieldOfStudy && <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.fieldOfStudy}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Card C: תחומי עניין ונוכחות ברשת */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                        <span className="w-1.5 h-5 bg-[#FBBC04] rounded-full inline-block" />
                        <h4 className="text-base font-google-heading font-bold text-gray-900">
                          תחומי עניין, יצירתיות ונוכחות ברשת
                        </h4>
                      </div>

                      {/* Hobbies and Interests */}
                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          תחביבים ותחומי עניין (מעבר לספרי הלימוד!) <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <p className="font-google-body text-xs text-gray-500 mb-2.5 leading-relaxed">
                          מה עושה לכם את זה? בינג' סדרות, פרויקטים של קוד לתוך הלילה, יצירת תוכן ב-TikTok, או אימונים במכון? בא לנו לדעת!
                        </p>
                        <textarea
                          rows={3}
                          value={formData.hobbiesAndInterests}
                          onChange={(e) => handleChange('hobbiesAndInterests', e.target.value)}
                          placeholder="ספרו לנו קצת על מה שאתם אוהבים לעשות בזמנכם הפנוי..."
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed transition-all outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.hobbiesAndInterests && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.hobbiesAndInterests}</p>
                        )}
                      </div>

                      {/* Digital Platforms Filter Chips */}
                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          איפה אתם הכי אוהבים לשתף מחשבות ויצירות שלכם ברשת?
                          <span className="text-xs text-gray-500 font-normal mr-1.5">(אופציונלי אך מומלץ)</span>
                        </label>
                        <p className="font-google-body text-xs text-gray-500 mb-3">
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
                                className={`px-4 py-2 rounded-full text-xs transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-blue-50 text-[#1a73e8] border border-[#1a73e8] font-google-heading font-semibold shadow-xs'
                                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200/80 font-google-heading font-medium'
                                }`}
                              >
                                {isSelected ? <Check className="w-3.5 h-3.5 text-[#1a73e8] stroke-[2.5]" /> : <span className="text-gray-400">+</span>}
                                <span>{plat}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div className="pt-2 border-t border-gray-100">
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-3">
                          קישורים לפרופילים ברשתות החברתיות (מומלץ):
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <input
                            type="url"
                            value={formData.linkedInUrl || ''}
                            onChange={(e) => handleChange('linkedInUrl', e.target.value)}
                            placeholder="פרופיל LinkedIn"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-xs text-gray-900 outline-none font-google-body placeholder-gray-400"
                          />
                          <input
                            type="url"
                            value={formData.tiktokUrl || ''}
                            onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                            placeholder="פרופיל TikTok"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-xs text-gray-900 outline-none font-google-body placeholder-gray-400"
                          />
                          <input
                            type="url"
                            value={formData.instagramUrl || ''}
                            onChange={(e) => handleChange('instagramUrl', e.target.value)}
                            placeholder="פרופיל Instagram"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-xs text-gray-900 outline-none font-google-body placeholder-gray-400"
                          />
                          <input
                            type="url"
                            value={formData.youtubeUrl || ''}
                            onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                            placeholder="YouTube / GitHub / אתר אישי"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-xs text-gray-900 outline-none font-google-body placeholder-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= חלק 2: הניצוץ שלכם ✨ ================= */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Header Banner */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#1a73e8] absolute top-0 left-0" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-google-heading font-black text-[#EA4335] text-xs uppercase tracking-wider">
                              SPARK IDEAS ✦ חלק 2
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500 font-medium font-google-body">5 אתגרי עומק</span>
                          </div>

                          <h4 className="text-xl sm:text-2xl font-google-heading font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <span>תראו לנו את הניצוץ שלכם! ✨</span>
                          </h4>

                          <p className="font-google-body text-sm text-gray-700 leading-relaxed">
                            בלי חפירות ומאמרים ארוכים – תראו לנו את הניסיון, היכולות והחשיבה המקורית שלכם דרך האתגרים הבאים:
                          </p>
                        </div>

                        {/* Nano Banana 3D Sticker Accent */}
                        <div className="hidden sm:block shrink-0 pt-2">
                          <img
                            src="/star-emoticon.png"
                            alt="Star"
                            className="w-16 h-16 object-contain drop-shadow-md"
                          />
                        </div>
                      </div>
                    </div>

                    {/* אתגר 1: חוקרי ג'מיניי (Gemini Canvas) */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#1a73e8] rounded-full inline-block" />
                          <h5 className="font-google-heading font-bold text-base text-gray-900">
                            אתגר 1: חוקרי ג'מיניי (חובבי ה-AI) 🤖
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200 font-google-heading">
                          Gemini Canvas
                        </span>
                      </div>

                      {/* Google AI Lab Context Box */}
                      <div className="bg-blue-50/60 rounded-2xl p-4 sm:p-5 border border-blue-200 text-xs text-gray-800 leading-relaxed space-y-2">
                        <div className="font-bold text-[#1a73e8] flex items-center gap-1.5 font-google-heading">
                          <GeminiSparkle size={14} />
                          <span>פיצ'ר Gemini Canvas של Google</span>
                        </div>
                        <p className="font-google-body text-gray-700">
                          ל-Gemini יש פיצ'ר סופר חזק שנקרא <strong>Gemini Canvas</strong> – מרחב עבודה אינטראקטיבי שבו אפשר לבנות מסמכים דינמיים, שאלונים, כלי עבודה או "אפליקציות פשוטות" רק באמצעות פרומפטים בטקסט פשוט (ללא שום צורך ברקע בטכנולוגיה או בקוד!).
                        </p>
                        <p className="font-medium text-[#1a73e8] font-google-body">
                          המשימה שלכם: דמיינו שאתם רוצים לפתור בעיה או ליצור כלי עזר קטן ביום-יום של הסטודנטים בקמפוס שלכם בלחיצת כפתור.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          1. מה הבעיה או הצורך בקמפוס שאתם רוצים לפתור? <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <p className="font-google-body text-xs text-gray-500 mb-2">
                          (לדוגמה: מחולל סימולציות מבחן למשפטים/רפואה, מפת דרכים לסיכום מאמרים אקדמיים, כלי הרשמה מהיר לאירוע חברתי, או לוח משימות אינטראקטיבי לעבודה קבוצתית).
                        </p>
                        <textarea
                          rows={2}
                          value={formData.canvasCampusProblem}
                          onChange={(e) => handleChange('canvasCampusProblem', e.target.value)}
                          placeholder="הבעיה שאני רוצה לפתור בקמפוס היא..."
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.canvasCampusProblem && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.canvasCampusProblem}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          2. איך הכלי האינטראקטיבי שלכם ב-Canvas יעבוד בפועל, ולמה Canvas מתאים לזה? <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <p className="font-google-body text-xs text-gray-500 mb-2">
                          מה המשתמשים יראו, איזה פרומפט/הנחיה תגדירו ל-Gemini, ואיך הסטודנטים יפעלו מול התוצר? למה לדעתכם פיצ'ר כמו Canvas מתאים לזה במיוחד בהשוואה לכלים אחרים?
                        </p>
                        <textarea
                          rows={3}
                          value={formData.canvasSolutionDetails}
                          onChange={(e) => handleChange('canvasSolutionDetails', e.target.value)}
                          placeholder="הכלי יאפשר לסטודנטים להזין... והתוצר ב-Canvas יציג... בחרתי ב-Canvas כי..."
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.canvasSolutionDetails && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.canvasSolutionDetails}</p>
                        )}
                      </div>
                    </div>

                    {/* אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#EA4335] rounded-full inline-block" />
                          <h5 className="font-google-heading font-bold text-base text-gray-900">
                            אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) 📲
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#EA4335] border border-red-200 font-google-heading">
                          Content & Reach
                        </span>
                      </div>

                      <p className="font-google-body text-xs text-gray-600 leading-relaxed">
                        שתפו קישור לפוסט, סרטון (Reels / TikTok / LinkedIn) או תוכן שיצרתם בעבר שאתם ממש גאים בו:
                      </p>

                      <div>
                        <input
                          type="url"
                          value={formData.viralContentUrl}
                          onChange={(e) => handleChange('viralContentUrl', e.target.value)}
                          placeholder="קישור לפוסט / סרטון (אופציונלי אך מומלץ)"
                          className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#EA4335] focus:ring-4 focus:ring-red-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm outline-none font-google-body placeholder-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          מה הפך את התוכן למוצלח, ואיזה ערך הקהל שלכם קיבל ממנו? <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <textarea
                          rows={2}
                          value={formData.viralContentDescription}
                          onChange={(e) => handleChange('viralContentDescription', e.target.value)}
                          placeholder="התוכן עבד מעולה כי... והערך המרכזי שהקהל לקח ממנו היה..."
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#EA4335] focus:ring-4 focus:ring-red-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.viralContentDescription && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.viralContentDescription}</p>
                        )}
                      </div>
                    </div>

                    {/* אתגר 3: בוני הקהילה (מחברי הקמפוס) */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#34A853] rounded-full inline-block" />
                          <h5 className="font-google-heading font-bold text-base text-gray-900">
                            אתגר 3: בוני הקהילה (מחברי הקמפוס) 🤝
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200 font-google-heading">
                          Community
                        </span>
                      </div>

                      <label className="block text-sm font-google-heading font-medium text-gray-800">
                        ספרו לנו על פעם שבה הובלתם פרויקט, יוזמה או אירוע מאפס (באקדמיה, בצבא, או בקהילת סטודנטים). מה היה האתגר הכי מורכב בדרך, ואיך רתמתם אנשים לעבודה משותפת כדי להגיע לתוצאה? <span className="text-[#EA4335] font-bold">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.communityLeadershipStory}
                        onChange={(e) => handleChange('communityLeadershipStory', e.target.value)}
                        placeholder="הקמתי / הובלתי את... האתגר המרכזי היה... הצלחתי לרתום אנשים על ידי..."
                        className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#34A853] focus:ring-4 focus:ring-emerald-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                      />
                      {errors.communityLeadershipStory && (
                        <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.communityLeadershipStory}</p>
                      )}
                    </div>

                    {/* אתגר 4: ניצוץ בקמפוס (המפעילים היצירתיים) */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#FBBC04] rounded-full inline-block" />
                          <h5 className="font-google-heading font-bold text-base text-gray-900">
                            אתגר 4: ניצוץ בקמפוס (המפעילים היצירתיים) 💡
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-google-heading">
                          Campus Pop-Up
                        </span>
                      </div>

                      <p className="font-google-body text-xs text-gray-600 leading-relaxed">
                        אנחנו רוצים לשנות מהקצה לקצה את הדרך שבה סטודנטים נעזרים ב-AI בקמפוס! תציעו רעיון מפתיע ומחוץ לקופסה לאירוע שטח או פעילות פופ-אפ בקמפוס (בדשא, בספריה, או בין ההרצאות) שתשנה לחלוטין את האופן שבו סטודנטים משתמשים ב-Gemini וב-NotebookLM ביום-יום האקדמי שלהם.
                      </p>

                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1">
                          מה הרעיון, איך הוא נראה בפועל, ומה יגרום לסטודנטים לעצור הכל ולהשתתף? (זקקו את זה ל-2–4 משפטים חדים!) <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={formData.campusPopUpIdea}
                          onChange={(e) => handleChange('campusPopUpIdea', e.target.value)}
                          placeholder="הרעיון שלי הוא אירוע שטח שבו... הסטודנטים יחוו... ומה שימשוך אותם לעצור ולהשתתף הוא..."
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#FBBC04] focus:ring-4 focus:ring-amber-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.campusPopUpIdea && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.campusPopUpIdea}</p>
                        )}
                      </div>
                    </div>

                    {/* אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#1a73e8] rounded-full inline-block" />
                          <h5 className="font-google-heading font-bold text-base text-gray-900">
                            אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) 💙
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200 font-google-heading">
                          Why Gemini Ambassador
                        </span>
                      </div>

                      <label className="block text-sm font-google-heading font-medium text-gray-800">
                        למה אתם באמת רוצים להיות שגרירי Google Gemini? <span className="text-[#EA4335] font-bold">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.whyGoogleGeminiAmbassador}
                        onChange={(e) => handleChange('whyGoogleGeminiAmbassador', e.target.value)}
                        placeholder="החיבור שלי ל-Google ול-AI התחיל כאשר... חשוב לי להוביל את התוכנית הזו בקמפוס שלי כי..."
                        className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                      />
                      {errors.whyGoogleGeminiAmbassador && (
                        <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.whyGoogleGeminiAmbassador}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= חלק 3: רגע הפיץ' 🎙️ ================= */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Video Pitch Hero Card */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm relative overflow-hidden space-y-5">
                      <div className="h-1.5 w-full bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] absolute top-0 left-0" />

                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-5 bg-[#EA4335] rounded-full inline-block" />
                          <h4 className="text-lg font-google-heading font-bold text-gray-900 flex items-center gap-2">
                            <span>חלק 3: רגע הפיץ' 🎙️</span>
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#EA4335] border border-red-200 flex items-center gap-1 font-google-heading">
                          <Video className="w-3.5 h-3.5" />
                          <span>60–90 שניות</span>
                        </span>
                      </div>

                      {/* Video Brief Card */}
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h5 className="font-google-heading font-bold text-sm text-gray-900">
                              אל תתביישו מהמצלמה! העלו סרטון קצר (60–90 שניות) בקישור פתוח:
                            </h5>
                            <p className="font-google-body text-xs text-gray-600">
                              קישור פתוח ב-Google Drive / YouTube Unlisted / TikTok / Reels הכולל:
                            </p>
                          </div>
                          <img
                            src="/speaker-emoticon.png"
                            alt="Speaker"
                            className="w-14 h-14 object-contain drop-shadow-md hidden sm:block shrink-0"
                          />
                        </div>

                        <div className="space-y-2 text-xs text-gray-700 bg-white p-4 rounded-xl border border-gray-200 font-google-body">
                          <div>
                            <strong className="text-gray-900">• חלק א': היכרות מהירה</strong> — מי אתם ומה האנרגיה והוייב שאתם מביאים לשולחן?
                          </div>
                          <div>
                            <strong className="text-gray-900">• חלק ב': ה-Study Hack שלכם ב-AI</strong> — תספרו לנו על Gemini / NotebookLM Study Hack חכם, פרקטי ומפתיע שפותר משימה אקדמית אמיתית, אתגר לימודי, או באג בקוד.
                          </div>
                          <div className="text-amber-700 font-semibold pt-1 border-t border-gray-200">
                            💡 טיפ ובונוס למעזים: יתרון למי שישלבו בסרטון גם הדגמה בלייב על המסך!
                          </div>
                        </div>
                      </div>

                      {/* Video URL Input */}
                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                          קישור לסרטון הפיץ' שלכם <span className="text-[#EA4335] font-bold">*</span>
                        </label>
                        <p className="font-google-body text-xs text-gray-500 mb-2">
                          מדביקים את הקישור לסרטון ישירות בטופס – אין צורך להעלות קבצים! (ודאו שהרשאות הצפייה פתוחות)
                        </p>
                        <input
                          type="url"
                          value={formData.videoPitchUrl}
                          onChange={(e) => handleChange('videoPitchUrl', e.target.value)}
                          placeholder="https://drive.google.com/... או https://youtube.com/watch?v=..."
                          className="w-full px-4 py-3 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#EA4335] focus:ring-4 focus:ring-red-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm outline-none font-google-body placeholder-gray-400"
                        />
                        {errors.videoPitchUrl && (
                          <p className="text-xs text-[#EA4335] mt-1.5 font-medium">{errors.videoPitchUrl}</p>
                        )}
                      </div>

                      {/* Study Hack Summary */}
                      <div>
                        <label className="block text-sm font-google-heading font-medium text-gray-800 mb-1.5">
                          תקציר ה-Study Hack שלכם (בשורה או שתיים):
                        </label>
                        <textarea
                          rows={2}
                          value={formData.studyHackSummary || ''}
                          onChange={(e) => handleChange('studyHackSummary', e.target.value)}
                          placeholder="בקצרה: מה ה-Study Hack שהצגתם בסרטון?"
                          className="w-full p-4 rounded-2xl border border-gray-300 hover:border-gray-400 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-900 text-sm leading-relaxed outline-none font-google-body placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Terms & Consent Card */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-sm space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreedToTerms}
                          onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#1a73e8] focus:ring-blue-500/30 cursor-pointer bg-gray-50 border-gray-300"
                        />
                        <span className="font-google-body text-xs text-gray-700 leading-relaxed select-none">
                          אני מאשר/ת שהפרטים שמילאתי נכונים ומדויקים, מסכים/ה ל
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onOpenPrivacy?.();
                            }}
                            className="text-[#1a73e8] underline hover:text-blue-700 mx-1 font-medium inline"
                          >
                            מדיניות הפרטיות
                          </button>
                          של התוכנית, ומביע/ה את נכונותי לקחת חלק פעיל בתוכנית שגרירי Google Student Ambassadors בישראל לשנת 2026.
                        </span>
                      </label>
                      {errors.agreedToTerms && (
                        <p className="text-xs text-[#EA4335] mt-1 font-medium">{errors.agreedToTerms}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Controls Bar */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between shadow-sm">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-2.5 rounded-full border border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-google-heading font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>חזרה</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-google-body">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>הטיוטה נשמרת אוטומטית בדפדפן</span>
                    </div>
                  )}

                  {currentStep < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-8 py-2.5 rounded-full text-xs sm:text-sm font-google-heading font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
                    >
                      <span>המשך לשלב הבא</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-9 py-3 rounded-full text-sm font-google-heading font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>שולח מועמדות למערכת...</span>
                      ) : (
                        <>
                          <span>שליחת מועמדות לתוכנית השגרירים 🚀</span>
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
