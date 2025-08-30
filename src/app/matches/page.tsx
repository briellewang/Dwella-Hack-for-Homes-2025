'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Phone, MapPin } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { usePropertyStore } from '@/store/usePropertyStore';

export default function MatchesPage() {
  const { likedProperties } = usePropertyStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-center">My Matches</h1>
        <p className="text-center text-gray-500 mt-1">
          {likedProperties.length} properties liked
        </p>
      </div>

      {/* Matches */}
      <div className="px-4 py-4">
        {likedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h2>
            <p className="text-gray-500 mb-6">
              Start swiping to find your perfect home!
            </p>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {likedProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold">{property.title}</h3>
                    <p className="text-sm opacity-90">{property.location}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-pink-500">{property.price}</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={16} className="mr-1" />
                      {property.distance}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center">
                      <MessageCircle size={16} className="mr-2" />
                      Contact
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Phone size={16} className="mr-2" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
