import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface BookingStepperProps {
  steps: StepItem[];
  currentStep: number; // 1-indexed
  onStepClick?: (stepNumber: number) => void;
  className?: string;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto py-4 ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Continuous Background Line */}
        <div className="absolute top-5 left-6 right-6 h-[2px] bg-[#E8E3DA] -z-0" />

        {/* Dynamic Progress Fill Line */}
        <div
          className="absolute top-5 start-6 h-[2px] bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] transition-all duration-500 -z-0"
          style={{
            width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100))}%`,
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

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
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm ${
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
              <div className="mt-2.5 text-center px-1">
                <span
                  className={`block text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors leading-tight ${
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
                  <span className="hidden sm:block text-[10px] text-[#687386] font-light mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
