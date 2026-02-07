import { NextRequest, NextResponse } from 'next/server';
import { generateOutline } from '@/lib/ai-service';
import { generateAIPrompt, getStyleConfig } from '@/lib/styles';
import { recommendIcon } from '@/lib/iconRecommendation';
import type { PresentationStyle, AnalysisResult, OutlineWithMindmap } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: {
      text: string;
      style: PresentationStyle;
      analysisResult?: AnalysisResult;
    } = await request.json();

    const { text, style = 'executive-report', analysisResult } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '请提供有效的文本内容' },
        { status: 400 }
      );
    }

    // 获取风格配置
    const styleConfig = getStyleConfig(style);

    // 构建增强的 AI Prompt，包含风格和分析结果
    let enhancedPrompt = `请根据以下文本内容生成演示文稿大纲：\n\n${text}\n\n`;

    if (analysisResult) {
      enhancedPrompt += `\n【参考分析结果】\n`;
      enhancedPrompt += `核心主题：${analysisResult.coreTopic}\n`;
      enhancedPrompt += `关键要点：\n${analysisResult.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n`;
      enhancedPrompt += `建议章节：${analysisResult.mainStructure.suggestedSections.join('、')}\n`;
    }

    enhancedPrompt += generateAIPrompt('', style);

    // 调用 AI 服务生成大纲
    const outline = await generateOutline(enhancedPrompt);

    // 为每个大纲项添加智能推荐
    const enhanceOutlineWithSmartRecommendations = (
      items: any[],
      style: PresentationStyle
    ): any[] => {
      return items.map((item) => {
        const combinedText = `${item.title} ${item.content?.join(' ') || ''}`;
        return {
          ...item,
          suggestedIcon: recommendIcon(combinedText),
          visualCue: generateVisualCueFromItem(item, style),
          layout: suggestLayoutForItem(item),
          children: item.children
            ? enhanceOutlineWithSmartRecommendations(item.children, style)
            : undefined,
        };
      });
    };

    const enhancedOutline = {
      ...outline,
      items: enhanceOutlineWithSmartRecommendations(outline.items, style),
    };

    // 生成思维导图 Markdown
    const mindmapMarkdown = generateMindmapMarkdown(enhancedOutline);

    const result: OutlineWithMindmap = {
      outline: enhancedOutline,
      mindmapMarkdown,
    };

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error generating outline:', error);

    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('API key')) {
        return NextResponse.json(
          {
            success: false,
            error: '智谱AI API密钥未配置或无效，请在.env.local文件中设置ZHIPUAI_API_KEY',
          },
          { status: 500 }
        );
      }

      if (error.message.includes('quota') || error.message.includes('429')) {
        return NextResponse.json(
          { success: false, error: 'API调用次数已达上限，请检查账户余额或稍后重试' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: '生成大纲时出错，请检查文本内容或稍后重试' },
      { status: 500 }
    );
  }
}

/**
 * 生成视觉建议提示
 */
function generateVisualCueFromItem(item: any, style: PresentationStyle): string {
  const styleConfig = getStyleConfig(style);

  if (item.children && item.children.length > 0) {
    return `建议使用层级结构展示，配合${styleConfig.icon}图标突出主题`;
  }

  if (item.content && item.content.length > 3) {
    return '内容较多，建议使用分栏布局或列表展示';
  }

  return '建议使用图标配合要点展示';
}

/**
 * 推荐布局类型
 */
function suggestLayoutForItem(item: any): string {
  if (item.level === 1) {
    return 'section'; // 章节标题页
  }

  if (item.children && item.children.length > 0) {
    return 'twoColumn'; // 双栏布局
  }

  if (item.content && item.content.length > 3) {
    return 'content'; // 内容页
  }

  return 'content'; // 默认内容页
}

/**
 * 从大纲生成思维导图 Markdown
 */
function generateMindmapMarkdown(outline: any): string {
  const lines: string[] = [];

  lines.push(`# ${outline.title}`);

  const renderItems = (items: any[], level: number = 2) => {
    items.forEach((item) => {
      const prefix = '#'.repeat(level);
      lines.push(`${prefix} ${item.title}`);

      if (item.content && item.content.length > 0) {
        item.content.forEach((content: string) => {
          lines.push(`- ${content}`);
        });
      }

      if (item.children && item.children.length > 0) {
        renderItems(item.children, level + 1);
      }
    });
  };

  renderItems(outline.items);

  return lines.join('\n');
}

export const dynamic = 'force-dynamic';
