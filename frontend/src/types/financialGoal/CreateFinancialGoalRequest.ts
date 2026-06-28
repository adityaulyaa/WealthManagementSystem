export interface CreateFinancialGoalRequest {
  userId: number
  goalName: string
  targetAmount: number
  targetDate: string
  category: string
  currentSavings: number
  monthlyContribution: number
}
