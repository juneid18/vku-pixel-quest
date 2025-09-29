import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    toast({
      title: "Login Successful! 🎮",
      description: "Welcome back to VKU Campus Explorer!"
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive"
      });
      return;
    }
    // TODO: Implement actual registration logic
    toast({
      title: "Account Created! 🎉",
      description: "Welcome to VKU Campus Explorer!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel art background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-16 h-16 bg-primary pixel-art animate-[pixel-float_3s_ease-in-out_infinite]" />
        <div className="absolute top-32 right-20 w-12 h-12 bg-accent pixel-art animate-[pixel-float_4s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-secondary pixel-art animate-[pixel-float_5s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-primary-glow pixel-art animate-[pixel-float_3.5s_ease-in-out_infinite_0.5s]" />
      </div>

      <Card className="w-full max-w-md mx-auto pixel-shadow bg-card/95 backdrop-blur-sm border-2 border-border">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-lg flex items-center justify-center pixel-shadow">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-shadow-pixel">VKU Campus Explorer</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join the pixel adventure at Vishwakarma University
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="font-medium">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-medium">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@vku.edu.in"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10 game-button"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10 game-button"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full game-button text-shadow-pixel">
                  Start Adventure 🎮
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Forgot your password?{" "}
                  <button className="text-primary hover:text-primary-glow transition-colors font-medium">
                    Reset here
                  </button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Choose a pixel name"
                      value={registerData.username}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-10 game-button"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your.email@vku.edu.in"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10 game-button"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10 game-button"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10 game-button"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full game-button text-shadow-pixel">
                  Join the Adventure 🚀
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <button className="text-primary hover:text-primary-glow transition-colors font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-primary hover:text-primary-glow transition-colors font-medium">
                    Privacy Policy
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;