"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { bills as BillType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { differenceInDays, parseISO } from "date-fns";

type Bill = (typeof BillType)[0];


function BillItem({ bill }: { bill: Bill }) {
    const dueDate = parseISO(bill.dueDate);
    const daysUntilDue = differenceInDays(dueDate, new Date());
    
    let urgencyColor = 'text-green-500';
    if (daysUntilDue <= 7) urgencyColor = 'text-yellow-500';
    if (daysUntilDue <= 3) urgencyColor = 'text-red-500';

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">{bill.name}</p>
                <p className={cn("text-sm", urgencyColor)}>
                    Due in {daysUntilDue} day{daysUntilDue !== 1 && 's'}
                </p>
            </div>
            <div className="font-semibold text-lg">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(bill.amount)}
            </div>
        </div>
    )
}

export function UpcomingBills({ bills }: { bills: Bill[] }) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
        <CardDescription>
          Don't miss your upcoming payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {bills
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .map(bill => (
                <BillItem key={bill.id} bill={bill} />
        ))}
      </CardContent>
    </Card>
  )
}
