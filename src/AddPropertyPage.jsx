import React from "react";
import { ArrowLeft, Edit, Home, User, Calendar } from "lucide-react";

const AddPropertyPage = ({ setCurrentView }) => {
  // Landlord Bottom Navigation Component (inline)
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

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button
          onClick={() => setCurrentView("landlord-home")}
          className="mr-4"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold flex-1">Add New Property</h1>
        <button className="text-indigo-600 font-semibold">Save</button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Title
          </label>
          <input
            type="text"
            placeholder="e.g., Modern 2BR Apartment"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Rent
          </label>
          <input
            type="number"
            placeholder="e.g., 2000"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Full address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bedrooms
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bathrooms
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sq Ft
            </label>
            <input
              type="number"
              placeholder="e.g., 800"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe your property..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Photos
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Edit className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">Tap to upload photos</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => setCurrentView("landlord-home")}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-semibold"
        >
          Publish Property
        </button>
      </div>
    </div>
  );
};

export default AddPropertyPage;

