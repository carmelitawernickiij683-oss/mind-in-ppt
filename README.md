# Mind in PPT 🧠

AI驱动的演示文稿大纲生成工具，帮助您从杂乱的文本中提取关键信息，生成结构化大纲，并创建专业的PPT演示文稿。

## 功能特性

- 📝 **智能文本分析**: 使用AI自动分析文本内容，提取核心观点和关键信息
- 🗂️ **结构化大纲**: 生成逻辑清晰的层次化大纲，便于理解和修改
- 📊 **一键生成PPT**: 基于大纲自动生成可编辑的PowerPoint文件
- 🎨 **简洁美观**: 现代化的用户界面，操作简单直观

## 技术栈

- **前端框架**: Next.js 16 + TypeScript
- **样式方案**: Tailwind CSS
- **AI集成**: 智谱AI GLM-4.7
- **PPT生成**: PptxGenJS
- **部署平台**: Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd mind-in-ppt
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件并添加您的智谱AI API密钥：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```
ZHIPUAI_API_KEY=your_actual_api_key_here
```

**获取API密钥**: 访问 [智谱AI开放平台](https://open.bigmodel.cn/) 获取您的API密钥。

### 4. 运行开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用指南

### 步骤1: 输入文本

在首页的文本框中粘贴您想要分析的杂乱文本内容（建议500-5000字）。

### 步骤2: 生成大纲

点击"生成大纲"按钮，AI将分析文本并生成结构化大纲。

### 步骤3: 查看和调整大纲

查看生成的大纲，您可以：
- 查看各个层级的内容
- 了解整体结构
- 如不满意，可以点击"重新开始"重新输入文本

### 步骤4: 生成PPT

点击"生成PPT文件"按钮，系统将：
1. 基于大纲创建幻灯片
2. 自动下载.pptx文件到您的电脑
3. 您可以在PowerPoint中打开并进一步编辑

## 部署到Vercel

### 1. 准备部署

确保项目已推送到GitHub仓库。

### 2. 在Vercel中导入项目

1. 访问 [Vercel](https://vercel.com)
2. 点击"New Project"
3. 导入您的GitHub仓库
4. Vercel会自动检测Next.js项目

### 3. 配置环境变量

在Vercel项目设置中添加环境变量：

```
ZHIPUAI_API_KEY=your_actual_api_key_here
ZHIPUAI_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
```

### 4. 部署

点击"Deploy"按钮，等待部署完成。

## 项目结构

```
mind-in-ppt/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-outline/    # 大纲生成API
│   │   │   └── generate-ppt/         # PPT生成API
│   │   ├── layout.tsx                # 根布局
│   │   └── page.tsx                  # 主页面
│   ├── components/
│   │   ├── TextInput.tsx             # 文本输入组件
│   │   └── OutlineView.tsx           # 大纲展示组件
│   └── lib/
│       └── types.ts                  # 类型定义
├── public/                           # 静态资源
├── .env.example                      # 环境变量示例
└── package.json
```

## API说明

### POST /api/generate-outline

生成结构化大纲

**请求体**:
```json
{
  "text": "待分析的文本内容",
  "options": {
    "maxDepth": 3,
    "language": "zh-CN"
  }
}
```

**响应**:
```json
{
  "success": true,
  "outline": {
    "title": "大纲标题",
    "items": [...],
    "metadata": {...}
  }
}
```

### POST /api/generate-ppt

生成PPT文件

**请求体**:
```json
{
  "outline": {...},
  "options": {
    "theme": "default"
  }
}
```

**响应**: PowerPoint文件 (.pptx)

## MVP功能范围

当前版本实现的核心功能：
- ✅ 文本分析与大纲生成
- ✅ 基于大纲生成PPT框架
- ✅ Web界面与API集成
- ✅ Vercel部署支持

## 未来计划

- [ ] PPT主题和样式美化
- [ ] 自动生成图表和图像
- [ ] 支持多语言文本分析
- [ ] 大纲编辑功能
- [ ] 历史记录保存
- [ ] 用户认证和数据持久化
- [ ] 导出为其他格式（PDF、Google Slides等）

## 注意事项

1. **API密钥安全**: 永远不要将 `.env.local` 文件提交到版本控制系统
2. **文本长度限制**: 单次分析的文本建议不超过50000字符
3. **API费用**: 智谱AI提供免费额度，超限后需要付费，请注意控制成本
4. **网络连接**: 需要稳定的网络连接以调用AI服务

## 常见问题

### Q: 生成的大纲不准确怎么办？
A: 您可以调整输入文本的结构和清晰度，或者点击"重新开始"重新生成。

### Q: 生成的PPT可以编辑吗？
A: 是的，生成的.pptx文件完全兼容Microsoft PowerPoint和WPS演示，可以自由编辑。

### Q: 支持哪些语言？
A: 当前主要优化了中文文本分析，同时也支持英文和其他语言。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 联系方式

如有问题或建议，请通过GitHub Issues联系。
