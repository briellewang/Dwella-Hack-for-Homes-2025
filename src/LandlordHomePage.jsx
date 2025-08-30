import React, { useState } from "react";
import {
  Edit,
  MapPin,
  Eye,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Users,
  Home,
  User,
} from "lucide-react";
import { getLandlordProperties } from "./data/properties.js";

const LandlordHomePage = ({ setCurrentView }) => {
  const [showApplications, setShowApplications] = useState(false);

  // Applications data
  const applications = [
    {
      id: 1,
      applicantName: "Jessica Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      propertyTitle: "Modern Studio Apartment",
      applicationDate: "2 days ago",
      status: "pending",
    },
    {
      id: 2,
      applicantName: "Michael Roberts",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      propertyTitle: "Bright 1-Bedroom Apartment",
      applicationDate: "3 days ago",
      status: "pending",
    },
    {
      id: 3,
      applicantName: "Emily Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      propertyTitle: "Luxury 3-Bedroom Penthouse",
      applicationDate: "5 days ago",
      status: "pending",
    },
    {
      id: 4,
      applicantName: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      propertyTitle: "Modern Studio Apartment",
      applicationDate: "1 week ago",
      status: "pending",
    },
  ];

  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );

  // Applications List Component
  const ApplicationsList = ({ applications, onBack }) => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-semibold">
            Applications ({pendingApplications.length})
          </h1>
        </div>
      </div>

      {/* Applications List */}
      <div className="p-4 space-y-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={application.avatar}
                alt={application.applicantName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {application.applicantName}
                </h3>
                <p className="text-sm text-gray-600">
                  Applied for: {application.propertyTitle}
                </p>
                <p className="text-xs text-gray-500">
                  {application.applicationDate}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Accept
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LandlordBottomNav = ({ currentView, setCurrentView }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button
          onClick={() => setCurrentView("landlord-home")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "landlord-home"
              ? "text-indigo-600"
              : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Properties</span>
        </button>
        <button
          onClick={() => setCurrentView("add-property")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "add-property" ? "text-indigo-600" : "text-gray-400"
          }`}
        >
          <Edit className="w-6 h-6 mb-1" />
          <span className="text-xs">Add Property</span>
        </button>
        {/*
        <button
          onClick={() => setShowApplications(true)}
          className={`flex flex-col items-center py-2 px-4 text-gray-400`}
        >
          <MessageSquare className="w-6 h-6 mb-1" />
          <span className="text-xs">Applications</span>
        </button>
        */}
        <button
          onClick={() => setCurrentView("landlord-profile")}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === "landlord-profile"
              ? "text-indigo-600"
              : "text-gray-400"
          }`}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );

  // Updated property data matching the Property Chat data
  const properties = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: "$550/week",
      location: "Northbridge, Perth",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      description: "Beautiful modern studio with great city views",
      features: ["5 min to subway", "24/7 security"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      status: "available",
      tenant: null,
      views: 245,
      inquiries: 18,
      weeklyRevenue: 1375,
    },
    {
      id: 2,
      title: "Cozy 2-Bedroom Loft",
      price: "$800/week",
      location: "Fremantle, Perth",
      bedrooms: 2,
      bathrooms: 1,
      area: "950 sq ft",
      description: "Charming loft with exposed brick walls",
      features: ["Exposed brick", "High ceilings"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      ],
      status: "rented",
      tenant: "Josh Wang",
      views: 156,
      inquiries: 12,
      weeklyRevenue: 800,
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Penthouse",
      price: "$2,125/week",
      location: "South Perth, Perth",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      description: "Stunning penthouse with panoramic city views",
      features: ["City views", "Doorman"],
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      ],
      status: "available",
      tenant: null,
      views: 892,
      inquiries: 45,
      weeklyRevenue: 0,
    },
    {
      id: 4,
      title: "Bright 1-Bedroom Apartment",
      price: "$700/week",
      location: "Subiaco, Perth",
      bedrooms: 1,
      bathrooms: 1,
      area: "750 sq ft",
      description: "Sunny apartment with large windows",
      features: ["Large windows", "Private balcony"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      status: "available",
      tenant: null,
      views: 203,
      inquiries: 8,
      weeklyRevenue: 0,
    },
    {
      id: 5,
      title: "Spacious Family Townhouse",
      price: "$1,375/week",
      location: "Nedlands, Perth",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,200 sq ft",
      description: "Perfect family home with backyard",
      features: ["Backyard", "Garage"],
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      ],
      status: "rented",
      tenant: "Fiona&Amber&Brielle&Siqi",
      views: 634,
      inquiries: 28,
      weeklyRevenue: 1375,
    },
  ];

  const totalRevenue = properties.reduce(
    (sum, property) => sum + property.monthlyRevenue,
    0
  );
  const rentedProperties = properties.filter(
    (p) => p.status === "rented"
  ).length;
  const availableProperties = properties.filter(
    (p) => p.status === "available"
  ).length;

  // Show applications list if requested
  if (showApplications) {
    return (
      <ApplicationsList
        applications={pendingApplications}
        onBack={() => setShowApplications(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Property Dashboard</h1>
            <p className="text-white/80 mt-1">
              {properties.length} properties • {rentedProperties} rented
            </p>
          </div>
          {/* Quick Actions 
          <button
            onClick={() => setCurrentView("add-property")}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Edit className="w-6 h-6" />
          </button>
          */}
        </div>
          
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-white/80">Published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{rentedProperties}</div>
            <div className="text-sm text-white/80">Occupied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{availableProperties}</div>
            <div className="text-sm text-white/80">Available</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setCurrentView("add-property")}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Edit className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Add Property</div>
              <div className="text-xs text-gray-500">List new rental</div>
            </div>
          </button>

          <button
            onClick={() => setShowApplications(true)}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Applications</div>
              <div className="text-xs text-red-500">3 pending</div>
            </div>
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Properties
          </h2>
          <button className="text-indigo-600 text-sm font-semibold">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
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
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.status === "rented"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {property.status === "rented" ? "Rented" : "Available"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold text-indigo-600">
                      {property.price}
                    </div>
                    <div className="flex space-x-3 text-xs text-gray-500">
                      <span>
                        {property.bedrooms} bed • {property.bathrooms} bath
                      </span>
                      <span>{property.area}</span>
                    </div>
                  </div>

                  {property.status === "rented" && property.tenant && (
                    <div className="mb-3 p-2 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-green-700">
                          Tenant: {property.tenant}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {property.views} views
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {property.inquiries} inquiries
                      </span>
                    </div>

                    {property.status === "rented" && (
                      <div className="flex items-center text-xs text-green-600">
                        <DollarSign className="w-3 h-3 mr-1" />
                        <span>${property.monthlyRevenue}/month</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                      Edit Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LandlordBottomNav
        currentView="landlord-home"
        setCurrentView={setCurrentView}
      />
    </div>
  );
};

export default LandlordHomePage;
