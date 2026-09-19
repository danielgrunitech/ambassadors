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
import { getSubmissions } from './utils/storage';
import { SubmissionRecord } from './types';

export const App: React.FC = () => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
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
    <div className="min-h-screen bg-[#E8F0FE]/60 font-sans text-gray-800 overflow-x-hidden relative flex flex-col selection:bg-[#346BF1] selection:text-white">
      {/* Background Watermark matching geministudentambassador.com */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(52, 107, 241, 0.05) 4px, rgba(52, 107, 241, 0.05) 5px)'
        }}
      />

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

        <Footer onOpenApply={() => setIsApplyOpen(true)} />
      </div>

      {/* Interactive Application Questionnaire Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmissionSuccess={handleSubmissionSuccess}
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
