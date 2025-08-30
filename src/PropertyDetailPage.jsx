import React, { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { properties } from "./data/properties.js";

const PropertyDetailPage = ({ propertyId, setCurrentView }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get property data from unified data source
  const property = properties.find(p => p.id === propertyId) || properties[0];

  // Mock agent data since it's not in the properties array
  const agent = {
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "Perth Real Estate Group",
    responseTime: "1 hour",
    verified: true,
    experience: "5+ years",
    specializations: ["Luxury Properties", "Investment Properties", "First-time Buyers"]
  };

  // Mock landlord data since it's not in the properties array
  const landlord = {
    name: "Sarah Johnson",
    company: "Property Management Solutions",
    responseTime: "2 hours",
    verified: true
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
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden" style={{ height: "100vh" }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="p-4 flex space-x-2 overflow-x-auto">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                index === currentImageIndex ? "border-blue-500" : "border-gray-200"
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

      {/* Property Details */}
      <div className="p-6 space-y-6 overflow-y-auto pb-20" style={{ height: "calc(100vh - 80px)" }}>
        {/* Header Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location}</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-4">{property.price}</div>
        </div>

        {/* Key Features */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-1">
            <Bed className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{property.area}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">{property.description}</p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Landlord/Agent Section */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Landlord/Agent</h3>
          <div className="flex items-center space-x-3">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{agent.name}</h4>
              <p className="text-sm text-gray-600">{agent.company}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Response: {agent.responseTime}</span>
                {agent.verified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Listing Agent Section */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Listing Agent</h3>
          <div className="flex items-center space-x-3">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{agent.name}</h4>
              <p className="text-sm text-gray-600">{agent.company}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Response: {agent.responseTime}</span>
                {agent.verified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">Experience: {agent.experience}</p>
                <p className="text-xs text-gray-500">Specializations: {agent.specializations.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">245</div>
            <div className="text-sm text-gray-500">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">18</div>
            <div className="text-sm text-gray-500">Inquiries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-500">Days Listed</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Message
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Book Inspection
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
