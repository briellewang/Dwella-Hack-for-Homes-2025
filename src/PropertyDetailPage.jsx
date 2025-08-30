import React from "react";
import { ArrowLeft, MapPin, Bed, Bath, Square, Star } from "lucide-react";

const PropertyDetailPage = ({ setCurrentView }) => {
  // Sample property data
  const property = {
    id: 1,
    title: "Modern Studio Apartment",
    price: "$1,200/month",
    location: "Manhattan, NYC",
    bedrooms: 1,
    bathrooms: 1,
    area: "450 sq ft",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ],
    description:
      "Beautiful modern studio in the heart of Manhattan with great transportation links. This apartment features high ceilings, large windows, and updated appliances. Perfect for young professionals.",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <img
          src={property.images[0]}
          alt="Property"
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => setCurrentView("home")}
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 pb-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {property.price}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Bed className="w-6 h-6 mx-auto mb-1 text-gray-600" />
            <div className="font-semibold">{property.bedrooms} bed</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Bath className="w-6 h-6 mx-auto mb-1 text-gray-600" />
            <div className="font-semibold">{property.bathrooms} bath</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Square className="w-6 h-6 mx-auto mb-1 text-gray-600" />
            <div className="font-semibold">{property.area}</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "WiFi Included",
              "Parking Available",
              "Gym Access",
              "Rooftop Deck",
              "Pet Friendly",
              "In-unit Laundry",
              "Air Conditioning",
              "Dishwasher",
            ].map((amenity) => (
              <div
                key={amenity}
                className="flex items-center text-sm text-gray-600"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Location Highlights</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subway Station</span>
              <span className="font-medium">2 min walk</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Grocery Store</span>
              <span className="font-medium">1 block away</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Central Park</span>
              <span className="font-medium">10 min walk</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Coffee Shop</span>
              <span className="font-medium">Next door</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Landlord</h3>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
              J
            </div>
            <div className="flex-1">
              <div className="font-semibold">John Smith</div>
              <div className="text-sm text-gray-500 flex items-center">
                <span>Verified Landlord</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs">4.9 (127 reviews)</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Usually responds within 1 hour
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Lease Terms</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available From</span>
              <span className="font-medium">Immediately</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Lease Duration</span>
              <span className="font-medium">12 months minimum</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-medium">$1,200</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pets</span>
              <span className="font-medium text-green-600">Allowed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold">
            Save Property
          </button>
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold">
            Contact Landlord
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
