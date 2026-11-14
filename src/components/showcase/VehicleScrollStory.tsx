'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Camera, 
  Box, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  ArrowRight,
  Rotate3d,
  Layers
} from 'lucide-react';
import Vehicle360Viewer from './Vehicle360Viewer';

// Dynamically import Three.js 3D Viewer to prevent SSR issues
const Vehicle3DViewer = dynamic(() => import('./Vehicle3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[640px] rounded-2xl bg-[#0c1322] border border-white/10 flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 rounded-full border-2 border-[#A97B27]/20 border-t-[#A97B27] animate-spin mb-3" />
      <p className="text-sm text-slate-300 font-medium">جاري تهيئة محرك Three.js WebGL...</p>
    </div>
  ),
});

interface VehicleScrollStoryProps {
  isArabic?: boolean;
}

interface StoryStep {
  percent: number;
  frameIndex: number;
  degrees: number;
  cameraPos: [number, number, number];
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  highlightAr: string;
  highlightEn: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    percent: 0,
    frameIndex: 0,
    degrees: 0,
    cameraPos: [0, 1.2, 5.0],
    titleAr: 'الإطلالة الأمامية الملكية',
    titleEn: 'Royal Front Stance',
    subtitleAr: 'حضور مهيب وتصميم شبك أمامي عصري يرسخ فخامة ضيوف الرحمن',
    subtitleEn: 'Commanding front presence with sleek aerodynamic luxury contours',
    badgeAr: '0% — إطلالة المقدمة',
    badgeEn: '0% — Front Stance',
    highlightAr: 'إضاءة LED نهارية متكيفة مع عزل هوائي فائق الهدوء',
    highlightEn: 'Adaptive LED lighting and aerodynamic sound suppression'
  },
  {
    percent: 25,
    frameIndex: 4,
    degrees: 45,
    cameraPos: [3.5, 1.4, 3.5],
    titleAr: 'زاوية الربع الأمامي الديناميكية',
    titleEn: 'Dynamic Front Three-Quarter',
    subtitleAr: 'انسيابية هوائية تقلل مقاومة الرياح وتمنح ثباتاً فائقاً على الطرق السريعة',
    subtitleEn: 'Sculpted contours lowering drag and ensuring high-speed road stability',
    badgeAr: '25% — ربع أمامي',
    badgeEn: '25% — Front 3/4',
    highlightAr: 'ثبات فائق على طريق الحرمين السريع بين جدة ومكة والمدينة',
    highlightEn: 'Supreme stability on the Haramain highway between Jeddah & Makkah'
  },
  {
    percent: 50,
    frameIndex: 9,
    degrees: 90,
    cameraPos: [4.9, 1.2, 0],
    titleAr: 'المظهر الجانبي التنفيذي والأبعاد',
    titleEn: 'Aerodynamic Side Profile',
    subtitleAr: 'قاعدة عجلات رحبة تضمن راحة استثنائية لمقصورة الركاب الخلفية',
    subtitleEn: 'Long executive wheelbase delivering serene rear cabin relaxation',
    badgeAr: '50% — الجانب الكامل',
    badgeEn: '50% — Side Profile',
    highlightAr: 'أبواب عريضة لسهولة صعود ونزول المعتمرين وكبار السن',
    highlightEn: 'Wide door openings for effortless pilgrim and elderly boarding'
  },
  {
    percent: 75,
    frameIndex: 13,
    degrees: 135,
    cameraPos: [3.5, 1.4, -3.5],
    titleAr: 'زاوية الربع الخلفي الفاخرة',
    titleEn: 'Executive Rear Three-Quarter',
    subtitleAr: 'أبعاد متناسقة تعكس الطابع الفاخر والأمان العالي في كل تفصيلة',
    subtitleEn: 'Balanced proportions projecting elegance and passenger safety',
    badgeAr: '75% — ربع خلفي',
    badgeEn: '75% — Rear 3/4',
    highlightAr: 'نظام تعليق هيدروليكي يمتص اهتزازات الطريق لرحلة بلا إجهاد',
    highlightEn: 'Refined suspension damping road vibrations for effortless travel'
  },
  {
    percent: 100,
    frameIndex: 18,
    degrees: 180,
    cameraPos: [0, 1.2, -5.0],
    titleAr: 'الإطلالة الخلفية وسعة الأمتعة القياسية',
    titleEn: 'Rear Stance & Cargo Readiness',
    subtitleAr: 'صندوق أمتعة عملي يتسع لحقائب السفر ومياه زمزم بكل يسر',
    subtitleEn: 'Spacious trunk capacity accommodating luggage and Zamzam water',
    badgeAr: '100% — الخلف الكامل',
    badgeEn: '100% — Rear View',
    highlightAr: 'سعة رسمية معتمدة: حقيبتان كبيرتان + حقيبتان يدويتان',
    highlightEn: 'Authoritative capacity: 2 Large Suitcases + 2 Hand Bags'
  }
];

export const VehicleScrollStory: React.FC<VehicleScrollStoryProps> = ({ isArabic = true }) => {
  const [activeMode, setActiveMode] = useState<'360' | '3d'>('360');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const storyContainerRef = useRef<HTMLDivElement>(null);

  const currentStep = STORY_STEPS[currentStepIndex];

  // Go to step helper
  const goToStep = (index: number) => {
    const clamped = Math.max(0, Math.min(STORY_STEPS.length - 1, index));
    setCurrentStepIndex(clamped);
  };

  return (
    <div 
      ref={storyContainerRef}
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] text-white"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Interactive Mode Selector Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A97B27] animate-ping" />
              <span className="text-xs font-semibold text-[#A97B27] uppercase tracking-wider">
                {isArabic ? 'معاينة تفاعلية حصرية — تويوتا كامري VIP' : 'Exclusive Interactive Showcase — Toyota Camry VIP'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {isArabic ? 'استكشف المركبة الملكية بزاوية 360 درجة' : 'Explore The Royal Vehicle in 360°'}
            </h2>
          </div>

          {/* Mode Switcher Toggle Button Group */}
          <div className="flex items-center p-1 bg-[#121c2e] rounded-2xl border border-white/10 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveMode('360')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeMode === '360'
                  ? 'bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/40 scale-[1.02]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isArabic ? 'تصوير استوديو 360°' : '360° Photography'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeMode === '3d'
                  ? 'bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/40 scale-[1.02]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>{isArabic ? 'مجسم 3D حقيقي (Three.js)' : 'Real 3D WebGL'}</span>
            </button>
          </div>
        </div>

        {/* Story Progression Navigator Pill Bar */}
        <div className="mb-6 flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {STORY_STEPS.map((step, idx) => {
            const isActive = currentStepIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToStep(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/30 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[10px] font-mono">
                  {idx + 1}
                </span>
                <span>{isArabic ? step.badgeAr : step.badgeEn}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Viewer Container (360° Canvas or 3D WebGL) */}
        <div className="relative mb-8">
          {activeMode === '360' ? (
            <Vehicle360Viewer
              initialFrame={currentStep.frameIndex}
              isArabic={isArabic}
              key={`360-${currentStep.frameIndex}`}
            />
          ) : (
            <Vehicle3DViewer
              isArabic={isArabic}
              key="3d-viewer"
            />
          )}
        </div>

        {/* Narrative Feature Card below Viewer */}
        <div className="bg-[#121c2e] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A97B27]/20 text-[#A97B27] border border-[#A97B27]/30">
                  {isArabic ? currentStep.badgeAr : currentStep.badgeEn}
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {currentStep.degrees}° Rotation
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isArabic ? currentStep.titleAr : currentStep.titleEn}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {isArabic ? currentStep.subtitleAr : currentStep.subtitleEn}
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{isArabic ? currentStep.highlightAr : currentStep.highlightEn}</span>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0 pt-4 md:pt-0">
              <button
                type="button"
                onClick={() => goToStep(currentStepIndex - 1)}
                disabled={currentStepIndex === 0}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white border border-white/10 transition-colors"
                aria-label="Previous step"
              >
                {isArabic ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => goToStep(currentStepIndex + 1)}
                disabled={currentStepIndex === STORY_STEPS.length - 1}
                className="p-3 rounded-2xl bg-[#A97B27] hover:bg-[#A97B27]/90 disabled:opacity-30 disabled:hover:bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/30 transition-colors"
                aria-label="Next step"
              >
                {isArabic ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default VehicleScrollStory;
