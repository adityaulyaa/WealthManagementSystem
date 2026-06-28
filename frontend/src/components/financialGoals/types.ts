import type { ReactNode } from 'react'

export type RiskLevel = 'Low' | 'Medium' | 'High'

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

export interface NavItem {
  name: string
  icon: ReactNode
}

export interface ProgressBarProps {
  percent: number
  size?: 'sm' | 'md'
}

export interface GoalCardProps {
  goal: Goal
  isSelected: boolean
  onSelect: () => void
}