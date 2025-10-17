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
import { HandCoins } from 'lucide-react';

interface RequestMoneyDialogProps {
  children: React.ReactNode;
  onRequestMoney: (amount: number) => void;
}

export function RequestMoneyDialog({ children, onRequestMoney }: RequestMoneyDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleRequest = () => {
    const requestAmount = parseFloat(amount);
    if (!requestAmount || requestAmount <= 0) {
        toast({
            variant: "destructive",
            title: "Invalid Amount",
            description: "Please enter a valid amount to request.",
        });
        return;
    }

    onRequestMoney(requestAmount);
    toast({
        title: 'Funds Added!',
        description: `You have successfully added $${requestAmount.toFixed(2)} to your account.`,
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
                <HandCoins className="h-6 w-6 text-primary" />
                <DialogTitle className="font-headline text-2xl">Request Money</DialogTitle>
            </div>
          <DialogDescription>
            Add funds to your total balance. Enter the amount you'd like to add.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="request-amount">Amount to Add ($)</Label>
                <Input type="number" id="request-amount" placeholder="e.g., 100" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleRequest}>Add Funds</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
