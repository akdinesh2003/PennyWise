"use client";

import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Separator } from '../ui/separator';

type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
};

function TransactionItem({ transaction, showSeparator }: { transaction: Transaction, showSeparator: boolean }) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className={cn(
          "rounded-full p-2 flex items-center justify-center",
          transaction.amount > 0 ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'
        )}>
          {transaction.amount > 0 ? (
            <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowDownLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div className="flex-grow">
          <p className="font-medium">{transaction.name}</p>
          <p className="text-sm text-muted-foreground">{transaction.category}</p>
        </div>
        <div className={cn(
          "font-semibold text-right",
          transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : ''
        )}>
          <p>{formatCurrency(transaction.amount)}</p>
          <p className="text-xs font-normal text-muted-foreground">{transaction.date}</p>
        </div>
      </div>
      {showSeparator && <Separator className="my-4" />}
    </>
  );
}


export function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  return (
    <ul className="space-y-4 pr-4">
        {transactions.map((t, index) => (
            <li key={t.id}>
            <TransactionItem transaction={t} showSeparator={index < transactions.length - 1} />
            </li>
        ))}
    </ul>
  );
}
