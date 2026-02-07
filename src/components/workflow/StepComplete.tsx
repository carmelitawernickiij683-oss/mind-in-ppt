'use client';

import { useState, useEffect } from 'react';
import { getStyleConfig } from '@/lib/styles';
import type { PresentationStyle } from '@/lib/types';

interface StepCompleteProps {
  selectedStyle: PresentationStyle;
  onBack: () => void;
  onReset: () => void;
  outlineData?: any;
}

export function StepComplete({ selectedStyle, onBack, onReset, outlineData }: StepCompleteProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pptData, setPptData] = useState<{ filename: string; base64: string; contentType: string } | null>(null);

  const style = getStyleConfig(selectedStyle);

  // 生成 PPT
  const handleGeneratePPT = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outline: outlineData?.outline,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setPptData(data.data);
        setIsGenerating(false);
      } else {
        setError(data.error || '生成 PPT 失败');
        setIsGenerating(false);
      }
    } catch (err) {
      console.error('Error generating PPT:', err);
      setError('网络错误，请检查连接并重试');
      setIsGenerating(false);
    }
  };

  // 手动下载 PPT
  const handleDownload = () => {
    if (!pptData) return;

    try {
      // 将 base64 转换为 blob
      const binaryString = atob(pptData.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: pptData.contentType });

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pptData.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('✅ PPT 下载成功:', pptData.filename);
    } catch (err) {
      console.error('下载失败:', err);
      alert('下载失败，请重试');
    }
  };

  // 自动生成
  useEffect(() => {
    handleGeneratePPT();
  }, []);

  if (isGenerating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          {/* 加载动画 */}
          <div className="inline-block">
            <svg
              className="animate-spin h-16 w-16 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
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
                d="M4 12a8 8 0 018-8 8 0 000 8 8 0 018 8 0 000-8 8 0 00-8 8z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900">正在生成您的 PPT...</h3>
          <p className="text-gray-600 mt-2">AI 正在应用智能素材建议，优化布局和配色</p>

          {/* 进度提示 */}
          <div className="space-y-2 mt-8">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>已完成大纲结构生成</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>已应用智能图标推荐</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>已优化布局和配色</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-md text-center space-y-6">
          <div className="text-6xl">❌</div>
          <h3 className="text-2xl font-bold text-gray-900">生成失败</h3>
          <p className="text-gray-600">{error}</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              返回修改
            </button>
            <button
              onClick={() => {
                setError(null);
                setIsGenerating(true);
                handleGeneratePPT();
              }}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: style.colors.primary }}
            >
              重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 生成成功
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        {/* 成功消息 */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">🎉 PPT 生成成功！</h2>
          <p className="text-xl text-gray-600">您的演示文稿已准备就绪</p>
        </div>

        {/* PPT 信息卡片 */}
        <div
          className="rounded-xl border-2 p-8 bg-white shadow-2xl"
          style={{ borderColor: style.colors.primary }}
        >
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ backgroundColor: style.colors.background }}
            >
              📊
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">PPT 文件</h3>
              <p className="text-gray-500 mt-1">PowerPoint 演示文稿</p>
              {pptData && (
                <p className="text-sm text-gray-400 mt-2">
                  文件名：<span className="font-mono">{pptData.filename}</span>
                </p>
              )}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: style.colors.primary }}>
                {outlineData?.outline?.items?.length || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">章节数</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: style.colors.secondary }}>
                {style.icon}
              </div>
              <div className="text-sm text-gray-600 mt-1">{style.name}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600">✓</div>
              <div className="text-sm text-gray-600 mt-1">智能优化</div>
            </div>
          </div>

          {/* 下载按钮 */}
          <button
            onClick={handleDownload}
            className="w-full px-8 py-5 rounded-xl font-bold text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 text-lg"
            style={{ backgroundColor: style.colors.primary }}
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              下载 PPT 文件
            </span>
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            点击按钮即可下载到本地
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-8 py-4 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-lg"
          >
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回修改大纲
            </span>
          </button>
          <button
            onClick={onReset}
            className="px-8 py-4 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-lg"
          >
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              创建新的 PPT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
