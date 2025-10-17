"use client";

import { useState } from 'react';
import { SummaryCard } from './summary-card';
import { SavingsGoalCarousel } from './savings-goal-carousel';
import { AiInsights } from './ai-insights';
import { TransactionHistory } from './transaction-history';
import { summaryData as initialSummaryData, transactions as initialTransactions, savingsGoals as initialSavingsGoals } from '@/lib/data';
import { PiggyBank, TrendingUp, Coins, Flame, History } from 'lucide-react';
import { SendMoney } from './send-money';
import { type SavingsGoalData } from './savings-goal';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

export function DashboardGrid() {
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [activeGoalId, setActiveGoalId] = useState(initialSavingsGoals[0]?.id);

  const handleSendMoney = (amount: number, smartSaveAmount: number, recipient: string) => {
    const totalDeduction = amount + smartSaveAmount;

    // Update summary data
    setSummaryData(prevData => ({
      ...prevData,
      totalBalance: prevData.totalBalance - totalDeduction,
      dailySavings: prevData.dailySavings + smartSaveAmount,
      pennyPoints: prevData.pennyPoints + Math.floor(amount / 10), // Example: 1 point per $10
    }));

    // Update savings goal
    setSavingsGoals(prevGoals => 
        prevGoals.map(goal => 
            goal.id === activeGoalId ? { ...goal, current: goal.current + smartSaveAmount } : goal
        )
    );

    // Create new transaction records
    const now = new Date();
    const newTransaction = {
      id: transactions.length + 1,
      name: `Sent to ${recipient}`,
      category: 'Payments',
      amount: -amount,
      date: now.toISOString().split('T')[0],
    };

    const newSavingsTransaction = {
        id: transactions.length + 2,
        name: 'SmartSave Transfer',
        category: 'Savings',
        amount: -smartSaveAmount, // This is a deduction from balance
        date: now.toISOString().split('T')[0],
    }

    setTransactions(prevTransactions => [newTransaction, newSavingsTransaction, ...prevTransactions]);
  };
  
  const handleAddGoal = (name: string, target: number) => {
    const newGoal: SavingsGoalData = {
      id: savingsGoals.length > 0 ? Math.max(...savingsGoals.map(g => g.id)) + 1 : 1,
      name,
      target,
      current: 0,
    };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const handleDeleteGoal = (goalId: number) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== goalId));
    // If the deleted goal was the active one, select the first one if it exists
    if (activeGoalId === goalId) {
      const newActiveGoal = savingsGoals.find(g => g.id !== goalId);
      setActiveGoalId(newActiveGoal ? newActiveGoal.id : undefined);
    }
  };


  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          value={summaryData.totalBalance}
          icon={PiggyBank}
          isCurrency
        />
        <SummaryCard
          title="Daily Savings"
          value={summaryData.dailySavings}
          icon={TrendingUp}
          isCurrency
          change="+5.2%"
        />
        <SummaryCard
          title="Penny Points"
          value={summaryData.pennyPoints}
          icon={Coins}
        />
        <SummaryCard
          title="Savings Streak"
          value={summaryData.savingsStreak}
          icon={Flame}
          unit="days"
        />
      </div>

      <div className="lg:col-span-2">
        <AiInsights />
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
            <SendMoney handleSendMoney={handleSendMoney} />
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <History className="mr-2 h-4 w-4" />
                        History
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle>Transaction History</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                        <TransactionHistory transactions={transactions} />
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
        <SavingsGoalCarousel 
          savingsGoals={savingsGoals} 
          onActiveGoalChange={(goalId) => setActiveGoalId(goalId)}
          onAddGoal={handleAddGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      </div>
    </div>
  );
}
