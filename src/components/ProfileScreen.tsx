import { useState } from "react";
import { Settings, Award, Eye, EyeOff, LogOut, Edit, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import studentAvatars from "@/assets/student-avatars.png";

const ProfileScreen = () => {
  const [locationSharing, setLocationSharing] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    nickname: "PixelExplorer",
    email: "alex.johnson@vku.edu",
    year: "3rd Year",
    department: "Computer Science",
    joinDate: "September 2023",
    level: 15,
    exp: 2850,
    maxExp: 3000,
  };

  // Mock achievements
  const achievements = [
    { id: 1, name: "Campus Explorer", description: "Visited all buildings", icon: "🏛️", unlocked: true },
    { id: 2, name: "Social Butterfly", description: "Added 20 friends", icon: "🦋", unlocked: true },
    { id: 3, name: "Early Bird", description: "Active before 8 AM", icon: "🌅", unlocked: true },
    { id: 4, name: "Night Owl", description: "Active after 10 PM", icon: "🦉", unlocked: false },
    { id: 5, name: "Speed Walker", description: "Walk 10km in a day", icon: "🏃", unlocked: false },
    { id: 6, name: "Library Legend", description: "Spend 50 hours in library", icon: "📚", unlocked: true },
  ];

  return (
    <div className="h-full bg-background overflow-auto">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div className="relative">
                <div 
                  className="w-20 h-20 pixel-art rounded-xl ring-4 ring-primary ring-offset-2 ring-offset-background"
                  style={{
                    backgroundImage: `url(${studentAvatars})`,
                    backgroundSize: '300% 200%',
                    backgroundPosition: '0% 0%',
                  }}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary">{user.name}</h2>
                <p className="text-sm text-muted-foreground">@{user.nickname}</p>
                <p className="text-sm text-muted-foreground">{user.year} • {user.department}</p>
                
                {/* Level Progress */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Level {user.level}</span>
                    <span>{user.exp}/{user.maxExp} XP</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(user.exp / user.maxExp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Location Sharing</span>
              </div>
              <Switch
                checked={locationSharing}
                onCheckedChange={setLocationSharing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showOnline ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                <span className="text-sm">Show Online Status</span>
              </div>
              <Switch
                checked={showOnline}
                onCheckedChange={setShowOnline}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Friend Requests</span>
              </div>
              <Switch
                checked={friendRequests}
                onCheckedChange={setFriendRequests}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg text-center transition-all ${
                    achievement.unlocked
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-muted/50 opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className="text-xs font-medium">{achievement.name}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Achievements
            </Button>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="text-sm font-medium">{user.joinDate}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="text-sm font-medium">VKU202300123</p>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>

        {/* Safe area padding for mobile */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default ProfileScreen;