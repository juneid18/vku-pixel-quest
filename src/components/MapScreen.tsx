import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import campusMap from "@/assets/campus-map.png";
import compassArrow from "@/assets/compass-arrow.png";
import studentAvatars from "@/assets/student-avatars.png";

const MapScreen = () => {
  const [compassRotation, setCompassRotation] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setIsMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate compass rotation and player movement
  useEffect(() => {
    if (!isMapLoaded) return;
    
    const compassInterval = setInterval(() => {
      setCompassRotation(prev => (prev + 1) % 360);
    }, 50);

    const moveInterval = setInterval(() => {
      setPlayerPosition(prev => ({
        x: Math.max(5, Math.min(95, prev.x + (Math.random() - 0.5) * 3)),
        y: Math.max(5, Math.min(95, prev.y + (Math.random() - 0.5) * 3)),
      }));
    }, 3000);

    return () => {
      clearInterval(compassInterval);
      clearInterval(moveInterval);
    };
  }, [isMapLoaded]);

  // Mock player data
  const players = [
    { id: 1, name: "You", x: playerPosition.x, y: playerPosition.y, isPlayer: true },
    { id: 2, name: "Alice", x: 30, y: 40, isPlayer: false },
    { id: 3, name: "Bob", x: 70, y: 60, isPlayer: false },
    { id: 4, name: "Carol", x: 45, y: 25, isPlayer: false },
  ];

  return (
    <div className="relative w-full h-full bg-pixel-grass overflow-hidden">
      {/* Loading Overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-background z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-primary">Loading VKU Campus</h3>
              <p className="text-sm text-muted-foreground">Connecting to campus network...</p>
            </div>
          </div>
        </div>
      )}

      {/* Campus Map Background */}
      <div 
        className={`absolute inset-0 pixel-art bg-cover bg-center transition-all duration-1000 ${
          isMapLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
        style={{ backgroundImage: `url(${campusMap})` }}
      />

      {/* Compass Arrow - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          {/* Compass Background */}
          <div className="w-16 h-16 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-border">
            <img
              src={compassArrow}
              alt="Compass"
              className="w-8 h-8 pixel-art"
              style={{ 
                transform: `rotate(${compassRotation}deg)`,
                transition: 'transform 0.05s linear',
                filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.6))'
              }}
            />
          </div>
          {/* Compass Degrees */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="text-xs font-bold text-accent">{Math.round(compassRotation)}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Info Overlay - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border max-w-48">
          <h2 className="text-lg font-bold text-primary mb-1">VKU Campus</h2>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">Live Players: {players.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-muted-foreground">Active Areas: 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Player Avatars */}
      {isMapLoaded && players.map((player) => (
        <div
          key={player.id}
          className={`absolute z-10 transition-all duration-3000 cursor-pointer ${
            player.isPlayer ? "animate-pixel-float" : ""
          }`}
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => setSelectedPlayer(selectedPlayer === player.id ? null : player.id)}
        >
          {/* Player Avatar */}
          <div className="relative group">
            <div 
              className={`w-10 h-10 pixel-art rounded-lg shadow-lg transition-all duration-200 ${
                player.isPlayer 
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" 
                  : "hover:scale-110 hover:shadow-xl"
              } ${selectedPlayer === player.id ? "scale-125 ring-2 ring-accent" : ""}`}
              style={{
                backgroundImage: `url(${studentAvatars})`,
                backgroundSize: '300% 200%',
                backgroundPosition: `${(player.id - 1) * 50}% 0%`,
              }}
            />
            
            {/* Player Name Tag */}
            <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-200 ${
              selectedPlayer === player.id || player.isPlayer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>
              <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                player.isPlayer 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-card-foreground border border-border"
              }`}>
                {player.name}
              </div>
            </div>

            {/* Activity Pulse */}
            {!player.isPlayer && (
              <div className="absolute -bottom-1 -right-1">
                <div className="relative">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                </div>
              </div>
            )}

            {/* Selection Ring */}
            {selectedPlayer === player.id && (
              <div className="absolute inset-0 rounded-lg border-2 border-accent animate-pulse" />
            )}
          </div>
        </div>
      ))}

      {/* Enhanced Game Stats Overlay - Bottom Left */}
      <div className="absolute bottom-24 left-6 z-20">
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border min-w-40">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GPS</span>
              <span className="text-primary font-mono text-xs">
                {(18.6298 + playerPosition.x * 0.001).toFixed(4)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="text-accent font-medium">±3m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Player Info Modal */}
      {selectedPlayer && (
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in-up">
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border min-w-48">
            <div className="text-center">
              <div 
                className="w-12 h-12 pixel-art rounded-xl mx-auto mb-2 ring-2 ring-accent ring-offset-2 ring-offset-card"
                style={{
                  backgroundImage: `url(${studentAvatars})`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: `${(selectedPlayer - 1) * 50}% 0%`,
                }}
              />
              <h3 className="font-bold text-primary">{players.find(p => p.id === selectedPlayer)?.name}</h3>
              <p className="text-sm text-muted-foreground">Computer Science • 3rd Year</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1 h-8 text-xs">
                  Chat
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;