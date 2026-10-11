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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0B0C0E] w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh] text-right font-google-body">
        {/* Header */}
        <div className="bg-[#111215] text-white p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3186FF] flex items-center justify-center text-white font-bold font-google-heading shadow-md">
              {submissions.length}
            </div>
            <div>
              <h3 className="text-xl font-bold font-google-heading text-white">פאנל ניהול ובקרה: מועמדויות שהוגשו</h3>
              <p className="text-xs text-gray-400 font-google-body">
                צפייה במועמדים שהגישו שאלון שגרירות לתוכנית 2026 בישראל
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowWebhookSettings(!showWebhookSettings)}
              className="bg-white/5 hover:bg-white/10 text-xs text-gray-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer font-google-heading"
              title="הגדרות חיבור Google Sheets"
            >
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Google Sheets Webhook</span>
            </button>

            {submissions.length > 0 && (
              <button
                onClick={exportSubmissionsAsJSON}
                className="bg-white/5 hover:bg-white/10 text-xs text-gray-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer font-google-heading"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">ייצוא JSON</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Webhook Configuration Banner (Collapsible) */}
        {showWebhookSettings && (
          <div className="bg-[#111A14] border-b border-emerald-500/30 p-4 sm:p-5 text-right animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-1 font-google-heading">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span>חיבור אוטומטי ל-Google Sheets (Webhook URL)</span>
            </div>
            <p className="text-xs text-emerald-300 mb-3 leading-relaxed font-google-body">
              הדביקו כאן את ה-Web App URL שקיבלתם מ-Google Apps Script (מתחיל ב-<code>https://script.google.com/macros/s/.../exec</code>).  
              כל מועמדות שתוגש באתר תתווסף מיד לשורה ב-Google Sheet שלכם.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="url"
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3.5 py-2 rounded-xl border border-emerald-500/40 text-xs bg-[#16171B] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <button
                onClick={handleSaveWebhook}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 font-google-heading cursor-pointer"
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
        <div className="p-6 overflow-y-auto flex-1 bg-[#0B0C0E]">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p className="font-bold text-lg text-gray-300 font-google-heading">עדיין לא הוגשו מועמדויות בדפדפן זה</p>
              <p className="text-xs text-gray-500 mt-1 font-google-body">
                לחצו על "הגשת מועמדות" באתר ומלאו את השאלון כדי לראות את הפנייה כאן.
              </p>
            </div>
          ) : selectedSubmission ? (
            /* Detailed Candidate View */
            <div className="bg-[#111215] rounded-2xl p-6 border border-white/10 shadow-xl space-y-6 animate-in fade-in text-white">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="inline-block text-xs font-mono font-bold bg-[#131722] text-[#3186FF] border border-[#3186FF]/30 px-2.5 py-1 rounded-md mb-2">
                    {selectedSubmission.id}
                  </div>
                  <h4 className="text-2xl font-black font-google-heading text-white">
                    {selectedSubmission.fullName}
                  </h4>
                  <div className="text-sm text-gray-400 flex items-center gap-4 mt-1 font-google-body">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-gray-500" />
                      {selectedSubmission.institution}
                    </span>
                    <span>•</span>
                    <span>{selectedSubmission.fieldOfStudy} ({selectedSubmission.currentYear})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-xs text-[#3186FF] hover:underline font-bold font-google-heading cursor-pointer"
                >
                  &rarr; חזרה לרשימה
                </button>
              </div>

              {/* Contact and Links */}
              <div className="grid sm:grid-cols-3 gap-3 bg-[#16171B] p-4 rounded-xl text-xs border border-white/10">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-200 font-medium">{selectedSubmission.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-200 font-medium">{selectedSubmission.phone}</span>
                </div>
                {selectedSubmission.linkedInUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#3186FF]" />
                    <a
                      href={selectedSubmission.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3186FF] underline font-medium truncate"
                    >
                      פרופיל LinkedIn
                    </a>
                  </div>
                )}
                {selectedSubmission.tiktokUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-pink-400" />
                    <a
                      href={selectedSubmission.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-400 underline font-medium truncate"
                    >
                      TikTok
                    </a>
                  </div>
                )}
                {selectedSubmission.instagramUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-purple-400" />
                    <a
                      href={selectedSubmission.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 underline font-medium truncate"
                    >
                      Instagram
                    </a>
                  </div>
                )}
              </div>

              {/* Answers */}
              <div className="space-y-4 text-sm font-google-body">
                {/* חלק 1: תחביבים ותחומי עניין */}
                {selectedSubmission.hobbiesAndInterests && (
                  <div className="p-4 bg-[#1C1914] rounded-xl border border-amber-500/30">
                    <div className="font-bold text-amber-400 mb-1 font-google-heading">חלק 1: תחביבים ותחומי עניין ☕</div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedSubmission.hobbiesAndInterests}</p>
                    {selectedSubmission.preferredPlatforms && selectedSubmission.preferredPlatforms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedSubmission.preferredPlatforms.map((p, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-[#131722] border border-[#3186FF]/30 text-[#3186FF] rounded-full text-xs font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* אתגר 1: Gemini Canvas */}
                {(selectedSubmission.canvasCampusProblem || selectedSubmission.canvasSolutionDetails) && (
                  <div className="p-4 bg-[#131722] rounded-xl border border-[#3186FF]/30">
                    <div className="font-bold text-[#3186FF] mb-1.5 font-google-heading">אתגר 1: חוקרי ג'מיניי (Gemini Canvas) 🤖</div>
                    {selectedSubmission.canvasCampusProblem && (
                      <div className="mb-2">
                        <span className="font-semibold text-gray-300">הבעיה או הצורך בקמפוס: </span>
                        <p className="text-gray-300 leading-relaxed mt-0.5">{selectedSubmission.canvasCampusProblem}</p>
                      </div>
                    )}
                    {selectedSubmission.canvasSolutionDetails && (
                      <div>
                        <span className="font-semibold text-gray-300">הפתרון ב-Canvas ולמה מתאים: </span>
                        <p className="text-gray-300 leading-relaxed mt-0.5">{selectedSubmission.canvasSolutionDetails}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* אתגר 2: בדיקת וייב ויראלי */}
                {(selectedSubmission.viralContentUrl || selectedSubmission.viralContentDescription) && (
                  <div className="p-4 bg-[#18121E] rounded-xl border border-purple-500/30">
                    <div className="font-bold text-purple-400 mb-1.5 font-google-heading">אתגר 2: בדיקת וייב ויראלי (יוצרי התוכן) 📲</div>
                    {selectedSubmission.viralContentUrl && (
                      <div className="mb-1.5">
                        <a href={selectedSubmission.viralContentUrl} target="_blank" rel="noreferrer" className="text-purple-400 underline font-medium text-xs break-all">
                          {selectedSubmission.viralContentUrl}
                        </a>
                      </div>
                    )}
                    {selectedSubmission.viralContentDescription && (
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedSubmission.viralContentDescription}</p>
                    )}
                  </div>
                )}

                {/* אתגר 3: בוני הקהילה */}
                {(selectedSubmission.communityLeadershipStory || selectedSubmission.pastLeadershipExperience) && (
                  <div className="p-4 bg-[#121A15] rounded-xl border border-emerald-500/30">
                    <div className="font-bold text-emerald-400 mb-1 font-google-heading">אתגר 3: בוני הקהילה (מחברי הקמפוס) 🤝</div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.communityLeadershipStory || selectedSubmission.pastLeadershipExperience}
                    </p>
                  </div>
                )}

                {/* אתגר 4: ניצוץ בקמפוס */}
                {(selectedSubmission.campusPopUpIdea || selectedSubmission.proposedFirstEvent) && (
                  <div className="p-4 bg-[#1C1914] rounded-xl border border-amber-500/30">
                    <div className="font-bold text-amber-400 mb-1 font-google-heading">אתגר 4: ניצוץ בקמפוס (פופ-אפ אירוע) 💡</div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.campusPopUpIdea || selectedSubmission.proposedFirstEvent}
                    </p>
                  </div>
                )}

                {/* אתגר 5: מד האהבה לגוגל */}
                {(selectedSubmission.whyGoogleGeminiAmbassador || selectedSubmission.whyAmbassador) && (
                  <div className="p-4 bg-[#1C1418] rounded-xl border border-rose-500/30">
                    <div className="font-bold text-rose-400 mb-1 font-google-heading">אתגר 5: מד האהבה לגוגל (מספרי הסיפורים) 💙</div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedSubmission.whyGoogleGeminiAmbassador || selectedSubmission.whyAmbassador}
                    </p>
                  </div>
                )}

                {/* חלק 3: סרטון הפיץ' */}
                {selectedSubmission.videoPitchUrl && (
                  <div className="p-4 bg-[#131722] rounded-xl border border-blue-500/30">
                    <div className="font-bold text-[#3186FF] mb-1 font-google-heading">חלק 3: סרטון פיץ' (60–90 שניות) 🎙️</div>
                    <a
                      href={selectedSubmission.videoPitchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3186FF] underline font-medium text-xs break-all"
                    >
                      {selectedSubmission.videoPitchUrl}
                    </a>
                    {selectedSubmission.studyHackSummary && (
                      <div className="mt-2 text-xs text-gray-300">
                        <span className="font-semibold text-white">תקציר Study Hack: </span>
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
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 text-sm mb-4 bg-[#16171B] text-white placeholder-gray-500 focus:outline-none focus:border-[#3186FF]"
              />

              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedSubmission(item)}
                  className="bg-[#111215] p-4 rounded-2xl border border-white/10 hover:border-[#3186FF]/50 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-google-heading text-white text-base">{item.fullName}</span>
                      <span className="text-xs font-mono text-gray-400">({item.id})</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-3 font-google-body">
                      <span>{item.institution}</span>
                      <span>•</span>
                      <span>{item.fieldOfStudy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 hidden sm:inline">
                      {new Date(item.submittedAt).toLocaleDateString('he-IL')}
                    </span>
                    <button className="bg-[#131722] text-[#3186FF] border border-[#3186FF]/30 p-2 rounded-xl text-xs font-bold font-google-heading flex items-center gap-1 hover:bg-blue-900/30 cursor-pointer">
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
