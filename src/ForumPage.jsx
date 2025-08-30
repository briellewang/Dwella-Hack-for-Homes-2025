import React, { useState } from "react";
import { BottomNav } from "./NavigationBar";
import {
  Edit,
  MessageCircle,
  ThumbsUp,
  Search,
  TrendingUp,
  Users,
  Clock,
  Home,
  User,
} from "lucide-react";

const ForumPage = ({ setCurrentView }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");



  const categories = [
    "All",
    "First Time Renters",
    "NYC Living",
    "Landlord Issues",
    "Moving Tips",
    "Reviews",
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Complete guide to apartment hunting in NYC",
      author: "RentHelper",
      avatar: "R",
      replies: 128,
      likes: 89,
      time: "2h ago",
      category: "First Time Renters",
      isSticky: true,
      preview:
        "Essential tips for first-time renters navigating the NYC market...",
    },
    {
      id: 2,
      title: "Best neighborhoods in Brooklyn for young professionals?",
      author: "NewYorker23",
      avatar: "N",
      replies: 45,
      likes: 32,
      time: "4h ago",
      category: "NYC Living",
      preview: "Moving to NYC for work and looking for recommendations...",
    },
    {
      id: 3,
      title: "Landlord wants to raise rent by 15% - what are my options?",
      author: "TenantAdvice",
      avatar: "T",
      replies: 67,
      likes: 54,
      time: "1d ago",
      category: "Landlord Issues",
      preview: "Been living here for 2 years, rent stabilized apartment...",
    },
    {
      id: 4,
      title: "My apartment hunting success story + tips that worked",
      author: "HappyRenter",
      avatar: "H",
      replies: 89,
      likes: 156,
      time: "2d ago",
      category: "Moving Tips",
      preview: "After 3 months of searching, finally found my dream place!",
    },
    {
      id: 5,
      title: "Red flags to watch for during apartment viewings",
      author: "ExperiencedRenter",
      avatar: "E",
      replies: 34,
      likes: 78,
      time: "3d ago",
      category: "First Time Renters",
      preview: "Learned these lessons the hard way, hoping to help others...",
    },
    {
      id: 6,
      title: "Review: Living at The Hamilton Building (Upper West Side)",
      author: "UWSResident",
      avatar: "U",
      replies: 23,
      likes: 45,
      time: "4d ago",
      category: "Reviews",
      preview: "Honest review after living here for 18 months...",
    },
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? forumPosts
      : forumPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Community Forum</h1>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">2.3k</div>
              <div className="text-xs text-gray-500">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">847</div>
              <div className="text-xs text-gray-500">Posts This Week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">95%</div>
              <div className="text-xs text-gray-500">Questions Answered</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-4 pb-20">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {post.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {post.isSticky && (
                    <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Pinned
                    </div>
                  )}
                  <div className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {post.category}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{post.preview}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />@{post.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.time}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {post.replies}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Load more */}
        <div className="text-center py-6">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200">
            Load More Posts
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all">
          <Edit className="w-6 h-6" />
        </button>
      </div>

      <BottomNav currentView="forum" setCurrentView={setCurrentView} />
    </div>
  );
};

export default ForumPage;
