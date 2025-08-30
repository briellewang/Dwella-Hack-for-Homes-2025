import React, { useState } from "react";
import {
  MapPin,
  Home,
  Search,
  User,
  MessageCircle,
  Users,
  Heart,
  Star,
  Filter,
  SortAsc,
} from "lucide-react";

const PropertyListPage = ({ setCurrentView }) => {
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [sortBy, setSortBy] = useState("price");

  // Your favorite properties list
  const favoriteProperties = [
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
      ],
      rating: 4.8,
      description:
        "Beautiful modern studio with great city views and excellent transportation links",
      features: ["5 min to subway", "24/7 security", "Free WiFi", "Gym access"],
      isLiked: true,
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
      ],
      rating: 4.6,
      description:
        "Charming loft with exposed brick walls and industrial design elements",
      features: [
        "Exposed brick",
        "High ceilings",
        "Parking space",
        "Pet friendly",
      ],
      isLiked: true,
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
      ],
      rating: 4.9,
      description:
        "Stunning penthouse with panoramic city views and premium amenities",
      features: ["City views", "Doorman", "Gym", "Pool", "Rooftop access"],
      isLiked: true,
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
      ],
      rating: 4.5,
      description:
        "Sunny apartment with large windows and modern kitchen appliances",
      features: [
        "Large windows",
        "Private balcony",
        "Smart locks",
        "Laundry in unit",
      ],
      isLiked: true,
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
      ],
      rating: 4.7,
      description:
        "Perfect family home with backyard, garage, and quiet neighborhood",
      features: ["Backyard", "Garage", "Quiet street", "Good schools nearby"],
      isLiked: true,
    },
  ];

  const toggleLike = (propertyId) => {
    setLikedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  const sortedProperties = [...favoriteProperties].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return (
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
        );
      case "rating":
        return b.rating - a.rating;
      case "area":
        return (
          parseInt(b.area.replace(/[^\d]/g, "")) -
          parseInt(a.area.replace(/[^\d]/g, ""))
        );
      default:
        return 0;
    }
  });

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
      <div className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden" style={{ height: '100vh' }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Browse Properties</h1>
            <button
              onClick={() => setCurrentView("filter")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSortBy("price")}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                sortBy === "price"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setSortBy("rating")}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                sortBy === "rating"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Rating
            </button>
            <button
              onClick={() => setSortBy("area")}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                sortBy === "area"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Area
            </button>
          </div>
        </div>

        {/* Property List */}
        <div className="flex-1 overflow-y-auto pb-20" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="p-4 space-y-4">
            {sortedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                {/* Property Image */}
                <div className="relative h-48">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleLike(property.id)}
                      className={`p-2 rounded-full ${
                        likedProperties.has(property.id)
                          ? "bg-pink-500 text-white"
                          : "bg-white/80 text-gray-400"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedProperties.has(property.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-sm font-bold text-purple-600">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Property Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Property Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Property Stats */}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav currentView="property-list" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default PropertyListPage;
