import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 和 tailwind-merge 来智能合并类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 计算文本字数（中文算1个字符，英文单词算1个）
 */
export function countWords(text: string): number {
  // 匹配中文字符
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  const chineseCount = chineseChars?.length || 0;

  // 移除中文字符后，计算英文单词数
  const nonChineseText = text.replace(/[\u4e00-\u9fa5]/g, ' ');
  const englishWords = nonChineseText.trim().split(/\s+/).filter(Boolean);
  const englishCount = englishWords.length;

  return chineseCount + englishCount;
}
