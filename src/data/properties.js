// Unified property data source for the entire application
export const properties = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    price: "$550/week",
    location: "Northbridge, Perth",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq ft",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    ],
    description:
      "Beautiful modern studio with great city views and excellent transportation links.",
    features: ["5 min to subway", "24/7 security", "Free WiFi", "Gym access"],
    tags: ["Near Subway", "24/7 Security", "Gym", "WiFi"],
    amenities: "AC, Washing Machine, Refrigerator, Microwave",
    surroundings: "Near subway station, shopping center, restaurants",
    terms: "2 months deposit, minimum 6 months lease",
    rating: 4.8,
    isLiked: true,
    // Landlord specific data
    status: "rented",
    tenant: "Sarah Johnson",
    views: 245,
    inquiries: 18,
    monthlyRevenue: 2200,
  },
  {
    id: 2,
    title: "Cozy 2-Bedroom Loft",
    price: "$800/week",
    location: "Fremantle, Perth",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq ft",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ],
    description:
      "Charming loft with exposed brick walls and industrial design elements.",
    features: [
      "Exposed brick",
      "High ceilings",
      "Parking space",
      "Pet friendly",
    ],
    tags: ["Pet Friendly", "Parking", "High Ceilings", "Industrial Style"],
    amenities: "AC, Washing Machine, Dryer, Dishwasher",
    surroundings: "Near parks, cafes, art district",
    terms: "1.5 months deposit, minimum 12 months lease",
    rating: 4.6,
    isLiked: true,
    // Landlord specific data
    status: "available",
    tenant: null,
    views: 156,
    inquiries: 12,
    monthlyRevenue: 0,
  },
  {
    id: 3,
    title: "Luxury 3-Bedroom Penthouse",
    price: "$2,125/week",
    location: "South Perth, Perth",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    ],
    description:
      "Stunning penthouse with panoramic city views and premium amenities.",
    features: ["City views", "Doorman", "Gym", "Pool", "Rooftop access"],
    tags: ["City View", "Doorman", "Pool", "Rooftop Garden", "Luxury"],
    amenities: "AC, Washing Machine, Dryer, Dishwasher, Oven, Microwave",
    surroundings: "Near luxury shops, fine dining, Central Park",
    terms: "3 months deposit, minimum 24 months lease",
    rating: 4.9,
    isLiked: true,
    // Landlord specific data
    status: "rented",
    tenant: "Mike & Lisa Chen",
    views: 892,
    inquiries: 45,
    monthlyRevenue: 8500,
  },
  {
    id: 4,
    title: "Bright 1-Bedroom Apartment",
    price: "$700/week",
    location: "Subiaco, Perth",
    bedrooms: 1,
    bathrooms: 1,
    area: "750 sq ft",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    ],
    description:
      "Sunny apartment with large windows and modern kitchen appliances.",
    features: [
      "Large windows",
      "Private balcony",
      "Smart locks",
      "Laundry in unit",
    ],
    tags: ["Large Windows", "Private Balcony", "Smart Lock", "In-Unit Laundry"],
    amenities: "AC, Washing Machine, Dryer, Dishwasher, Microwave",
    surroundings: "Near schools, supermarkets, bus stops",
    terms: "2 months deposit, minimum 6 months lease",
    rating: 4.5,
    isLiked: true,
    // Landlord specific data
    status: "available",
    tenant: null,
    views: 203,
    inquiries: 8,
    monthlyRevenue: 0,
  },
  {
    id: 5,
    title: "Spacious Family Townhouse",
    price: "$1,375/week",
    location: "Nedlands, Perth",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,200 sq ft",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    ],
    description:
      "Perfect family home with backyard, garage, and quiet neighborhood.",
    features: ["Backyard", "Garage", "Quiet street", "Good schools nearby"],
    tags: ["Backyard", "Garage", "Quiet Street", "Good Schools"],
    amenities: "AC, Washing Machine, Dryer, Dishwasher, Oven, Microwave",
    surroundings: "Near schools, parks, shopping centers",
    terms: "2 months deposit, minimum 12 months lease",
    rating: 4.7,
    isLiked: true,
    // Landlord specific data
    status: "rented",
    tenant: "The Rodriguez Family",
    views: 634,
    inquiries: 28,
    monthlyRevenue: 5500,
  },
];

// Utility functions for working with property data
export const getDataRanges = () => {
  const prices = properties.map((p) => extractPrice(p.price));
  const bedrooms = properties.map((p) => p.bedrooms);
  const locations = [...new Set(properties.map((p) => p.location))];

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    availableBedrooms: [...new Set(bedrooms)].sort(),
    availableLocations: locations,
  };
};

export const extractPrice = (priceString) => {
  const match = priceString.match(/\$([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, "")) : 0;
};

export const parsePriceRequirement = (query) => {
  // Match prices like $3000, $2,500, under $3000, etc.
  const priceRegex =
    /(?:under|below|less than|maximum|max|up to)\s*\$?(\d{1,4}(?:,\d{3})*)/i;
  const match = query.match(priceRegex);
  if (match) {
    return parseInt(match[1].replace(/,/g, ""));
  }

  // Match budget/price patterns
  const budgetRegex = /(?:budget|price).*?\$?(\d{1,4}(?:,\d{3})*)/i;
  const budgetMatch = query.match(budgetRegex);
  if (budgetMatch) {
    return parseInt(budgetMatch[1].replace(/,/g, ""));
  }

  // Match standalone prices like $3000
  const standaloneRegex = /\$(\d{1,4}(?:,\d{3})*)/i;
  const standaloneMatch = query.match(standaloneRegex);
  if (standaloneMatch) {
    return parseInt(standaloneMatch[1].replace(/,/g, ""));
  }

  return null;
};

export const parseBedroomRequirement = (query) => {
  if (query.includes("studio") || query.includes("0-bedroom")) return 0;
  if (query.includes("1-bedroom") || query.includes("one bedroom")) return 1;
  if (query.includes("2-bedroom") || query.includes("two bedroom")) return 2;
  if (query.includes("3-bedroom") || query.includes("three bedroom")) return 3;
  if (query.includes("4-bedroom") || query.includes("four bedroom")) return 4;
  return null;
};

export const filterProperties = (criteria) => {
  const query = criteria.query.toLowerCase();
  const dataRanges = getDataRanges();
  let filtered = [...properties];
  let unmetRequirements = [];

  // Parse price requirement
  const maxPrice = parsePriceRequirement(query);
  if (maxPrice !== null) {
    if (maxPrice < dataRanges.minPrice) {
      unmetRequirements.push(
        `Your budget of $${maxPrice.toLocaleString()} is below our minimum price of $${dataRanges.minPrice.toLocaleString()}`
      );
    } else {
      filtered = filtered.filter((p) => extractPrice(p.price) <= maxPrice);
    }
  }

  // Parse bedroom requirement
  const requiredBedrooms = parseBedroomRequirement(query);
  if (requiredBedrooms !== null) {
    if (!dataRanges.availableBedrooms.includes(requiredBedrooms)) {
      unmetRequirements.push(
        `We don't have ${requiredBedrooms}-bedroom properties. Available: ${dataRanges.availableBedrooms.join(
          ", "
        )} bedrooms`
      );
    } else {
      filtered = filtered.filter((p) => p.bedrooms === requiredBedrooms);
    }
  }

  // Location filtering
  if (query.includes("brooklyn")) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes("brooklyn")
    );
  }
  if (query.includes("manhattan")) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes("manhattan")
    );
  }
  if (query.includes("queens")) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes("queens")
    );
  }
  if (query.includes("staten island")) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes("staten island")
    );
  }
  if (query.includes("upper east side")) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes("upper east side")
    );
  }

  // Amenity filtering (simulated)
  if (query.includes("pet") || query.includes("animal")) {
    filtered = filtered.filter((p) => p.id % 2 === 0); // Simulate pet-friendly
  }
  if (query.includes("balcony") || query.includes("outdoor")) {
    filtered = filtered.filter((p) => p.id % 3 === 0); // Simulate balcony
  }
  if (query.includes("gym") || query.includes("fitness")) {
    filtered = filtered.filter((p) => p.id % 4 === 0); // Simulate gym
  }

  return {
    filtered,
    unmetRequirements,
    dataRanges,
  };
};

// Get favorite properties (properties with isLiked: true)
export const getFavoriteProperties = () => {
  return properties.filter((p) => p.isLiked);
};

// Get properties for landlord view
export const getLandlordProperties = () => {
  return properties.map((p) => ({
    ...p,
    // Include landlord-specific fields
    status: p.status,
    tenant: p.tenant,
    views: p.views,
    inquiries: p.inquiries,
    monthlyRevenue: p.monthlyRevenue,
  }));
};
