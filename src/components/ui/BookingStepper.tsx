import React from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface BookingStepperProps {
  steps: StepItem[];
  currentStep: number; // 1-indexed
  onStepClick?: (stepNumber: number) => void;
  locale?: string;
  className?: string;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  locale = 'en',
  className = '',
}) => {
  const isAr = locale === 'ar';
  const progressPercent = Math.max(
    0,
    Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100)
  );

  const activeStepItem = steps[currentStep - 1] || steps[0];

  return (
    <div className={`w-full max-w-4xl mx-auto py-2 sm:py-4 ${className}`}>
      {/* MOBILE COMPACT VIEW (< md: 390px - 767px) */}
      <div className="block md:hidden bg-[#F7F5F0] rounded-2xl p-4 border border-[#E8E3DA]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-sans text-[11px] font-bold text-[#C5A15D] uppercase tracking-wider">
            {isAr ? `الخطوة ٠${currentStep} من ٠${steps.length}` : `Step 0${currentStep} of 0${steps.length}`}
          </span>
          <span className="font-sans font-bold text-xs text-[#182235]">
            {activeStepItem?.label}
          </span>
        </div>

        {/* Compact Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E8E3DA] overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] transition-all duration-300"
            style={{ width: `${Math.max(10, (currentStep / steps.length) * 100)}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-between gap-1">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isCompleted && onStepClick && onStepClick(stepNum)}
                className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#101827] text-[#D7B76C] font-bold text-[10px]'
                    : isCompleted
                    ? 'bg-[#188567]/15 text-[#188567] font-semibold text-[10px]'
                    : 'text-[#687386] text-[10px]'
                }`}
              >
                <span className="truncate block">
                  {stepNum}. {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP & TABLET EXPANDED VIEW (>= md: 768px+) */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Continuous Background Line */}
          <div className="absolute top-5 left-6 right-6 h-[2px] bg-[#E8E3DA] -z-0" />

          {/* Dynamic Progress Fill Line */}
          <div
            className="absolute top-5 start-6 h-[2px] bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] transition-all duration-500 -z-0"
            style={{ width: `${progressPercent}%` }}
          />

          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10 flex-1 cursor-default group"
                onClick={() => {
                  if (isCompleted && onStepClick) {
                    onStepClick(stepNumber);
                  }
                }}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-sans font-bold text-xs lg:text-sm transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-[#188567] text-white cursor-pointer hover:scale-105'
                      : isCurrent
                      ? 'bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] ring-4 ring-[#C5A15D]/25 font-extrabold scale-110'
                      : 'bg-[#FFFFFF] text-[#687386] border border-[#E8E3DA]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>{stepNumber.toString().padStart(2, '0')}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center px-1">
                  <span
                    className={`block font-sans text-xs font-bold uppercase tracking-wider transition-colors leading-tight ${
                      isCurrent
                        ? 'text-[#C5A15D]'
                        : isCompleted
                        ? 'text-[#182235]'
                        : 'text-[#687386]'
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="block font-sans text-[11px] text-[#687386] font-light mt-0.5">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
