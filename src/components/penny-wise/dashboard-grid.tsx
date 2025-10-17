import { SummaryCard } from './summary-card';
import { SavingsGoal } from './savings-goal';
import { AiInsights } from './ai-insights';
import { TransactionHistory } from './transaction-history';
import { summaryData } from '@/lib/data';
import { PiggyBank, TrendingUp, Coins, Flame } from 'lucide-react';
import { SendMoney } from './send-money';

export function DashboardGrid() {
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
        <SendMoney />
        <SavingsGoal />
      </div>

      <div className="lg:col-span-3">
        <TransactionHistory />
      </div>
    </div>
  );
}
