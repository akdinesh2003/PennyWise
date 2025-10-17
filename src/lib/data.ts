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

export const transactions = [
  { id: 1, name: 'Starbucks Coffee', category: 'Food & Drink', amount: -5.75, date: '2024-07-22' },
  { id: 2, name: 'Monthly Salary', category: 'Income', amount: 3500, date: '2024-07-21' },
  { id: 3, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '2024-07-20' },
  { id: 4, name: 'Groceries from Whole Foods', category: 'Groceries', amount: -85.40, date: '2024-07-19' },
  { id: 5, name: 'Concert Tickets', category: 'Entertainment', amount: -150.00, date: '2024-07-18' },
  { id: 6, name: 'Gasoline', category: 'Transport', amount: -45.20, date: '2024-07-17' },
  { id: 7, name: 'Dinner at Italian Restaurant', category: 'Food & Drink', amount: -120.00, date: '2024-07-16' },
  { id: 8, name: 'Gym Membership', category: 'Health', amount: -40.00, date: '2024-07-15' },
  { id: 9, name: 'Paycheck', category: 'Income', amount: 1500.00, date: '2024-07-05' },
];

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
