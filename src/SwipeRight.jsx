
import React, { useState, useRef } from "react";
import { BottomNav } from "./NavigationBar";

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

  // Sample property data with multiple images
  const properties = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: "$550/week",
      location: "Northbridge, Perth",
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
      price: "$800/week",
      location: "Fremantle, Perth",
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
      price: "$2,125/week",
      location: "South Perth, Perth",
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
      price: "$700/week",
      location: "Subiaco, Perth",
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
      price: "$1,375/week",
      location: "Nedlands, Perth",
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

  // Fixed Top Navigation Component
  const TopNavigation = () => (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm p-4 flex items-center justify-between z-50">
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
  );



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Top Navigation */}
      <TopNavigation />

      {/* Scrollable Content Area - Only the middle section can scroll */}
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="p-4 flex items-center justify-center min-h-full">
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
                  <span>Long press to favorite</span>
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
      </div>

      {/* Fixed Action Buttons */}
      {currentCard < properties.length && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-6 px-4 z-40">
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

      {/* Fixed Bottom Navigation */}
      <BottomNav currentView="home" setCurrentView={setCurrentView} />

    </div>
  );
};

export default SwipeHomePage;