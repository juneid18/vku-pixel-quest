import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    toast({
      title: "Login Successful! 🎮",
      description: "Welcome back to VKU Campus Explorer!"
    });
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    toast({
      title: "Google Login! 🚀",
      description: "Signing in with Google..."
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
          <div className="space-y-6">
            {/* Google Login Button */}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline" 
              className="w-full game-button border-2 border-border bg-background hover:bg-muted transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Login Form */}
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

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-primary hover:text-primary-glow transition-colors font-medium">
                  Forgot password?
                </button>
                <button type="button" className="text-primary hover:text-primary-glow transition-colors font-medium">
                  Create account
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;