"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';

interface WithdrawReturnsDialogProps {
  children: React.ReactNode;
  totalReturns: number;
  onWithdraw: (amount: number) => void;
}

export function WithdrawReturnsDialog({
  children,
  totalReturns,
  onWithdraw,
}: WithdrawReturnsDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to withdraw.',
      });
      return;
    }
    if (withdrawAmount > totalReturns) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Funds',
        description: 'You cannot withdraw more than your total returns.',
      });
      return;
    }

    onWithdraw(withdrawAmount);
    toast({
      title: 'Withdrawal Successful!',
      description: `${formatCurrency(
        withdrawAmount
      )} has been transferred to your main balance.`,
    });
    setOpen(false);
    setAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <DialogTitle className="font-headline text-2xl">
              Withdraw Returns
            </DialogTitle>
          </div>
          <DialogDescription>
            Transfer your investment returns back to your main balance.
            Available to withdraw: {formatCurrency(totalReturns)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="withdraw-amount">Amount to Withdraw (₹)</Label>
            <Input
              type="number"
              id="withdraw-amount"
              placeholder="e.g., 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw}>Withdraw Funds</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
