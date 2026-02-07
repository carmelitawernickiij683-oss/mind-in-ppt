'use client';

import Link from 'next/link';
import SmartMaterialDemo from '@/components/SmartMaterialDemo';

export default function SmartMaterialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Mind in PPT
                </h1>
                <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                  智能素材推荐
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
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 智能素材推荐系统演示
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AI 为每个幻灯片自动推荐匹配的图标和视觉设计建议，
            根据选择的演示风格自动适配配色方案
          </p>
        </div>

        {/* 演示内容 */}
        <SmartMaterialDemo />

        {/* 使用说明 */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            📖 使用指南
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                💡 智能推荐功能
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>
                    <strong>自动图标推荐：</strong>
                    根据幻灯片标题和内容，AI 自动从 100+ Lucide 图标中选择最匹配的图标
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>
                    <strong>视觉设计建议：</strong>
                    为每个章节提供布局、图片、配色的具体建议
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>
                    <strong>风格自动适配：</strong>
                    图标颜色和样式根据选择的演示风格自动调整
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span>
                    <strong>关键词识别：</strong>
                    智能识别"数据"、"AI"、"团队"等关键词，推荐对应图标
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                🎨 四种演示风格
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">💼</span>
                  <span>
                    <strong>商务汇报：</strong>
                    沉稳深蓝，专业图标，适合正式场合
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">⚡</span>
                  <span>
                    <strong>极简科技：</strong>
                    黑白灰配色，极细线条，现代科技感
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-0.5">🎨</span>
                  <span>
                    <strong>创意脑暴：</strong>
                    活泼撞色，粗体圆角，激发创意灵感
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-0.5">📚</span>
                  <span>
                    <strong>学术研讨：</strong>
                    灰色系，书卷气息，严谨规范
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">
              🔮 未来规划
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 支持用户手动更换推荐图标</li>
              <li>• 集成到主工作流中，实时生成视觉建议</li>
              <li>• 在生成 PPT 时自动应用这些视觉素材</li>
              <li>• 支持更多图标库和自定义图标上传</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
