"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type user as UserType } from '@/lib/data';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProfileDialogProps {
  children: React.ReactNode;
  user: typeof UserType;
  onSave: (name: string, email: string) => void;
}

export function ProfileDialog({ children, user, onSave }: ProfileDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState('m@example.com');

  const handleSave = () => {
    onSave(name, email);
    toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully.',
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <AvatarFallback className="text-3xl">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
