export interface NavItem {
  name: string
  icon: JSX.Element
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
  icon: JSX.Element
}
