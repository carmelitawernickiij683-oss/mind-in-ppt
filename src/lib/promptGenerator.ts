/**
 * AI Prompt 生成系统
 * 为不同场景和风格生成优化的 AI 提示词
 */

import type { PresentationStyle } from './types';
import { getStyleConfig } from './styles';

// ==================== 基础 Prompt 模板 ====================

const BASE_ANALYSIS_PROMPT = `你是一个专业的演示文稿内容分析专家。请分析用户提供的文本内容，提取关键信息。

任务要求：
1. 识别文本的核心主题
2. 提取 3-5 个关键要点
3. 建议合适的大纲结构
4. 估算需要的幻灯片数量
5. 评估内容复杂度

请以 JSON 格式返回分析结果。`;

const BASE_OUTLINE_PROMPT = `你是一个专业的演示文稿大纲设计师。基于用户提供的文本内容和分析结果，创建一个结构化的演示文稿大纲。

重要要求：
- 大纲应该层次清晰、逻辑严谨
- 每个幻灯片应该有明确的主题和要点
- 为每个幻灯片推荐合适的图标
- 提供视觉设计建议

请以 JSON 格式返回大纲数据。`;

// ==================== 风格增强 Prompt ====================

function getStylePrompt(style: PresentationStyle): string {
  const config = getStyleConfig(style);

  return `
【风格要求 - ${config.name}】
- 语气风格：${config.aiPrompt.tone}
- 结构建议：${config.aiPrompt.structure}
- 内容特点：${config.aiPrompt.example}

【配色方案】
- 主色调：${config.colors.primary}
- 辅助色：${config.colors.secondary}
- 强调色：${config.colors.accent}
`;
}

// ==================== 图标推荐 Prompt ====================

const ICON_RECOMMENDATION_PROMPT = `
【图标推荐要求】
为每个幻灯片推荐一个合适的图标，从以下常用图标中选择：

• 数据相关：bar-chart, line-chart, pie-chart, trending-up, trending-down
• 目标/成就：target, trophy, award, medal, star, flag
• AI/科技：cpu, bot, sparkles, zap, lightbulb
• 团队/协作：users, handshake, people, network
• 时间/计划：calendar, clock, timer, timeline
• 流程/逻辑：workflow, settings, git-branch
• 安全/保护：shield, lock, key
• 创意/设计：palette, brush, image
• 通信/消息：message-square, mail, send
• 金融/商业：dollar-sign, currency, wallet
• 学习/知识：book, graduation-cap, library

图标选择规则：
- 提到"数据"、"分析"、"统计" → bar-chart 或 line-chart
- 提到"增长"、"提升" → trending-up
- 提到"目标"、"目的" → target
- 提到"AI"、"智能"、"技术" → cpu 或 sparkles
- 提到"团队"、"人员" → users
- 提到"时间"、"计划" → calendar
- 提到"流程"、"步骤" → workflow 或 git-branch
`;

// ==================== 视觉建议 Prompt ====================

const VISUAL_CUE_PROMPT = `
【视觉建议要求】
为每个幻灯片提供简洁的视觉设计建议，包括：

1. 布局建议：
   - 数据展示页 → "建议使用图表展示数据趋势"
   - 对比页 → "建议使用左右对比布局"
   - 流程页 → "建议使用流程图或时间轴展示"
   - 团队页 → "建议添加团队协作相关插图"
   - 目标页 → "建议使用靶心图或进度条展示"

2. 图片建议：
   - 团队相关 → "团队协作场景"
   - 数据相关 → "数据可视化图表"
   - 科技相关 → "科技感背景"
   - 办公相关 → "办公环境"

3. 配色建议：
   - 使用风格指定的配色方案
   - 保持视觉一致性
`;

// ==================== 完整 Prompt 生成函数 ====================

/**
 * 生成文本分析 Prompt
 */
export function generateAnalysisPrompt(
  text: string,
  style: PresentationStyle = 'executive-report'
): string {
  const stylePrompt = getStylePrompt(style);

  return `${BASE_ANALYSIS_PROMPT}

${stylePrompt}

【用户输入的文本】
${text}

【输出格式】
请返回以下 JSON 格式：
{
  "coreTopic": "核心主题",
  "keyPoints": ["要点1", "要点2", "要点3"],
  "mainStructure": {
    "suggestedSections": ["章节1", "章节2", "章节3"],
    "estimatedSlides": 数字,
    "complexity": "simple" | "medium" | "complex"
  },
  "summary": "简要总结",
  "extractedKeywords": ["关键词1", "关键词2"]
}`;
}

/**
 * 生成大纲 Prompt（包含视觉建议）
 */
export function generateOutlinePrompt(
  text: string,
  analysisResult: any,
  style: PresentationStyle = 'executive-report'
): string {
  const stylePrompt = getStylePrompt(style);

  return `${BASE_OUTLINE_PROMPT}

${stylePrompt}

${ICON_RECOMMENDATION_PROMPT}

${VISUAL_CUE_PROMPT}

【用户输入的文本】
${text}

【分析结果】
${JSON.stringify(analysisResult, null, 2)}

【输出格式】
请返回以下 JSON 格式：
{
  "title": "演示文稿标题",
  "items": [
    {
      "id": "唯一ID",
      "title": "章节标题",
      "content": ["要点1", "要点2"],
      "level": 1,
      "suggestedIcon": "推荐的图标名称（如：bar-chart）",
      "visualCue": "视觉设计建议",
      "suggestedImages": ["建议的图片类型"],
      "layout": "title" | "content" | "twoColumn" | "section",
      "children": [...]
    }
  ]
}`;
}

// ==================== 实用工具函数 ====================

/**
 * 优化 Prompt（添加示例）
 */
export function enrichPromptWithExamples(
  basePrompt: string,
  style: PresentationStyle
): string {
  const config = getStyleConfig(style);

  return `${basePrompt}

【参考示例 - ${config.name}风格】
${config.aiPrompt.example}

【注意事项】
1. 确保每个幻灯片都有明确的主题
2. 图标推荐要与内容高度相关
3. 视觉建议要具体可操作
4. 保持整体风格的一致性
`;
}

/**
 * 生成多轮对话 Prompt
 */
export function generateConversationPrompt(
  conversationHistory: Array<{ role: string; content: string }>,
  currentTask: 'analyze' | 'outline',
  text: string,
  style: PresentationStyle
): string {
  const historyPrompt = conversationHistory
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  if (currentTask === 'analyze') {
    return `${historyPrompt}

用户：${text}

请分析上述文本。${generateAnalysisPrompt(text, style)}`;
  } else {
    return `${historyPrompt}

请基于分析结果生成大纲。${generateOutlinePrompt(text, null, style)}`;
  }
}

// ==================== 导出 ====================

export const PromptGenerator = {
  generateAnalysisPrompt,
  generateOutlinePrompt,
  enrichPromptWithExamples,
  generateConversationPrompt,
};
