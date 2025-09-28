import { useState } from "react";
import { Map, Users, User } from "lucide-react";
import MapScreen from "./MapScreen";
import SocialScreen from "./SocialScreen";
import ProfileScreen from "./ProfileScreen";

type TabType = "map" | "social" | "profile";

const GameLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("map");

  const tabs = [
    { id: "map" as TabType, label: "Map", icon: Map },
    { id: "social" as TabType, label: "Social", icon: Users },
    { id: "profile" as TabType, label: "Profile", icon: User },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "map":
        return <MapScreen />;
      case "social":
        return <SocialScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <MapScreen />;
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {renderActiveScreen()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`nav-button ${activeTab === id ? "active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default GameLayout;