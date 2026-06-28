import type { Goal } from './types'

// Placeholder icon until backend provides one
export const placeholderGoalIcon = (
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6m0 0l4-2m-4 2L8 7m4 2v12M5 21h14" />
)

export const goals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Buy House',
    category: 'Property',
    target: 500_000_000,
    current: 270_000_000,
    targetDate: 'Dec 2030',
    risk: 'MEDIUM',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    id: 'goal-2',
    name: 'Education Fund',
    category: 'Education',
    target: 150_000_000,
    current: 96_000_000,
    targetDate: 'Jul 2028',
    risk: 'LOW',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 2 8l10 5 10-5-10-5zM2 14l10 5 10-5M2 8v6M22 8v6" />
    ),
  },
  {
    id: 'goal-3',
    name: 'Dream Vacation',
    category: 'Lifestyle',
    target: 40_000_000,
    current: 31_000_000,
    targetDate: 'Jan 2027',
    risk: 'LOW',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18l6-12 4 8 3-5 5 9H3z" />
    ),
  },
  {
    id: 'goal-4',
    name: 'New Business Capital',
    category: 'Business',
    target: 300_000_000,
    current: 45_000_000,
    targetDate: 'Mar 2029',
    risk: 'HIGH',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
    ),
  },
  {
    id: 'goal-5',
    name: 'Retirement Reserve',
    category: 'Retirement',
    target: 1_000_000_000,
    current: 410_000_000,
    targetDate: 'Dec 2045',
    risk: 'MEDIUM',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6m0 0l4-2m-4 2L8 7m4 2v12M5 21h14" />
    ),
  },
]
