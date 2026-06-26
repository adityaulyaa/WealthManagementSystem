import type { ReactNode } from 'react'

export interface NavItem {
  name: string
  icon: ReactNode
}

export interface SummaryCard {
  label: string
  value: string
  trend: string
  positive: boolean
}

export interface Activity {
  title: string
  amount: string
  time: string
  positive: boolean
}

export interface QuickAction {
  title: string
  description: string
  icon: ReactNode
}
