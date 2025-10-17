"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { savingsGoal } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Confetti } from './confetti';
import { PartyPopper } from 'lucide-react';

export function SavingsGoal() {
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const calculatedProgress = (savingsGoal.current / savingsGoal.target) * 100;
    setProgress(calculatedProgress);

    if (calculatedProgress >= 100) {
      const timer = setTimeout(() => setShowConfetti(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <>
      <Card className="shadow-md transition-shadow hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-lg">
            {savingsGoal.name}
          </CardTitle>
          <CardDescription>
            Your progress towards your next big goal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>{formatCurrency(savingsGoal.current)}</span>
              <span className="font-bold text-primary">{formatCurrency(savingsGoal.target)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
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
