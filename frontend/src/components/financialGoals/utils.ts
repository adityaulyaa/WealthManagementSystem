import type { Goal } from './types'
import { riskColor, formatRupiah } from '../../utils/common'

export { riskColor, formatRupiah }

export function getProgress(goal: Goal): number {
  return Math.min(100, Math.round((goal.currentSavings / goal.targetAmount) * 100))
}