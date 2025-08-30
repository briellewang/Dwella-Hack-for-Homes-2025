'use client';

import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { ChatMessage as ChatMessageComponent } from '@/components/ChatMessage';
import { ChatMessage as ChatMessageType } from '@/types';

export default function ChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI housing assistant. I can help you find the perfect home based on your preferences. What are you looking for?',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: 'Thanks for sharing! I\'ll help you find properties that match your criteria. Would you like me to show you some options?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button 
          onClick={() => router.back()}
          className="mr-3 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-semibold">AI Assistant</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-28 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3 max-w-sm mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
