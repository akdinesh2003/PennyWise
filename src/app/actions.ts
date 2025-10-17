"use server";

import { generateSavingsSuggestions } from '@/ai/flows/personalized-savings-suggestions';
import { z } from 'zod';

export type FormState = {
  suggestions?: string[];
  error?: string;
  timestamp?: number;
};

const SuggestionsSchema = z.object({
  spendingHabits: z.string().min(10, "Please describe your spending habits in more detail."),
  financialGoals: z.string().min(10, "Please describe your financial goals in more detail."),
});

export async function getSavingsSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SuggestionsSchema.safeParse({
    spendingHabits: formData.get('spendingHabits'),
    financialGoals: formData.get('financialGoals'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.spendingHabits?.[0] || validatedFields.error.flatten().fieldErrors.financialGoals?.[0],
      timestamp: Date.now(),
    };
  }

  try {
    const result = await generateSavingsSuggestions(validatedFields.data);
    if (result && result.suggestions) {
      return { suggestions: result.suggestions, timestamp: Date.now() };
    }
    return { error: 'Could not generate suggestions.', timestamp: Date.now() };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred.', timestamp: Date.now() };
  }
}
