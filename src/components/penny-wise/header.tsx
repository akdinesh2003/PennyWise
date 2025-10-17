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

export function Header() {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: 'Functionality not implemented',
      description: `The "${action}" feature is not yet available.`,
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
            <DropdownMenuItem onClick={() => handleAction('Profile')}>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('Settings')}>
              <Settings />
              Settings
            </DropdownMenuItem>
            <ThemeToggle />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction('Log out')}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
