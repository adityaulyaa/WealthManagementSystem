import type { Goal } from './types'

export const goals: Goal[] = [
  {
    id: 1,
    goalName: 'Buy House',
    category: 'Property',
    targetAmount: 500_000_000,
    currentSavings: 270_000_000,
    targetDate: '2030-12-31',
    status: 'ON_TRACK',
    progressPercentage: 54,
    monthsRemaining: 12,
    insights: ["Target dapat tercapai dalam 12 bulan"],
  },
  {
    id: 2,
    goalName: 'Education Fund',
    category: 'Education',
    targetAmount: 150_000_000,
    currentSavings: 96_000_000,
    targetDate: '2028-07-31',
    status: 'ON_TRACK',
    progressPercentage: 64,
    monthsRemaining: 8,
    insights: ["Target dapat tercapai dalam 8 bulan"],
  }
]
