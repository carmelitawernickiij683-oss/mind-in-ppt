'use client';

import { useEffect, useState } from 'react';

interface EnvStatus {
  status: string;
  message: string;
  environment: {
    hasApiKey: boolean;
    apiKeyPrefix: string;
    nodeEnv: string;
  };
  timestamp: string;
}

export default function DiagnosticPage() {
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkEnv() {
      try {
        const response = await fetch('/api/test-env');
        const data = await response.json();
        setEnvStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    }

    checkEnv();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Vercel 部署诊断</h1>

        {/* 环境检查 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">环境变量检查</h2>

          {loading && <p className="text-gray-600">检查中...</p>}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-semibold">❌ 错误</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {envStatus && (
            <div className="space-y-4">
              <div className={`p-4 rounded ${envStatus.environment.hasApiKey ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="font-semibold">
                  {envStatus.environment.hasApiKey ? '✅ API密钥已配置' : '❌ API密钥未配置'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  密钥前缀: {envStatus.environment.apiKeyPrefix}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm">
                  <strong>环境:</strong> {envStatus.environment.nodeEnv}
                </p>
                <p className="text-sm">
                  <strong>检查时间:</strong> {envStatus.timestamp}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 检查清单 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">部署检查清单</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <p className="font-medium">环境变量已设置</p>
                <p className="text-sm text-gray-600">
                  在 Vercel 项目设置中添加 <code className="bg-gray-100 px-1 rounded">ZHIPUAI_API_KEY</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <p className="font-medium">API密钥正确</p>
                <p className="text-sm text-gray-600">
                  从智谱AI平台获取有效密钥
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <p className="font-medium">环境选择正确</p>
                <p className="text-sm text-gray-600">
                  确保在 Production, Preview, Development 环境都添加了变量
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <p className="font-medium">重新部署</p>
                <p className="text-sm text-gray-600">
                  添加环境变量后需要重新部署才能生效
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 快速测试 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">📝 快速测试 API</h3>
          <p className="text-sm text-blue-800 mb-3">
            访问 <code className="bg-blue-100 px-1 rounded">/api/test-env</code> 检查环境配置
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            重新检查
          </button>
        </div>

        {/* 常见问题 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 关于浏览器警告</h3>
          <p className="text-sm text-yellow-800">
            您看到的 <code>Deprecated API</code> 和 <code>preload</code> 警告是浏览器性能优化提示，
            不会影响应用功能。真正的错误会在上方的"环境变量检查"区域显示。
          </p>
        </div>
      </div>
    </div>
  );
}
