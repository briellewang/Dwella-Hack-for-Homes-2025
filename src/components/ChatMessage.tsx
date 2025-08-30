'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          message.type === 'user'
            ? 'bg-pink-500 text-white rounded-br-md'
            : 'bg-white/20 backdrop-blur-sm text-white rounded-bl-md'
        }`}
      >
        {message.type === 'ai' && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">🏠</span>
            </div>
            <span className="text-sm opacity-75 font-medium">Dwella AI</span>
          </div>
        )}
        <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};