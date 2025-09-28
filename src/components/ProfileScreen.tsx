import { useState } from "react";
import { Settings, Award, Eye, EyeOff, LogOut, Edit, MapPin, Share2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditProfileModal from "./EditProfileModal";
import studentAvatars from "@/assets/student-avatars.png";

const ProfileScreen = () => {
  const [locationSharing, setLocationSharing] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    nickname: "PixelExplorer",
    email: "alex.johnson@vku.edu",
    year: "3rd Year",
    department: "Computer Science",
    joinDate: "September 2023",
    bio: "Exploring VKU campus one pixel at a time! 🎮",
    level: 15,
    exp: 2850,
    maxExp: 3000,
    avatarIndex: 0,
  });

  // Mock achievements
  const achievements = [
    { id: 1, name: "Campus Explorer", description: "Visited all buildings", icon: "🏛️", unlocked: true },
    { id: 2, name: "Social Butterfly", description: "Added 20 friends", icon: "🦋", unlocked: true },
    { id: 3, name: "Early Bird", description: "Active before 8 AM", icon: "🌅", unlocked: true },
    { id: 4, name: "Night Owl", description: "Active after 10 PM", icon: "🦉", unlocked: false },
    { id: 5, name: "Speed Walker", description: "Walk 10km in a day", icon: "🏃", unlocked: false },
    { id: 6, name: "Library Legend", description: "Spend 50 hours in library", icon: "📚", unlocked: true },
  ];

  // Mock statistics
  const stats = [
    { label: "Steps Today", value: "8,247", icon: "👟" },
    { label: "Friends", value: "23", icon: "👥" },
    { label: "Locations", value: "47", icon: "📍" },
  ];

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedUser: any) => {
    setUser(updatedUser);
  };

  return (
    <div className="h-full bg-gradient-to-b from-background to-background/50 overflow-auto">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header with Stats */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-6 space-y-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            {/* User Avatar */}
            <div className="relative">
              <div 
                className="w-20 h-20 pixel-art rounded-2xl ring-4 ring-primary/50 ring-offset-2 ring-offset-background shadow-lg"
                style={{
                  backgroundImage: `url(${studentAvatars})`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: `${user.avatarIndex * 50}% 0%`,
                }}
              />
              <Button
                size="sm"
                onClick={handleEditProfile}
                className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">{user.level}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-primary">{user.name}</h2>
                <Badge variant="secondary" className="text-xs">
                  VKU
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">@{user.nickname}</p>
              <p className="text-sm text-muted-foreground">{user.year} • {user.department}</p>
              {user.bio && (
                <p className="text-sm text-foreground mt-2">{user.bio}</p>
              )}
              
              {/* Level Progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Level {user.level}</span>
                  <span>{user.exp}/{user.maxExp} XP</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2 mt-1 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(user.exp / user.maxExp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card/60 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-lg">{stat.icon}</div>
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Quick Actions */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2">
                <Button
                  variant="ghost"
                  className="h-16 flex-col gap-1 rounded-none border-r border-border hover:bg-primary/5"
                >
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="text-xs">Share Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="h-16 flex-col gap-1 rounded-none hover:bg-primary/5"
                  onClick={handleEditProfile}
                >
                  <Edit className="w-5 h-5 text-primary" />
                  <span className="text-xs">Edit Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5" />
                Settings & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Location Sharing</span>
                    <p className="text-xs text-muted-foreground">Share your location with friends</p>
                  </div>
                </div>
                <Switch
                  checked={locationSharing}
                  onCheckedChange={setLocationSharing}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    {showOnline ? <Eye className="w-5 h-5 text-primary" /> : <EyeOff className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <span className="font-medium">Online Status</span>
                    <p className="text-xs text-muted-foreground">Show when you're active</p>
                  </div>
                </div>
                <Switch
                  checked={showOnline}
                  onCheckedChange={setShowOnline}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Notifications</span>
                    <p className="text-xs text-muted-foreground">Receive app notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5" />
                Achievements
                <Badge variant="secondary" className="ml-auto">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {achievements.slice(0, 6).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-xl text-center transition-all duration-200 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 hover:scale-105"
                        : "bg-muted/30 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="text-xs font-medium leading-tight">{achievement.name}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 h-11">
                View All Achievements
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Student ID</p>
                  <p className="text-sm text-muted-foreground">VKU202300123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full h-12 flex items-center gap-2 text-lg font-medium"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>

          {/* Safe area padding for mobile */}
          <div className="h-20" />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfileScreen;