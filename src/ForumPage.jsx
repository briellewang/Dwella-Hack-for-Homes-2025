import React from "react";
import { BottomNav } from "./NavigationBar";
import {
  Users,
  MapPin,
  MessageCircle,
  Wrench,
  DollarSign,
  ClipboardList,
  Home,
  Search,
  User,
} from "lucide-react";

const ForumPage = ({ setCurrentView }) => {
  // Forum category cards data
  const forumCategories = [
    {
      id: 1,
      title: "Find Roommate",
      description: "Connect with potential roommates",
      icon: Users,
      bgColor: "bg-pink-100",
      iconBgColor: "bg-pink-200",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Nearby People",
      description: "Meet neighbors in your area",
      icon: MapPin,
      bgColor: "bg-blue-100",
      iconBgColor: "bg-blue-200",
      iconColor: "text-red-500",
    },
    {
      id: 3,
      title: "Discussion",
      description: "General housing topics",
      icon: MessageCircle,
      bgColor: "bg-green-100",
      iconBgColor: "bg-green-200",
      iconColor: "text-white",
    },
    {
      id: 4,
      title: "Maintenance",
      description: "Tips and service requests",
      icon: Wrench,
      bgColor: "bg-purple-100",
      iconBgColor: "bg-purple-200",
      iconColor: "text-gray-600",
    },
    {
      id: 5,
      title: "Market Talk",
      description: "Housing market discussions",
      icon: DollarSign,
      bgColor: "bg-yellow-100",
      iconBgColor: "bg-yellow-200",
      iconColor: "text-brown-600",
    },
    {
      id: 6,
      title: "Reviews",
      description: "Rate properties and landlords",
      icon: ClipboardList,
      bgColor: "bg-cyan-100",
      iconBgColor: "bg-cyan-200",
      iconColor: "text-brown-600",
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden" style={{ height: '100vh' }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Community Forum
          </h1>
        </div>

        {/* Forum Categories Grid */}
        <div className="p-4 pb-20 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="grid grid-cols-2 gap-4">
            {forumCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    // Handle category selection
                    console.log(`Selected: ${category.title}`);
                  }}
                  className={`${category.bgColor} rounded-2xl p-4 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    {/* Icon */}
                    <div className={`${category.iconBgColor} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <IconComponent size={20} className={category.iconColor} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {category.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav currentView="forum" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default ForumPage;
