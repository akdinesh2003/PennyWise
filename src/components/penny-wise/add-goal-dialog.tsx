"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface AddGoalDialogProps {
  children: React.ReactNode;
  onAddGoal: (name: string, target: number) => void;
}

export function AddGoalDialog({ children, onAddGoal }: AddGoalDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleSave = () => {
    const targetAmount = parseFloat(target);
    if (!name.trim() || !targetAmount || targetAmount <= 0) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a valid name and target amount.",
        });
        return;
    }

    onAddGoal(name, targetAmount);
    toast({
        title: 'Goal Added!',
        description: `Your new goal "${name}" has been created.`,
    });
    setOpen(false);
    setName('');
    setTarget('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Add a New Savings Goal</DialogTitle>
          <DialogDescription>
            What's your next big dream? Let's start saving for it.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input type="text" id="goal-name" placeholder="e.g., New Gaming PC" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="goal-target">Target Amount ($)</Label>
                <Input type="number" id="goal-target" placeholder="e.g., 2000" value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
