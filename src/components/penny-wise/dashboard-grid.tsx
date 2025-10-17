"use client";

import { useState } from 'react';
import { SummaryCard } from './summary-card';
import { SavingsGoalCarousel } from './savings-goal-carousel';
import { AiInsights } from './ai-insights';
import { TransactionHistory } from './transaction-history';
import { summaryData as initialSummaryData, transactions as initialTransactions, savingsGoals as initialSavingsGoals, budgets as initialBudgets, bills as initialBills } from '@/lib/data';
import { PiggyBank, TrendingUp, History, Sparkles, PieChart, Target, Calendar, HeartPulse, BrainCircuit } from 'lucide-react';
import { SendMoney } from './send-money';
import { type SavingsGoalData } from './savings-goal';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { SpendingBreakdown } from './spending-breakdown';
import { MonthlyBudgeting } from './monthly-budgeting';
import { UpcomingBills } from './upcoming-bills';
import { FinancialHealthScore } from './financial-health-score';
import { InvestDialog } from './invest-dialog';

export function DashboardGrid() {
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [activeGoalId, setActiveGoalId] = useState(initialSavingsGoals[0]?.id);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [bills, setBills] = useState(initialBills);
  const [investments, setInvestments] = useState({ totalInvested: 0, returns: 0 });

  const handleSendMoney = (amount: number, smartSaveAmount: number, recipient: string) => {
    const totalDeduction = amount + smartSaveAmount;

    // Update summary data
    setSummaryData(prevData => ({
      ...prevData,
      totalBalance: prevData.totalBalance - totalDeduction,
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

  const handleInvestment = (amount: number) => {
    setSummaryData(prev => ({
        ...prev,
        totalBalance: prev.totalBalance - amount
    }));
    setInvestments(prev => ({
        ...prev,
        totalInvested: prev.totalInvested + amount,
        // Simulate some returns for now
        returns: prev.returns + amount * 0.05 
    }));
    setTransactions(prev => [
        {
            id: prev.length + 1,
            name: 'Investment',
            category: 'Investment',
            amount: -amount,
            date: new Date().toISOString().split('T')[0],
        },
        ...prev,
    ])
  };


  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          value={summaryData.totalBalance}
          icon={PiggyBank}
          isCurrency
        />
        <SummaryCard
          title="Total Invested"
          value={investments.totalInvested}
          icon={BrainCircuit}
          isCurrency
        />
         <SummaryCard
          title="Total Returns"
          value={investments.returns}
          icon={TrendingUp}
          isCurrency
          change="+1.2%"
        />
      </div>

      <div className="lg:col-span-2 space-y-4">
         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Insights
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>AI-Powered Savings Insights</DialogTitle>
                  </DialogHeader>
                  <AiInsights />
              </DialogContent>
            </Dialog>
            <InvestDialog onInvest={handleInvestment}>
                 <Button variant="outline" className="w-full">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Invest
                </Button>
            </InvestDialog>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <PieChart className="mr-2 h-4 w-4" />
                        Breakdown
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Spending Breakdown</DialogTitle>
                    </DialogHeader>
                    <SpendingBreakdown transactions={transactions} />
                </DialogContent>
            </Dialog>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Target className="mr-2 h-4 w-4" />
                        Budgets
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Monthly Budgets</DialogTitle>
                    </DialogHeader>
                    <MonthlyBudgeting budgets={budgets} />
                </DialogContent>
            </Dialog>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Bills
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Upcoming Bills</DialogTitle>
                    </DialogHeader>
                    <UpcomingBills bills={bills} />
                </DialogContent>
            </Dialog>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <HeartPulse className="mr-2 h-4 w-4" />
                        Health
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Financial Health Score</DialogTitle>
                    </DialogHeader>
                    <FinancialHealthScore />
                </DialogContent>
            </Dialog>
        </div>
      </div>


      <div className="lg:col-span-1 flex flex-col gap-6">
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
