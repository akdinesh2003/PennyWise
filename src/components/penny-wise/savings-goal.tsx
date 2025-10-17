"use client";

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Confetti } from './confetti';
import { PartyPopper, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export type SavingsGoalData = {
    id: number;
    name: string;
    current: number;
    target: number;
}

type SavingsGoalProps = {
    savingsGoal: SavingsGoalData;
    onDelete: () => void;
}

export function SavingsGoal({ savingsGoal, onDelete }: SavingsGoalProps) {
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const calculatedProgress = (savingsGoal.current / savingsGoal.target) * 100;
    setProgress(calculatedProgress);

    if (calculatedProgress >= 100 && !showConfetti) {
      const timer = setTimeout(() => setShowConfetti(true), 500);
      return () => clearTimeout(timer);
    }
  }, [savingsGoal, showConfetti]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <>
      <div className="px-1 relative group">
        <h3 className="font-semibold text-center mb-2">{savingsGoal.name}</h3>
        <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>{formatCurrency(savingsGoal.current)}</span>
            <span className="font-bold text-primary">{formatCurrency(savingsGoal.target)}</span>
            </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your savings goal for "{savingsGoal.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Dialog open={showConfetti} onOpenChange={setShowConfetti}>
        <DialogContent className="sm:max-w-[425px] overflow-hidden">
          <Confetti />
          <DialogHeader className="z-10 text-center items-center">
            <PartyPopper className="h-16 w-16 text-primary mb-4" />
            <DialogTitle className="font-headline text-2xl">Congratulations!</DialogTitle>
            <p className="text-muted-foreground">You've reached your savings goal for "{savingsGoal.name}"!</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
