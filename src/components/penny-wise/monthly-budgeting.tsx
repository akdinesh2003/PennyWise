"use client"

import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { budgets as BudgetType } from "@/lib/data"

type Budget = (typeof BudgetType)[0];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

function BudgetCategory({ budget }: { budget: Budget }) {
    const progress = (budget.spent / budget.total) * 100;
    const remaining = budget.total - budget.spent;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{budget.category}</h4>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{formatCurrency(remaining)}</span> left
                </p>
            </div>
            <Progress value={progress} />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(budget.spent)}</span>
                <span>{formatCurrency(budget.total)}</span>
            </div>
        </div>
    )
}

export function MonthlyBudgeting({ budgets }: { budgets: Budget[] }) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Monthly Budgets</CardTitle>
        <CardDescription>
          Keep track of your spending to stay on top of your finances.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {budgets.map(budget => (
            <BudgetCategory key={budget.id} budget={budget} />
        ))}
      </CardContent>
    </Card>
  )
}
