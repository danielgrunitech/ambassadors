import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MissionBanner } from './components/MissionBanner';
import { PersonaCards } from './components/PersonaCards';
import { Eligibility } from './components/Eligibility';
import { RewardsSection } from './components/RewardsSection';
import { ProgramTimeline } from './components/ProgramTimeline';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/Questionnaire/ApplicationModal';
import { SubmissionsDrawer } from './components/SubmissionsDrawer';
import { PrivacyModal } from './components/PrivacyModal';
import { getSubmissions } from './utils/storage';
import { SubmissionRecord } from './types';

export const App: React.FC = () => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);

  // Check if admin mode (?admin=true or #admin)
  const [isAdmin] = useState<boolean>(() => {
    return window.location.search.includes('admin') || window.location.hash.includes('admin');
  });

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleSubmissionSuccess = () => {
    setSubmissions(getSubmissions());
  };

  return (
    <div className="min-h-screen bg-black font-google-body text-white overflow-x-hidden relative flex flex-col selection:bg-[#3186FF] selection:text-white">
      {/* Background Ambience & Subtle Grid matching Google Brand Identity */}
      <div className="fixed inset-0 z-0 pointer-events-none gemini-dark-grid opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#3186FF]/12 via-[#1A56DB]/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenApply={() => setIsApplyOpen(true)}
          onOpenSubmissions={() => setIsSubmissionsOpen(true)}
          submissionsCount={submissions.length}
          isAdmin={isAdmin}
        />

        <main className="flex-1">
          <Hero onOpenApply={() => setIsApplyOpen(true)} />
          <MissionBanner />
          <PersonaCards onOpenApply={() => setIsApplyOpen(true)} />
          <Eligibility onOpenApply={() => setIsApplyOpen(true)} />
          <RewardsSection />
          <ProgramTimeline />
          <FaqSection />
        </main>

        <Footer
          onOpenApply={() => setIsApplyOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </div>

      {/* Interactive Application Questionnaire Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmissionSuccess={handleSubmissionSuccess}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Admin Panel (Only if accessed with ?admin=true) */}
      {isAdmin && (
        <SubmissionsDrawer
          isOpen={isSubmissionsOpen}
          onClose={() => setIsSubmissionsOpen(false)}
          submissions={submissions}
        />
      )}
    </div>
  );
};

export default App;
