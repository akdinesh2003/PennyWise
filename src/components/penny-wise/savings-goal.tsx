"use client";

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Confetti } from './confetti';
import { PartyPopper } from 'lucide-react';

type SavingsGoalData = {
    name: string;
    current: number;
    target: number;
}

type SavingsGoalProps = {
    savingsGoal: SavingsGoalData;
}

export function SavingsGoal({ savingsGoal }: SavingsGoalProps) {
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
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <>
      <div className="px-1">
        <h3 className="font-semibold text-center mb-2">{savingsGoal.name}</h3>
        <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>{formatCurrency(savingsGoal.current)}</span>
            <span className="font-bold text-primary">{formatCurrency(savingsGoal.target)}</span>
            </div>
        </div>
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
