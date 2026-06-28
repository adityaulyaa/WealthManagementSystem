export interface FinancialGoalResponse {
  id: number
  userId: number
  goalName: string
  targetAmount: number
  targetDate: string
  category: string
  currentSavings: number
  monthlyContribution: number
  createdAt: string
  updatedAt: string
}
