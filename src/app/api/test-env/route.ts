import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const env = {
    hasApiKey: !!process.env.ZHIPUAI_API_KEY || !!process.env.ZHIPU_API_KEY,
    apiKeyPrefix: process.env.ZHIPUAI_API_KEY?.substring(0, 10) + '...' || process.env.ZHIPU_API_KEY?.substring(0, 10) + '...' || 'NOT_SET',
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json({
    status: 'ok',
    message: 'API 路由正常工作',
    environment: env,
    timestamp: new Date().toISOString(),
  });
}
