import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Home,
  Search,
  User,
  Users,
} from "lucide-react";

const AISearchPage = ({ setCurrentView }) => {
  const [inputText, setInputText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Bottom Navigation Component (inline)
  const BottomNav = ({ currentView, setCurrentView }) => (
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
            currentView === "property-list"
              ? "text-purple-600"
              : "text-gray-400"
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

  const handleSearch = () => {
    if (!inputText.trim()) return;

    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
      alert("AI search completed! Found 12 matching properties.");
      setCurrentView("property-list");
    }, 2000);
  };

  const quickSuggestions = [
    "Studio near subway station under $1500",
    "Pet-friendly 1-bedroom with balcony",
    "2-bedroom apartment in Brooklyn with parking",
    "Family home with backyard and good schools",
    "Modern apartment with gym and rooftop access",
    "Quiet neighborhood, close to coffee shops",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">AI Property Search</h1>
            <p className="text-sm text-gray-500">
              Describe what you're looking for
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 pb-32">
        <div className="mb-6">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="I'm looking for a 2-bedroom apartment in Brooklyn under $2000 with good public transport access, pet-friendly, and preferably with a balcony or outdoor space..."
              className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed"
            />
            <button
              onClick={handleSearch}
              disabled={!inputText.trim() || isSearching}
              className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Tip: Be specific about location, budget, amenities, and lifestyle
            preferences
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="text-sm font-semibold text-gray-600 mb-3">
            Quick suggestions:
          </div>
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion)}
              className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group"
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-purple-200">
                  <MessageCircle className="w-3 h-3 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {suggestion}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">How AI Search Works</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <span>Understands natural language descriptions</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <span>Matches your lifestyle and preferences</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <span>Considers location, commute, and amenities</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <span>Learns from your swipe history</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentView="llm-input" setCurrentView={setCurrentView} />
    </div>
  );
};

export default AISearchPage;
