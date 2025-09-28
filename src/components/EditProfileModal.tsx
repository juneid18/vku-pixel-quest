import { useState } from "react";
import { X, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import studentAvatars from "@/assets/student-avatars.png";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    nickname: string;
    email: string;
    year: string;
    department: string;
    bio?: string;
    avatarIndex: number;
  };
  onSave: (updatedUser: any) => void;
}

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  nickname: z.string().trim().min(3, "Nickname must be at least 3 characters").max(20, "Nickname must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Nickname can only contain letters, numbers, and underscores"),
  bio: z.string().max(150, "Bio must be less than 150 characters").optional(),
  year: z.string().min(1, "Please select your year"),
  department: z.string().min(1, "Please select your department"),
});

const EditProfileModal = ({ isOpen, onClose, user, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    nickname: user.nickname,
    bio: user.bio || "",
    year: user.year,
    department: user.department,
    avatarIndex: user.avatarIndex,
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave({ ...user, ...formData });
    setIsLoading(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in-up">
      <div className="fixed inset-x-0 bottom-0 top-16 overflow-hidden">
        <Card className="h-full rounded-t-3xl border-0 shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form Content */}
            <CardContent className="flex-1 overflow-auto p-6 space-y-6">
              {/* Avatar Selection */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div 
                    className="w-24 h-24 pixel-art rounded-2xl ring-4 ring-primary ring-offset-4 ring-offset-background"
                    style={{
                      backgroundImage: `url(${studentAvatars})`,
                      backgroundSize: '300% 200%',
                      backgroundPosition: `${formData.avatarIndex * 50}% 0%`,
                    }}
                  />
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-10 h-10 p-0 rounded-full shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Tap to change avatar</p>

                {/* Avatar Options */}
                <div className="flex justify-center gap-2 mt-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, avatarIndex: index }))}
                      className={`w-12 h-12 pixel-art rounded-lg transition-all ${
                        formData.avatarIndex === index 
                          ? "ring-2 ring-primary scale-110" 
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        backgroundImage: `url(${studentAvatars})`,
                        backgroundSize: '300% 200%',
                        backgroundPosition: `${index * 50}% 0%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange("nickname", e.target.value)}
                    className={`mt-1 ${errors.nickname ? "border-destructive" : ""}`}
                    placeholder="Choose a unique nickname"
                  />
                  {errors.nickname && (
                    <p className="text-sm text-destructive mt-1">{errors.nickname}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className={`mt-1 resize-none ${errors.bio ? "border-destructive" : ""}`}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    {errors.bio && <span className="text-destructive">{errors.bio}</span>}
                    <span className="ml-auto">{formData.bio.length}/150</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Academic Year</Label>
                    <select
                      id="year"
                      value={formData.year}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                      className={`mt-1 w-full px-3 py-2 border rounded-md bg-background ${
                        errors.year ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                    {errors.year && (
                      <p className="text-sm text-destructive mt-1">{errors.year}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className={`mt-1 w-full px-3 py-2 border rounded-md bg-background ${
                        errors.department ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Electronics Engineering">Electronics Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                    </select>
                    {errors.department && (
                      <p className="text-sm text-destructive mt-1">{errors.department}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Save Button */}
            <div className="p-6 border-t border-border">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileModal;