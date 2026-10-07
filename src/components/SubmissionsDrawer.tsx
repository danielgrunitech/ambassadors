import React, { useState, useEffect } from 'react';
import { X, Download, Eye, Building, Mail, Phone, ExternalLink, Link2, Check, Save } from 'lucide-react';
import { SubmissionRecord } from '../types';
import { exportSubmissionsAsJSON, getWebhookUrl, setWebhookUrl } from '../utils/storage';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: SubmissionRecord[];
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  isOpen,
  onClose,
  submissions
}) => {
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [webhookInput, setWebhookInput] = useState('');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [showWebhookSettings, setShowWebhookSettings] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWebhookInput(getWebhookUrl());
    }
  }, [isOpen]);

  const handleSaveWebhook = () => {
    setWebhookUrl(webhookInput);
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2500);
  };

  if (!isOpen) return null;

  const filtered = submissions.filter(s =>
    s.fullName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.institution.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh] text-right">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              {submissions.length}
            </div>
            <div>
              <h3 className="text-xl font-bold">פאנל ניהול ובקרה: מועמדויות שהוגשו</h3>
              <p className="text-xs text-gray-400">
                צפייה במועמדים שהגישו שאלון שגרירות לתוכנית 2026 בישראל
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowWebhookSettings(!showWebhookSettings)}
              className="bg-gray-800 hover:bg-gray-700 text-xs text-gray-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-gray-700"
              title="הגדרות חיבור Google Sheets"
            >
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Google Sheets Webhook</span>
            </button>

            {submissions.length > 0 && (
              <button
                onClick={exportSubmissionsAsJSON}
                className="bg-gray-800 hover:bg-gray-700 text-xs text-gray-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-gray-700"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">ייצוא JSON</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Webhook Configuration Banner (Collapsible) */}
        {showWebhookSettings && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-4 sm:p-5 text-right animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1">
              <Link2 className="w-4 h-4 text-emerald-600" />
              <span>חיבור אוטומטי ל-Google Sheets (Webhook URL)</span>
            </div>
            <p className="text-xs text-emerald-800 mb-3 leading-relaxed">
              הדביקו כאן את ה-Web App URL שקיבלתם מ-Google Apps Script (מתחיל ב-<code>https://script.google.com/macros/s/.../exec</code>).  
              כל מועמדות שתוגש באתר תתווסף מיד לשורה ב-Google Sheet שלכם.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="url"
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3.5 py-2 rounded-xl border border-emerald-300 text-xs bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <button
                onClick={handleSaveWebhook}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {webhookSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>נשמר בהצלחה!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>שמור הגדרה</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-bold text-lg text-gray-700">עדיין לא הוגשו מועמדויות בדפדפן זה</p>
              <p className="text-xs text-gray-400 mt-1">
                לחצו על "הגשת מועמדות" באתר ומלאו את השאלון כדי לראות את הפנייה כאן.
              </p>
            </div>
          ) : selectedSubmission ? (
            /* Detailed Candidate View */
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  <div className="inline-block text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md mb-2">
                    {selectedSubmission.id}
                  </div>
                  <h4 className="text-2xl font-extrabold text-gray-900">
                    {selectedSubmission.fullName}
                  </h4>
                  <div className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      {selectedSubmission.institution}
                    </span>
                    <span>•</span>
                    <span>{selectedSubmission.fieldOfStudy} ({selectedSubmission.currentYear})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  &rarr; חזרה לרשימה
                </button>
              </div>

              {/* Contact and Links */}
              <div className="grid sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{selectedSubmission.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{selectedSubmission.phone}</span>
                </div>
                {selectedSubmission.linkedInUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                    <a
                      href={selectedSubmission.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium truncate"
                    >
                      פרופיל LinkedIn
                    </a>
                  </div>
                )}
                {selectedSubmission.tiktokUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-pink-500" />
                    <a
                      href={selectedSubmission.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 underline font-medium truncate"
                    >
                      TikTok
                    </a>
                  </div>
                )}
                {selectedSubmission.instagramUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-purple-500" />
                    <a
                      href={selectedSubmission.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-600 underline font-medium truncate"
                    >
                      Instagram
                    </a>
                  </div>
                )}
              </div>

              {/* Answers */}
              <div className="space-y-4 text-sm">
                {/* חלק 1: תחביבים ותחומי עניין */}
                {selectedSubmission.hobbiesAndInterests && (
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                    <div className="font-bold text-amber-900 mb-1">חלק 1: תחביבים ותחומי עניין ☕</div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedSubmission.hobbiesAndInterests}</p>
                    {selectedSubmission.preferredPlatforms && selectedSubmission.preferredPlatforms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedSubmission.preferredPlatforms.map((p, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-white border border-amber-200 text-amber-800 rounded-full text-xs font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* אתגר 1: Gemini Canvas */}
                {(selectedSubmission.canvasCampusProblem || selectedSubmission.canvasSolutionDetails) && (
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                    <div className="font-bold text-blue-900 mb-1.5">אתגר 1: חוקרי ג'מיניי (Gemini Canvas) 🤖</div>
                    {selectedSubmission.canvasCampusProblem && (
                      <div className="mb-2">
                        <span className="font-semibold text-gray-700">הבעיה או הצורך בקמפוס: </span>
                        <p className="text-gray-700 leading-relaxed mt-0.5">{selectedSubmission.canvasCampusProblem}</p>
                      </div>
                    )}
                    {selectedSubmission.canvasSolutionDetails && (
                      <div>
                        <span className="font-semibold text-gray-700">הפתרון ב-Canvas ולמה מתאים: </span>
                        <p className="text-gray-700 leading-relaxed mt-0.5">{selectedSubmission.canvasSolutionDetails}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* אתגר 2: בדיקת וייב ויראלי */}
                {(selectedSubmission.viralContentUrl || selectedSubmission.viralContentDescription) && (
                  <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200">
                    <div className="font-bold text-purple-900 mb-1.5">אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) 📲</div>
                    {selectedSubmission.viralContentUrl && (
                      <div className="mb-1.5">
                        <a href={selectedSubmission.viralContentUrl} target="_blank" rel="noreferrer" className="text-purple-600 underline font-medium text-xs break-all">
                          {selectedSubmission.viralContentUrl}
                        </a>
                      </div>
                    )}
                    {selectedSubmission.viralContentDescription && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedSubmission.viralContentDescription}</p>
                    )}
                  </div>
                )}

                {/* אתגר 3: בוני הקהילה */}
                {(selectedSubmission.communityLeadershipStory || selectedSubmission.pastLeadershipExperience) && (
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                    <div className="font-bold text-emerald-900 mb-1">אתגר 3: בוני הקהילה (מחברי הקמפוס) 🤝</div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.communityLeadershipStory || selectedSubmission.pastLeadershipExperience}
                    </p>
                  </div>
                )}

                {/* אתגר 4: ניצוץ בקמפוס */}
                {(selectedSubmission.campusPopUpIdea || selectedSubmission.proposedFirstEvent) && (
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                    <div className="font-bold text-amber-900 mb-1">אתגר 4: ניצוץ בקמפוס (פופ-אפ אירוע) 💡</div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.campusPopUpIdea || selectedSubmission.proposedFirstEvent}
                    </p>
                  </div>
                )}

                {/* אתגר 5: מד האהבה לגוגל */}
                {(selectedSubmission.whyGoogleGeminiAmbassador || selectedSubmission.whyAmbassador) && (
                  <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200">
                    <div className="font-bold text-rose-900 mb-1">אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) 💙</div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.whyGoogleGeminiAmbassador || selectedSubmission.whyAmbassador}
                    </p>
                  </div>
                )}

                {/* חלק 3: סרטון הפיץ' */}
                {selectedSubmission.videoPitchUrl && (
                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200">
                    <div className="font-bold text-indigo-900 mb-1">חלק 3: סרטון פיץ' (60–90 שניות) 🎙️</div>
                    <a
                      href={selectedSubmission.videoPitchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#346BF1] underline font-medium text-xs break-all"
                    >
                      {selectedSubmission.videoPitchUrl}
                    </a>
                    {selectedSubmission.studyHackSummary && (
                      <div className="mt-2 text-xs text-gray-700">
                        <span className="font-semibold">תקציר Study Hack: </span>
                        {selectedSubmission.studyHackSummary}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Applications List */
            <div className="space-y-3">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="חיפוש לפי שם מועמד, מוסד אקדמי או מייל..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm mb-4 bg-white"
              />

              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedSubmission(item)}
                  className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base">{item.fullName}</span>
                      <span className="text-xs font-mono text-gray-400">({item.id})</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                      <span>{item.institution}</span>
                      <span>•</span>
                      <span>{item.fieldOfStudy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 hidden sm:inline">
                      {new Date(item.submittedAt).toLocaleDateString('he-IL')}
                    </span>
                    <button className="bg-blue-50 text-blue-700 p-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-blue-100">
                      <Eye className="w-4 h-4" />
                      <span>פרטים מלאים</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
