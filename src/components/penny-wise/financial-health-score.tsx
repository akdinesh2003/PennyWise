"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "../ui/progress"
import { CheckCircle2 } from "lucide-react"

export function FinancialHealthScore() {
  const score = 78; // Example score
  return (
    <Card className="sm:col-span-2 border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>Financial Health Score</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Your score is looking good! Keep up the great work.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                className="stroke-current text-gray-200 dark:text-gray-700"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                ></circle>
                <circle
                className="stroke-current text-primary"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40 * (score / 100)} ${2 * Math.PI * 40}`}
                strokeDashoffset={2 * Math.PI * 40 * 0.25}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{score}</span>
            </div>
        </div>
        <p className="mt-2 text-lg font-medium">Good</p>
      </CardContent>
      <CardFooter>
        <ul className="grid w-full gap-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Consistent Savings</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Healthy Spending Habits</li>
        </ul>
      </CardFooter>
    </Card>
  )
}
