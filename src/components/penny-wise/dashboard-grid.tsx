"use client";

import { useState } from 'react';
import { SummaryCard } from './summary-card';
import { SavingsGoalCarousel } from './savings-goal-carousel';
import { AiInsights } from './ai-insights';
import { TransactionHistory } from './transaction-history';
import { summaryData as initialSummaryData, transactions as initialTransactions, savingsGoals as initialSavingsGoals, budgets as initialBudgets, bills as initialBills } from '@/lib/data';
import { PiggyBank, TrendingUp, History, Sparkles, BrainCircuit, Landmark, HandCoins, QrCode } from 'lucide-react';
import { SendMoney } from './send-money';
import { type SavingsGoalData } from './savings-goal';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { InvestDialog } from './invest-dialog';
import { RequestMoneyDialog } from './request-money-dialog';
import { ReceiveMoneyDialog } from './receive-money-dialog';
import { WithdrawSavingsDialog } from './withdraw-savings-dialog';
import { WithdrawReturnsDialog } from './withdraw-returns-dialog';

export function DashboardGrid() {
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [activeGoalId, setActiveGoalId] = useState(initialSavingsGoals[0]?.id);
  const [investments, setInvestments] = useState({ totalInvested: 0, returns: 0 });
  
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);

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
        amount: smartSaveAmount, // This is a positive contribution to savings
        date: now.toISOString().split('T')[0],
    }

    // A bit of a simplification: we're creating a "negative" transaction for the main balance.
    const newSavingsTransactionDeduction = {
        id: transactions.length + 3,
        name: 'SmartSave Transfer',
        category: 'Savings',
        amount: -smartSaveAmount,
        date: now.toISOString().split('T')[0],
    }

    setTransactions(prevTransactions => [newTransaction, newSavingsTransactionDeduction, ...prevTransactions]);
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

  const handleInvestment = (amount: number, type: string) => {
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

    const typeName = type.charAt(0).toUpperCase() + type.slice(1);

    setTransactions(prev => [
        {
            id: prev.length + 1,
            name: `Investment in ${typeName}`,
            category: 'Investment',
            amount: -amount,
            date: new Date().toISOString().split('T')[0],
        },
        ...prev,
    ])
  };

  const handleRequestMoney = (amount: number) => {
    setSummaryData(prev => ({
        ...prev,
        totalBalance: prev.totalBalance + amount,
    }));
    setTransactions(prev => [
        {
            id: prev.length + 1,
            name: 'Funds Added',
            category: 'Deposit',
            amount: amount,
            date: new Date().toISOString().split('T')[0],
        },
        ...prev,
    ]);
  };

  const handleWithdrawSavings = (amount: number) => {
    // Add to total balance
    setSummaryData(prev => ({
      ...prev,
      totalBalance: prev.totalBalance + amount,
    }));

    // Deduct from savings goals
    setSavingsGoals(prevGoals => {
      let remainingWithdrawal = amount;
      const updatedGoals = [...prevGoals];
      
      for (let i = 0; i < updatedGoals.length; i++) {
        if (remainingWithdrawal <= 0) break;
        const goal = updatedGoals[i];
        const amountToWithdraw = Math.min(goal.current, remainingWithdrawal);
        goal.current -= amountToWithdraw;
        remainingWithdrawal -= amountToWithdraw;
      }

      return updatedGoals;
    });

    // Add transaction
    setTransactions(prev => [
      {
        id: prev.length + 1,
        name: 'Withdrawal from Savings',
        category: 'Transfers',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
      },
      ...prev,
    ]);
  };

  const handleWithdrawReturns = (amount: number) => {
    // Add to total balance
    setSummaryData(prev => ({
      ...prev,
      totalBalance: prev.totalBalance + amount,
    }));

    // Deduct from investment returns
    setInvestments(prev => ({
        ...prev,
        returns: prev.returns - amount
    }));

    // Add transaction
    setTransactions(prev => [
      {
        id: prev.length + 1,
        name: 'Withdrawal from Returns',
        category: 'Transfers',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
      },
      ...prev,
    ]);
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
        <WithdrawSavingsDialog
          totalSavings={totalSavings}
          onWithdraw={handleWithdrawSavings}
        >
          <div>
            <SummaryCard
              title="Total Savings"
              value={totalSavings}
              icon={Landmark}
              isCurrency
            />
          </div>
        </WithdrawSavingsDialog>

        <SummaryCard
          title="Total Invested"
          value={investments.totalInvested}
          icon={BrainCircuit}
          isCurrency
        />
         <WithdrawReturnsDialog
          totalReturns={investments.returns}
          onWithdraw={handleWithdrawReturns}
        >
          <div>
            <SummaryCard
              title="Total Returns"
              value={investments.returns}
              icon={TrendingUp}
              isCurrency
              change="+1.2%"
            />
          </div>
        </WithdrawReturnsDialog>
      </div>

      <div className="lg:col-span-2 space-y-4">
         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            <SendMoney handleSendMoney={handleSendMoney} />
            <RequestMoneyDialog onRequestMoney={handleRequestMoney}>
                <Button variant="outline" className="w-full">
                    <HandCoins className="mr-2 h-4 w-4" />
                    Request Money
                </Button>
            </RequestMoneyDialog>
            <ReceiveMoneyDialog>
                 <Button variant="outline" className="w-full">
                    <QrCode className="mr-2 h-4 w-4" />
                    Receive Money
                </Button>
            </ReceiveMoneyDialog>
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
