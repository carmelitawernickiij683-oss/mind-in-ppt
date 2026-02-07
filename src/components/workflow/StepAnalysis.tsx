'use client';

import { getStyleConfig } from '@/lib/styles';
import type { PresentationStyle, AnalysisResult } from '@/lib/types';

interface StepAnalysisProps {
  analysisResult: AnalysisResult;
  selectedStyle: PresentationStyle;
  onConfirm: () => void;
  onBack: () => void;
}

export function StepAnalysis({
  analysisResult,
  selectedStyle,
  onConfirm,
  onBack,
}: StepAnalysisProps) {
  const style = getStyleConfig(selectedStyle);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">分析完成</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          AI 已完成对您内容的分析
        </h2>
        <p className="mt-2 text-gray-600">请查看以下分析结果，确认后将生成结构化大纲</p>
      </div>

      {/* 核心主题 */}
      <div
        className="rounded-lg border-2 p-6 bg-white shadow-sm"
        style={{ borderColor: style.colors.primary }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📊</span>
          <h3 className="text-xl font-semibold text-gray-900">核心主题</h3>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-lg font-medium text-gray-900">{analysisResult.coreTopic}</p>
          <p className="mt-2 text-sm text-gray-600">
            这是根据您输入的文本内容，AI 识别出的最核心的主题
          </p>
        </div>
      </div>

      {/* 关键要点 */}
      <div className="rounded-lg border-2 p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔑</span>
          <h3 className="text-xl font-semibold text-gray-900">
            关键要点 ({analysisResult.keyPoints.length} 个)
          </h3>
        </div>
        <div className="space-y-3">
          {analysisResult.keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: style.colors.primary }}
              >
                {index + 1}
              </div>
              <p className="flex-1 pt-1 text-gray-900">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 结构建议 */}
      <div className="rounded-lg border-2 p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📐</span>
          <h3 className="text-xl font-semibold text-gray-900">结构建议</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl font-bold" style={{ color: style.colors.primary }}>
              {analysisResult.mainStructure.estimatedSlides}
            </div>
            <div className="text-sm text-gray-600 mt-1">预计幻灯片数量</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div
              className={`text-3xl font-bold ${
                analysisResult.mainStructure.complexity === 'simple'
                  ? 'text-green-600'
                  : analysisResult.mainStructure.complexity === 'medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {analysisResult.mainStructure.complexity === 'simple'
                ? '简单'
                : analysisResult.mainStructure.complexity === 'medium'
                  ? '中等'
                  : '复杂'}
            </div>
            <div className="text-sm text-gray-600 mt-1">内容复杂度</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="text-3xl font-bold" style={{ color: style.colors.secondary }}>
              {analysisResult.mainStructure.suggestedSections.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">建议章节数</div>
          </div>
        </div>

        {/* 推荐章节 */}
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">推荐章节：</div>
          <div className="flex flex-wrap gap-2">
            {analysisResult.mainStructure.suggestedSections.map((section, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: style.colors.background,
                  color: style.colors.primary,
                  border: `1px solid ${style.colors.border}`,
                }}
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI 建议 */}
      {analysisResult.suggestions && (
        <div className="rounded-lg border-2 p-6 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-semibold text-gray-900">AI 建议</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🎨</span>
              <div>
                <div className="font-medium text-gray-900">推荐风格</div>
                <div className="text-sm text-gray-600">{getStyleConfig(analysisResult.suggestions.recommendedStyle).name}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🎯</span>
              <div>
                <div className="font-medium text-gray-900">重点方向</div>
                <div className="text-sm text-gray-600">
                  {analysisResult.suggestions.focusAreas.join('、')}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">✨</span>
              <div>
                <div className="font-medium text-gray-900">视觉方式</div>
                <div className="text-sm text-gray-600">{analysisResult.suggestions.visualApproach}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 关键词标签 */}
      {analysisResult.extractedKeywords && analysisResult.extractedKeywords.length > 0 && (
        <div className="rounded-lg border-2 p-6 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏷️</span>
            <h3 className="text-xl font-semibold text-gray-900">提取的关键词</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysisResult.extractedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: style.colors.background,
                  color: style.colors.primary,
                  border: `1px solid ${style.colors.border}`,
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回修改输入
          </span>
        </button>
        <button
          onClick={onConfirm}
          className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: style.colors.primary }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            确认并生成大纲
          </span>
        </button>
      </div>
    </div>
  );
}
