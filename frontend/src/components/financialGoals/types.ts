import type { ReactNode } from 'react'

export interface Goal {
  id: number
  goalName: string
  category: string
  targetAmount: number
  currentSavings: number
  targetDate: string
  progressPercentage: number
  monthsRemaining: number
  status: string
  insights: string[]
  icon?: ReactNode
}

export interface ProgressBarProps {
  percent: number
  size?: 'sm' | 'md'
}
