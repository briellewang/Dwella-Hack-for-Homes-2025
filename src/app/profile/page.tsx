'use client';

import React from 'react';
import { Settings, Edit, Heart, MapPin, Calendar, Mail, Phone } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-500">Student at UWA</p>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <MapPin size={14} className="mr-1" />
              Perth, WA
            </div>
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Edit size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mt-4 px-4 py-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-500">12</div>
            <div className="text-sm text-gray-500">Properties Liked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">5</div>
            <div className="text-sm text-gray-500">Matches</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">3</div>
            <div className="text-sm text-gray-500">Visits</div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white mt-4 px-4 py-4">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Budget Range</span>
            <span className="font-medium">$200 - $400/week</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">Near UWA</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Room Type</span>
            <span className="font-medium">Studio/1BR</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Pet Friendly</span>
            <span className="font-medium text-green-500">Yes</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white mt-4 px-4 py-4">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-gray-400" />
            <span>john.doe@email.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-gray-400" />
            <span>+61 4XX XXX XXX</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 space-y-3">
        <button className="w-full bg-pink-500 text-white py-3 px-4 rounded-full font-semibold hover:bg-pink-600 transition-colors">
          Edit Profile
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors">
          View My Matches
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors">
          Settings
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
