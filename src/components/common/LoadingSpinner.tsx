'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-blue-200 border-t-blue-600 animate-spin',
          sizeClasses[size]
        )}
      />
    </div>
  );
}

interface LoadingMessageProps {
  message: string;
  subMessage?: string;
  progress?: number;
  className?: string;
}

export function LoadingMessage({
  message,
  subMessage,
  progress,
  className,
}: LoadingMessageProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8', className)}>
      <LoadingSpinner size="lg" />
      <p className="mt-6 text-lg font-medium text-gray-900">{message}</p>
      {subMessage && (
        <p className="mt-2 text-sm text-gray-600">{subMessage}</p>
      )}
      {progress !== undefined && (
        <div className="mt-6 w-full max-w-md">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">{progress}%</p>
        </div>
      )}
    </div>
  );
}
