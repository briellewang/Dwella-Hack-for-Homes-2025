import React from "react";
import { Home, User, Calendar } from "lucide-react";
import { Edit } from "lucide-react";

const LandlordProfilePage = ({ setCurrentView }) => {
  

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            L
          </div>
          <div>
            <h2 className="text-xl font-semibold">Landlord Name</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Property Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">5</div>
              <div className="text-sm text-gray-500">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-500">Rented</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Management Tools</h3>
          <div className="space-y-3">
            <button className="w-full flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
              <span>Tenant Liked</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                3 new
              </span>
            </button>
            <button className="w-full flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
              <span>Settings</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <button
            onClick={() => setCurrentView("login")}
            className="w-full text-red-500 text-center py-2"
          >
            Sign Out
          </button>
        </div>
      </div>

      <LandlordBottomNav
        currentView="landlord-profile"
        setCurrentView={setCurrentView}
      />
    </div>
  );
};

export default LandlordProfilePage;

