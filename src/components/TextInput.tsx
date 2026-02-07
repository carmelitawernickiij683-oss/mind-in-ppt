'use client';

import { useState } from 'react';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onSubmit, isLoading }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          输入文本内容
        </h2>
        <p className="text-gray-600 mb-4">
          粘贴您想要分析的杂乱文本，AI将自动提取关键信息并生成结构化大纲
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此处粘贴您的文本内容...（建议500-5000字）"
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            字符数: {text.length}
          </span>
          <button
            onClick={handleSubmit}
            disabled={isLoading || text.trim().length === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isLoading || text.trim().length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? '分析中...' : '生成大纲'}
          </button>
        </div>
      </div>
    </div>
  );
}
