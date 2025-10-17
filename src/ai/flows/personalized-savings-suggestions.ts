'use server';

/**
 * @fileOverview Generates personalized savings suggestions based on user spending habits and financial goals.
 *
 * - generateSavingsSuggestions - A function that generates personalized savings suggestions.
 * - SavingsSuggestionsInput - The input type for the generateSavingsSuggestions function.
 * - SavingsSuggestionsOutput - The return type for the generateSavingsSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavingsSuggestionsInputSchema = z.object({
  spendingHabits: z
    .string()
    .describe('Description of user spending habits.'),
  financialGoals: z
    .string()
    .describe('Description of user financial goals.'),
});
export type SavingsSuggestionsInput = z.infer<typeof SavingsSuggestionsInputSchema>;

const SavingsSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A personalized savings suggestion.')
  ).describe('An array of personalized savings suggestions.'),
});
export type SavingsSuggestionsOutput = z.infer<typeof SavingsSuggestionsOutputSchema>;

export async function generateSavingsSuggestions(
  input: SavingsSuggestionsInput
): Promise<SavingsSuggestionsOutput> {
  return savingsSuggestionsFlow(input);
}

const savingsSuggestionsPrompt = ai.definePrompt({
  name: 'savingsSuggestionsPrompt',
  input: {schema: SavingsSuggestionsInputSchema},
  output: {schema: SavingsSuggestionsOutputSchema},
  prompt: `You are a personal finance advisor providing savings suggestions.

  Based on the user's spending habits and financial goals, provide a list of personalized savings suggestions.

  Spending Habits: {{{spendingHabits}}}
  Financial Goals: {{{financialGoals}}}
  Suggestions:`,
});

const savingsSuggestionsFlow = ai.defineFlow(
  {
    name: 'savingsSuggestionsFlow',
    inputSchema: SavingsSuggestionsInputSchema,
    outputSchema: SavingsSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await savingsSuggestionsPrompt(input);
    return output!;
  }
);
