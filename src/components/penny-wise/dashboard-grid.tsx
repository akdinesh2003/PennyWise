"use client";

import { useState } from 'react';
import { SummaryCard } from './summary-card';
import { SavingsGoal } from './savings-goal';
import { AiInsights } from './ai-insights';
import { TransactionHistory } from './transaction-history';
import { summaryData as initialSummaryData, transactions as initialTransactions, savingsGoal as initialSavingsGoal } from '@/lib/data';
import { PiggyBank, TrendingUp, Coins, Flame, ArrowDown, ArrowUp } from 'lucide-react';
import { SendMoney } from './send-money';

export function DashboardGrid() {
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [savingsGoal, setSavingsGoal] = useState(initialSavingsGoal);

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
    setSavingsGoal(prevGoal => ({
        ...prevGoal,
        current: prevGoal.current + smartSaveAmount,
    }));

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
        amount: smartSaveAmount,
        date: now.toISOString().split('T')[0],
    }

    setTransactions(prevTransactions => [newTransaction, newSavingsTransaction, ...prevTransactions]);
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
        <SendMoney handleSendMoney={handleSendMoney} />
        <SavingsGoal savingsGoal={savingsGoal} />
      </div>

      <div className="lg:col-span-3">
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}
