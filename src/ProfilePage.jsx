import React from "react";
import {
  Settings,
  Heart,
  Clock,
  FileText,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Award,
  Home,
  Search,
  User,
  MessageCircle,
  Users,
} from "lucide-react";

const ProfilePage = ({ setCurrentView }) => {
  // Bottom Navigation Component (适配手机app容器)
  const BottomNav = ({ currentView, setCurrentView }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "home" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Discover</span>
        </button>
        <button
          onClick={() => setCurrentView("property-list")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "property-list"
              ? "text-purple-600"
              : "text-gray-400"
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Browse</span>
        </button>
        <button
          onClick={() => setCurrentView("llm-input")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "llm-input" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">AI Search</span>
        </button>
        <button
          onClick={() => setCurrentView("forum")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "forum" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <Users className="w-5 h-5 mb-1" />
          <span className="text-xs">Forum</span>
        </button>
        <button
          onClick={() => setCurrentView("profile")}
          className={`flex flex-col items-center py-2 px-2 ${
            currentView === "profile" ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-sm bg-white shadow-2xl relative overflow-hidden" style={{ height: '100vh' }}>
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              A
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Alex Johnson</h2>
              <p className="text-white/80">Member since March 2024</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-3">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
                  <span className="text-sm">4.8 rating</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-green-300 mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Activity Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">24</div>
                <div className="text-xs text-gray-500">Properties Liked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-xs text-gray-500">Properties Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-xs text-gray-500">Applications Sent</div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone Number</span>
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">alex@example.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Location Preference</span>
                <span className="font-medium">Brooklyn, NYC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Budget Range</span>
                <span className="font-medium">$1,500 - $2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Verification Status</span>
                <span className="text-green-500 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* My Activity */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">My Activity</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-pink-500 mr-3" />
                  <span>Saved Properties</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">8 items</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Application History</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">3 active</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-green-500 mr-3" />
                  <span>Documents</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">5 uploaded</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Account Settings</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView("landlord-login")}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-indigo-500 mr-3" />
                  <span>Switch to Landlord Mode</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-orange-500 mr-3" />
                  <span>Notification Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-purple-500 mr-3" />
                  <span>Preferences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Terms of Service</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Liked "Modern Studio Apartment"
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Applied to "Cozy 2-Bedroom"
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Settings className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Updated search preferences
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="bg-white rounded-2xl p-4">
            <button
              onClick={() => setCurrentView("login")}
              className="w-full flex items-center justify-center py-3 text-red-500 font-semibold hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        <BottomNav currentView="profile" setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default ProfilePage;
