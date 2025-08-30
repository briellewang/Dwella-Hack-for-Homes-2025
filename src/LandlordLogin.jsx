import React from "react";
import { Users, Home } from "lucide-react";

const LandlordLoginPage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dwella Landlord
          </h1>
          <p className="text-gray-600">Manage your properties</p>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Landlord Email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setCurrentView("landlord-home")}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Sign In as Landlord
          </button>
          <button 
            onClick={() => setCurrentView("landlord-signup")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
          >
            Create Landlord Account
          </button>
        </div>

        <div className="text-center space-y-3">
          <button
            onClick={() => setCurrentView("login")}
            className="text-indigo-600 text-sm font-semibold flex items-center justify-center mx-auto"
          >
            <Home className="w-4 h-4 mr-1" />
            Back to Tenant Login
          </button>

          <div className="text-xs text-gray-500">
            <p>Landlord benefits:</p>
            <ul className="mt-2 space-y-1">
              <li>• Reach verified tenants</li>
              <li>• Manage applications easily</li>
              <li>• Track property performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordLoginPage;
