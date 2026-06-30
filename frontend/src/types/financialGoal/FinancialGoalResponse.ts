export type GoalCategory = 'RETIREMENT' | 'EDUCATION' | 'PROPERTY' | 'EMERGENCY' | 'OTHER';

export interface FinancialGoalResponse {
  id: number
  userId: number
  goalName: string
  targetAmount: number
  targetDate: string
  category: GoalCategory
  currentSavings: number
  monthlyContribution: number
  createdAt: string
  updatedAt: string
  progressPercentage: number
  monthsRemaining: number
  status: string
  insights: string[]
}