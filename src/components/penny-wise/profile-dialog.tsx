"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { user } from '@/lib/data';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

export function ProfileDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
            <Avatar className="h-24 w-24">
                {user.avatar?.imageUrl && (
                    <AvatarImage alt={user.name} src={user.avatar.imageUrl} data-ai-hint={user.avatar.imageHint} />
                )}
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" defaultValue={user.name} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="m@example.com" />
                </div>
            </div>
        </div>
        <DialogFooter>
            <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
