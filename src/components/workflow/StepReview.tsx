'use client';

import { useState } from 'react';
import { getStyleConfig, STYLE_OPTIONS } from '@/lib/styles';
import type { PresentationStyle, OutlineWithMindmap } from '@/lib/types';

interface StepReviewProps {
  outlineData: OutlineWithMindmap;
  selectedStyle: PresentationStyle;
  onStyleChange: (style: PresentationStyle) => void;
  onGeneratePPT: () => void;
  onBack: () => void;
  onRegenerate: () => void;
}

export function StepReview({
  outlineData,
  selectedStyle,
  onStyleChange,
  onGeneratePPT,
  onBack,
  onRegenerate,
}: StepReviewProps) {
  const [currentStyle, setCurrentStyle] = useState<PresentationStyle>(selectedStyle);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'markdown' | 'tree'>('markdown');

  const style = getStyleConfig(currentStyle);

  // 处理风格切换
  const handleStyleChange = (newStyle: PresentationStyle) => {
    setCurrentStyle(newStyle);
    onStyleChange(newStyle);
    setIsStyleDropdownOpen(false);
  };

  // 下载 Markdown 大纲
  const handleDownloadMarkdown = () => {
    const markdownContent = outlineData.mindmapMarkdown;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${outlineData.outline.title}_大纲.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 复制 Markdown 到剪贴板
  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(outlineData.mindmapMarkdown);
      alert('✅ Markdown 已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
      alert('❌ 复制失败，请手动复制');
    }
  };

  // 递归渲染树形大纲
  const renderTreeItem = (item: any, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const indent = level * 16;

    return (
      <div key={item.id} className="mt-1">
        <div
          className="flex items-start gap-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer"
          style={{ paddingLeft: `${indent}px` }}
        >
          {hasChildren && (
            <span className="text-gray-400">▶</span>
          )}
          <span className="font-medium text-gray-800">{item.title}</span>
          {item.suggestedIcon && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
              {item.suggestedIcon}
            </span>
          )}
        </div>
        {hasChildren && (
          <div>
            {item.children.map((child: any) => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* 顶部工具栏 - 紧凑 */}
      <div className="flex-shrink-0 border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">📋 大纲预览</h2>

            {/* 视图切换 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('markdown')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'markdown'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Markdown 格式
              </button>
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'tree'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                树形结构
              </button>
            </div>

            {/* 风格切换 */}
            <div className="relative">
              <button
                onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm hover:border-blue-400 transition-colors"
                style={{ borderColor: style.colors.primary }}
              >
                <span>{style.icon}</span>
                <span className="font-medium">{style.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isStyleDropdownOpen && 'transform rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isStyleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsStyleDropdownOpen(false)} />
                  <div className="absolute z-20 top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
                    {STYLE_OPTIONS.map((styleOption) => (
                      <button
                        key={styleOption.value}
                        onClick={() => handleStyleChange(styleOption.value)}
                        className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-blue-50 transition-colors text-left ${
                          currentStyle === styleOption.value && 'bg-blue-100'
                        }`}
                      >
                        <span className="text-lg">{styleOption.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{styleOption.label}</div>
                          <div className="text-xs text-gray-500">{styleOption.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-2">
            {viewMode === 'markdown' && (
              <>
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  复制
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: style.colors.secondary }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载
                </button>
              </>
            )}
          </div>
        </div>

        {/* 统计信息条 */}
        <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
          <span>📄 {outlineData.outline.items.length} 个章节</span>
          <span>📊 约 {outlineData.outline.items.length * 2}-{outlineData.outline.items.length * 3} 张幻灯片</span>
          <span>📝 {outlineData.outline.metadata.sourceTextLength} 字</span>
        </div>
      </div>

      {/* 主内容区域 - 最大化 */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'markdown' ? (
          /* Markdown 预览 - 全屏 */
          <div className="h-full p-6">
            <div className="h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 overflow-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
                {outlineData.mindmapMarkdown}
              </pre>
            </div>
          </div>
        ) : (
          /* 树形结构预览 */
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{outlineData.outline.title}</h3>
              {outlineData.outline.items.map((item) => renderTreeItem(item))}
            </div>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="flex-shrink-0 border-t bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </span>
            </button>
            <button
              onClick={onRegenerate}
              className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重新生成
              </span>
            </button>
          </div>

          <button
            onClick={onGeneratePPT}
            className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all text-base"
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
              生成 PPT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
