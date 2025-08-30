import React, { useState } from "react";
import { BottomNav } from "./NavigationBar";
import {
  MapPin,
  Home,
  Search,
  User,
  MessageCircle,
  Users,
  Heart,
  Star,
  Filter,
  SortAsc,
} from "lucide-react";
import { getFavoriteProperties } from "./data/properties.js";

const PropertyListPage = ({ setCurrentView }) => {
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [sortBy, setSortBy] = useState("price");

  // Get favorite properties from unified data source
  const favoriteProperties = getFavoriteProperties();

  const toggleLike = (propertyId) => {
    setLikedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  const sortedProperties = [...favoriteProperties].sort((a, b) => {
    switch (sortBy) {
      case "price":
        const priceA = parseInt(a.price.replace(/[$,]/g, ""));
        const priceB = parseInt(b.price.replace(/[$,]/g, ""));
        return priceA - priceB;
      case "rating":
        return b.rating - a.rating;
      case "bedrooms":
        return b.bedrooms - a.bedrooms;
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
                content: "You've successfully secured this property. Please proceed to sign the tenancy agreement.",
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
        {/* 固定聊天头部 */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
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

        {/* 可滚动的聊天内容 */}
        <div className="flex-1 pt-20 pb-20 p-4 space-y-4 overflow-y-auto">
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
      {/* 固定的Header */}
      <div className="fixed top-0 left-0 right-0 p-4 border-b border-gray-200 bg-white z-10">

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              My Favorites
            </h1>
            <p className="text-sm text-gray-500">
              {favoriteProperties.length} properties saved
            </p>
          </div>
          <button
            onClick={() => setCurrentView("home")}
            className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"
          >
            <Home className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {/* Sort and Filter Options */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="bedrooms">Sort by Bedrooms</option>
            </select>
          </div>
          <button className="p-2 border border-gray-200 rounded-lg">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      {/* 可滚动的Property Chat List */}
      <div className="flex-1 pt-28 pb-20 overflow-y-auto">
        {sortedProperties.length === 0 ? (
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
        ) : (
          sortedProperties.map((property) => (
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
          ))
        )}
      </div>

      {/* 固定的底部导航栏 */}

      <BottomNav currentView="property-list" setCurrentView={setCurrentView} />
    </div>
  );
};

export default PropertyListPage;
