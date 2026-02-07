/**
 * 智能图标推荐系统
 * 基于关键词和上下文推荐合适的 Lucide 图标
 */

// ==================== 图标分类 ====================

export const ICON_CATEGORIES = {
  // 数据相关
  data: [
    'bar-chart', 'line-chart', 'pie-chart', 'trending-up', 'trending-down',
    'database', 'hard-drive', 'server', 'cloud', 'file-chart'
  ],
  // 目标/成就
  achievement: [
    'target', 'trophy', 'award', 'medal', 'star', 'flag',
    'check-circle', 'goal', 'crosshair'
  ],
  // AI/科技
  tech: [
    'cpu', 'bot', 'sparkles', 'zap', 'lightbulb', 'circuit-board',
    'microchip', 'radio', 'wifi', 'bluetooth'
  ],
  // 团队/协作
  collaboration: [
    'users', 'user-plus', 'handshake', 'people', 'groups',
    'git-branch', 'share-2', 'network'
  ],
  // 时间/计划
  planning: [
    'calendar', 'clock', 'timer', 'hourglass', 'timeline',
    'gantt-chart', 'sunset', 'sunrise'
  ],
  // 流程/逻辑
  process: [
    'git-merge', 'git-commit', 'workflow', 'settings', 'sliders',
    'filter', 'sort-asc', 'sort-desc'
  ],
  // 安全/保护
  security: [
    'shield', 'lock', 'key', 'fingerprint', 'eye',
    'alert-triangle', 'alert-circle', 'bug'
  ],
  // 创意/设计
  creative: [
    'palette', 'brush', 'pen-tool', 'image', 'shapes',
    'box', 'circle', 'triangle'
  ],
  // 通信/消息
  communication: [
    'message-square', 'mail', 'send', 'phone', 'video',
    'mic', 'speaker', 'bell'
  ],
  // 金融/商业
  business: [
    'dollar-sign', 'currency', 'credit-card', 'banknote', 'wallet',
    'shopping-cart', 'package', 'truck'
  ],
  // 学习/知识
  learning: [
    'book', 'book-open', 'graduation-cap', 'chalkboard', 'scroll',
    'library', 'bookmark'
  ],
  // 健康/生活
  health: [
    'heart', 'activity', 'stethoscope', 'pill', 'apple',
    'dumbbell', 'bicycle'
  ],
};

// ==================== 关键词映射 ====================

export const KEYWORD_ICON_MAP: Record<string, string[]> = {
  // 数据相关
  '数据': ICON_CATEGORIES.data,
  '增长': ['trending-up'],
  '下降': ['trending-down'],
  '分析': ['bar-chart', 'pie-chart', 'line-chart'],
  '统计': ['bar-chart', 'database'],
  '图表': ['line-chart', 'pie-chart'],
  '报表': ['file-chart'],
  '数据库': ['database', 'server'],
  '云': ['cloud'],
  '存储': ['hard-drive'],

  // 目标/成就
  '目标': ['target', 'flag'],
  '目的': ['target', 'crosshair'],
  '成果': ['trophy', 'award'],
  '成就': ['medal', 'star', 'trophy'],
  '完成': ['check-circle', 'award'],
  '成功': ['trophy', 'star'],

  // AI/科技
  'ai': ['sparkles', 'cpu', 'bot'],
  '人工智能': ['cpu', 'sparkles', 'bot'],
  '机器学习': ['brain', 'cpu'],
  '深度学习': ['cpu', 'layers'],
  '算法': ['cpu', 'git-branch'],
  '自动化': ['bot', 'zap'],
  '创新': ['lightbulb', 'sparkles'],
  '技术': ['cpu', 'settings'],
  '科技': ['cpu', 'zap'],
  '智能': ['sparkles', 'bot'],
  '优化': ['zap', 'sliders'],
  '性能': ['zap', 'gauge'],
  '效率': ['zap', 'timer'],

  // 团队/协作
  '团队': ['users', 'people'],
  '协作': ['users', 'handshake'],
  '合作': ['handshake', 'network'],
  '沟通': ['message-square', 'users'],
  '会议': ['users', 'video'],
  '组织': ['building-2', 'users'],
  '部门': ['building-2', 'users'],
  '人力资源': ['users', 'user-plus'],
  '招聘': ['user-plus', 'users'],
  '培训': ['graduation-cap', 'book-open'],

  // 时间/计划
  '时间': ['clock', 'timer'],
  '计划': ['calendar', 'timeline'],
  '进度': ['timeline', 'gantt-chart'],
  '里程碑': ['flag', 'target'],
  '截止': ['hourglass', 'calendar'],
  '未来': ['sunrise', 'calendar'],
  '过去': ['sunset', 'history'],
  '现在': ['clock', 'timer'],
  '周期': ['rotate-cw', 'calendar'],
  '日程': ['calendar', 'clock'],

  // 流程/逻辑
  '流程': ['workflow', 'git-branch'],
  '步骤': ['list-ordered', 'workflow'],
  '阶段': ['layers', 'git-branch'],
  '方案': ['lightbulb', 'file'],
  '策略': ['target', 'compass'],
  '方法': ['settings', 'sliders'],
  '配置': ['settings', 'sliders'],
  '设置': ['settings', 'sliders'],
  '筛选': ['filter', 'funnel'],
  '排序': ['sort-asc', 'sort-desc'],

  // 安全/保护
  '安全': ['shield', 'lock'],
  '保护': ['shield', 'lock'],
  '风险': ['alert-triangle', 'shield'],
  '问题': ['alert-circle', 'bug'],
  '错误': ['x-circle', 'bug'],
  '警告': ['alert-triangle', 'bell'],
  '隐私': ['eye-off', 'lock'],
  '权限': ['key', 'lock'],
  '密码': ['key', 'lock'],

  // 创意/设计
  '设计': ['palette', 'pen-tool'],
  '创意': ['lightbulb', 'sparkles'],
  '界面': ['layout', 'monitor'],
  '用户体验': ['smile', 'users'],
  'ui': ['layout', 'monitor'],
  'ux': ['smile', 'users'],
  '原型': ['box', 'layers'],
  '测试': ['flask', 'bug'],

  // 通信/消息
  '消息': ['message-square', 'mail'],
  '通知': ['bell', 'message-square'],
  '邮件': ['mail', 'send'],
  '电话': ['phone', 'signal'],
  '视频': ['video', 'monitor'],
  '音频': ['mic', 'speaker'],
  '广播': ['radio', 'speaker'],
  '推送': ['send', 'bell'],
  '发布': ['rocket', 'send'],

  // 金融/商业
  '收入': ['dollar-sign', 'trending-up'],
  '支出': ['dollar-sign', 'trending-down'],
  '利润': ['trending-up', 'dollar-sign'],
  '成本': ['wallet', 'dollar-sign'],
  '预算': ['calculator', 'wallet'],
  '销售': ['shopping-cart', 'trending-up'],
  '营销': ['megaphone', 'trending-up'],
  '客户': ['users', 'user-check'],
  '订单': ['shopping-cart', 'package'],
  '物流': ['truck', 'package'],
  '库存': ['package', 'warehouse'],

  // 学习/知识
  '学习': ['book', 'graduation-cap'],
  '教育': ['graduation-cap', 'book-open'],
  '知识': ['book', 'lightbulb'],
  '技能': ['zap', 'award'],
  '课程': ['book-open', 'graduation-cap'],
  '文档': ['file-text', 'scroll'],
  '资料': ['folder', 'file'],
  '笔记': ['book-mark', 'file-text'],

  // 健康/生活
  '健康': ['heart', 'activity'],
  '运动': ['dumbbell', 'bicycle'],
  '饮食': ['apple', 'utensils'],
  '睡眠': ['moon', 'bed'],
  '医疗': ['stethoscope', 'pill'],
  '健身': ['dumbbell', 'activity'],
};

// ==================== 视觉建议模板 ====================

export const VISUAL_CUE_TEMPLATES: Record<string, string[]> = {
  // 数据相关
  data: [
    '建议使用图表展示数据趋势',
    '适合使用柱状图对比数据',
    '推荐使用饼图展示占比',
    '建议添加数据可视化图表',
  ],
  // 对比/比较
  comparison: [
    '建议使用左右对比布局',
    '适合使用表格对比差异',
    '推荐使用前后对比展示',
  ],
  // 流程/步骤
  process: [
    '建议使用流程图展示步骤',
    '适合使用时间轴布局',
    '推荐使用箭头连接各环节',
    '建议添加步骤编号',
  ],
  // 团队/人物
  people: [
    '建议添加团队协作图片',
    '适合使用人物剪影',
    '推荐使用组织架构图',
    '建议添加头像展示',
  ],
  // 目标/成就
  achievement: [
    '建议使用奖杯图标突出成果',
    '适合使用进度条展示完成度',
    '推荐使用靶心图表示目标',
    '建议添加庆祝元素',
  ],
  // 技术/创新
  tech: [
    '建议使用科技感背景',
    '适合使用电路板纹理',
    '推荐使用发光效果',
    '建议添加动画元素',
  ],
};

// ==================== 智能推荐函数 ====================

/**
 * 基于文本内容推荐图标
 */
export function recommendIcon(text: string): string {
  const lowerText = text.toLowerCase();

  // 1. 精确关键词匹配
  for (const [keyword, icons] of Object.entries(KEYWORD_ICON_MAP)) {
    if (lowerText.includes(keyword.toLowerCase())) {
      // 返回该关键词的第一个推荐图标
      return icons[0];
    }
  }

  // 2. 语义分组匹配
  if (/增长|提升|增加|上涨/.test(lowerText)) return 'trending-up';
  if (/下降|减少|降低|下跌/.test(lowerText)) return 'trending-down';
  if (/目标|目的|预期/.test(lowerText)) return 'target';
  if (/完成|成功|结束/.test(lowerText)) return 'check-circle';
  if (/开始|启动|第一步/.test(lowerText)) return 'play';
  if (/团队|人员|大家/.test(lowerText)) return 'users';
  if (/时间|日期|日程/.test(lowerText)) return 'calendar';
  if (/设置|配置|选项/.test(lowerText)) return 'settings';
  if (/文档|文件|资料/.test(lowerText)) return 'file-text';
  if (/问题|错误|警告/.test(lowerText)) return 'alert-triangle';
  if (/建议|推荐|提示/.test(lowerText)) return 'lightbulb';

  // 3. 默认图标
  return 'circle';
}

/**
 * 基于文本内容生成视觉建议
 */
export function generateVisualCue(title: string, content: string[]): string {
  const text = `${title} ${content.join(' ')}`.toLowerCase();

  // 检测内容类型并生成相应建议
  if (/数据|统计|图表|分析|增长|趋势/.test(text)) {
    return '建议使用数据可视化图表展示';
  }
  if (/对比|比较|差异|优缺点/.test(text)) {
    return '建议使用左右对比布局突出差异';
  }
  if (/流程|步骤|阶段|顺序/.test(text)) {
    return '建议使用流程图或时间轴展示';
  }
  if (/团队|人员|协作|合作/.test(text)) {
    return '建议添加团队协作相关插图';
  }
  if (/目标|成果|成就|完成/.test(text)) {
    return '建议使用靶心图或进度条展示';
  }
  if (/技术|ai|智能|创新|科技/.test(text)) {
    return '建议使用科技感元素和渐变色';
  }
  if (/计划|时间|日程|未来/.test(text)) {
    return '建议使用时间轴或日历视图';
  }

  // 默认建议
  return '建议使用简洁的图标和清晰的层次结构';
}

/**
 * 批量推荐（用于大纲生成）
 */
export function batchRecommendIcons(slides: any[]): any[] {
  return slides.map((slide) => ({
    ...slide,
    suggestedIcon: recommendIcon(slide.title),
    visualCue: generateVisualCue(slide.title, slide.content || []),
  }));
}

// ==================== 布局建议 ====================

export function suggestLayout(title: string, content: string[]): 'title' | 'content' | 'twoColumn' | 'section' {
  const text = `${title} ${content.join(' ')}`.toLowerCase();

  // 检测标题页
  if (/封面|介绍|概述|开始|目录/.test(title)) {
    return 'title';
  }

  // 检测需要对比的内容
  if (/对比|比较|差异|优缺点|前后/.test(text)) {
    return 'twoColumn';
  }

  // 检测章节页
  if (/第.+章|第.+节|part|chapter|章节/.test(title)) {
    return 'section';
  }

  // 默认内容页
  return 'content';
}

/**
 * 为每个幻灯片生成完整的视觉建议
 */
export function generateVisualSuggestions(slides: any[]): any[] {
  return slides.map((slide, index) => {
    const icon = recommendIcon(slide.title);
    const cue = generateVisualCue(slide.title, slide.content || []);
    const layout = suggestLayout(slide.title, slide.content || []);

    return {
      ...slide,
      slideNumber: index + 1,
      layout,
      suggestedIcon: icon,
      visualCue: cue,
      suggestedImages: suggestImages(slide.title, slide.content || []),
    };
  });
}

/**
 * 建议图片类型
 */
function suggestImages(title: string, content: string[]): string[] {
  const text = `${title} ${content.join(' ')}`.toLowerCase();

  const suggestions: string[] = [];

  if (/团队|人员/.test(text)) suggestions.push('团队协作场景');
  if (/数据|图表/.test(text)) suggestions.push('数据可视化图表');
  if (/科技|ai|创新/.test(text)) suggestions.push('科技感背景');
  if (/办公|工作/.test(text)) suggestions.push('办公环境');
  if (/客户|用户/.test(text)) suggestions.push('用户场景');

  return suggestions.length > 0 ? suggestions : ['商务插图', '抽象图形'];
}

// ==================== 导出 ====================

export const IconRecommendationSystem = {
  recommendIcon,
  generateVisualCue,
  batchRecommendIcons,
  suggestLayout,
  generateVisualSuggestions,
  ICON_CATEGORIES,
  KEYWORD_ICON_MAP,
  VISUAL_CUE_TEMPLATES,
};
