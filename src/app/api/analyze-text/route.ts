import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/ai-service';
import type { PresentationStyle } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { text, style = 'executive-report' }: { text: string; style?: PresentationStyle } =
      await request.json();

    if (!text || text.length < 50) {
      return NextResponse.json(
        { success: false, error: '文本内容太少，请至少输入 50 个字符' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { success: false, error: '文本内容太多，最多支持 5000 个字符' },
        { status: 400 }
      );
    }

    // 调用 AI 服务分析文本
    const analysisResult = await analyzeText(text);

    // 根据分析结果优化建议
    analysisResult.suggestions = {
      recommendedStyle: style,
      focusAreas: analysisResult.keyPoints.slice(0, 3),
      visualApproach: generateVisualApproach(analysisResult, style),
    };

    return NextResponse.json({
      success: true,
      result: analysisResult,
    });
  } catch (error) {
    console.error('Error analyzing text:', error);

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
      { success: false, error: '分析文本时出错，请重试' },
      { status: 500 }
    );
  }
}

/**
 * 根据分析结果和风格生成视觉建议
 */
function generateVisualApproach(analysis: any, style: PresentationStyle): string {
  const { complexity, suggestedSections } = analysis.mainStructure;

  // 根据复杂度给出建议
  let approach = '';

  if (complexity === 'simple') {
    approach = '内容较为简单，建议使用简洁的布局和清晰的图标展示';
  } else if (complexity === 'medium') {
    approach = '内容适中，建议使用数据对比和流程图展示重点';
  } else {
    approach = '内容较为复杂，建议使用分层结构和多种可视化方式';
  }

  // 根据章节数量给出建议
  if (suggestedSections.length >= 5) {
    approach += '，适合使用目录页和章节分隔页';
  }

  return approach;
}

export const dynamic = 'force-dynamic';
