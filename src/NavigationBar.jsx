import React from "react";
import {
  Home,
  Search,
  User,
  MessageCircle,
  Users,
  Edit,
  Calendar,
} from "lucide-react";

// Bottom Navigation for Tenants
export const BottomNav = ({ currentView, setCurrentView }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
    <div className="flex justify-around">
      <button
        onClick={() => setCurrentView("home")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "home" ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <Home className="w-6 h-6 mb-1" />
        <span className="text-xs">Discover</span>
      </button>
      <button
        onClick={() => setCurrentView("property-list")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "property-list" ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <Search className="w-6 h-6 mb-1" />
        <span className="text-xs">Browse</span>
      </button>
      <button
        onClick={() => setCurrentView("llm-input")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "llm-input" ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <MessageCircle className="w-6 h-6 mb-1" />
        <span className="text-xs">AI Search</span>
      </button>
      <button
        onClick={() => setCurrentView("forum")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "forum" ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <Users className="w-6 h-6 mb-1" />
        <span className="text-xs">Forum</span>
      </button>
      <button
        onClick={() => setCurrentView("profile")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "profile" ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <User className="w-6 h-6 mb-1" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  </div>
);

// Bottom Navigation for Landlords
export const LandlordBottomNav = ({ currentView, setCurrentView }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
    <div className="flex justify-around">
      <button
        onClick={() => setCurrentView("landlord-home")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "landlord-home" ? "text-indigo-600" : "text-gray-400"
        }`}
      >
        <Home className="w-6 h-6 mb-1" />
        <span className="text-xs">Properties</span>
      </button>
      <button className={`flex flex-col items-center py-2 px-4 text-gray-400`}>
        <MessageCircle className="w-6 h-6 mb-1" />
        <span className="text-xs">Applications</span>
      </button>
      <button
        onClick={() => setCurrentView("landlord-profile")}
        className={`flex flex-col items-center py-2 px-4 ${
          currentView === "landlord-profile"
            ? "text-indigo-600"
            : "text-gray-400"
        }`}
      >
        <User className="w-6 h-6 mb-1" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  </div>
);
