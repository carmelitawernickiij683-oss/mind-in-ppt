import type { StyleConfig, PresentationStyle, StyleCategory, StyleOption } from './types';

// ==================== 15种风格配置系统 ====================

// 📊 商务汇报类 (3种)

/**
 * 高管汇报
 * 适用于向高管层汇报、年度总结、战略规划
 */
export const executiveReportStyle: StyleConfig = {
  id: 'executive-report',
  category: 'business',
  name: '高管汇报',
  description: '正式高管汇报场合',
  icon: '📊',
  scene: '适用于向高管层汇报、年度总结、战略规划',

  colors: {
    primary: '#1e40af',           // 深蓝
    secondary: '#3b82f6',         // 蓝
    accent: '#f59e0b',            // 金色
    background: '#f8fafc',
    surface: '#ffffff',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#e2e8f0',
  },

  mindmapColors: ['#1e40af', '#3b82f6', '#0ea5e9', '#06b6d4', '#f59e0b'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '正式、精炼、结果导向',
    structure: '采用层级分明的结构，使用要点列表，突出关键数据和结论',
    example: '• 核心成果\n• 关键数据\n• 下一步计划',
  },

  ui: {
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

/**
 * 客户提案
 * 适用于向客户提案、商务谈判
 */
export const clientProposalStyle: StyleConfig = {
  id: 'client-proposal',
  category: 'business',
  name: '客户提案',
  description: '专业商务提案场合',
  icon: '🤝',
  scene: '适用于向客户提案、商务谈判',

  colors: {
    primary: '#3b82f6',           // 蓝色
    secondary: '#f97316',         // 橙色
    accent: '#10b981',            // 绿色
    background: '#fefce8',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#fed7aa',
  },

  mindmapColors: ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#06b6d4'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '亲和、自信、客户导向',
    structure: '采用以客户为中心的结构，突出解决方案的价值和优势',
    example: '• 客户挑战\n• 我们的方案\n• 预期价值',
  },

  ui: {
    borderRadius: '12px',
    borderWidth: '1px',
    shadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

/**
 * 投融资路演
 * 适用于融资路演、投资人会议
 */
export const investorPitchStyle: StyleConfig = {
  id: 'investor-pitch',
  category: 'business',
  name: '投融资路演',
  description: '激动人心的路演场合',
  icon: '🚀',
  scene: '适用于融资路演、投资人会议',

  colors: {
    primary: '#7c3aed',           // 深紫
    secondary: '#10b981',         // 荧光绿
    accent: '#fbbf24',            // 金黄
    background: '#0f172a',        // 深色背景
    surface: '#1e293b',
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
      muted: '#64748b',
    },
    border: '#334155',
  },

  mindmapColors: ['#7c3aed', '#10b981', '#fbbf24', '#ec4899', '#06b6d4'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '激动人心、愿景驱动、数据支撑',
    structure: '采用问题-方案-市场的结构，突出商业机会和团队优势',
    example: '• 市场机会\n• 解决方案\n• 商业模式\n• 团队优势',
  },

  ui: {
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
    spacing: '1.5rem',
  },
};

// 💼 职场办公类 (3种)

/**
 * 周报月报
 * 适用于定期工作汇报
 */
export const weeklyMonthlyReportStyle: StyleConfig = {
  id: 'weekly-monthly-report',
  category: 'office',
  name: '周报月报',
  description: '清晰的工作汇报',
  icon: '📋',
  scene: '适用于定期工作汇报',

  colors: {
    primary: '#059669',           // 深绿
    secondary: '#10b981',         // 绿色
    accent: '#3b82f6',            // 蓝色
    background: '#f0fdf4',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#bbf7d0',
  },

  mindmapColors: ['#059669', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '客观、条理清晰、数据驱动',
    structure: '采用时间顺序结构，分为已完成、进行中、计划中',
    example: '✓ 本周完成\n→ 进行中\n📋 下周计划',
  },

  ui: {
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    spacing: '1.25rem',
  },
};

/**
 * 项目进展
 * 适用于项目里程碑汇报
 */
export const projectProgressStyle: StyleConfig = {
  id: 'project-progress',
  category: 'office',
  name: '项目进展',
  description: '专业的项目汇报',
  icon: '📈',
  scene: '适用于项目里程碑汇报',

  colors: {
    primary: '#4b5563',           // 蓝灰
    secondary: '#6b7280',         // 灰色
    accent: '#3b82f6',            // 蓝色
    background: '#f9fafb',
    surface: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
    },
    border: '#e5e7eb',
  },

  mindmapColors: ['#4b5563', '#6b7280', '#3b82f6', '#10b981', '#f59e0b'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '严谨、数据驱动、进度导向',
    structure: '采用项目阶段结构，突出进度、风险和下一步计划',
    example: '• 阶段一: 已完成 100%\n• 阶段二: 进行中 60%\n• 风险与对策',
  },

  ui: {
    borderRadius: '6px',
    borderWidth: '1px',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.25rem',
  },
};

/**
 * 团队总结
 * 适用于团队季度/年度总结
 */
export const teamSummaryStyle: StyleConfig = {
  id: 'team-summary',
  category: 'office',
  name: '团队总结',
  description: '温暖的团队总结',
  icon: '👥',
  scene: '适用于团队季度/年度总结',

  colors: {
    primary: '#f97316',           // 橙色
    secondary: '#fbbf24',         // 金黄
    accent: '#10b981',            // 绿色
    background: '#fff7ed',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#fed7aa',
  },

  mindmapColors: ['#f97316', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '鼓励、感恩、展望未来',
    structure: '采用回顾-成就-展望的结构，突出团队贡献和个人成长',
    example: '🎉 主要成就\n⭐ 团队亮点\n🚀 未来目标',
  },

  ui: {
    borderRadius: '12px',
    borderWidth: '1px',
    shadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

// 🎤 行业交流类 (3种)

/**
 * 行业研讨会
 * 适用于行业会议、专业论坛
 */
export const industrySeminarStyle: StyleConfig = {
  id: 'industry-seminar',
  category: 'conference',
  name: '行业研讨会',
  description: '专业的行业交流',
  icon: '🎤',
  scene: '适用于行业会议、专业论坛',

  colors: {
    primary: '#374151',           // 深灰
    secondary: '#059669',         // 深绿
    accent: '#10b981',            // 绿色
    background: '#fafafa',
    surface: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
    },
    border: '#e5e7eb',
  },

  mindmapColors: ['#374151', '#059669', '#10b981', '#3b82f6', '#f59e0b'],

  fonts: {
    heading: "'Georgia', serif",
    body: "'Georgia', serif",
    mono: "'Courier New', monospace",
  },

  aiPrompt: {
    tone: '权威、专业、有洞察',
    structure: '采用主题-论点-论据的结构，展示专业见解',
    example: '• 行业现状\n• 深度分析\n• 未来趋势\n• 行动建议',
  },

  ui: {
    borderRadius: '4px',
    borderWidth: '1px',
    shadow: 'none',
    spacing: '1.5rem',
  },
};

/**
 * 经验分享
 * 适用于内部经验分享会
 */
export const experienceSharingStyle: StyleConfig = {
  id: 'experience-sharing',
  category: 'conference',
  name: '经验分享',
  description: '谦虚的知识分享',
  icon: '💡',
  scene: '适用于内部经验分享会',

  colors: {
    primary: '#10b981',           // 清新绿
    secondary: '#059669',         // 深绿
    accent: '#3b82f6',            // 蓝色
    background: '#f0fdf4',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#bbf7d0',
  },

  mindmapColors: ['#10b981', '#059669', '#3b82f6', '#8b5cf6', '#f59e0b'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '谦虚、分享、实用',
    structure: '采用问题-方法-收获的结构，分享实战经验',
    example: '💭 遇到的问题\n🔧 解决方案\n📚 核心收获\n💡 实用建议',
  },

  ui: {
    borderRadius: '10px',
    borderWidth: '1px',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

/**
 * 行业趋势
 * 适用于趋势解读、行业前瞻
 */
export const industryTrendsStyle: StyleConfig = {
  id: 'industry-trends',
  category: 'conference',
  name: '行业趋势',
  description: '前瞻的趋势分析',
  icon: '📊',
  scene: '适用于趋势解读、行业前瞻',

  colors: {
    primary: '#3b82f6',           // 科技蓝
    secondary: '#10b981',         // 荧光绿
    accent: '#8b5cf6',            // 紫色
    background: '#eff6ff',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#bfdbfe',
  },

  mindmapColors: ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '前瞻、分析、引导',
    structure: '采用现状-趋势-机会的结构，展示行业洞察',
    example: '📈 当前趋势\n🔮 未来展望\n💎 关键机会\n⚡ 行动建议',
  },

  ui: {
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

// 💡 创意脑暴类 (2种)

/**
 * 创意风暴
 * 适用于头脑风暴、创意讨论
 */
export const brainstormStyle: StyleConfig = {
  id: 'brainstorm',
  category: 'creative',
  name: '创意风暴',
  description: '激发创意灵感',
  icon: '🌈',
  scene: '适用于头脑风暴、创意讨论',

  colors: {
    primary: '#ec4899',           // 粉紫
    secondary: '#fbbf24',         // 亮橙
    accent: '#10b981',            // 绿色
    background: '#fdf2f8',
    surface: '#ffffff',
    text: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      muted: '#c4b5fd',
    },
    border: '#f5d0fe',
  },

  mindmapColors: ['#ec4899', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'],

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
    mono: "'Fira Code', monospace",
  },

  aiPrompt: {
    tone: '轻松、开放、激发灵感',
    structure: '采用发散式结构，鼓励多角度思考',
    example: '✨ 核心创意\n🎯 突破点\n💡 创新方向\n🚀 实现路径',
  },

  ui: {
    borderRadius: '16px',
    borderWidth: '2px',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    spacing: '2rem',
  },
};

/**
 * 方案共创
 * 适用于团队共创、工作坊
 */
export const coCreationStyle: StyleConfig = {
  id: 'co-creation',
  category: 'creative',
  name: '方案共创',
  description: '协作共创方案',
  icon: '🤝',
  scene: '适用于团队共创、工作坊',

  colors: {
    primary: '#8b5cf6',           // 温暖紫
    secondary: '#fbbf24',         // 粉橙
    accent: '#3b82f6',            // 蓝色
    background: '#f5f3ff',
    surface: '#ffffff',
    text: {
      primary: '#5b21b6',
      secondary: '#7c3aed',
      muted: '#c4b5fd',
    },
    border: '#ddd6fe',
  },

  mindmapColors: ['#8b5cf6', '#fbbf24', '#3b82f6', '#10b981', '#ec4899'],

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
    mono: "'Fira Code', monospace",
  },

  aiPrompt: {
    tone: '参与式、共同创造、协作',
    structure: '采用协作式结构，强调团队合作',
    example: '🎯 共同目标\n💬 团队想法\n✅ 共识方案\n🚀 下一步行动',
  },

  ui: {
    borderRadius: '14px',
    borderWidth: '1px',
    shadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.75rem',
  },
};

// 📚 学术教育类 (2种)

/**
 * 培训教学
 * 适用于内部培训、知识分享
 */
export const trainingStyle: StyleConfig = {
  id: 'training',
  category: 'education',
  name: '培训教学',
  description: '清晰的教学内容',
  icon: '📖',
  scene: '适用于内部培训、知识分享',

  colors: {
    primary: '#2563eb',           // 教育蓝
    secondary: '#10b981',         // 成功绿
    accent: '#f59e0b',            // 提示黄
    background: '#eff6ff',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#bfdbfe',
  },

  mindmapColors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '循序渐进、耐心细致、互动式',
    structure: '采用教学式结构，包含目标-内容-练习-总结',
    example: '📚 学习目标\n📖 核心内容\n✍️ 实践练习\n📝 要点总结',
  },

  ui: {
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    spacing: '1.5rem',
  },
};

/**
 * 学术报告
 * 适用于学术报告、论文答辩
 */
export const academicReportStyle: StyleConfig = {
  id: 'academic-report',
  category: 'education',
  name: '学术报告',
  description: '严谨的学术报告',
  icon: '📜',
  scene: '适用于学术报告、论文答辩',

  colors: {
    primary: '#374151',           // 灰色
    secondary: '#6b7280',         // 灰色
    accent: '#059669',            // 深绿
    background: '#f9fafb',
    surface: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
    },
    border: '#d1d5db',
  },

  mindmapColors: ['#374151', '#6b7280', '#059669', '#0d9488', '#dc2626'],

  fonts: {
    heading: "'Georgia', serif",
    body: "'Georgia', serif",
    mono: "'Source Code Pro', monospace",
  },

  aiPrompt: {
    tone: '严谨、客观、学术化',
    structure: '采用规范的学术结构，包含引言、方法、结果、讨论',
    example: '一、研究背景\n二、研究方法\n三、研究发现\n四、结论与建议',
  },

  ui: {
    borderRadius: '2px',
    borderWidth: '1px',
    shadow: 'none',
    spacing: '1.25rem',
  },
};

// 🚀 产品发布类 (2种)

/**
 * 产品发布会
 * 适用于新品发布
 */
export const productLaunchStyle: StyleConfig = {
  id: 'product-launch',
  category: 'product',
  name: '产品发布会',
  description: '震撼的产品发布',
  icon: '✨',
  scene: '适用于新品发布',

  colors: {
    primary: '#dc2626',           // 高对比红
    secondary: '#fbbf24',         // 荧光黄
    accent: '#10b981',            // 绿色
    background: '#fef2f2',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
    },
    border: '#fecaca',
  },

  mindmapColors: ['#dc2626', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'],

  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  aiPrompt: {
    tone: '激动、震撼、亮点突出',
    structure: '采用问题-方案-亮点-呼吁的结构，创造震撼效果',
    example: '⚡ 核心亮点\n🚀 独特优势\n🎯 用户价值\n💪 立即行动',
  },

  ui: {
    borderRadius: '12px',
    borderWidth: '2px',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.15)',
    spacing: '2rem',
  },
};

/**
 * 技术分享
 * 适用于技术分享、架构评审
 */
export const techShareStyle: StyleConfig = {
  id: 'tech-share',
  category: 'product',
  name: '技术分享',
  description: '专业的技术交流',
  icon: '💻',
  scene: '适用于技术分享、架构评审',

  colors: {
    primary: '#0ea5e9',           // 代码蓝
    secondary: '#10b981',         // 终端绿
    accent: '#f59e0b',            // 语法高亮黄
    background: '#0c4a6e',
    surface: '#164e63',
    text: {
      primary: '#f0f9ff',
      secondary: '#bae6fd',
      muted: '#7dd3fc',
    },
    border: '#0891b2',
  },

  mindmapColors: ['#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],

  fonts: {
    heading: "'JetBrains Mono', monospace",
    body: "'JetBrains Mono', monospace",
    mono: "'Fira Code', monospace",
  },

  aiPrompt: {
    tone: '技术化、深度、专业',
    structure: '采用技术栈-架构-实现的结构，展示技术深度',
    example: '🛠️ 技术栈\n🏗️ 系统架构\n⚙️ 核心实现\n📊 性能优化',
  },

  ui: {
    borderRadius: '4px',
    borderWidth: '1px',
    shadow: '0 2px 4px 0 rgb(0 0 0 / 0.2)',
    spacing: '1.25rem',
  },
};

// ==================== 风格配置映射 ====================

export const STYLE_CONFIGS: Record<PresentationStyle, StyleConfig> = {
  'executive-report': executiveReportStyle,
  'client-proposal': clientProposalStyle,
  'investor-pitch': investorPitchStyle,
  'weekly-monthly-report': weeklyMonthlyReportStyle,
  'project-progress': projectProgressStyle,
  'team-summary': teamSummaryStyle,
  'industry-seminar': industrySeminarStyle,
  'experience-sharing': experienceSharingStyle,
  'industry-trends': industryTrendsStyle,
  'brainstorm': brainstormStyle,
  'co-creation': coCreationStyle,
  'training': trainingStyle,
  'academic-report': academicReportStyle,
  'product-launch': productLaunchStyle,
  'tech-share': techShareStyle,
};

// ==================== 风格分类 ====================

export const STYLE_CATEGORIES: Record<StyleCategory, { label: string; icon: string; styles: PresentationStyle[] }> = {
  business: {
    label: '商务汇报类',
    icon: '📊',
    styles: ['executive-report', 'client-proposal', 'investor-pitch'],
  },
  office: {
    label: '职场办公类',
    icon: '💼',
    styles: ['weekly-monthly-report', 'project-progress', 'team-summary'],
  },
  conference: {
    label: '行业交流类',
    icon: '🎤',
    styles: ['industry-seminar', 'experience-sharing', 'industry-trends'],
  },
  creative: {
    label: '创意脑暴类',
    icon: '💡',
    styles: ['brainstorm', 'co-creation'],
  },
  education: {
    label: '学术教育类',
    icon: '📚',
    styles: ['training', 'academic-report'],
  },
  product: {
    label: '产品发布类',
    icon: '🚀',
    styles: ['product-launch', 'tech-share'],
  },
};

// ==================== 风格选项列表（用于下拉菜单） ====================

export const STYLE_OPTIONS: StyleOption[] = Object.values(STYLE_CONFIGS).map((style) => ({
  value: style.id,
  label: style.name,
  category: style.category,
  icon: style.icon,
  description: style.scene,
}));

// ==================== 工具函数 ====================

/**
 * 获取风格配置
 */
export function getStyleConfig(style: PresentationStyle): StyleConfig {
  return STYLE_CONFIGS[style];
}

/**
 * 获取所有风格列表
 */
export function getAllStyles(): StyleConfig[] {
  return Object.values(STYLE_CONFIGS);
}

/**
 * 根据类别获取风格
 */
export function getStylesByCategory(category: StyleCategory): StyleConfig[] {
  return STYLE_CATEGORIES[category].styles.map((style) => STYLE_CONFIGS[style]);
}

/**
 * 生成 AI Prompt（包含风格信息）
 */
export function generateAIPrompt(
  basePrompt: string,
  style: PresentationStyle
): string {
  const config = getStyleConfig(style);

  return `${basePrompt}

【风格要求】
- 语气风格：${config.aiPrompt.tone}
- 结构建议：${config.aiPrompt.structure}
- 参考示例：${config.aiPrompt.example}

请按照以上风格要求生成内容。`;
}

/**
 * 获取风格对应的 Tailwind CSS 类
 */
export function getStyleClasses(style: PresentationStyle) {
  const config = getStyleConfig(style);

  return {
    primaryButton: `bg-[${config.colors.primary}] hover:bg-opacity-90 text-white`,
    secondaryButton: `bg-[${config.colors.secondary}] hover:bg-opacity-90 text-white`,
    accentButton: `bg-[${config.colors.accent}] hover:bg-opacity-90 text-white`,
    card: `bg-[${config.colors.surface}] border-[${config.colors.border}]`,
    text: {
      primary: `text-[${config.colors.text.primary}]`,
      secondary: `text-[${config.colors.text.secondary}]`,
      muted: `text-[${config.colors.text.muted}]`,
    },
    border: `border-[${config.colors.border}]`,
    rounded: config.ui.borderRadius,
  };
}
