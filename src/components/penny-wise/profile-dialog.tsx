"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { updateProfile } from 'firebase/auth';

interface ProfileDialogProps {
  children: React.ReactNode;
  onSave: (name: string, email: string) => void;
}

export function ProfileDialog({ children, onSave }: ProfileDialogProps) {
  const { toast } = useToast();
  const auth = useAuth();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (auth.currentUser) {
        try {
            await updateProfile(auth.currentUser, { displayName: name });
            onSave(name, email);
            toast({
                title: 'Profile Updated',
                description: 'Your changes have been saved successfully.',
            });
            setOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Update Failed',
                description: 'Could not update your profile.',
            });
        }
    }
  }
  
  const userInitial = name.charAt(0) || user?.email?.charAt(0) || 'U';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
            <Avatar className="h-24 w-24">
                {user?.photoURL && (
                    <AvatarImage alt={name} src={user.photoURL} />
                )}
                <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={email} disabled />
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
