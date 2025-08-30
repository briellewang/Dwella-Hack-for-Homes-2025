import React, { useState, useRef, useEffect } from "react";
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
  Sparkles,
} from "lucide-react";
import {
  properties,
  filterProperties,
  getDataRanges,
} from "/src/data/properties.js";

const SwipeHomePage = ({ setCurrentView }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const cardRef = useRef(null);

  // Check for AI search criteria on component mount
  useEffect(() => {
    const criteria = localStorage.getItem("aiSearchCriteria");
    const error = localStorage.getItem("aiSearchError");

    if (error) {
      // If there's an error, show it and don't filter
      const errorData = JSON.parse(error);
      alert(
        `Search Error: ${
          errorData.message
        }\n\nAvailable options:\n- Price range: $${errorData.availableRanges.minPrice.toLocaleString()} - $${errorData.availableRanges.maxPrice.toLocaleString()}\n- Bedrooms: ${errorData.availableRanges.availableBedrooms.join(
          ", "
        )}\n- Locations: ${errorData.availableRanges.availableLocations.join(
          ", "
        )}`
      );
      localStorage.removeItem("aiSearchError");
      return;
    }

    if (criteria) {
      const parsedCriteria = JSON.parse(criteria);
      setSearchCriteria(parsedCriteria);
      setIsFiltered(true);
      // Filter properties based on AI search criteria
      filterPropertiesBasedOnCriteria(parsedCriteria);
      // Clear the criteria after use
      localStorage.removeItem("aiSearchCriteria");
    }
  }, []);

  // Filter properties based on AI search criteria
  const filterPropertiesBasedOnCriteria = (criteria) => {
    const result = filterProperties(criteria);

    // If there are unmet requirements or no matching properties, show error
    if (result.unmetRequirements.length > 0 || result.filtered.length === 0) {
      const errorMessage =
        result.unmetRequirements.length > 0
          ? result.unmetRequirements.join(". ")
          : "No properties match your criteria. Try adjusting your requirements.";

      // Store error message and don't set filtered properties
      localStorage.setItem(
        "aiSearchError",
        JSON.stringify({
          message: errorMessage,
          criteria: criteria.query,
          availableRanges: result.dataRanges,
        })
      );
      setFilteredProperties([]);
      setIsFiltered(false);
      return;
    }

    setFilteredProperties(result.filtered);
  };

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
    const currentProperties = isFiltered ? filteredProperties : properties;
    if (currentCard < currentProperties.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleDislike = () => {
    const currentProperties = isFiltered ? filteredProperties : properties;
    if (currentCard < currentProperties.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  // Get current properties list (filtered or all)
  const getCurrentProperties = () => {
    return isFiltered ? filteredProperties : properties;
  };

  // Bottom Navigation Component (适配手机app容器)
  const BottomNav = ({ currentView, setCurrentView }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "home" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Discover</span>
        </button>
        <button
          onClick={() => setCurrentView("property-list")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "property-list"
              ? "text-purple-600"
              : "text-gray-400"
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Browse</span>
        </button>
        <button
          onClick={() => setCurrentView("llm-input")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "llm-input" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">AI Search</span>
        </button>
        <button
          onClick={() => setCurrentView("forum")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "forum" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Users className="w-5 h-5 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("profile")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "profile" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile App Container */}
      <div
        className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Discover</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView("filter")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentView("llm-input")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* AI Filter Indicator */}
          {isFiltered && searchCriteria && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-800">
                  AI Filtered Results
                </p>
                <p className="text-xs text-purple-600 truncate">
                  "
                  {searchCriteria.query.length > 50
                    ? searchCriteria.query.substring(0, 50) + "..."
                    : searchCriteria.query}
                  "
                </p>
              </div>
              <button
                onClick={() => {
                  setIsFiltered(false);
                  setFilteredProperties([]);
                  setSearchCriteria(null);
                  setCurrentCard(0);
                }}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Property Cards */}
        <div
          className="flex-1 p-4 pb-20 flex items-center justify-center"
          style={{ height: "calc(100vh - 140px)" }}
        >
          {(() => {
            const currentProperties = getCurrentProperties();
            return currentCard < currentProperties.length ? (
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
                      src={currentProperties[currentCard].images[0]}
                      alt={currentProperties[currentCard].title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-purple-600">
                        {currentProperties[currentCard].price}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {currentProperties[currentCard].title}
                      </h3>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{currentProperties[currentCard].location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 h-1/3 flex flex-col justify-between">
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>
                          {currentProperties[currentCard].bedrooms} bed
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>
                          {currentProperties[currentCard].bathrooms} bath
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{currentProperties[currentCard].area}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentProperties[currentCard].description}
                    </p>
                  </div>
                </div>

                {/* Next Card Preview */}
                {currentCard < currentProperties.length - 1 && (
                  <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden -z-10 scale-95"
                    style={{ transform: "scale(0.95) translateY(10px)" }}
                  >
                    <img
                      src={currentProperties[currentCard + 1].images[0]}
                      alt={currentProperties[currentCard + 1].title}
                      className="w-full h-2/3 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        {currentProperties[currentCard + 1].title}
                      </h3>
                      <p className="text-purple-600 font-semibold">
                        {currentProperties[currentCard + 1].price}
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
                  {isFiltered
                    ? "No more matching properties"
                    : "No more properties"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {isFiltered
                    ? "Try adjusting your search criteria"
                    : "Adjust your filters or check back later"}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentCard(0)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
                  >
                    {isFiltered ? "View All Properties" : "Start Over"}
                  </button>
                  {isFiltered && (
                    <button
                      onClick={() => setCurrentView("llm-input")}
                      className="bg-white border border-purple-200 text-purple-600 px-6 py-3 rounded-2xl font-semibold"
                    >
                      New AI Search
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Action Buttons */}
        {(() => {
          const currentProperties = getCurrentProperties();
          return (
            currentCard < currentProperties.length && (
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
            )
          );
        })()}

        <BottomNav currentView="home" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default SwipeHomePage;
