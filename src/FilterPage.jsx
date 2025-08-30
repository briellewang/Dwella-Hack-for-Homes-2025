import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const FilterPage = ({ setCurrentView }) => {
  // 价格范围状态
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: ""
  });

  // 卧室数量状态
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);

  // 位置状态
  const [selectedLocations, setSelectedLocations] = useState([]);

  // 物业类型状态
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);

  // 便利设施状态
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const locations = [
    "Perth CBD",
    "Northbridge",
    "Subiaco",
    "Leederville",
    "Mount Lawley",
    "East Perth",
    "West Perth",
    "South Perth",
    "Victoria Park",
    "Cottesloe",
    "Fremantle",
    "Nedlands",
    "Claremont",
    "Scarborough",
    "Hillarys",
    "Joondalup",
    "All Perth"
  ];

  const propertyTypes = ["Apartment", "House", "Condo", "Studio"];
  
  const amenities = [
    "WiFi",
    "Parking",
    "Gym",
    "Pool",
    "Pet Friendly",
    "Laundry",
    "Air Conditioning",
    "Balcony"
  ];

  // 处理卧室选择
  const handleBedroomClick = (bedroom) => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom));
    } else {
      setSelectedBedrooms([...selectedBedrooms, bedroom]);
    }
  };

  // 处理位置选择
  const handleLocationClick = (location) => {
    if (location === "All Perth") {
      if (selectedLocations.length === locations.length - 1) {
        setSelectedLocations([]);
      } else {
        setSelectedLocations(locations.filter(loc => loc !== "All Perth"));
      }
    } else {
      if (selectedLocations.includes(location)) {
        setSelectedLocations(selectedLocations.filter(loc => loc !== location));
      } else {
        setSelectedLocations([...selectedLocations, location]);
      }
    }
  };

  // 处理物业类型选择
  const handlePropertyTypeChange = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  // 处理便利设施选择
  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // 检查位置是否选中
  const isLocationSelected = (location) => {
    if (location === "All Perth") {
      return selectedLocations.length === locations.length - 1;
    }
    return selectedLocations.includes(location);
  };

  // 重置所有过滤器
  const handleReset = () => {
    setPriceRange({ min: "", max: "" });
    setSelectedBedrooms([]);
    setSelectedLocations([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
  };

  // 应用过滤器
  const handleApply = () => {
    const filters = {
      priceRange,
      bedrooms: selectedBedrooms,
      locations: selectedLocations,
      propertyTypes: selectedPropertyTypes,
      amenities: selectedAmenities
    };
    
    // 在这里可以将过滤器传递给父组件或存储在状态中
    console.log("Applied filters:", filters);
    
    // 显示成功消息（可选）
    alert(`Filters applied! Found properties with your criteria.`);
    
    // 返回主页面
    setCurrentView("home");
  };

  // 计算活跃过滤器数量
  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceRange.min || priceRange.max) count++;
    if (selectedBedrooms.length > 0) count++;
    if (selectedLocations.length > 0) count++;
    if (selectedPropertyTypes.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center sticky top-0 bg-white z-10">
        <button onClick={() => setCurrentView("home")} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold flex-1">
          Filters {getActiveFiltersCount() > 0 && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
              {getActiveFiltersCount()}
            </span>
          )}
        </h1>
        <button 
          onClick={handleReset}
          className="text-purple-600 font-semibold"
        >
          Reset
        </button>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* 价格范围 */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          {(priceRange.min || priceRange.max) && (
            <div className="mt-2 text-sm text-gray-600">
              Price range: ${priceRange.min || '0'} - ${priceRange.max || '∞'} per week
            </div>
          )}
        </div>

        {/* 卧室数量 */}
        <div>
          <h3 className="font-semibold mb-3">
            Bedrooms 
            {selectedBedrooms.length > 0 && (
              <span className="ml-2 text-sm text-purple-600">
                ({selectedBedrooms.length} selected)
              </span>
            )}
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {["1", "2", "3", "4+"].map((bedroom) => (
              <button
                key={bedroom}
                onClick={() => handleBedroomClick(bedroom)}
                className={`p-3 border rounded-lg text-center transition-all ${
                  selectedBedrooms.includes(bedroom)
                    ? "border-purple-500 bg-purple-100 text-purple-700 font-medium"
                    : "border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                }`}
              >
                {bedroom}
                {selectedBedrooms.includes(bedroom) && (
                  <span className="ml-1 text-purple-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 位置 */}
        <div>
          <h3 className="font-semibold mb-3">
            Location
            {selectedLocations.length > 0 && (
              <span className="ml-2 text-sm text-purple-600">
                ({selectedLocations.length} selected)
              </span>
            )}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locations.map((area) => (
              <button
                key={area}
                onClick={() => handleLocationClick(area)}
                className={`p-3 border rounded-lg text-center transition-all text-sm ${
                  isLocationSelected(area)
                    ? "border-purple-500 bg-purple-100 text-purple-700 font-medium"
                    : "border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                }`}
              >
                {area}
                {isLocationSelected(area) && (
                  <span className="ml-1 text-purple-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 物业类型 */}
        <div>
          <h3 className="font-semibold mb-3">
            Property Type
            {selectedPropertyTypes.length > 0 && (
              <span className="ml-2 text-sm text-purple-600">
                ({selectedPropertyTypes.length} selected)
              </span>
            )}
          </h3>
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPropertyTypes.includes(type)}
                  onChange={() => handlePropertyTypeChange(type)}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="flex-1">{type}</span>
                {selectedPropertyTypes.includes(type) && (
                  <span className="text-purple-500 text-sm">✓</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* 便利设施 */}
        <div>
          <h3 className="font-semibold mb-3">
            Amenities
            {selectedAmenities.length > 0 && (
              <span className="ml-2 text-sm text-purple-600">
                ({selectedAmenities.length} selected)
              </span>
            )}
          </h3>
          <div className="space-y-3">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="flex-1">{amenity}</span>
                {selectedAmenities.includes(amenity) && (
                  <span className="text-purple-500 text-sm">✓</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* 应用过滤器的摘要 */}
        {getActiveFiltersCount() > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Filter Summary</h4>
            <div className="space-y-1 text-sm text-purple-700">
              {(priceRange.min || priceRange.max) && (
                <div>• Price: ${priceRange.min || '0'} - ${priceRange.max || '∞'}/week</div>
              )}
              {selectedBedrooms.length > 0 && (
                <div>• Bedrooms: {selectedBedrooms.join(', ')}</div>
              )}
              {selectedLocations.length > 0 && (
                <div>• Locations: {selectedLocations.slice(0, 3).join(', ')}{selectedLocations.length > 3 && ` +${selectedLocations.length - 3} more`}</div>
              )}
              {selectedPropertyTypes.length > 0 && (
                <div>• Types: {selectedPropertyTypes.join(', ')}</div>
              )}
              {selectedAmenities.length > 0 && (
                <div>• Amenities: {selectedAmenities.slice(0, 3).join(', ')}{selectedAmenities.length > 3 && ` +${selectedAmenities.length - 3} more`}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部应用按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentView("home")}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              getActiveFiltersCount() > 0
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={getActiveFiltersCount() === 0}
          >
            Apply Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;