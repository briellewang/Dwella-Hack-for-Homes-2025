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
  ChevronLeft,
  ChevronRight,
  Star,
  Info,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Wifi,
  Car,
  Dog,
  Building,
  TreePine,
  Shield,
} from "lucide-react";
import {
  properties,
  filterProperties,
  getDataRanges,
} from "./data/properties.js";

const SwipeHomePage = ({ setCurrentView }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // New state for enhanced features
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [longPressTimer, setLongPressTimer] = useState(null);
  
  const cardRef = useRef(null);
  const longPressRef = useRef(null);

  // Check for AI search criteria on component mount
  useEffect(() => {
    const criteria = localStorage.getItem("aiSearchCriteria");
    const error = localStorage.getItem("aiSearchError");
    const savedFavorites = localStorage.getItem("favorites");
    const tutorialShown = localStorage.getItem("tutorialShown");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (tutorialShown) {
      setShowTutorial(false);
    }

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

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  // Enhanced haptic feedback function
  const triggerHapticFeedback = (intensity = 50) => {
    if (navigator.vibrate) {
      navigator.vibrate(intensity);
    }
  };

  // Convert monthly rent to weekly rent
  const convertToWeeklyRent = (monthlyPrice) => {
    const price = monthlyPrice.replace(/[$,]/g, '');
    const monthlyAmount = parseInt(price);
    const weeklyAmount = Math.round(monthlyAmount / 4.33); // 52 weeks / 12 months
    return `$${weeklyAmount.toLocaleString()}/week`;
  };

  // Get icon for tag
  const getTagIcon = (tag) => {
    const iconMap = {
      'Near Subway': MapPin,
      '24/7 Security': Shield,
      'Gym': Building,
      'WiFi': Wifi,
      'Pet Friendly': Dog,
      'Parking': Car,
      'High Ceilings': Building,
      'Industrial Style': Building,
      'City View': Building,
      'Doorman': Shield,
      'Pool': Building,
      'Rooftop Garden': TreePine,
      'Luxury': Star,
      'Large Windows': Building,
      'Private Balcony': Building,
      'Smart Lock': Shield,
      'In-Unit Laundry': Building,
      'Backyard': TreePine,
      'Garage': Car,
      'Quiet Street': MapPin,
      'Good Schools': Building,
    };
    return iconMap[tag] || Building;
  };

  // Double tap to zoom image
  const handleDoubleTap = () => {
    setIsImageZoomed(!isImageZoomed);
    triggerHapticFeedback(30);
  };

  // Long press to favorite
  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      triggerHapticFeedback(100);
      
      const currentProperties = getCurrentProperties();
      const currentProperty = currentProperties[currentCard];
      
      if (!favorites.includes(currentProperty.id)) {
        setFavorites([...favorites, currentProperty.id]);
      }
      
      setTimeout(() => setIsLongPressing(false), 1000);
    }, 500);
    
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  // Image navigation
  const nextImage = () => {
    const currentProperties = getCurrentProperties();
    const currentProperty = currentProperties[currentCard];
    if (currentImageIndex < currentProperty.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      triggerHapticFeedback(20);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      triggerHapticFeedback(20);
    }
  };

  // Touch/Mouse event handlers for swiping
  const handleStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    setSwipeDirection(null);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    
    // Start long press timer
    handleLongPressStart();
  };

  const handleMove = (e) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
    
    // Cancel long press if moved too much
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      handleLongPressEnd();
    }
    
    // Set swipe direction for visual feedback
    if (Math.abs(deltaX) > 20) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    }
    
    // Handle vertical swipes
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        // Swiped down - skip to next
        if (Math.abs(deltaY) > 100) {
          handleSkip();
        }
      } else {
        // Swiped up - show more info
        if (Math.abs(deltaY) > 100) {
          setShowMoreInfo(true);
        }
      }
    }
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    handleLongPressEnd();

    const threshold = 120; // Increased threshold for better UX
    if (Math.abs(dragOffset.x) > threshold) {
      setIsAnimating(true);
      triggerHapticFeedback(50);
      
      if (dragOffset.x > 0) {
        // Swiped right - Like
        handleLike();
      } else {
        // Swiped left - Dislike
        handleDislike();
      }
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
        setSwipeDirection(null);
      }, 300);
    }

    setDragOffset({ x: 0, y: 0 });
    setShowMoreInfo(false);
  };

  const handleLike = () => {
    const currentProperties = isFiltered ? filteredProperties : properties;
    if (currentCard < currentProperties.length - 1) {
      setCurrentCard(currentCard + 1);
      setCurrentImageIndex(0);
    }
  };

  const handleDislike = () => {
    const currentProperties = isFiltered ? filteredProperties : properties;
    if (currentCard < currentProperties.length - 1) {
      setCurrentCard(currentCard + 1);
      setCurrentImageIndex(0);
    }
  };

  const handleSkip = () => {
    const currentProperties = isFiltered ? filteredProperties : properties;
    if (currentCard < currentProperties.length - 1) {
      setCurrentCard(currentCard + 1);
      setCurrentImageIndex(0);
      triggerHapticFeedback(40);
    }
  };

  // Get current properties list (filtered or all)
  const getCurrentProperties = () => {
    return isFiltered ? filteredProperties : properties;
  };

  // Close tutorial
  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialShown", "true");
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
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentView("llm-input")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
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
                className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Tutorial Overlay */}
        {showTutorial && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm">
              <h3 className="text-xl font-bold mb-4 text-center">Gesture Guidance</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Swipe right to like</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Swipe left to skip</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <SkipForward className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Swipe down to skip quickly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>Swipe up for more information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span>Long press to favorite</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </div>
                  <span>Double-click to zoom image</span>
                </div>
              </div>
              <button
                onClick={closeTutorial}
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Property Cards - Fixed height to avoid bottom overlap */}
        <div
          className="flex-1 p-4 flex items-center justify-center"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {(() => {
            const currentProperties = getCurrentProperties();
            return currentCard < currentProperties.length ? (
              <div className="relative w-full max-w-sm h-[520px] mt-4">
                {/* Current Card */}
                <div
                  ref={cardRef}
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none transform-gpu"
                  style={{
                    transform: `translate(${dragOffset.x}px, ${
                      dragOffset.y
                    }px) rotate(${dragOffset.x * 0.08}deg) scale(${
                      isDragging ? 1.02 : 1
                    })`,
                    transition: isDragging 
                      ? "none" 
                      : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    opacity: Math.abs(dragOffset.x) > 200 ? 0.3 : 1,
                    zIndex: 10,
                  }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                  onDoubleClick={handleDoubleTap}
                >
                  {/* Simplified Swipe Indicators - Only Icons */}
                  {/* Heart Icon for Right Swipe */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300"
                    style={{
                      opacity: swipeDirection === 'right' 
                        ? Math.min(Math.abs(dragOffset.x) / 80, 1) 
                        : 0,
                      transform: `translate(-50%, -50%) scale(${swipeDirection === 'right' ? 1.5 : 0.8}) rotate(${swipeDirection === 'right' ? 15 : 0}deg)`,
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl border-4 border-green-500">
                      <Heart className="w-16 h-16 text-green-500 fill-current" />
                    </div>
                  </div>
                  
                  {/* X Icon for Left Swipe */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300"
                    style={{
                      opacity: swipeDirection === 'left' 
                        ? Math.min(Math.abs(dragOffset.x) / 80, 1) 
                        : 0,
                      transform: `translate(-50%, -50%) scale(${swipeDirection === 'left' ? 1.5 : 0.8}) rotate(${swipeDirection === 'left' ? -15 : 0}deg)`,
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl border-4 border-red-500">
                      <X className="w-16 h-16 text-red-500" />
                    </div>
                  </div>

                  {/* Favorite Animation */}
                  {isLongPressing && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-pulse">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl border-4 border-yellow-500">
                        <Star className="w-16 h-16 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Optimized Image Section */}
                  <div className="relative h-[320px] overflow-hidden">
                    <img
                      src={getCurrentProperties()[currentCard].images[currentImageIndex]}
                      alt={getCurrentProperties()[currentCard].title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isImageZoomed ? 'scale-150' : 'hover:scale-105'
                      }`}
                      draggable={false}
                    />
                    
                    {/* Image Navigation */}
                    {getCurrentProperties()[currentCard].images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
                          disabled={currentImageIndex === 0}
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
                          disabled={currentImageIndex === getCurrentProperties()[currentCard].images.length - 1}
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-sm">
                            {currentImageIndex + 1} / {getCurrentProperties()[currentCard].images.length}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {/* Enhanced Price Tag - Now showing weekly rent */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-gray-200">
                      <span className="text-xl font-bold text-purple-600">
                        {convertToWeeklyRent(getCurrentProperties()[currentCard].price)}
                      </span>
                    </div>

                    {/* Favorite Status */}
                    {favorites.includes(getCurrentProperties()[currentCard].id) && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg border border-yellow-500">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    )}
                    
                    {/* Enhanced Property Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">
                        {getCurrentProperties()[currentCard].title}
                      </h3>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{getCurrentProperties()[currentCard].location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Optimized Content Section */}
                  <div className="p-6 h-[200px] flex flex-col justify-between">
                    {/* Property Details */}
                    <div className="flex justify-between text-sm text-gray-600 mb-3 bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium">
                          {getCurrentProperties()[currentCard].bedrooms} bed
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium">
                          {getCurrentProperties()[currentCard].bathrooms} bath
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium">{getCurrentProperties()[currentCard].area}</span>
                      </div>
                    </div>

                    {/* Property Features/Tags - Moved to content area */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {getCurrentProperties()[currentCard].tags?.slice(0, 4).map((tag, index) => {
                          const IconComponent = getTagIcon(tag);
                          return (
                            <div
                              key={index}
                              className="flex items-center space-x-1 bg-purple-50 border border-purple-200 px-2 py-1 rounded-lg text-xs font-medium text-purple-700"
                              title={tag}
                            >
                              <IconComponent className="w-3 h-3" />
                              <span className="truncate max-w-16">{tag}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                        {getCurrentProperties()[currentCard].description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons - Now positioned at the bottom of the card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
                    <div className="flex justify-center space-x-8">
                      <button
                        onClick={handleDislike}
                        className="w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                      >
                        <X className="w-8 h-8 text-white" />
                      </button>
                      <button
                        onClick={() => setCurrentView("property-detail")}
                        className="w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                      >
                        <MessageCircle className="w-8 h-8 text-white" />
                      </button>
                      <button
                        onClick={handleLike}
                        className="w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                      >
                        <Heart className="w-8 h-8 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* More Info Overlay */}
                  {showMoreInfo && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-6 overflow-y-auto">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Detailed Information</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-700">Amenities</h4>
                            <p className="text-sm text-gray-600">{getCurrentProperties()[currentCard].amenities || "AC, Washing Machine, Refrigerator"}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Surroundings</h4>
                            <p className="text-sm text-gray-600">{getCurrentProperties()[currentCard].surroundings || "Near subway station, shopping center, restaurants"}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Lease Terms</h4>
                            <p className="text-sm text-gray-600">{getCurrentProperties()[currentCard].terms || "2 months deposit, minimum 6 months lease"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Next Card Preview */}
                {currentCard < currentProperties.length - 1 && (
                  <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden transform-gpu"
                    style={{ 
                      transform: "scale(0.92) translateY(20px)",
                      zIndex: 5,
                    }}
                  >
                    <div className="relative h-[320px] overflow-hidden">
                      <img
                        src={currentProperties[currentCard + 1].images[0]}
                        alt={currentProperties[currentCard + 1].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl">
                        <span className="text-lg font-bold text-purple-600">
                          {convertToWeeklyRent(currentProperties[currentCard + 1].price)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {currentProperties[currentCard + 1].title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="truncate">{currentProperties[currentCard + 1].location}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Third Card Preview for Better Stacking Effect */}
                {currentCard < currentProperties.length - 2 && (
                  <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-lg overflow-hidden transform-gpu"
                    style={{ 
                      transform: "scale(0.84) translateY(40px)",
                      zIndex: 1,
                    }}
                  >
                    <div className="relative h-[320px] overflow-hidden">
                      <img
                        src={currentProperties[currentCard + 2].images[0]}
                        alt={currentProperties[currentCard + 2].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl">
                        <span className="text-lg font-bold text-purple-600">
                          {convertToWeeklyRent(currentProperties[currentCard + 2].price)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {currentProperties[currentCard + 2].title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center px-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Home className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  {isFiltered
                    ? "No more matching properties"
                    : "No more properties"}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {isFiltered
                    ? "Try adjusting your search criteria to find more properties"
                    : "You've seen all available properties. Check back later for new listings"}
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setCurrentCard(0)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isFiltered ? "View All Properties" : "Start Over"}
                  </button>
                  {isFiltered && (
                    <button
                      onClick={() => setCurrentView("llm-input")}
                      className="w-full bg-white border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-colors"
                    >
                      New AI Search
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        <BottomNav currentView="home" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default SwipeHomePage;
