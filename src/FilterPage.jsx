import React from "react";
import { ArrowLeft } from "lucide-react";

const FilterPage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button onClick={() => setCurrentView("home")} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold flex-1">Filters</h1>
        <button className="text-purple-600 font-semibold">Reset</button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min price"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max price"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Bedrooms</h3>
          <div className="grid grid-cols-4 gap-3">
            {["1", "2", "3", "4+"].map((bedroom) => (
              <button
                key={bedroom}
                className="p-3 border border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50"
              >
                {bedroom}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Location</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Manhattan",
              "Brooklyn",
              "Queens",
              "Bronx",
              "Staten Island",
              "All NYC",
            ].map((area) => (
              <button
                key={area}
                className="p-3 border border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Property Type</h3>
          <div className="space-y-2">
            {["Apartment", "House", "Condo", "Studio"].map((type) => (
              <label key={type} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "WiFi",
              "Parking",
              "Gym",
              "Pool",
              "Pet Friendly",
              "Laundry",
              "Air Conditioning",
              "Balcony",
            ].map((amenity) => (
              <label key={amenity} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => setCurrentView("home")}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPage;
