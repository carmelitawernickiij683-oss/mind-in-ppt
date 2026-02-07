import ZhipuAI from 'zhipuai-sdk-nodejs-v4';
import type { Outline, AnalysisResult } from './types';

const aiConfig = {
  // 支持多种环境变量名称，提高兼容性
  apiKey: process.env.ZHIPUAI_API_KEY || process.env.ZHIPU_API_KEY || '',
  model: 'glm-4-flash',
  maxTokens: 4096,
  temperature: 0.7,
  topP: 0.9,
};

function getZhipuAI() {
  if (!aiConfig.apiKey) {
    throw new Error(
      '智谱AI API密钥未配置。请在环境变量中设置 ZHIPUAI_API_KEY 或 ZHIPU_API_KEY。'
    );
  }
  return new ZhipuAI({
    apiKey: aiConfig.apiKey,
  });
}

/**
 * 分析文本内容，提取核心主题和关键要点
 */
export async function analyzeText(text: string): Promise<AnalysisResult> {
  const zhipuAI = getZhipuAI();

  const maxLength = 5000;
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) : text;

  const response = await zhipuAI.completions.create({
    model: aiConfig.model,
    messages: [
      {
        role: 'system',
        content: `你是专业的文本分析专家。分析用户输入的文本内容，提取核心主题和关键要点。

请按照以下要求进行分析：
1. 识别文本的核心主题（一句话概括）
2. 提取5-7个关键要点（按重要性排序）
3. 建议合适的章节结构（3-5个章节）
4. 估算所需幻灯片数量（10-20张）
5. 评估内容复杂度（simple/medium/complex）
6. 提供简要总结（2-3句话）
7. 提取5-10个关键词

必须只返回JSON格式，不要包含任何其他文字说明。

JSON格式：
{
  "coreTopic": "核心主题",
  "keyPoints": ["要点1", "要点2", "要点3", "要点4", "要点5"],
  "mainStructure": {
    "suggestedSections": ["章节1", "章节2", "章节3"],
    "estimatedSlides": 15,
    "complexity": "medium"
  },
  "summary": "简要总结",
  "extractedKeywords": ["关键词1", "关键词2", "关键词3"]
}`,
      },
      {
        role: 'user',
        content: `请分析以下文本内容：\n\n${truncatedText}`,
      },
    ],
    maxTokens: 2048,
    temperature: 0.7,
  });

  if (!('choices' in response)) {
    throw new Error('Unexpected response format from AI service');
  }

  const responseText = response.choices[0].message.content;

  // 提取 JSON
  let analysisData: AnalysisResult;
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      // 构建完整的 AnalysisResult
      analysisData = {
        coreTopic: parsed.coreTopic || '',
        keyPoints: parsed.keyPoints || [],
        mainStructure: parsed.mainStructure || {
          suggestedSections: [],
          estimatedSlides: 15,
          complexity: 'medium',
        },
        summary: parsed.summary || '',
        extractedKeywords: parsed.extractedKeywords || [],
        suggestions: {
          recommendedStyle: 'executive-report',
          focusAreas: [],
          visualApproach: '建议使用清晰的层次结构和数据可视化',
        },
      };
    } else {
      throw new Error('无法从响应中提取JSON');
    }
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    throw new Error('AI响应解析失败，请重试');
  }

  return analysisData;
}

export async function generateOutline(text: string): Promise<Outline> {
  const zhipuAI = getZhipuAI();

  const maxLength = 50000;
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) : text;

  const response = await zhipuAI.completions.create({
    model: aiConfig.model,
    messages: [
      {
        role: 'system',
        content: `你是专业的文本分析和大纲生成专家。分析文本并生成结构化大纲。

要求：
1. 提取主要主题和核心观点
2. 按逻辑层次组织（主标题、子标题、子内容）
3. 每部分提取3-5个关键点
4. 必须只返回JSON格式，不要包含任何其他文字说明

JSON格式：
{
  "title": "大纲标题",
  "items": [
    {
      "id": "1",
      "title": "主要部分1",
      "content": ["关键点1", "关键点2", "关键点3"],
      "level": 1,
      "children": [
        {
          "id": "1-1",
          "title": "子部分1",
          "content": ["关键点1", "关键点2"],
          "level": 2
        }
      ]
    }
  ]
}`,
      },
      {
        role: 'user',
        content: `待分析的文本：\n${truncatedText}`,
      },
    ],
    maxTokens: aiConfig.maxTokens,
    temperature: aiConfig.temperature,
    topP: aiConfig.topP,
  });

  if (!('choices' in response)) {
    throw new Error('Unexpected response format from AI service');
  }

  const responseText = response.choices[0].message.content;

  // 尝试从响应中提取JSON
  let outlineData: Outline;
  try {
    // 尝试直接解析JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      outlineData = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('无法从响应中提取JSON');
    }
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    throw new Error('AI响应解析失败，请重试');
  }

  if (!outlineData.title || !Array.isArray(outlineData.items)) {
    throw new Error('Invalid outline structure');
  }

  outlineData.metadata = {
    createdAt: new Date().toISOString(),
    sourceTextLength: text.length,
  };

  return outlineData;
}
