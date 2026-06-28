import type { ReactNode } from 'react'
import type { RiskLevel } from '../../types/common'

export interface Goal {
  id: string
  name: string
  category: string
  target: number
  current: number
  targetDate: string
  risk: RiskLevel
  icon: ReactNode
}

export interface GoalCardProps {
  goal: Goal
  isSelected: boolean
  onSelect: () => void
}

export interface ProgressBarProps {
  percent: number
  size?: 'sm' | 'md'
}