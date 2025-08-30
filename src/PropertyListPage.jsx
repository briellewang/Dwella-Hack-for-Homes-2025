import React, { useState } from "react";
import {
  MapPin,
  Home,
  Search,
  User,
  MessageCircle,
  Users,
  Star,
  Filter,
  SortAsc,
  ArrowLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const PropertyChatPage = ({ setCurrentView }) => {
  const [sortBy, setSortBy] = useState("price");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // 房产数据
  const properties = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: "$550/week",
      location: "Northbridge, Perth",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      description: "Beautiful modern studio with great city views",
      features: ["5 min to subway", "24/7 security"],
      lastMessage: "New inspection time available",
      time: "2 min ago",
      unreadCount: 1,
      agent: {
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      title: "Cozy 2-Bedroom Loft",
      price: "$800/week",
      location: "Fremantle, Perth",
      bedrooms: 2,
      bathrooms: 1,
      area: "950 sq ft",
      description: "Charming loft with exposed brick walls",
      features: ["Exposed brick", "High ceilings"],
      lastMessage: "Congratulations! Contract ready",
      time: "1 hour ago",
      unreadCount: 2,
      agent: {
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Penthouse",
      price: "$2,125/week",
      location: "South Perth, Perth",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      description: "Stunning penthouse with panoramic city views",
      features: ["City views", "Doorman"],
      lastMessage: "Property still available",
      time: "3 hours ago",
      unreadCount: 0,
      agent: {
        name: "Isabella Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 4,
      title: "Bright 1-Bedroom Apartment",
      price: "$700/week",
      location: "Subiaco, Perth",
      bedrooms: 1,
      bathrooms: 1,
      area: "750 sq ft",
      description: "Sunny apartment with large windows",
      features: ["Large windows", "Private balcony"],
      lastMessage: "Property has been leased",
      time: "5 hours ago",
      unreadCount: 1,
      agent: {
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 5,
      title: "Spacious Family Townhouse",
      price: "$1,375/week",
      location: "Nedlands, Perth",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,200 sq ft",
      description: "Perfect family home with backyard",
      features: ["Backyard", "Garage"],
      lastMessage: "Awaiting Contract Signing",
      time: "1 day ago",
      unreadCount: 0,
      agent: {
        name: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
      }
    },
  ];

  const [propertyList, setPropertyList] = useState(properties);

  const timeSlots = [
    { id: 1, time: "14:00-14:30", available: true },
    { id: 2, time: "14:30-15:00", available: true },
    { id: 3, time: "15:00-15:30", available: false },
  ];

  const handleSwipeDelete = (propertyId) => {
    setPropertyList(prev => prev.filter(p => p.id !== propertyId));
  };

  const openPropertyChat = (property) => {
    setSelectedProperty(property);
  };

  const sortedProperties = [...propertyList].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, ""));
      case "rating":
        return b.rating - a.rating;
      case "area":
        return parseInt(b.area.replace(/[^\d]/g, "")) - parseInt(a.area.replace(/[^\d]/g, ""));
      default:
        return 0;
    }
  });

  // 聊天页面组件
  const ChatView = ({ property, onBack }) => {
    const getMessageContent = (propertyId) => {
      switch(propertyId) {
        case 1:
          return {
            title: "New Inspection Time Released",
            content: "The new inspection is scheduled for 10 September 2025.",
            showBooking: true,
            date: "10 September 2025",
            timeSlots: [
              { id: 1, time: "14:00-14:30", available: true },
              { id: 2, time: "14:30-15:00", available: true },
              { id: 3, time: "15:00-15:30", available: false },
            ]
          };
        case 2:
          return {
            messages: [
              {
                id: 1,
                title: "Congratulations!",
                content: "You’ve successfully secured this property. Please proceed to sign the tenancy agreement.",
                type: "text"
              },
              {
                id: 2,
                title: "Contract Document",
                content: "rental_contract_cozy_loft.pdf",
                type: "pdf"
              }
            ],
            showBooking: false,
            showTip: true,
            tip: "Unsure about any contract terms? Ask Dwella AI to protect your rights before proceeding."
          };
        case 3:
          return {
            title: "New Inspection Time Released",
            content: "The new inspection is scheduled for 20 September 2025.",
            showBooking: true,
            date: "20 September 2025",
            timeSlots: [
              { id: 1, time: "09:00-09:30", available: true },
              { id: 2, time: "09:30-10:00", available: true },
              { id: 3, time: "10:00-10:30", available: false },
            ]
          };
        case 4:
          return {
            title: "This property has been leased.",
            content: "Thank you for your interest. Please check our listings for other available properties.",
            showBooking: false,
            showClose: true
          };
        case 5:
          return {
            title: "Update:",
            content: "Another applicant has reached the contract signing stage for this property. Thank you for your interest — we will keep you informed if the property becomes available again.",
            showBooking: false,
            showClose: false
          };
        default:
          return {
            title: "New Inspection Time Released",
            content: "The new inspection is scheduled for 10 September 2025.",
            showBooking: true,
            date: "10 September 2025",
            timeSlots: [
              { id: 1, time: "14:00-14:30", available: true },
              { id: 2, time: "14:30-15:00", available: true },
              { id: 3, time: "15:00-15:30", available: false },
            ]
          };
      }
    };

    const messageData = getMessageContent(property.id);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* 聊天头部 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-3 p-1">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <img 
              src={property.agent.avatar} 
              alt={property.agent.name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">{property.agent.name}</h2>
              <p className="text-sm text-gray-500">{property.title} • {property.location}</p>
            </div>
          </div>
        </div>

        {/* 聊天内容 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* 系统消息 */}
          <div className="flex justify-center">
            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              Today
            </div>
          </div>

          {/* 渲染消息内容 */}
          {messageData.messages ? (
            // 多条消息 (case 2)
            <>
              {messageData.messages.map((message, index) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <img 
                    src={property.agent.avatar} 
                    alt={property.agent.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="bg-white p-4 rounded-2xl rounded-tl-md shadow-sm max-w-xs border">
                    <div className="font-semibold text-purple-600 mb-2">
                      {message.title}
                    </div>
                    {message.type === 'pdf' ? (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">PDF</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{message.content}</p>
                          <p className="text-xs text-gray-500">Tap to view</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 text-sm">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {/* Dwella AI 提示 */}
              {messageData.showTip && (
                <div className="flex justify-center px-4">
                  <p className="text-xs text-gray-400 text-center max-w-xs">
                    {messageData.tip}
                  </p>
                </div>
              )}
            </>
          ) : (
            // 单条消息 (其他cases)
            <div className="flex items-start space-x-3">
              <img 
                src={property.agent.avatar} 
                alt={property.agent.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-white p-4 rounded-2xl rounded-tl-md shadow-sm max-w-xs border">
                <div className="font-semibold text-purple-600 mb-2">
                  {messageData.title}
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  {messageData.content}
                </p>
                {/* Booking 或 Close 按钮在消息内 */}
                {messageData.showBooking && (
                  <button
                    onClick={() => {
                      setSelectedProperty({...property, messageData});
                      setShowBooking(true);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold w-full"
                  >
                    Booking
                  </button>
                )}
                {messageData.showClose && (
                  <button
                    onClick={onBack}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-semibold w-full"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 预约时间选择弹窗
  const BookingModal = () => {
    const currentTimeSlots = selectedProperty?.messageData?.timeSlots || timeSlots;
    const currentDate = selectedProperty?.messageData?.date || "10 September 2025";
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
        <div className="bg-white rounded-t-3xl w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Select Time Slot</h3>
            <button
              onClick={() => setShowBooking(false)}
              className="text-gray-400 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-600">{currentDate}</span>
            </div>

            {currentTimeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                disabled={!slot.available}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-colors ${
                  selectedTimeSlot === slot.time
                    ? "border-purple-600 bg-purple-50"
                    : slot.available
                    ? "border-gray-200 bg-white hover:border-purple-300"
                    : "border-gray-100 bg-gray-50 text-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{slot.time}</span>
                  {!slot.available && (
                    <span className="text-sm text-red-500">Not Available</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (selectedTimeSlot) {
                alert(`Booked for ${selectedTimeSlot} on ${currentDate}`);
                setShowBooking(false);
                setSelectedTimeSlot("");
              }
            }}
            disabled={!selectedTimeSlot}
            className={`w-full py-4 rounded-2xl font-semibold mt-6 ${
              selectedTimeSlot
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    );
  };

  // 底部导航组件
  const BottomNav = ({ currentView, setCurrentView }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
            currentView === "home" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">Discover</span>
        </button>
        <button
          onClick={() => setCurrentView("property-list")}
          className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
            currentView === "property-list" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("llm-input")}
          className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
            currentView === "llm-input" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-xs">AI Search</span>
        </button>
        <button
          onClick={() => setCurrentView("forum")}
          className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
            currentView === "forum" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("profile")}
          className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
            currentView === "profile" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );

  // 如果选中了房产，显示聊天页面
  if (selectedProperty) {
    return (
      <>
        <ChatView 
          property={selectedProperty} 
          onBack={() => setSelectedProperty(null)} 
        />
        {showBooking && <BookingModal />}
        <BottomNav currentView="property-list" setCurrentView={setCurrentView} />
      </>
    );
  }

  // 主列表页面
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Property Chats</h1>
        </div>

        {/* Sort Options */}
        <div className="flex space-x-2">
          {[
            { key: "price", label: "Price" },
            { key: "rating", label: "Bedrooms" },
            { key: "area", label: "Size" },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={`px-3 py-1 rounded-full text-sm ${
                sortBy === option.key
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Chat List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {sortedProperties.map((property) => (
          <div key={property.id} className="relative overflow-hidden">
            {/* 右划删除背景 */}
            <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-6 bg-red-500 w-20">
              <span className="text-white font-semibold text-sm">Delete</span>
            </div>
            
            {/* 聊天框 */}
            <div
              className="bg-white border-b border-gray-100 p-4 relative z-10 transform transition-transform duration-200 cursor-pointer"
              onClick={() => openPropertyChat(property)}
              style={{
                transform: `translateX(0px)`,
                transition: 'transform 0.3s ease'
              }}
              onTouchStart={(e) => {
                const startX = e.touches[0].clientX;
                const startTime = Date.now();
                let currentTranslateX = 0;
                
                const handleTouchMove = (moveEvent) => {
                  const currentX = moveEvent.touches[0].clientX;
                  const diff = startX - currentX;
                  
                  if (diff > 0 && diff <= 80) {
                    currentTranslateX = -diff;
                    e.currentTarget.style.transform = `translateX(${currentTranslateX}px)`;
                  }
                };
                
                const handleTouchEnd = () => {
                  const endTime = Date.now();
                  const timeDiff = endTime - startTime;
                  
                  if (Math.abs(currentTranslateX) > 40 || (Math.abs(currentTranslateX) > 20 && timeDiff < 300)) {
                    // 删除操作
                    e.currentTarget.style.transform = `translateX(-100%)`;
                    setTimeout(() => {
                      handleSwipeDelete(property.id);
                    }, 300);
                  } else {
                    // 恢复原位
                    e.currentTarget.style.transform = `translateX(0px)`;
                  }
                  
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
              }}
            >
              <div className="flex items-start space-x-3">
                {/* 头像/图标 */}
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {property.unreadCount > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {property.unreadCount}
                        </div>
                      )}
                      <span className="text-xs text-gray-400">{property.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-2 text-xs text-gray-500">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.area}</span>
                    </div>
                    <div className="text-sm font-bold text-purple-600">
                      {property.price}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {property.description}
                  </p>

                  {/* Features */}
                  <div className="flex space-x-1 mb-2">
                    {property.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 最后消息 */}
                  <p className={`text-sm truncate ${
                    property.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'
                  }`}>
                    {property.lastMessage}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedProperties.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No property chats yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start browsing to connect with landlords
            </p>
            <button
              onClick={() => setCurrentView("home")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Start Browsing
            </button>
          </div>
        </div>
      )}

      <BottomNav currentView="property-list" setCurrentView={setCurrentView} />
    </div>
  );
};

export default PropertyChatPage;