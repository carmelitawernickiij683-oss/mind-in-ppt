'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  type?: 'fade' | 'slide' | 'scale';
}

export function AnimatedTransition({
  children,
  show,
  className = '',
  type = 'fade',
}: AnimatedTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      // 显示：先渲染内容，再触发动画
      setShouldRender(true);
      // 使用 requestAnimationFrame 确保 DOM 更新后再触发动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      // 隐藏：先触发动画，动画完成后再移除内容
      setIsVisible(false);
      // 等待动画完成（300ms）
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!shouldRender) return null;

  const animations = {
    fade: cn(
      'transition-opacity duration-300 ease-out',
      isVisible ? 'opacity-100' : 'opacity-0'
    ),
    slide: cn(
      'transition-all duration-300 ease-out',
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-4'
    ),
    scale: cn(
      'transition-all duration-300 ease-out',
      isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95'
    ),
  };

  return (
    <div className={cn(animations[type], className)}>
      {children}
    </div>
  );
}

/**
 * 页面切换动画容器
 */
interface PageTransitionProps {
  children: React.ReactNode;
  stepKey: string;
  className?: string;
}

export function PageTransition({ children, stepKey, className = '' }: PageTransitionProps) {
  const [currentStep, setCurrentStep] = useState(stepKey);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(stepKey);

  useEffect(() => {
    if (stepKey !== currentStep) {
      setIsTransitioning(true);

      // 等待退出动画
      setTimeout(() => {
        setDisplayStep(stepKey);
        setCurrentStep(stepKey);

        // 等待进入动画
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    }
  }, [stepKey, currentStep]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'transition-all duration-200 ease-in-out',
          isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * 加载骨架屏
 */
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export function Skeleton({ className = '', variant = 'rect' }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-3/4 animate-pulse bg-gray-200 rounded',
    rect: 'h-32 w-full animate-pulse bg-gray-200 rounded-lg',
    circle: 'h-12 w-12 animate-pulse bg-gray-200 rounded-full',
  };

  return <div className={cn(variants[variant], className)} />;
}

/**
 * 按钮点击动画
 */
export function AnimatedButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'transition-all duration-200 ease-out',
        'hover:scale-105 active:scale-95',
        'disabled:hover:scale-100 disabled:active:scale-100',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
