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
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">My Favorites</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-100 rounded-full">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full">
              <SortAsc className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex space-x-2">
          {[
            { key: "price", label: "Price" },
            { key: "rating", label: "Rating" },
            { key: "area", label: "Size" },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={`px-3 py-1 rounded-full text-sm ${
                sortBy === option.key
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Properties List */}
      <div className="p-4 space-y-4 pb-20">
        {sortedProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {property.title}
                  </h3>
                  <button
                    onClick={() => toggleLike(property.id)}
                    className="p-1"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedProperties.has(property.id) || property.isLiked
                          ? "text-red-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                </div>

                <div className="text-xs text-gray-500 mb-2 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {property.location}
                </div>

                <div className="flex items-center mb-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs text-gray-600">
                    {property.rating}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-xs text-gray-500">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.area}</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {property.price}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {property.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedProperties.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start browsing to find properties you love
            </p>
            <button
              onClick={() => setCurrentView("home")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Start Browsing
            </button>
          </div>
        </div>
      )}

      <BottomNav currentView="property-list" setCurrentView={setCurrentView} />
    </div>
  );
};

export default PropertyListPage;
