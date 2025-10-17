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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
        const nameParts = user.displayName?.split(' ') || [];
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
        setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (auth.currentUser) {
        try {
            const newName = `${firstName} ${lastName}`.trim();
            await updateProfile(auth.currentUser, { displayName: newName });
            onSave(newName, email);
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
  
  const userInitial = firstName.charAt(0) || user?.email?.charAt(0) || 'U';

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
                    <AvatarImage alt={user.displayName || ''} src={user.photoURL} />
                )}
                <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
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
