// ==================== 原有类型 ====================

// 大纲项类型
export interface OutlineItem {
  id: string;
  title: string;
  content: string[];
  level: number; // 1-主标题, 2-子标题, 3-子内容
  children?: OutlineItem[];
}

// 完整大纲类型
export interface Outline {
  title: string;
  items: OutlineItem[];
  metadata: {
    createdAt: string;
    sourceTextLength: number;
  };
}

// PPT幻灯片类型（增强版）
export interface Slide {
  id: string;
  title: string;
  content: string[];
  layout: 'title' | 'content' | 'twoColumn' | 'section';
  slideNumber: number;

  // 🎨 智能视觉建议（新增）
  suggestedIcon?: string;        // 推荐的 Lucide 图标名称
  visualCue?: string;            // 视觉建议提示
  suggestedImages?: string[];    // 建议的图片类型/主题
  colorScheme?: string;          // 推荐的配色方案
}

// PPT演示文稿类型
export interface Presentation {
  title: string;
  slides: Slide[];
  metadata: {
    createdAt: string;
    totalSlides: number;
  };
}

// ==================== 工作流相关类型 ====================

// 工作流状态
export type WorkflowState =
  | 'input'            // 初始输入状态
  | 'analyzing'        // AI 分析中
  | 'analysisReview'   // 查看分析结果
  | 'generating'       // 生成大纲+思维导图中
  | 'review'           // 查看大纲+思维导图
  | 'pptGenerating';   // 生成 PPT 中

// 分析结果类型
export interface AnalysisResult {
  coreTopic: string;              // 核心主题
  keyPoints: string[];             // 关键要点列表
  mainStructure: {                 // 主要结构建议
    suggestedSections: string[];
    estimatedSlides: number;
    complexity: 'simple' | 'medium' | 'complex';
  };
  summary: string;                 // 简要总结
  extractedKeywords: string[];     // 提取的关键词

  // AI 建议（新增）
  suggestions: {
    recommendedStyle: PresentationStyle;
    focusAreas: string[];
    visualApproach: string;
  };
}

// 大纲 + 思维导图数据
export interface OutlineWithMindmap {
  outline: Outline;               // 结构化大纲
  mindmapMarkdown: string;        // 思维导图 Markdown
}

// 主页面状态
export interface PageState {
  currentStep: WorkflowState;
  userInput: string;
  selectedStyle: PresentationStyle;
  analysisResult: AnalysisResult | null;
  outlineData: OutlineWithMindmap | null;
  isGenerating: boolean;
}

// ==================== 场景化风格系统 ====================

// 风格类别（6大类）
export type StyleCategory =
  | 'business'       // 商务汇报类
  | 'office'         // 职场办公类
  | 'conference'     // 行业交流类
  | 'creative'       // 创意脑暴类
  | 'education'      // 学术教育类
  | 'product';       // 产品发布类

// 演示风格类型（15种）
export type PresentationStyle =
  | 'executive-report'      // 高管汇报
  | 'client-proposal'       // 客户提案
  | 'investor-pitch'        // 投融资路演
  | 'weekly-monthly-report' // 周报月报
  | 'project-progress'      // 项目进展
  | 'team-summary'          // 团队总结
  | 'industry-seminar'      // 行业研讨会
  | 'experience-sharing'    // 经验分享
  | 'industry-trends'       // 行业趋势
  | 'brainstorm'            // 创意风暴
  | 'co-creation'           // 方案共创
  | 'training'              // 培训教学
  | 'academic-report'       // 学术报告
  | 'product-launch'        // 产品发布会
  | 'tech-share';           // 技术分享

// 幻灯片布局类型
export type SlideLayout =
  | 'title'
  | 'content'
  | 'twoColumn'
  | 'section';

// 风格配置（完整版）
export interface StyleConfig {
  id: PresentationStyle;
  category: StyleCategory;    // 所属类别
  name: string;
  description: string;
  icon: string;
  scene: string;              // 适用场景

  // 颜色系统
  colors: {
    primary: string;        // 主色调
    secondary: string;      // 辅助色
    accent: string;         // 强调色
    background: string;     // 背景色
    surface: string;        // 表面色
    text: {
      primary: string;      // 主文本
      secondary: string;    // 次要文本
      muted: string;        // 弱化文本
    };
    border: string;         // 边框色
  };

  // 思维导图配色方案
  mindmapColors: string[];

  // 字体系统
  fonts: {
    heading: string;        // 标题字体
    body: string;           // 正文字体
    mono: string;           // 等宽字体
  };

  // AI 提示词模板
  aiPrompt: {
    tone: string;           // 语气描述
    structure: string;      // 结构建议
    example: string;        // 示例
  };

  // UI 样式配置
  ui: {
    borderRadius: string;   // 圆角大小
    borderWidth: string;    // 边框宽度
    shadow: string;         // 阴影效果
    spacing: string;        // 间距
  };
}

// 风格选项（用于下拉菜单）
export interface StyleOption {
  value: PresentationStyle;
  label: string;
  category: StyleCategory;
  icon: string;
  description: string;
}

// ==================== API 请求/响应类型 ====================

// 智能分析 API
export interface AnalyzeTextRequest {
  text: string;
  style?: PresentationStyle;
  language?: 'zh-CN' | 'en-US';
}

export interface AnalyzeTextResponse {
  success: boolean;
  result?: AnalysisResult;
  error?: string;
}

// 生成大纲 API（更新）
export interface GenerateOutlineRequest {
  text: string;
  style: PresentationStyle;
  analysisResult?: AnalysisResult;
  options?: {
    maxDepth?: number;
    language?: 'zh-CN' | 'en-US';
  };
}

export interface GenerateOutlineResponse {
  success: boolean;
  result?: OutlineWithMindmap;
  error?: string;
}

// 生成 PPT API（更新）
export interface GeneratePPTRequest {
  outline: Outline;
  style: PresentationStyle;
  options?: {
    theme?: PresentationStyle;
  };
}

export interface GeneratePPTResponse {
  success: boolean;
  fileUrl?: string;
  error?: string;
}
