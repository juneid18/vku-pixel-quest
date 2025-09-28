import { useEffect, useState } from "react";
import campusMap from "@/assets/campus-map.png";
import compassArrow from "@/assets/compass-arrow.png";
import studentAvatars from "@/assets/student-avatars.png";

const MapScreen = () => {
  const [compassRotation, setCompassRotation] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  // Simulate compass rotation and player movement
  useEffect(() => {
    const compassInterval = setInterval(() => {
      setCompassRotation(prev => (prev + 2) % 360);
    }, 100);

    const moveInterval = setInterval(() => {
      setPlayerPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 2,
        y: prev.y + (Math.random() - 0.5) * 2,
      }));
    }, 2000);

    return () => {
      clearInterval(compassInterval);
      clearInterval(moveInterval);
    };
  }, []);

  // Mock player data
  const players = [
    { id: 1, name: "You", x: playerPosition.x, y: playerPosition.y, isPlayer: true },
    { id: 2, name: "Alice", x: 30, y: 40, isPlayer: false },
    { id: 3, name: "Bob", x: 70, y: 60, isPlayer: false },
    { id: 4, name: "Carol", x: 45, y: 25, isPlayer: false },
  ];

  return (
    <div className="relative w-full h-full bg-pixel-grass overflow-hidden">
      {/* Campus Map Background */}
      <div 
        className="absolute inset-0 pixel-art bg-cover bg-center"
        style={{ backgroundImage: `url(${campusMap})` }}
      />

      {/* Compass Arrow - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative w-12 h-12">
          <img
            src={compassArrow}
            alt="Compass"
            className="w-full h-full pixel-art compass-shadow opacity-80"
            style={{ 
              transform: `rotate(${compassRotation}deg)`,
              transition: 'transform 0.1s linear'
            }}
          />
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm -z-10" />
        </div>
        <div className="text-xs text-center text-accent-foreground mt-1 font-medium">
          {Math.round(compassRotation)}°
        </div>
      </div>

      {/* Campus Info Overlay - Top Left */}
      <div className="absolute top-4 left-4 z-20 bg-card/90 backdrop-blur-sm rounded-lg p-3 pixel-shadow">
        <h2 className="text-lg font-bold text-primary text-shadow-pixel">VKU Campus</h2>
        <p className="text-sm text-muted-foreground">Live Players: {players.length}</p>
      </div>

      {/* Player Avatars */}
      {players.map((player) => (
        <div
          key={player.id}
          className={`absolute z-10 transition-all duration-2000 ${
            player.isPlayer ? "animate-pixel-float" : ""
          }`}
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Player Avatar */}
          <div className="relative">
            <div 
              className={`w-8 h-8 pixel-art ${
                player.isPlayer ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              }`}
              style={{
                backgroundImage: `url(${studentAvatars})`,
                backgroundSize: '300% 200%',
                backgroundPosition: `${(player.id - 1) * 50}% 0%`,
              }}
            />
            
            {/* Player Name Tag */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                player.isPlayer 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-card-foreground"
              } pixel-shadow`}>
                {player.name}
              </div>
            </div>

            {/* Activity Indicator */}
            {!player.isPlayer && (
              <div className="absolute -bottom-1 -right-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-pixel-bounce" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Game Stats Overlay - Bottom Left */}
      <div className="absolute bottom-20 left-4 z-20 bg-card/90 backdrop-blur-sm rounded-lg p-3 pixel-shadow">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-muted-foreground">Online</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Lat: {(18.6298 + playerPosition.x * 0.001).toFixed(4)}
          </div>
          <div className="text-xs text-muted-foreground">
            Lng: {(73.7997 + playerPosition.y * 0.001).toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;