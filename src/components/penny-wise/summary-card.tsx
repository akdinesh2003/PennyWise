import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  isCurrency?: boolean;
  change?: string;
  unit?: string;
  className?: string;
}

export function SummaryCard({ title, value, icon: Icon, isCurrency = false, change, unit, className }: SummaryCardProps) {
  const formattedValue = isCurrency
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
    : value.toLocaleString();

  return (
    <Card className={cn("shadow-md transition-transform hover:scale-[1.02] hover:shadow-xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">
          {formattedValue} {unit && <span className="text-lg font-medium text-muted-foreground">{unit}</span>}
        </div>
        {change && (
          <p className="text-xs text-muted-foreground pt-1">
            <span className="text-green-600 dark:text-green-400">{change}</span> from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
