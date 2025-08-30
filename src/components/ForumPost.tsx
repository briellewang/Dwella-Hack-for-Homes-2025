'use client';

import React from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { ForumPost as ForumPostType } from '@/types';

interface ForumPostProps {
  post: ForumPostType;
  onLike?: (postId: number) => void;
  onComment?: (postId: number) => void;
}

export const ForumPost: React.FC<ForumPostProps> = ({ 
  post, 
  onLike, 
  onComment 
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      {/* User Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{post.avatar}</span>
          <div>
            <h4 className="text-gray-900 font-semibold">{post.user}</h4>
            <p className="text-gray-500 text-sm">{post.time}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button 
            className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors"
            onClick={() => onLike?.(post.id)}
          >
            <Heart size={18} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button 
            className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-pink-500 transition-colors">
          <Share size={18} />
        </button>
      </div>
    </div>
  );
};