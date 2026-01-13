import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import subtleMapBg from '@assets/generated_images/subtle_map_texture_background.png';
import appIcon from '@assets/generated_images/green_school_map_app_icon.png';
import { ArrowRight, Lock, Mail, Phone } from 'lucide-react';

export default function Login() {
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      setLocation('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: `url(${subtleMapBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/20 z-0 pointer-events-none" />

      <Card className="w-full max-w-md mx-4 relative z-10 shadow-xl border-border/50 backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center border border-border p-2">
            <img src={appIcon} alt="Green School Map" className="w-full h-full object-contain" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-heading font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access the Green School Map dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="name@example.com" 
                  className="pl-9" 
                  defaultValue="gannaali704@gmail.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-9"
                  defaultValue="password123" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">Remember me for 30 days</Label>
            </div>
            <Button type="submit" className="w-full font-medium" disabled={isLoading} size="lg">
              {isLoading ? "Signing in..." : "Sign In"} 
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-border bg-muted/20">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
