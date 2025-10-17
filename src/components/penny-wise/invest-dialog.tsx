"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit } from 'lucide-react';

interface InvestDialogProps {
  children: React.ReactNode;
  onInvest: (amount: number) => void;
}

export function InvestDialog({ children, onInvest }: InvestDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleInvest = () => {
    const investmentAmount = parseFloat(amount);
    if (!investmentAmount || investmentAmount <= 0) {
        toast({
            variant: "destructive",
            title: "Invalid Amount",
            description: "Please enter a valid amount to invest.",
        });
        return;
    }

    onInvest(investmentAmount);
    toast({
        title: 'Investment Successful!',
        description: `You have invested $${investmentAmount.toFixed(2)}.`,
    });
    setOpen(false);
    setAmount('');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <div className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <DialogTitle className="font-headline text-2xl">Invest Your Money</DialogTitle>
            </div>
          <DialogDescription>
            Grow your wealth by investing. Enter the amount you'd like to invest from your total balance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="investment-amount">Amount to Invest ($)</Label>
                <Input type="number" id="investment-amount" placeholder="e.g., 500" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleInvest}>Invest Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
