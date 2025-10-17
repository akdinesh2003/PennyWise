import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { transactions } from '@/lib/data';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

export function TransactionHistory() {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((t, index) => (
            <li key={t.id}>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "rounded-full p-2 flex items-center justify-center",
                  t.amount > 0 ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'
                )}>
                  {t.amount > 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.category}</p>
                </div>
                <div className={cn(
                  "font-semibold",
                  t.amount > 0 ? 'text-green-600 dark:text-green-400' : ''
                )}>
                  {formatCurrency(t.amount)}
                </div>
              </div>
              {index < transactions.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
