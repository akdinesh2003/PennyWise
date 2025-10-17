"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUser } from '@/firebase';
import Image from 'next/image';
import { QrCode } from 'lucide-react';

interface ReceiveMoneyDialogProps {
  children: React.ReactNode;
}

export function ReceiveMoneyDialog({ children }: ReceiveMoneyDialogProps) {
  const { user } = useUser();
  const qrData = `pennywise:user?id=${user?.uid || 'anonymous'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="font-headline text-2xl">Receive Money</DialogTitle>
          <DialogDescription>
            Share this QR code to receive payments directly into your PennyWise account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="p-4 bg-white rounded-lg border">
                <Image
                    src={qrCodeUrl}
                    alt="QR Code to receive money"
                    width={250}
                    height={250}
                />
            </div>
            <p className="text-sm text-muted-foreground text-center">
                Your unique ID: <br />
                <span className="font-mono text-xs break-all">{user?.uid || 'anonymous'}</span>
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
