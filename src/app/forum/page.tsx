'use client';

import React, { useState } from 'react';
import { Plus, Search, MessageCircle, Heart, Share } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { ForumPost } from '@/components/ForumPost';
import { mockForumPosts } from '@/data/forum';

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockForumPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-center mb-4">Community Forum</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="px-4 py-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h2>
            <p className="text-gray-500">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors flex items-center justify-center">
        <Plus size={24} />
      </button>

      <BottomNav />
    </div>
  );
}
