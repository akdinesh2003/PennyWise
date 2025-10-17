import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import { Award, Trophy, Rocket, Target } from 'lucide-react';

export const user = {
  name: 'Alex Doe',
  avatar: PlaceHolderImages.find(img => img.id === 'user-avatar') as ImagePlaceholder,
};

export const summaryData = {
  totalBalance: 12450.78,
  dailySavings: 15.50,
  pennyPoints: 2300,
  savingsStreak: 42,
};

export const savingsGoal = {
  name: 'Dream Vacation to Japan',
  current: 3800,
  target: 5000,
};

export const transactions = [
  { id: 1, name: 'Starbucks Coffee', category: 'Food & Drink', amount: -5.75, date: '2024-07-22' },
  { id: 2, name: 'Monthly Salary', category: 'Income', amount: 3500, date: '2024-07-21' },
  { id: 3, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: '2024-07-20' },
  { id: 4, name: 'Groceries from Whole Foods', category: 'Groceries', amount: -85.40, date: '2024-07-19' },
  { id: 5, name: 'Concert Tickets', category: 'Entertainment', amount: -150.00, date: '2024-07-18' },
];

export const badges = [
  { id: 1, name: 'Budget Master', icon: Award, color: 'text-yellow-500' },
  { id: 2, name: 'Streak Champion', icon: Trophy, color: 'text-blue-500' },
  { id: 3, name: 'Investment Pro', icon: Rocket, color: 'text-green-500' },
  { id: 4, name: 'Goal Getter', icon: Target, color: 'text-purple-500' },
];

export const leaderboard = [
  { id: 1, name: 'Jane D.', points: 5800, avatarId: '2' },
  { id: 2, name: 'You', points: summaryData.pennyPoints, avatarId: '100' },
  { id: 3, name: 'Mike L.', points: 1950, avatarId: '3' },
  { id: 4, name: 'Sarah K.', points: 1200, avatarId: '4' },
];
