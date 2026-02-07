'use client';

import { cn } from '@/lib/utils';

interface Step {
  key: string;
  label: string;
  icon: string;
}

interface ProgressIndicatorProps {
  steps: readonly Step[];
  currentStep: string;
  className?: string;
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className={cn('w-full py-4', className)}>
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* 步骤圆圈 */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300',
                    isCurrent && 'ring-4 ring-blue-500 ring-opacity-20',
                    isCompleted
                      ? 'bg-green-500 text-white shadow-md'
                      : isCurrent
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium whitespace-nowrap transition-colors duration-300',
                    isCurrent
                      ? 'text-blue-600 font-semibold'
                      : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-500'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* 连接线（不是最后一个步骤时显示） */}
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 mt-[-20px] transition-all duration-300',
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
