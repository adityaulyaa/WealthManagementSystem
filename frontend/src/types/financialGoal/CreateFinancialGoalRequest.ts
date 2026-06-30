import type { GoalCategory } from "./FinancialGoalResponse"

export interface CreateFinancialGoalRequest {
  userId: number
  goalName: string
  targetAmount: number
  targetDate: string
  category: GoalCategory
  currentSavings: number
  monthlyContribution: number
}
