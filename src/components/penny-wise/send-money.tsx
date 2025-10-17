"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const smartSavePercentages = [0, 2, 3, 5, 7, 10];

type SendMoneyProps = {
    handleSendMoney: (amount: number, smartSaveAmount: number, recipient: string) => void;
}

export function SendMoney({ handleSendMoney }: SendMoneyProps) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState('Alex Doe');
  const [amount, setAmount] = useState('');
  const [smartSave, setSmartSave] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const amountNumber = Number(amount) || 0;
  const smartSaveAmount = (amountNumber * smartSave) / 100;
  const totalAmount = amountNumber + smartSaveAmount;

  const onSend = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2 second delay
    
    handleSendMoney(amountNumber, smartSaveAmount, recipient);
    toast({
        title: 'Transaction Successful',
        description: `₹${amountNumber.toFixed(2)} sent to ${recipient}. ₹${smartSaveAmount.toFixed(2)} moved to savings.`,
    });

    setIsSending(false);
    setOpen(false);
    setAmount('');
    setSmartSave(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Send Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            Send money to your friends and family with an option to save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient
            </Label>
            <Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            <Label className="font-medium">SmartSave</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Save a small percentage with this transaction.
            </p>
            <div className="flex flex-wrap gap-2">
              {smartSavePercentages.map((p) => (
                <Button
                  key={p}
                  variant={smartSave === p ? 'default' : 'outline'}
                  onClick={() => setSmartSave(p)}
                >
                  {p > 0 ? `${p}%` : 'None'}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-4 p-4 bg-secondary rounded-lg">
             <div className="flex justify-between text-sm">
                <span>Send Amount:</span>
                <span>₹{amountNumber.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span>SmartSave ({smartSave}%):</span>
                <span>₹{smartSaveAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                <span>Total to Deduct:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSend} disabled={amountNumber <= 0 || isSending}>
            {isSending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                `Send ₹${totalAmount.toFixed(2)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
