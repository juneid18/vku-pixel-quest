import { useState, useEffect } from "react";
import { Map, Users, User, Wifi, WifiOff, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MapScreen from "./MapScreen";
import SocialScreen from "./SocialScreen";
import ProfileScreen from "./ProfileScreen";

type TabType = "map" | "social" | "profile";

const GameLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("map");
  const [isOnline, setIsOnline] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Simulate network status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "map" as TabType, label: "Map", icon: Map },
    { id: "social" as TabType, label: "Social", icon: Users },
    { id: "profile" as TabType, label: "Profile", icon: User },
  ];

  const handleTabChange = (newTab: TabType) => {
    if (newTab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  };

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
    <div className="h-screen bg-gradient-to-b from-background to-background/80 flex flex-col overflow-hidden">
      {/* Status Bar */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-primary">VKU</span>
            </div>
            <span className="text-sm font-medium">Campus Explorer</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate("/auth")}
              className="p-1 rounded-md hover:bg-secondary/50 transition-colors"
              title="Login / Register"
            >
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
            {isOnline ? (
              <Wifi className="w-4 h-4 text-primary" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
            <div className="text-xs text-muted-foreground">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className={`h-full transition-all duration-150 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {renderActiveScreen()}
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <nav className="bg-card/90 backdrop-blur-lg border-t border-border">
        <div className="safe-area-pb px-2 py-3">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`relative nav-button transition-all duration-200 ${
                  activeTab === id ? "active" : ""
                }`}
              >
                <div className={`relative z-10 transition-all duration-200 ${
                  activeTab === id ? 'transform -translate-y-1' : ''
                }`}>
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium mt-1">{label}</span>
                </div>
                
                {/* Active Tab Indicator */}
                {activeTab === id && (
                  <div className="absolute inset-0 bg-primary/10 rounded-xl animate-scale-in" />
                )}
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 scale-0 rounded-xl transition-transform duration-300 hover:scale-100" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GameLayout;