"use client";

import Image from 'next/image';
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
import { user } from '@/lib/data';
import { ThemeToggle } from '@/components/theme-toggle';
import { Settings, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ProfileDialog } from './profile-dialog';
import { SettingsDialog } from './settings-dialog';

export function Header() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <a href="#" className="flex items-center gap-2">
        <PennyWiseLogo className="h-6 w-6 text-primary" />
        <span className="font-headline text-xl font-bold tracking-tight text-foreground">
          PennyWise
        </span>
      </a>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                 {user.avatar?.imageUrl && (
                    <AvatarImage alt={user.name} src={user.avatar.imageUrl} data-ai-hint={user.avatar.imageHint} />
                  )}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProfileDialog>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <User />
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
      </div>
    </header>
  );
}
