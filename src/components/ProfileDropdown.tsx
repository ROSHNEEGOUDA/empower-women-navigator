import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Settings,
  Megaphone,
  LogOut,
  LogIn,
  User as UserIcon,
} from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

interface ProfileDropdownProps {
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  notifications?: number;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  notifications = 0,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = !!user && !!user.displayName;

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        const auth = getAuth();
        await signOut(auth);
        localStorage.removeItem('token');
        navigate('/login');
        console.log('Logged out successfully');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    } else {
      navigate('/login');
    }
  };

  const avatarInitial = user?.displayName?.[0]?.toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10 border-2 border-pink-200">
            <AvatarImage
              src={user?.photoURL || undefined}
              alt={user?.displayName || 'User'}
            />
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              {avatarInitial}
            </AvatarFallback>
          </Avatar>
          {isLoggedIn && notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-1.5 bg-red-500 text-white text-xs text-center">
              {notifications}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 bg-white/95 backdrop-blur-md border border-pink-200 shadow-md"
        align="end"
      >
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || 'Anonymous User'}
                </p>
                {user.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-pink-50 cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4 text-purple-600" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-pink-50 cursor-pointer">
              <Bell className="mr-2 h-4 w-4 text-purple-600" />
              <span>Notifications</span>
              {notifications > 0 && (
                <Badge className="ml-auto bg-red-500 text-white">
                  {notifications}
                </Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-pink-50 cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-purple-600" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-pink-50 cursor-pointer">
              <Megaphone className="mr-2 h-4 w-4 text-purple-600" />
              <span>Announcements</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <DropdownMenuLabel className="text-sm text-center py-2">
            You are not logged in
          </DropdownMenuLabel>
        )}

        <DropdownMenuItem
          className={`cursor-pointer ${
            isLoggedIn
              ? 'hover:bg-red-50 text-red-600'
              : 'hover:bg-green-50 text-green-600'
          }`}
          onClick={handleAuthAction}
        >
          {isLoggedIn ? (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
