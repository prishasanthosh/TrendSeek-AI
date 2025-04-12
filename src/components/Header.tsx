
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu, Settings, MessageSquare } from 'lucide-react';
import UserPreferences from './UserPreferences';
import { useAuth } from '@/context/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4">
        <div className="mr-4 flex items-center gap-2">
          <SidebarTrigger />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80">
              <div className="py-4">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setPreferencesOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Preferences
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center mr-auto">
          <h1 className="text-xl font-bold text-trendseer-600">TrendSeer</h1>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <>
              <span className="hidden md:inline text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreferencesOpen(true)}
                className="hidden md:flex items-center gap-2 mr-2"
              >
                <Settings className="h-4 w-4" />
                Preferences
              </Button>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
      
      <UserPreferences 
        open={preferencesOpen} 
        onOpenChange={setPreferencesOpen} 
      />
    </header>
  );
};

export default Header;
