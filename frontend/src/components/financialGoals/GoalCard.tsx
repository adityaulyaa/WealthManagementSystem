import { formatRupiah } from './utils'
import { ProgressBar } from './ProgressBar'
import type { Goal } from './types'

interface GoalCardProps {
  goal: Goal
  isSelected: boolean
  onSelect: () => void
}

export function GoalCard({ goal, isSelected, onSelect }: GoalCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`mm-row w-full text-left bg-[#0C1224] border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
        isSelected ? 'border-[#C99A4B]/50 bg-[#10172A]' : 'border-[#1C2540] hover:border-[#C99A4B]/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[14px] text-white font-medium truncate">{goal.goalName}</p>
            <p className="text-[12px] text-[#7E8AA8]">{goal.category}</p>
          </div>
        </div>
        <span className="text-[13px] text-[#D9B36C] font-semibold shrink-0">{goal.progressPercentage}%</span>
      </div>

      <ProgressBar percent={goal.progressPercentage} size="sm" />

      <div className="flex items-center justify-between mt-3 text-[12px]">
        <span className="text-[#7E8AA8]">
          Current <span className="text-[#A9B2CC]">{formatRupiah(goal.currentSavings)}</span>
        </span>
        <span className="text-[#7E8AA8]">
          Target <span className="text-[#A9B2CC]">{formatRupiah(goal.targetAmount)}</span>
        </span>
      </div>
    </button>
  )
}