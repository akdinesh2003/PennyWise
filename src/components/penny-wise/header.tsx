
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PennyWiseLogo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Settings, LogOut, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ProfileDialog } from './profile-dialog';
import { SettingsDialog } from './settings-dialog';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';

interface HeaderProps {
    onProfileUpdate: (name: string, email: string) => void;
}

export function Header({ onProfileUpdate }: HeaderProps) {
  const { toast } = useToast();
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred while logging out.',
      });
    }
  };
  
  const userInitial = user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <a href="#" className="flex items-center gap-2">
        <PennyWiseLogo className="h-8 w-8 text-primary" />
        <div>
            <span className="font-headline text-xl font-bold tracking-tight text-foreground">
            PennyWise
            </span>
            <p className="text-xs text-muted-foreground -mt-1">Save Smart. Achieve Big.</p>
        </div>
      </a>
      <div className="ml-auto flex items-center gap-4">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                   {user.photoURL && (
                      <AvatarImage alt={user.displayName || 'User'} src={user.photoURL} />
                    )}
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName || 'PennyWise User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ProfileDialog onSave={onProfileUpdate}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
              </ProfileDialog>
               <SettingsDialog>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Settings />
                      Settings
                  </DropdownMenuItem>
              </SettingsDialog>
              <ThemeToggle />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
