'use client';

import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import type { PresentationStyle } from '@/lib/types';
import { getStyleConfig } from '@/lib/styles';
import { ICON_CATEGORIES } from '@/lib/iconRecommendation';

interface SmartIconProps {
  iconName: string;
  style?: PresentationStyle;
  size?: number;
  className?: string;
  onClick?: () => void;
  clickable?: boolean;
}

/**
 * 智能图标组件
 * 根据风格动态调整颜色和样式
 */
export default function SmartIcon({
  iconName,
  style = 'executive-report',
  size = 24,
  className = '',
  onClick,
  clickable = false,
}: SmartIconProps) {
  const [showPicker, setShowPicker] = useState(false);
  const styleConfig = getStyleConfig(style);

  // 获取图标组件
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;

  // 获取图标颜色（直接使用风格配置）
  const iconColor = styleConfig.colors.primary;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 主图标 */}
      <div
        onClick={() => {
          if (clickable) {
            if (onClick) {
              onClick();
            } else {
              setShowPicker(!showPicker);
            }
          }
        }}
        className={`${clickable ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
        style={{ color: iconColor }}
      >
        <IconComponent size={size} />
      </div>

      {/* 图标选择器（可选功能） */}
      {showPicker && clickable && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-64">
          <div className="text-sm font-medium text-gray-700 mb-2">
            选择图标
          </div>
          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
            {Object.entries(ICON_CATEGORIES).flat().map((iconName: any) => {
              if (typeof iconName !== 'string') return null;
              const Icon = (LucideIcons as any)[iconName];
              if (!Icon) return null;

              return (
                <button
                  key={iconName}
                  onClick={() => {
                    setShowPicker(false);
                    if (onClick) onClick();
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title={iconName}
                >
                  <Icon size={16} style={{ color: iconColor }} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 图标推荐展示组件
 * 在大纲中显示AI推荐的图标和视觉建议
 */
interface IconSuggestionBadgeProps {
  iconName: string;
  style?: PresentationStyle;
}

export function IconSuggestionBadge({
  iconName,
  style = 'executive-report',
}: IconSuggestionBadgeProps) {
  const styleConfig = getStyleConfig(style);

  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="p-2 rounded-lg"
        style={{
          backgroundColor: `${styleConfig.colors.primary}10`,
          border: `1px solid ${styleConfig.colors.border}`,
        }}
      >
        <SmartIcon iconName={iconName} style={style} size={20} />
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-0.5">
          AI 推荐图标
        </div>
        <div className="text-sm font-mono text-gray-700">
          {iconName}
        </div>
      </div>
    </div>
  );
}

/**
 * 视觉建议气泡组件
 */
interface VisualCueBubbleProps {
  cue: string;
  style?: PresentationStyle;
}

export function VisualCueBubble({
  cue,
  style = 'executive-report',
}: VisualCueBubbleProps) {
  const styleConfig = getStyleConfig(style);

  return (
    <div
      className="inline-flex items-start gap-2 px-3 py-2 rounded-lg text-sm mt-3"
      style={{
        backgroundColor: `${styleConfig.colors.secondary}10`,
        border: `1px solid ${styleConfig.colors.border}`,
      }}
    >
      <span
        className="text-lg"
        style={{ color: styleConfig.colors.accent }}
      >
        💡
      </span>
      <div>
        <div className="font-medium mb-1" style={{ color: styleConfig.colors.text.secondary }}>
          视觉建议
        </div>
        <div style={{ color: styleConfig.colors.text.muted }}>
          {cue}
        </div>
      </div>
    </div>
  );
}

/**
 * 完整的智能素材展示组件
 * 包含图标推荐和视觉建议
 */
interface SmartMaterialBadgeProps {
  iconName: string;
  visualCue: string;
  style?: PresentationStyle;
}

export function SmartMaterialBadge({
  iconName,
  visualCue,
  style = 'executive-report',
}: SmartMaterialBadgeProps) {
  return (
    <div className="space-y-2">
      <IconSuggestionBadge iconName={iconName} style={style} />
      <VisualCueBubble cue={visualCue} style={style} />
    </div>
  );
}
