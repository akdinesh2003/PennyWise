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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Send } from 'lucide-react';

const smartSavePercentages = [0, 2, 3, 5, 7, 10];

export function SendMoney() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [smartSave, setSmartSave] = useState(0);

  const totalAmount = amount + (amount * smartSave) / 100;

  const handleSend = () => {
    // In a real app, you would handle the transaction logic here.
    console.log({
      recipient: 'Friend',
      amount,
      smartSave,
      totalAmount,
    });
    setOpen(false);
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
            <Input id="recipient" defaultValue="Alex Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount ($)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div>
            <Label className="font-medium">SmartSave</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Save a small percentage with this transaction.
            </p>
            <RadioGroup
              defaultValue="0"
              onValueChange={(value) => setSmartSave(Number(value))}
              className="flex flex-wrap gap-2"
            >
              {smartSavePercentages.map((p) => (
                <div key={p} className="flex items-center space-x-2">
                   <RadioGroupItem value={String(p)} id={`r${p}`} />
                  <Label htmlFor={`r${p}`} className="cursor-pointer">
                    {p > 0 ? `${p}%` : 'None'}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="mt-4 p-4 bg-secondary rounded-lg">
             <div className="flex justify-between text-sm">
                <span>Send Amount:</span>
                <span>${amount.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span>SmartSave ({smartSave}%):</span>
                <span>${((amount * smartSave) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                <span>Total to Deduct:</span>
                <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSend} disabled={amount <= 0}>
            Send ${totalAmount.toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
