'use client';

import type { PresentationStyle } from '@/lib/types';
import type { StyleConfig } from '@/lib/types';
import { STYLE_CONFIGS } from '@/lib/styles';

interface StyleSelectorProps {
  selectedStyle: PresentationStyle;
  onStyleChange: (style: PresentationStyle) => void;
  disabled?: boolean;
}

export default function StyleSelector({
  selectedStyle,
  onStyleChange,
  disabled = false,
}: StyleSelectorProps) {
  const styles: StyleConfig[] = Object.values(STYLE_CONFIGS);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        演示风格
      </label>

      {/* 风格选项网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {styles.map((style) => {
          const isSelected = selectedStyle === style.id;
          const config = STYLE_CONFIGS[style.id];

          return (
            <button
              key={style.id}
              onClick={() => !disabled && onStyleChange(style.id)}
              disabled={disabled}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${
                  isSelected
                    ? 'border-current shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
              style={{
                borderColor: isSelected ? config.colors.primary : undefined,
                backgroundColor: isSelected ? config.colors.surface : undefined,
              }}
            >
              {/* 图标 */}
              <div
                className="text-3xl mb-2"
                style={{
                  filter: isSelected ? 'none' : 'grayscale(100%)',
                }}
              >
                {style.icon}
              </div>

              {/* 名称 */}
              <div
                className={`font-semibold text-sm mb-1 ${
                  isSelected ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                {style.name}
              </div>

              {/* 描述 */}
              <div className={`text-xs ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>
                {style.description}
              </div>

              {/* 选中指示器 */}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: config.colors.primary }}
                >
                  ✓
                </div>
              )}

              {/* 颜色预览条 */}
              <div className="flex gap-1 mt-3">
                {config.mindmapColors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* 风格说明 */}
      {selectedStyle && (
        <div
          className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div
              className="text-2xl"
              style={{
                color: STYLE_CONFIGS[selectedStyle].colors.primary,
              }}
            >
              {STYLE_CONFIGS[selectedStyle].icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">
                {STYLE_CONFIGS[selectedStyle].name}
              </div>
              <div className="text-sm text-gray-600">
                <div>语气：{STYLE_CONFIGS[selectedStyle].aiPrompt.tone}</div>
                <div className="mt-1">
                  结构：{STYLE_CONFIGS[selectedStyle].aiPrompt.structure}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
