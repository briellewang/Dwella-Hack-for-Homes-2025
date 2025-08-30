import React, { useState } from "react";
import {
  Edit,
  MapPin,
  Eye,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Home,
  User,
} from "lucide-react";
import { getLandlordProperties } from "/src/data/properties.js";

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
        <button
          className={`flex flex-col items-center py-2 px-4 text-gray-400`}
        >
          <MessageSquare className="w-6 h-6 mb-1" />
          <span className="text-xs">Applications</span>
        </button>
        <button
          className={`flex flex-col items-center py-2 px-4 text-gray-400`}
        >
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-xs">Schedule</span>
        </button>
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

  // Get properties for landlord view
  const properties = getLandlordProperties();

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
          <button
            onClick={() => setCurrentView("add-property")}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Edit className="w-6 h-6" />
          </button>
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

          <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow">
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
