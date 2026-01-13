import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Leaf,
  MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link href={href}>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${active ? 'bg-sidebar-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}>
      <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground'}`} />
      <span>{label}</span>
    </div>
  </Link>
);

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="bg-primary/10 p-2 rounded-xl">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg leading-none">Green School</h1>
          <span className="text-xs text-muted-foreground">Cairo GIS Map</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" active={location === '/dashboard'} />
        <SidebarItem icon={Map} label="Live Map" href="/map" active={location === '/map'} />
        <SidebarItem icon={BarChart3} label="Analytics" href="/analytics" active={location === '/analytics'} />
        <SidebarItem icon={MessageSquare} label="Contact" href="/contact" active={location === '/contact'} />
        <div className="pt-4 mt-4 border-t border-sidebar-border">
           <SidebarItem icon={Settings} label="Settings" href="/settings" active={location === '/settings'} />
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 mb-4">
          <Avatar className="h-9 w-9 border border-sidebar-border">
             <AvatarImage src="https://github.com/shadcn.png" />
             <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Ganna Ali</p>
            <p className="text-xs text-muted-foreground truncate">gannaali704@gmail.com</p>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border">
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <span className="font-heading font-semibold">Green School Map</span>
          </div>
        </header>
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
