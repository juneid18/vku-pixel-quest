import { useState } from "react";
import { Send, MoreVertical, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import studentAvatars from "@/assets/student-avatars.png";

const SocialScreen = () => {
  const [message, setMessage] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<number | null>(1);

  // Mock friends data
  const friends = [
    { id: 1, name: "Alice Chen", status: "online", lastSeen: "now", unread: 3 },
    { id: 2, name: "Bob Kumar", status: "online", lastSeen: "2m ago", unread: 0 },
    { id: 3, name: "Carol Singh", status: "away", lastSeen: "5m ago", unread: 1 },
    { id: 4, name: "David Patel", status: "offline", lastSeen: "1h ago", unread: 0 },
    { id: 5, name: "Emma Wilson", status: "online", lastSeen: "now", unread: 0 },
  ];

  // Mock chat messages
  const messages = [
    { id: 1, sender: "Alice Chen", message: "Hey! Are you at the library?", time: "2:30 PM", isOwn: false },
    { id: 2, sender: "You", message: "Yeah, studying for the exam", time: "2:32 PM", isOwn: true },
    { id: 3, sender: "Alice Chen", message: "Mind if I join? I have some questions", time: "2:33 PM", isOwn: false },
    { id: 4, sender: "You", message: "Sure! I'm on the 2nd floor", time: "2:34 PM", isOwn: true },
    { id: 5, sender: "Alice Chen", message: "Perfect! On my way 🏃‍♀️", time: "2:35 PM", isOwn: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-full bg-background flex">
      {/* Friends List */}
      <div className="w-full sm:w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Friends</h2>
            <Button size="sm" variant="outline" className="p-2">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {friends.filter(f => f.status === "online").length} online
          </p>
        </div>

        {/* Friends List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {friends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => setSelectedFriend(friend.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors hover:bg-secondary ${
                  selectedFriend === friend.id ? "bg-secondary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div 
                      className="w-10 h-10 pixel-art rounded-lg"
                      style={{
                        backgroundImage: `url(${studentAvatars})`,
                        backgroundSize: '300% 200%',
                        backgroundPosition: `${(friend.id - 1) * 50}% 0%`,
                      }}
                    />
                    {/* Status Indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      friend.status === "online" ? "bg-primary" :
                      friend.status === "away" ? "bg-accent" : "bg-muted"
                    }`} />
                  </div>

                  {/* Friend Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{friend.name}</p>
                      {friend.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {friend.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{friend.lastSeen}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area - Hidden on mobile when no friend selected */}
      {selectedFriend && (
        <div className="flex-1 flex flex-col absolute inset-0 sm:relative bg-background z-20 sm:z-auto">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                className="sm:hidden"
                onClick={() => setSelectedFriend(null)}
              >
                ←
              </Button>
              <div 
                className="w-8 h-8 pixel-art rounded-lg"
                style={{
                  backgroundImage: `url(${studentAvatars})`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: `${(selectedFriend - 1) * 50}% 0%`,
                }}
              />
              <div>
                <p className="font-medium">{friends.find(f => f.id === selectedFriend)?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {friends.find(f => f.id === selectedFriend)?.status}
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`chat-bubble ${
                    msg.isOwn ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm" className="game-button">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialScreen;