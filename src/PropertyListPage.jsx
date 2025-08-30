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
import { getFavoriteProperties } from "../data/properties";

const PropertyListPage = ({ setCurrentView }) => {
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [sortBy, setSortBy] = useState("price");

  // Get favorite properties from unified data source
  const favoriteProperties = getFavoriteProperties();

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
        const priceA = parseInt(a.price.replace(/[$,]/g, ""));
        const priceB = parseInt(b.price.replace(/[$,]/g, ""));
        return priceA - priceB;
      case "rating":
        return b.rating - a.rating;
      case "bedrooms":
        return b.bedrooms - a.bedrooms;
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
            currentView === "home" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Swipe</span>
        </button>
        <button
          onClick={() => setCurrentView("property-list")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "property-list" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-xs">Favorites</span>
        </button>
        <button
          onClick={() => setCurrentView("llm-input")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "llm-input" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-xs">AI Search</span>
        </button>
        <button
          onClick={() => setCurrentView("forum")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "forum" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("profile")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "profile" ? "text-indigo-600" : "text-gray-400"
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
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              My Favorites
            </h1>
            <p className="text-sm text-gray-500">
              {favoriteProperties.length} properties saved
            </p>
          </div>
          <button
            onClick={() => setCurrentView("home")}
            className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"
          >
            <Home className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {/* Sort and Filter Options */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="bedrooms">Sort by Bedrooms</option>
            </select>
          </div>
          <button className="p-2 border border-gray-200 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="p-4 pb-20">
        {sortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start swiping to find properties you love!
            </p>
            <button
              onClick={() => setCurrentView("home")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex space-x-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleLike(property.id)}
                        className={`p-2 rounded-full ${
                          likedProperties.has(property.id) ||
                          property.isLiked
                            ? "text-red-500 bg-red-50"
                            : "text-gray-400 bg-gray-50"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedProperties.has(property.id) ||
                            property.isLiked
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-indigo-600">
                        {property.price}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {property.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex space-x-3 text-xs text-gray-500">
                        <span>
                          {property.bedrooms} bed • {property.bathrooms} bath
                        </span>
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{property.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav
        currentView="property-list"
        setCurrentView={setCurrentView}
      />
    </div>
  );
};

export default PropertyListPage;