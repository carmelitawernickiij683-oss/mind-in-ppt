'use client';

import { useState } from 'react';
import type { PresentationStyle } from '@/lib/types';
import OutlineView from './OutlineView';
import StyleSelector from './StyleSelector';
import { generateVisualSuggestions } from '@/lib/iconRecommendation';
import type { Outline } from '@/lib/types';

// 模拟大纲数据
const mockOutline: Outline = {
  title: '2024年产品发展战略规划',
  items: [
    {
      id: '1',
      title: '市场分析与趋势',
      content: [
        '2024年市场规模预计达到500亿',
        '年增长率保持在25%以上',
        '主要竞争对手分析',
        '用户需求变化趋势',
      ],
      level: 1,
    },
    {
      id: '2',
      title: '产品技术创新',
      content: [
        '引入AI智能推荐算法',
        '优化用户体验流程',
        '提升系统性能300%',
      ],
      level: 1,
      children: [
        {
          id: '2-1',
          title: '核心技术突破',
          content: [
            '深度学习模型优化',
            '实时数据处理能力',
            '边缘计算架构',
          ],
          level: 2,
        },
      ],
    },
    {
      id: '3',
      title: '团队协作与组织',
      content: [
        '扩大研发团队至100人',
        '建立跨部门协作机制',
        '优化工作流程',
      ],
      level: 1,
    },
    {
      id: '4',
      title: '目标与里程碑',
      content: [
        'Q1完成核心功能开发',
        'Q2实现用户增长50%',
        'Q3拓展海外市场',
        'Q4实现盈亏平衡',
      ],
      level: 1,
    },
    {
      id: '5',
      title: '风险评估与应对',
      content: [
        '技术风险：建立备份方案',
        '市场风险：多元化产品线',
        '人才风险：完善激励机制',
      ],
      level: 1,
    },
  ],
  metadata: {
    createdAt: new Date().toISOString(),
    sourceTextLength: 1500,
  },
};

export default function SmartMaterialDemo() {
  const [selectedStyle, setSelectedStyle] = useState<PresentationStyle>('executive-report');
  const [outline, setOutline] = useState<Outline>(mockOutline);

  // 应用智能视觉建议到大纲
  const enhanceOutlineWithSuggestions = (baseOutline: Outline): Outline => {
    const enhancedItems = baseOutline.items.map((item) => {
      const suggestions = generateVisualSuggestions([item])[0];
      return {
        ...item,
        suggestedIcon: suggestions.suggestedIcon,
        visualCue: suggestions.visualCue,
        layout: suggestions.layout,
        suggestedImages: suggestions.suggestedImages,
      };
    });

    return {
      ...baseOutline,
      items: enhancedItems,
    };
  };

  // 初始化时增强大纲
  useState(() => {
    setOutline(enhanceOutlineWithSuggestions(mockOutline));
  });

  const handleStyleChange = (style: PresentationStyle) => {
    setSelectedStyle(style);
    // 重新生成带视觉建议的大纲
    setOutline(enhanceOutlineWithSuggestions(mockOutline));
  };

  return (
    <div className="space-y-6">
      {/* 风格选择器 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          选择演示风格
        </h3>
        <StyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={handleStyleChange}
        />
      </div>

      {/* 功能说明 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">
          🎨 智能素材推荐系统
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
          <div>
            <h4 className="font-medium mb-2">✨ 已实现功能</h4>
            <ul className="space-y-1">
              <li>• AI 自动推荐匹配的 Lucide 图标</li>
              <li>• 智能视觉设计建议（布局、配色）</li>
              <li>• 图标颜色根据风格自动适配</li>
              <li>• 每个章节都有专属的视觉提示</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">🔮 智能推荐逻辑</h4>
            <ul className="space-y-1">
              <li>• 数据分析 → 图表类图标</li>
              <li>• 目标达成 → 靶心/奖杯图标</li>
              <li>• AI技术 → CPU/火花图标</li>
              <li>• 团队协作 → 用户/网络图标</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 大纲展示 */}
      <OutlineView
        outline={outline}
        onGeneratePPT={() => alert('生成 PPT 功能开发中...')}
        isGeneratingPPT={false}
        onReset={() => {
          setOutline(enhanceOutlineWithSuggestions(mockOutline));
        }}
        style={selectedStyle}
      />

      {/* 技术说明 */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          📚 技术实现细节
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">前端组件</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• SmartIcon - 智能图标组件</li>
              <li>• IconSuggestionBadge - 图标推荐徽章</li>
              <li>• VisualCueBubble - 视觉建议气泡</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">推荐引擎</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 关键词映射系统</li>
              <li>• 语义匹配算法</li>
              <li>• 风格适配逻辑</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">数据结构</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Slide.suggestedIcon</li>
              <li>• Slide.visualCue</li>
              <li>• Slide.suggestedImages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
