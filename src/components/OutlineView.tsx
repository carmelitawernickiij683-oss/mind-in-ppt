'use client';

import type { Outline, PresentationStyle } from '@/lib/types';
import SmartIcon, { SmartMaterialBadge } from './SmartIcon';
import { recommendIcon, generateVisualCue } from '@/lib/iconRecommendation';

interface OutlineViewProps {
  outline: Outline;
  onGeneratePPT: () => void;
  isGeneratingPPT: boolean;
  onReset: () => void;
  style?: PresentationStyle;
}

function OutlineItem({
  item,
  level = 1,
  style = 'executive-report',
}: {
  item: any;
  level?: number;
  style?: PresentationStyle;
}) {
  const indent = level > 1 ? `${(level - 1) * 24}px` : '0';

  // 为每个项目生成图标推荐
  const suggestedIcon = item.suggestedIcon || recommendIcon(item.title);
  const visualCue = item.visualCue || generateVisualCue(item.title, item.content || []);

  return (
    <div className="mb-6" style={{ marginLeft: indent }}>
      {/* 标题和图标 */}
      <div className="flex items-start gap-3 mb-3">
        <SmartIcon iconName={suggestedIcon} style={style} size={24} />
        <div className="flex-1">
          <div
            className={`font-semibold ${
              level === 1
                ? 'text-xl text-gray-900'
                : level === 2
                ? 'text-lg text-gray-800'
                : 'text-base text-gray-700'
            }`}
          >
            {item.title}
          </div>
        </div>
      </div>

      {/* 内容列表 */}
      {item.content && item.content.length > 0 && (
        <ul className="mt-2 ml-9 space-y-2">
          {item.content.map((point: string, idx: number) => (
            <li key={idx} className="text-gray-600 flex items-start">
              <span className="mr-2 text-blue-500 mt-0.5">•</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 智能视觉建议（仅在一级标题显示） */}
      {level === 1 && (item.suggestedIcon || item.visualCue) && (
        <div className="ml-9 mt-3">
          <SmartMaterialBadge
            iconName={suggestedIcon}
            visualCue={visualCue}
            style={style}
          />
        </div>
      )}

      {/* 子项 */}
      {item.children &&
        item.children.map((child: any, idx: number) => (
          <OutlineItem key={idx} item={child} level={level + 1} style={style} />
        ))}
    </div>
  );
}

export default function OutlineView({
  outline,
  onGeneratePPT,
  isGeneratingPPT,
  onReset,
  style = 'executive-report',
}: OutlineViewProps) {
  // 为整个大纲生成统计信息
  const totalItems = outline.items?.length || 0;
  const estimatedSlides = Math.max(totalItems, 5);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 头部 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {outline.title}
            </h2>
            <p className="text-sm text-gray-500">
              生成时间: {new Date(outline.metadata.createdAt).toLocaleString('zh-CN')} |
              预计 {estimatedSlides} 张幻灯片
            </p>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            重新开始
          </button>
        </div>

        {/* 大纲内容 */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700">大纲内容</h3>
            <div className="text-sm text-gray-500">
              💡 AI 已自动推荐图标和视觉建议
            </div>
          </div>
          {outline.items && outline.items.map((item, idx) => (
            <OutlineItem key={idx} item={item} style={style} />
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={onGeneratePPT}
            disabled={isGeneratingPPT}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              isGeneratingPPT
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
            }`}
          >
            {isGeneratingPPT ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                生成中...
              </span>
            ) : (
              '📊 生成PPT文件'
            )}
          </button>
        </div>

        {/* 提示信息 */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">
            🎨 智能素材推荐系统
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 每个章节都包含 AI 推荐的匹配图标</li>
            <li>• 视觉建议帮助您选择合适的布局和素材</li>
            <li>• 图标颜色会根据选择的风自动适配</li>
            <li>• 生成 PPT 时将自动应用这些视觉建议</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
