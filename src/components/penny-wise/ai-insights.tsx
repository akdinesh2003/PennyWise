"use client";

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getSavingsSuggestions } from '@/app/actions';
import { Lightbulb, Loader2, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  suggestions: [],
  error: '',
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export function AiInsights() {
  const [state, formAction] = useActionState(getSavingsSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl w-full">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Savings Insights
          </CardTitle>
          <CardDescription>
            Tell us about your habits and goals to get personalized savings tips.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="spending-habits">Your Spending Habits</Label>
            <Textarea
              id="spending-habits"
              name="spendingHabits"
              placeholder="e.g., I spend about $100 on dining out weekly, and I have subscriptions for 3 streaming services..."
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="financial-goals">Your Financial Goals</Label>
            <Textarea
              id="financial-goals"
              name="financialGoals"
              placeholder="e.g., I want to save for a down payment on a house in 5 years, and build an emergency fund of $10,000..."
              className="min-h-[100px]"
              required
            />
          </div>
           <div className="pt-4">
            {state?.suggestions && state.suggestions.length > 0 ? (
              <div className="space-y-4">
                 <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="text-primary"/>Here are some suggestions for you:</h3>
                <ul className="space-y-3 list-disc pl-5 text-sm text-foreground/90">
                  {state.suggestions.map((suggestion, index) => (
                    <li key={index} className="transition-all hover:text-primary">{suggestion}</li>
                  ))}
                </ul>
              </div>
            ) : (
               <Alert className="bg-primary/10 border-primary/20">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary font-semibold">Ready for insights?</AlertTitle>
                  <AlertDescription className="text-primary/80">
                    Fill out the form above and let our AI find new ways for you to save money.
                  </AlertDescription>
                </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
