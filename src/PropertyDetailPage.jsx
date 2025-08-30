import React, { useState } from "react";
import { BottomNav } from "./NavigationBar";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  User,
  Clock,
  Eye,
  Home,
  Search,
  Users,
} from "lucide-react";

const PropertyDetailPage = ({ propertyId, setCurrentView }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock property data
  const property = {
    id: propertyId || 1,
    title: "Modern Studio Apartment",
    price: "$550/week",
    location: "Northbridge, Perth",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq ft",
    description: "Beautiful modern studio with great city views. This stunning apartment features floor-to-ceiling windows, modern appliances, and a perfect location in the heart of Northbridge. Walking distance to restaurants, cafes, and public transportation.",
    features: [
      "Floor-to-ceiling windows",
      "Modern appliances", 
      "Built-in wardrobe",
      "Balcony",
      "Air conditioning",
      "High-speed internet",
      "24/7 security",
      "Gym access",
      "Parking available"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    landlord: {
      name: "Sarah Johnson",
      company: "Property Management Solutions",
      responseTime: "2 hours",
      verified: true
    },
    agent: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "Perth Real Estate Group",
      responseTime: "1 hour",
      verified: true,
      experience: "5+ years",
      specializations: ["Luxury Properties", "Investment Properties", "First-time Buyers"]
    },
    availability: "Available Now",
    listedDate: "2 days ago",
    views: 245,
    inquiries: 18
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${
                isFavorite ? "text-red-500" : "text-gray-400"
              } hover:bg-gray-100`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-16 pb-32 overflow-y-auto">
        {/* Image Gallery */}
        <div className="relative bg-white">
          <div className="relative h-80 overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? "border-indigo-500" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="p-4 space-y-6">
          {/* Title and Price */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-indigo-600">
                {property.price}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {property.views} views
                </span>
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {property.inquiries} inquiries
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{property.location}</span>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Bed className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {property.bedrooms}
              </div>
              <div className="text-sm text-gray-500">Bedrooms</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Bath className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {property.bathrooms}
              </div>
              <div className="text-sm text-gray-500">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Square className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {property.area}
              </div>
              <div className="text-sm text-gray-500">Area</div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">
                {property.availability}
              </span>
            </div>
            <span className="text-sm text-green-600">
              Listed {property.listedDate}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Landlord
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {property.landlord.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{property.landlord.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{property.landlord.reviews} reviews</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Response time</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {property.landlord.responseTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Listing Agent
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={property.agent.avatar}
                alt={property.agent.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-800">
                  {property.agent.name}
                </div>
                <div className="text-sm text-gray-600">
                  {property.agent.company}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {property.agent.experience} experience
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Response time</div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {property.agent.responseTime}
              </div>
            </div>
          </div>
          
          {/* Agent Specializations */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Specializations:</div>
            <div className="flex flex-wrap gap-2">
              {property.agent.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons - Above bottom navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isFavorite
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </button>

          <button
            onClick={() => {
              // Handle call functionality
              window.open(`tel:+61412345678`, '_self');
            }}
            className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </button>
        </div>
      </div>

      {/* Unified Bottom Navigation */}
      <BottomNav currentView="property-detail" setCurrentView={setCurrentView} />
    </div>
  );
};

export default PropertyDetailPage;
