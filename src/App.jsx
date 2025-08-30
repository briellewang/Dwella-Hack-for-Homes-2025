import React, { useState } from "react";
import Login from "./Login";
import LandlordLogin from "./LandlordLogin";
import LandlordHomePage from "./LandlordHomePage";
import LandlordProfilePage from "./LandlordProfilePage";
import AddPropertyPage from "./AddPropertyPage";
import PropertyListPage from "./PropertyListPage";
import PropertyDetailPage from "./PropertyDetailPage";
import ProfilePage from "./ProfilePage";
import ForumPage from "./ForumPage";
import AISearchPage from "./AISearchPage";
import FilterPage from "./FilterPage";
import SwipeRight from "./SwipeRight";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return <Login setCurrentView={setCurrentView} />;
      case "landlord-login":
        return <LandlordLogin setCurrentView={setCurrentView} />;
      case "landlord-home":
        return <LandlordHomePage setCurrentView={setCurrentView} />;
      case "landlord-profile":
        return <LandlordProfilePage setCurrentView={setCurrentView} />;
      case "add-property":
        return <AddPropertyPage setCurrentView={setCurrentView} />;
      case "home":
        return <SwipeRight setCurrentView={setCurrentView} />;
      case "property-list":
        return <PropertyListPage setCurrentView={setCurrentView} />;
      case "property-detail":
        return <PropertyDetailPage propertyId={1} onBack={() => setCurrentView("property-list")} />;
      case "profile":
        return <ProfilePage setCurrentView={setCurrentView} />;
      case "forum":
        return <ForumPage setCurrentView={setCurrentView} />;
      case "llm-input":
        return <AISearchPage setCurrentView={setCurrentView} />;
      case "filter":
        return <FilterPage setCurrentView={setCurrentView} />;
      default:
        return <Login setCurrentView={setCurrentView} />;
    }
  };

  return <div className="App">{renderCurrentView()}</div>;
}

export default App;
