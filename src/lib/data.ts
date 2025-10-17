import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

// The user object is now deprecated as we will use Firebase Auth.
// This can be removed or kept for reference.
export const user = {
  name: 'Alex Doe',
  avatar: PlaceHolderImages.find(img => img.id === 'user-avatar') as ImagePlaceholder,
};

export const summaryData = {
  totalBalance: 12450.78,
};

export const savingsGoals = [
    {
        id: 1,
        name: 'Dream Vacation to Japan',
        current: 0,
        target: 5000,
    },
    {
        id: 2,
        name: 'New Laptop',
        current: 0,
        target: 2000,
    },
];

export const transactions: { id: number; name: string; category: string; amount: number; date: string; }[] = [];

export const budgets = [
    { id: 1, category: 'Food & Drink', spent: 125.75, total: 400 },
    { id: 2, category: 'Entertainment', spent: 165.99, total: 250 },
    { id: 3, category: 'Groceries', spent: 85.40, total: 300 },
    { id: 4, category: 'Transport', spent: 45.20, total: 150 },
];

export const bills = [
    { id: 1, name: 'Netflix', dueDate: '2024-08-20', amount: 15.99 },
    { id: 2, name: 'Rent', dueDate: '2024-08-01', amount: 1200.00 },
    { id: 3, name: 'Phone Bill', dueDate: '2024-08-15', amount: 60.00 },
];
