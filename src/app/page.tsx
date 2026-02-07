'use client';

import { useState } from 'react';
import { ProgressIndicator } from '@/components/common/ProgressIndicator';
import { PageTransition } from '@/components/common/AnimatedTransition';
import { StepInput } from '@/components/workflow/StepInput';
import { StepAnalysis } from '@/components/workflow/StepAnalysis';
import { StepReview } from '@/components/workflow/StepReview';
import { StepComplete } from '@/components/workflow/StepComplete';
import { LoadingMessage } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import type { WorkflowState, PresentationStyle, AnalysisResult, OutlineWithMindmap } from '@/lib/types';

// 工作流步骤定义
const WORKFLOW_STEPS = [
  { key: 'input', label: '输入', icon: '📝' },
  { key: 'analysis', label: '分析', icon: '🔍' },
  { key: 'review', label: '确认', icon: '✓' },
  { key: 'generate', label: '生成', icon: '📊' },
] as const;

export default function Home() {
  // 工作流状态
  const [currentStep, setCurrentStep] = useState<WorkflowState>('input');
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<PresentationStyle>('executive-report');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [outlineData, setOutlineData] = useState<OutlineWithMindmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 步骤1: 智能分析
  const handleAnalyze = async (text: string, style: PresentationStyle) => {
    setUserInput(text);
    setSelectedStyle(style);
    setIsLoading(true);
    setError(null);
    setCurrentStep('analyzing');

    try {
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style }),
      });

      const data = await response.json();

      if (data.success && data.result) {
        setAnalysisResult(data.result);
        setCurrentStep('analysisReview');
      } else {
        setError(data.error || '分析失败，请重试');
        setCurrentStep('input');
      }
    } catch (err) {
      setError('网络错误，请检查您的连接并重试');
      console.error('Error:', err);
      setCurrentStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  // 步骤2: 确认分析结果并生成大纲
  const handleConfirmAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentStep('generating');

    try {
      const response = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userInput,
          style: selectedStyle,
          analysisResult,
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setOutlineData(data.data);
        setCurrentStep('review');
      } else {
        setError(data.error || '生成大纲失败，请重试');
        setCurrentStep('analysisReview');
      }
    } catch (err) {
      setError('网络错误，请检查您的连接并重试');
      console.error('Error:', err);
      setCurrentStep('analysisReview');
    } finally {
      setIsLoading(false);
    }
  };

  // 步骤3: 返回修改输入
  const handleBackToInput = () => {
    setCurrentStep('input');
    setError(null);
  };

  // 步骤3: 返回分析结果
  const handleBackToAnalysis = () => {
    setCurrentStep('analysisReview');
    setError(null);
  };

  // 步骤3: 重新生成大纲
  const handleRegenerateOutline = async () => {
    await handleConfirmAnalysis();
  };

  // 步骤3: 切换风格
  const handleStyleChange = (newStyle: PresentationStyle) => {
    setSelectedStyle(newStyle);
    // TODO: 可以在这里重新生成大纲以应用新风格
  };

  // 步骤4: 生成 PPT
  const handleGeneratePPT = async () => {
    try {
      const response = await fetch('/api/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outline: outlineData?.outline,
          style: selectedStyle,
        }),
      });

      if (response.ok) {
        // 从响应中获取 blob 并触发下载
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // 从响应头获取文件名
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'presentation.pptx';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (filenameMatch) {
            filename = decodeURIComponent(filenameMatch[1]);
          }
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        throw new Error(data.error || '生成PPT失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成PPT时出错');
      throw err;
    }
  };

  // 重置工作流
  const handleReset = () => {
    setCurrentStep('input');
    setUserInput('');
    setAnalysisResult(null);
    setOutlineData(null);
    setError(null);
    setIsLoading(false);
  };

  // 获取进度指示器的当前步骤
  const getProgressStep = () => {
    switch (currentStep) {
      case 'input':
      case 'analyzing':
        return 'input';
      case 'analysisReview':
        return 'analysis';
      case 'generating':
      case 'review':
        return 'review';
      case 'pptGenerating':
        return 'generate';
      default:
        return 'input';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🧠 Mind in PPT</h1>
              <p className="mt-1 text-sm text-gray-500">AI驱动的演示文稿生成工具</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <ProgressIndicator steps={WORKFLOW_STEPS} currentStep={getProgressStep()} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6">
            <ErrorAlert message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {/* 步骤1: 输入和风格选择 */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'input' && (
            <StepInput onSubmit={handleAnalyze} isLoading={isLoading} />
          )}
        </PageTransition>

        {/* 分析中 */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'analyzing' && (
            <LoadingMessage
              message="AI 正在分析您的文本..."
              subMessage="提取核心主题和关键要点"
            />
          )}
        </PageTransition>

        {/* 步骤2: 查看分析结果 */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'analysisReview' && analysisResult && (
            <StepAnalysis
              analysisResult={analysisResult}
              selectedStyle={selectedStyle}
              onConfirm={handleConfirmAnalysis}
              onBack={handleBackToInput}
            />
          )}
        </PageTransition>

        {/* 生成大纲中 */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'generating' && (
            <LoadingMessage
              message="正在生成结构化大纲..."
              subMessage="AI 正在应用智能素材建议"
            />
          )}
        </PageTransition>

        {/* 步骤3: 查看大纲 */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'review' && outlineData && (
            <StepReview
              outlineData={outlineData}
              selectedStyle={selectedStyle}
              onStyleChange={handleStyleChange}
              onGeneratePPT={() => setCurrentStep('pptGenerating')}
              onBack={handleBackToAnalysis}
              onRegenerate={handleRegenerateOutline}
            />
          )}
        </PageTransition>

        {/* 步骤4: 生成 PPT */}
        <PageTransition stepKey={currentStep}>
          {currentStep === 'pptGenerating' && (
            <StepComplete
              selectedStyle={selectedStyle}
              outlineData={outlineData}
              onBack={() => setCurrentStep('review')}
              onReset={handleReset}
            />
          )}
        </PageTransition>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Powered by 智谱AI GLM | Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
