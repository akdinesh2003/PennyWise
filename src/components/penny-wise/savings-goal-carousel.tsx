
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SavingsGoal, type SavingsGoalData } from './savings-goal';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { AddGoalDialog } from './add-goal-dialog';

type SavingsGoalCarouselProps = {
    savingsGoals: SavingsGoalData[];
    onActiveGoalChange: (goalId: number | undefined) => void;
    onAddGoal: (name: string, target: number) => void;
    onDeleteGoal: (goalId: number) => void;
}

export function SavingsGoalCarousel({ savingsGoals, onActiveGoalChange, onAddGoal, onDeleteGoal }: SavingsGoalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  
  useEffect(() => {
    if (!api) {
      return
    }
 
    const handleSelect = () => {
        const selectedSnap = api.selectedScrollSnap();
        if (savingsGoals[selectedSnap]) {
            const selectedGoal = savingsGoals[selectedSnap];
            onActiveGoalChange(selectedGoal.id);
        } else {
            onActiveGoalChange(undefined);
        }
    }

    api.on("select", handleSelect);
    api.on("reInit", handleSelect); // Also handle re-initialization

    // Initial set
    handleSelect();

    return () => {
        api.off("select", handleSelect);
        api.off("reInit", handleSelect);
    }
  }, [api, onActiveGoalChange, savingsGoals])

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-lg">
                    Savings Goals
                </CardTitle>
                <CardDescription>
                    Track your progress towards your dreams.
                </CardDescription>
            </div>
            <AddGoalDialog onAddGoal={onAddGoal}>
                <Button variant="ghost" size="icon">
                    <PlusCircle className="h-6 w-6 text-primary" />
                    <span className="sr-only">Add new goal</span>
                </Button>
            </AddGoalDialog>
        </CardHeader>
        <CardContent>
            {savingsGoals.length > 0 ? (
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {savingsGoals.map((goal) => (
                        <CarouselItem key={goal.id}>
                            <SavingsGoal savingsGoal={goal} onDelete={() => onDeleteGoal(goal.id)} />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-10" />
                    <CarouselNext className="mr-10"/>
                </Carousel>
            ) : (
                <div className="text-center text-muted-foreground py-8">
                    <p>No savings goals yet.</p>
                    <p className="text-sm">Click the '+' to add your first one!</p>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
