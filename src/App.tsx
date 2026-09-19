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

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleSubmissionSuccess = () => {
    setSubmissions(getSubmissions());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-gray-800 font-sans relative selection:bg-[#346BF1] selection:text-white">
      {/* Background Subtle Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 gemini-bg-pattern" />

      {/* Main Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenApply={() => setIsApplyOpen(true)}
          onOpenSubmissions={() => setIsSubmissionsOpen(true)}
          submissionsCount={submissions.length}
        />

        <main className="flex-1">
          <Hero onOpenApply={() => setIsApplyOpen(true)} />
          <MissionBanner />
          <PersonaCards onOpenApply={() => setIsApplyOpen(true)} />
          <Eligibility onOpenApply={() => setIsApplyOpen(true)} />
          <RewardsSection onOpenApply={() => setIsApplyOpen(true)} />
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

      {/* Submissions Management / Review Panel */}
      <SubmissionsDrawer
        isOpen={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
        submissions={submissions}
      />
    </div>
  );
};

export default App;
