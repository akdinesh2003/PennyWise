
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
import { SavingsGoal } from './savings-goal';

type SavingsGoalData = {
    id: number;
    name: string;
    current: number;
    target: number;
}

type SavingsGoalCarouselProps = {
    savingsGoals: SavingsGoalData[];
    onActiveGoalChange: (goalId: number) => void;
}

export function SavingsGoalCarousel({ savingsGoals, onActiveGoalChange }: SavingsGoalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  
  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      const selectedGoal = savingsGoals[api.selectedScrollSnap()];
      onActiveGoalChange(selectedGoal.id);
    })
  }, [api, onActiveGoalChange, savingsGoals])

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
        <CardHeader>
            <CardTitle className="font-headline text-lg">
                Savings Goals
            </CardTitle>
            <CardDescription>
                Track your progress towards your dreams.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {savingsGoals.map((goal) => (
                    <CarouselItem key={goal.id}>
                        <SavingsGoal savingsGoal={goal} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-10" />
                <CarouselNext className="mr-10"/>
            </Carousel>
        </CardContent>
    </Card>
  );
}
