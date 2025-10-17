"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { type transactions as TransactionType } from "@/lib/data"

type Transaction = (typeof TransactionType)[0];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function SpendingBreakdown({ transactions }: { transactions: Transaction[] }) {
    
    const chartData = React.useMemo(() => {
        const spending = transactions
            .filter(t => t.amount < 0 && t.category !== 'Savings' && t.category !== 'Payments')
            .reduce((acc, t) => {
                if (!acc[t.category]) {
                    acc[t.category] = 0;
                }
                acc[t.category] += Math.abs(t.amount);
                return acc;
            }, {} as Record<string, number>);

        return Object.entries(spending).map(([category, amount], index) => ({
            name: category,
            value: amount,
            fill: COLORS[index % COLORS.length],
        }));
    }, [transactions]);

    const totalSpending = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0);
    }, [chartData]);
    
    const chartConfig = React.useMemo(() => {
        const config: any = {};
        chartData.forEach(item => {
            config[item.name] = {
                label: item.name,
                color: item.fill,
            }
        });
        return config;
    }, [chartData]);

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>July 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSpending.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total spending for the current month.
        </div>
      </CardFooter>
    </Card>
  )
}
