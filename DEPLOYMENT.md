# 🚀 Vercel 部署指南

## 前置准备

### 1. 获取智谱AI API密钥
1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册/登录账号
3. 进入「开发者中心」→「API密钥」
4. 创建新密钥并复制保存

---

## 部署步骤

### 方法一：通过 GitHub + Vercel 自动部署（推荐）

#### 步骤 1：推送到 GitHub
```bash
cd /c/Users/86187/mind-in-ppt
git add .
git commit -m "chore: add deployment configuration"
git push origin main
```

#### 步骤 2：在 Vercel 导入项目
1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 从 GitHub 导入 `mind-in-ppt` 仓库
4. 配置项目（自动检测 Next.js）

#### 步骤 3：配置环境变量（重要！）
在 Vercel 项目设置中添加环境变量：

**环境变量名称**（任选其一）：
- `ZHIPUAI_API_KEY` （推荐）
- `ZHIPU_API_KEY` （备用）

**值**：粘贴您的智谱AI API密钥

#### 步骤 4：部署
1. 点击 "Deploy"
2. 等待 2-3 分钟
3. 部署成功后访问分配的域名

---

## 环境变量配置

### 必需的环境变量
| 变量名 | 说明 | 示例 |
|--------|------|------|
| `ZHIPUAI_API_KEY` | 智谱AI API密钥 | `1234567890abcdef.abcdefg` |
| `ZHIPU_API_KEY` | 备用API密钥名称 | 同上 |

---

## 常见问题

### ❌ 构建失败：API调用404
**原因**：未设置环境变量或 API密钥错误

**解决方法**：
1. 检查 Vercel 项目 → Settings → Environment Variables
2. 确保添加了 `ZHIPUAI_API_KEY` 或 `ZHIPU_API_KEY`
3. 确认 API密钥正确（无多余空格）
4. 重新部署项目

### ❌ 构建成功但API报错
**原因**：环境变量未生效

**解决方法**：
1. 在 Vercel 项目中重新添加环境变量
2. 确保选择了正确的环境（Production / Preview / Development）
3. 重新部署

### ❌ 依赖安装失败
**原因**：网络问题或依赖冲突

**解决方法**：
1. 删除 `node_modules` 和 `package-lock.json`
2. 重新运行 `npm install`
3. 提交更新后的 `package-lock.json`

---

## 本地开发

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件：
```bash
ZHIPUAI_API_KEY=your_actual_api_key_here
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

---

## 技术栈

- **框架**: Next.js 16.1 (App Router)
- **React**: 19.2
- **样式**: Tailwind CSS 4.x
- **TypeScript**: 5.x
- **AI服务**: 智谱AI GLM-4 Flash
- **PPT生成**: PptxGenJS 4.0

---

## 许可证

MIT License
