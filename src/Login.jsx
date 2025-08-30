import React from 'react';
import { Home } from 'lucide-react';

const LoginPage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dwella</h1>
          <p className="text-gray-600">Find Your Place Faster</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <input 
            type="text" 
            placeholder="Email or Phone" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setCurrentView('home')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={() => setCurrentView('user-signup')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-4">
          <button 
            onClick={() => setCurrentView('landlord-login')}
            className="text-purple-600 text-sm font-semibold"
          >
            Landlord Portal →
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing in you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;