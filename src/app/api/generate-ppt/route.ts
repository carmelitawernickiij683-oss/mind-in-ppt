import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';
import type { Outline, Slide, PresentationStyle } from '@/lib/types';
import { getStyleConfig } from '@/lib/styles';
import * as LucideIcons from 'lucide-react';

function convertOutlineToSlides(outline: Outline, style: PresentationStyle): Slide[] {
  const slides: Slide[] = [];
  let slideNumber = 1;
  const styleConfig = getStyleConfig(style);

  // 添加标题页
  slides.push({
    id: 'slide-0',
    title: outline.title,
    content: ['基于AI智能生成', 'Mind in PPT'],
    layout: 'title',
    slideNumber: slideNumber++,
    suggestedIcon: 'presentation',
    colorScheme: styleConfig.colors.primary,
  });

  // 遍历大纲项生成幻灯片
  function processOutlineItem(item: any, parentPath: string = '') {
    const currentPath = parentPath ? `${parentPath}/${item.title}` : item.title;

    // 主标题生成章节页（level 1）
    if (item.level === 1) {
      slides.push({
        id: `slide-${item.id}`,
        title: item.title,
        content: item.content || [],
        layout: 'section',
        slideNumber: slideNumber++,
        suggestedIcon: item.suggestedIcon || 'file-text',
        visualCue: item.visualCue,
        colorScheme: styleConfig.colors.primary,
      });
    }
    // 子标题生成内容页（level 2 及更低级别）
    else if (item.level === 2 || (item.content && item.content.length > 0)) {
      slides.push({
        id: `slide-${item.id}-content`,
        title: item.title,
        content: item.content || [],
        layout: item.layout || 'content',
        slideNumber: slideNumber++,
        suggestedIcon: item.suggestedIcon || 'list',
        visualCue: item.visualCue,
        suggestedImages: item.suggestedImages,
        colorScheme: styleConfig.colors.secondary,
      });
    }

    // 递归处理子项
    if (item.children && Array.isArray(item.children)) {
      item.children.forEach((child: any) => processOutlineItem(child, currentPath));
    }
  }

  // 处理所有大纲项
  outline.items.forEach((item) => processOutlineItem(item));

  return slides;
}

/**
 * 根据风格获取颜色配置
 */
function getStyleColors(style: PresentationStyle) {
  const config = getStyleConfig(style);
  return {
    primary: config.colors.primary,
    secondary: config.colors.secondary,
    accent: config.colors.accent,
    text: config.colors.text.primary,
    textSecondary: config.colors.text.secondary,
    background: config.colors.surface,
  };
}

/**
 * 生成优化的 PPTX 文件，应用风格和智能推荐
 */
async function generatePPTXFile(
  slides: Slide[],
  title: string,
  style: PresentationStyle
): Promise<Buffer> {
  const pptx = new PptxGenJS();
  const colors = getStyleColors(style);
  const styleConfig = getStyleConfig(style);

  // 设置演示文稿属性
  pptx.title = title;
  pptx.author = 'Mind in PPT';
  pptx.subject = 'AI生成的演示文稿';
  pptx.layout = 'LAYOUT_16x9';

  // 定义母版幻灯片
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { color: colors.background },
  });

  // 为每个幻灯片生成内容
  slides.forEach((slide, index) => {
    const slideObj = pptx.addSlide();

    // 根据幻灯片类型应用不同的布局
    if (slide.layout === 'title') {
      // 标题页 - 居中大标题
      slideObj.addText(slide.title, {
        x: 1,
        y: 3,
        w: '80%',
        h: 1.5,
        fontSize: 44,
        bold: true,
        color: colors.primary.replace('#', ''),
        align: 'center',
        fontFace: styleConfig.fonts.heading,
      });

      slideObj.addText(slide.content.join(' | '), {
        x: 1,
        y: 4.5,
        w: '80%',
        h: 0.8,
        fontSize: 20,
        color: colors.textSecondary.replace('#', ''),
        align: 'center',
        fontFace: styleConfig.fonts.body,
      });
    } else if (slide.layout === 'section') {
      // 章节页 - 大标题 + 强调色背景
      slideObj.background = { color: colors.primary };
      slideObj.addText(slide.title, {
        x: 0.5,
        y: 3,
        w: '90%',
        h: 1.5,
        fontSize: 40,
        bold: true,
        color: 'FFFFFF',
        fontFace: styleConfig.fonts.heading,
      });

      if (slide.content && slide.content.length > 0) {
        const contentPreview = slide.content.slice(0, 3).join(' | ');
        slideObj.addText(contentPreview, {
          x: 0.5,
          y: 4.5,
          w: '90%',
          h: 0.6,
          fontSize: 16,
          color: 'FFFFFF',
          fontFace: styleConfig.fonts.body,
        });
      }
    } else {
      // 内容页 - 标题 + 要点列表
      slideObj.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: '85%',
        h: 1,
        fontSize: 32,
        bold: true,
        color: colors.primary.replace('#', ''),
        fontFace: styleConfig.fonts.heading,
      });

      // 添加装饰线
      slideObj.addShape(pptx.ShapeType.line, {
        x: 0.5,
        y: 1.6,
        w: '85%',
        h: 0,
        line: { color: colors.accent.replace('#', ''), width: 2 },
      });

      // 添加内容
      if (slide.content && slide.content.length > 0) {
        const bulletPoints = slide.content.map((point, idx) => ({
          text: point,
          options: {
            bullet: true,
            fontSize: 18,
            color: colors.text.replace('#', ''),
            fontFace: styleConfig.fonts.body,
            breakLine: true,
            marginPt: 12,
          },
        }));

        slideObj.addText(bulletPoints, {
          x: 0.5,
          y: 2,
          w: '85%',
          h: 4.5,
        });
      }

      // 添加智能建议提示（如果有的话）
      if (slide.visualCue || slide.suggestedImages) {
        const tips = [];
        if (slide.visualCue) tips.push(`💡 ${slide.visualCue}`);
        if (slide.suggestedImages && slide.suggestedImages.length > 0) {
          tips.push(`🖼️ 建议图片: ${slide.suggestedImages.join('、')}`);
        }

        if (tips.length > 0) {
          slideObj.addText(tips.join('\n'), {
            x: 0.5,
            y: 6.5,
            w: '90%',
            h: 0.4,
            fontSize: 10,
            color: colors.textSecondary.replace('#', ''),
            fontFace: styleConfig.fonts.body,
            italic: true,
          });
        }
      }
    }

    // 添加页码
    slideObj.addText(`${slide.slideNumber}`, {
      x: 13,
      y: 7,
      w: 0.5,
      h: 0.3,
      fontSize: 11,
      color: colors.textSecondary.replace('#', ''),
    });

    // 添加图标提示（如果有建议的图标）
    if (slide.suggestedIcon && slide.suggestedIcon !== 'list') {
      slideObj.addText(`📌 建议图标: ${slide.suggestedIcon}`, {
        x: 0.5,
        y: 7,
        w: 3,
        h: 0.3,
        fontSize: 9,
        color: colors.textSecondary.replace('#', ''),
        fontFace: styleConfig.fonts.body,
      });
    }
  });

  // 生成PPT文件
  const buffer = await pptx.write({ outputType: 'nodebuffer' });
  return buffer as Buffer;
}

export async function POST(request: NextRequest) {
  try {
    const body: {
      outline: Outline;
      style: PresentationStyle;
      options?: {
        theme?: PresentationStyle;
      };
    } = await request.json();

    const { outline, style = 'executive-report' } = body;

    if (!outline) {
      return NextResponse.json(
        {
          success: false,
          error: '请提供有效的大纲数据',
        },
        { status: 400 }
      );
    }

    // 将大纲转换为幻灯片（应用智能推荐）
    const slides = convertOutlineToSlides(outline, style);

    // 生成PPT文件（应用风格配置）
    const pptxBuffer = await generatePPTXFile(slides, outline.title, style);

    // 生成文件名
    const styleConfig = getStyleConfig(style);

    // 清理标题：移除特殊字符，去除多余下划线
    const cleanTitle = outline.title
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')  // 特殊字符替换为下划线
      .replace(/_+/g, '_')                          // 多个连续下划线替换为一个
      .replace(/^_|_$/g, '');                       // 去除开头和结尾的下划线

    const filename = `${cleanTitle}_${styleConfig.name}.pptx`;

    // 将 PPT 文件转为 base64 返回（用于手动下载）
    const base64 = pptxBuffer.toString('base64');

    return NextResponse.json({
      success: true,
      data: {
        filename,
        base64,
        contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      },
    });
  } catch (error) {
    console.error('Error generating PPT:', error);

    return NextResponse.json(
      {
        success: false,
        error: '生成PPT时出错，请检查大纲数据或稍后重试',
      },
      { status: 500 }
    );
  }
}

// 确保路由不会被静态优化
export const dynamic = 'force-dynamic';
