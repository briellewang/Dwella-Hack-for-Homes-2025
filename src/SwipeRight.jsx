import React, { useState, useRef } from "react";
import {
  Heart,
  X,
  MessageCircle,
  Home,
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  User,
  Users,
} from "lucide-react";

const SwipeHomePage = ({ setCurrentView }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Sample property data with multiple images
  const properties = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: "$2,200/month",
      location: "Manhattan, NYC",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      ],
      description:
        "Beautiful modern studio with great city views and excellent transportation links.",
    },
    {
      id: 2,
      title: "Cozy 2-Bedroom Loft",
      price: "$3,200/month",
      location: "Brooklyn, NYC",
      bedrooms: 2,
      bathrooms: 1,
      area: "950 sq ft",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      description:
        "Charming loft with exposed brick walls and industrial design elements.",
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Penthouse",
      price: "$8,500/month",
      location: "Upper East Side, NYC",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      ],
      description:
        "Stunning penthouse with panoramic city views and premium amenities.",
    },
    {
      id: 4,
      title: "Bright 1-Bedroom Apartment",
      price: "$2,800/month",
      location: "Queens, NYC",
      bedrooms: 1,
      bathrooms: 1,
      area: "750 sq ft",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      ],
      description:
        "Sunny apartment with large windows and modern kitchen appliances.",
    },
    {
      id: 5,
      title: "Spacious Family Townhouse",
      price: "$5,500/month",
      location: "Staten Island, NYC",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,200 sq ft",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      description:
        "Perfect family home with backyard, garage, and quiet neighborhood.",
    },
  ];

  // Touch/Mouse event handlers for swiping
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        // Swiped right - Like
        handleLike();
      } else {
        // Swiped left - Dislike
        handleDislike();
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const handleLike = () => {
    if (currentCard < properties.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleDislike = () => {
    if (currentCard < properties.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Discover</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView("filter")}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Property Cards */}
      <div className="flex-1 p-4 pb-20 flex items-center justify-center">
        {currentCard < properties.length ? (
          <div className="relative w-full max-w-sm h-[600px]">
            {/* Current Card */}
            <div
              ref={cardRef}
              className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: `translate(${dragOffset.x}px, ${
                  dragOffset.y
                }px) rotate(${dragOffset.x * 0.1}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
                opacity: Math.abs(dragOffset.x) > 150 ? 0.5 : 1,
              }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            >
              {/* Swipe Indicators */}
              <div
                className="absolute top-8 left-8 z-10 text-6xl font-bold text-green-500 transform -rotate-12 opacity-0 pointer-events-none"
                style={{
                  opacity:
                    dragOffset.x > 50 ? Math.min(dragOffset.x / 150, 1) : 0,
                }}
              >
                LIKE
              </div>
              <div
                className="absolute top-8 right-8 z-10 text-6xl font-bold text-red-500 transform rotate-12 opacity-0 pointer-events-none"
                style={{
                  opacity:
                    dragOffset.x < -50
                      ? Math.min(Math.abs(dragOffset.x) / 150, 1)
                      : 0,
                }}
              >
                NOPE
              </div>

              <div className="relative h-2/3">
                <img
                  src={properties[currentCard].images[0]}
                  alt={properties[currentCard].title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-purple-600">
                    {properties[currentCard].price}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {properties[currentCard].title}
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{properties[currentCard].location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 h-1/3 flex flex-col justify-between">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{properties[currentCard].bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{properties[currentCard].bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span>{properties[currentCard].area}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {properties[currentCard].description}
                </p>
              </div>
            </div>

            {/* Next Card Preview */}
            {currentCard < properties.length - 1 && (
              <div
                className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden -z-10 scale-95"
                style={{ transform: "scale(0.95) translateY(10px)" }}
              >
                <img
                  src={properties[currentCard + 1].images[0]}
                  alt={properties[currentCard + 1].title}
                  className="w-full h-2/3 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {properties[currentCard + 1].title}
                  </h3>
                  <p className="text-purple-600 font-semibold">
                    {properties[currentCard + 1].price}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No more properties
            </h3>
            <p className="text-gray-400 mb-6">
              Adjust your filters or check back later
            </p>
            <button
              onClick={() => setCurrentCard(0)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {currentCard < properties.length && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-6 px-4">
          <button
            onClick={handleDislike}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={() => setCurrentView("property-detail")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all"
          >
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </button>
          <button
            onClick={handleLike}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all"
          >
            <Heart className="w-8 h-8 text-pink-500" />
          </button>
        </div>
      )}

      <BottomNav currentView="home" setCurrentView={setCurrentView} />
    </div>
  );
};

export default SwipeHomePage;
