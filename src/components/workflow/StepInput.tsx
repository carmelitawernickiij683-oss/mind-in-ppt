'use client';

import { useState } from 'react';
import { STYLE_CATEGORIES, STYLE_CONFIGS, getStyleConfig } from '@/lib/styles';
import type { PresentationStyle, StyleCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StepInputProps {
  onSubmit: (text: string, style: PresentationStyle) => void;
  isLoading?: boolean;
  defaultStyle?: PresentationStyle;
}

export function StepInput({ onSubmit, isLoading = false, defaultStyle = 'executive-report' }: StepInputProps) {
  const [selectedStyle, setSelectedStyle] = useState<PresentationStyle>(defaultStyle);
  const [inputText, setInputText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<StyleCategory | null>(null);

  const wordCount = inputText.length;
  const isValid = wordCount >= 50 && wordCount <= 5000;

  const currentStyle = getStyleConfig(selectedStyle);

  const handleSubmit = () => {
    if (isValid && !isLoading) {
      onSubmit(inputText, selectedStyle);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 风格选择器 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📌</span>
          <h3 className="text-lg font-semibold text-gray-900">演示风格</h3>
        </div>

        {/* 下拉菜单 */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              'w-full px-4 py-3 rounded-lg border-2 flex items-center justify-between transition-all duration-200',
              'hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isDropdownOpen && 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20'
            )}
            style={{ backgroundColor: currentStyle.colors.surface }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentStyle.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{currentStyle.name}</div>
                <div className="text-sm text-gray-500">{currentStyle.scene}</div>
              </div>
            </div>
            <svg
              className={cn(
                'w-5 h-5 text-gray-500 transition-transform duration-200',
                isDropdownOpen && 'transform rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* 下拉菜单内容 */}
          {isDropdownOpen && (
            <>
              {/* 点击外部关闭 */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* 菜单 */}
              <div className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
                {Object.entries(STYLE_CATEGORIES).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="relative">
                    {/* 类别标题 */}
                    <div
                      className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 sticky top-0"
                      onMouseEnter={() => setHoveredCategory(categoryKey as StyleCategory)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label} ({category.styles.length}种)
                    </div>

                    {/* 该类别下的风格 */}
                    <div>
                      {category.styles.map((styleId) => {
                        const style = STYLE_CONFIGS[styleId as PresentationStyle];
                        return (
                          <button
                            key={styleId}
                            onClick={() => {
                              setSelectedStyle(styleId as PresentationStyle);
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              'w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors duration-150',
                              selectedStyle === styleId && 'bg-blue-100 border-l-4 border-blue-600'
                            )}
                          >
                            <span className="text-xl">{style.icon}</span>
                            <div className="text-left flex-1">
                              <div className="font-medium text-gray-900">{style.name}</div>
                              <div className="text-sm text-gray-500">{style.scene}</div>
                            </div>
                            {selectedStyle === styleId && (
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 风格提示 */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-blue-600 mt-0.5">💡</span>
          <p className="text-sm text-blue-900">
            根据您的演示场景选择合适的风格，AI 将按照该风格生成内容
          </p>
        </div>
      </div>

      {/* 文本输入 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <h3 className="text-lg font-semibold text-gray-900">输入您的文本</h3>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入或粘贴您想要转换的文本内容..."
            className={cn(
              'w-full h-64 px-4 py-3 rounded-lg border-2 resize-none transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isValid ? 'border-gray-300 hover:border-gray-400' : 'border-red-300',
              'placeholder:text-gray-400'
            )}
            style={{
              fontFamily: currentStyle.fonts.body,
              backgroundColor: currentStyle.colors.surface,
            }}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500 bg-white/80 px-2 py-1 rounded">
            {wordCount} / 5000
          </div>
        </div>

        {/* 验证提示 */}
        {wordCount > 0 && !isValid && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <span className="text-yellow-600 mt-0.5">⚠️</span>
            <p className="text-sm text-yellow-900">
              {wordCount < 50
                ? `文本太短了，至少需要 50 个字符（当前 ${wordCount} 个）`
                : `文本太长了，最多支持 5000 个字符（当前 ${wordCount} 个）`}
            </p>
          </div>
        )}

        {isValid && (
          <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600 mt-0.5">✓</span>
            <p className="text-sm text-green-900">
              文本长度合适，可以开始分析了！
            </p>
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={cn(
            'px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
            'focus:outline-none focus:ring-2 focus:ring-offset-2'
          )}
          style={{
            backgroundColor: isValid ? currentStyle.colors.primary : '#9ca3af',
          }}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              正在分析...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>📊</span>
              智能分析
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
