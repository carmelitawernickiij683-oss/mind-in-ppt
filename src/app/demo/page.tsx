'use client';

import { useState } from 'react';
import Link from 'next/link';
import StyleSelector from '@/components/StyleSelector';
import type { PresentationStyle } from '@/lib/types';

// 示例 Markdown 数据
const sampleMarkdown = `# 项目架构设计

## 前端
### React
- 组件化开发
- Hooks 状态管理
- 性能优化

### TypeScript
- 类型安全
- 接口定义
- 泛型使用

## 后端
### API 设计
- RESTful API
- GraphQL
- WebSocket

### 数据库
- MySQL
- MongoDB
- Redis 缓存

## 部署
### 云服务
- AWS
- Azure
- Google Cloud

### CI/CD
- GitHub Actions
- Docker 容器化
- Kubernetes 编排
`;

export default function DemoPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [selectedStyle, setSelectedStyle] = useState<PresentationStyle>('executive-report');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  LogicVisualizer
                </h1>
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
                  Demo
                </span>
              </Link>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              返回首页
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            思维导图可视化组件 - 场景化风格系统
          </h2>
          <p className="text-gray-600 text-lg">
            切换不同风格，体验实时视觉效果变化
          </p>
        </div>

        {/* 风格选择器 */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Markdown 输入
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setMarkdown(sampleMarkdown)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm"
                >
                  重置示例
                </button>
                <button
                  onClick={() => setMarkdown('')}
                  className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm"
                >
                  清空
                </button>
              </div>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 p-4 bg-gray-50 text-gray-800 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300"
              placeholder="在此输入 Markdown 内容..."
            />
          </div>

          {/* 右侧：预览占位 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                预览
              </h3>
              <div className="text-sm text-gray-500">
                当前风格: {selectedStyle}
              </div>
            </div>
            <div className="h-96 rounded-lg border border-gray-300 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium mb-2">思维导图功能已移除</p>
                <p className="text-sm">请使用主页的 Markdown 大纲功能</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  前往主页
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">场景化风格</h4>
            <p className="text-gray-600 text-sm">四种预设风格，商务/极简/创意/学术</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">实时切换</h4>
            <p className="text-gray-600 text-sm">300ms 平滑过渡，即时生效</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">智能配色</h4>
            <p className="text-gray-600 text-sm">每套风格专属配色方案</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">完整方案</h4>
            <p className="text-gray-600 text-sm">包含颜色、字体、AI 提示词</p>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">风格系统说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">💼 商务汇报</h4>
              <p className="text-sm text-gray-600 mb-3">沉稳深蓝，专业图标，适合正式商务场合</p>

              <h4 className="font-medium text-gray-900 mb-2">⚡ 极简科技</h4>
              <p className="text-sm text-gray-600 mb-3">黑白灰配色，极细线条，现代科技感</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🎨 创意脑暴</h4>
              <p className="text-sm text-gray-600 mb-3">活泼撞色，粗体圆角，激发创意灵感</p>

              <h4 className="font-medium text-gray-900 mb-2">📚 学术研讨</h4>
              <p className="text-sm text-gray-600">灰色系，书卷气息，严谨规范</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
