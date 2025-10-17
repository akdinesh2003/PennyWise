"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { transactions } from '@/lib/data';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

function TransactionItem({ transaction, showSeparator }: { transaction: typeof transactions[0], showSeparator: boolean }) {
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
      {showSeparator && <Separator className="mt-4" />}
    </>
  );
}


export function TransactionHistory() {
  const recentTransactions = transactions.slice(0, 3);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentTransactions.map((t, index) => (
            <li key={t.id}>
              <TransactionItem transaction={t} showSeparator={index < recentTransactions.length - 1} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">View All</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Transaction History</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-96">
              <ul className="space-y-4 pr-4">
                {transactions.map((t, index) => (
                  <li key={t.id}>
                    <TransactionItem transaction={t} showSeparator={index < transactions.length - 1} />
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
