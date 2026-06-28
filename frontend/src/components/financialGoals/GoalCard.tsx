import type { GoalCardProps } from './types'
import { getProgress, formatRupiah } from './utils'
import { ProgressBar } from './ProgressBar'

export function GoalCard({ goal, isSelected, onSelect }: GoalCardProps) {
  const progress = getProgress(goal)
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
              {goal.icon}
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[14px] text-white font-medium truncate">{goal.name}</p>
            <p className="text-[12px] text-[#7E8AA8]">{goal.category}</p>
          </div>
        </div>
        <span className="text-[13px] text-[#D9B36C] font-semibold shrink-0">{progress}%</span>
      </div>

      <ProgressBar percent={progress} size="sm" />

      <div className="flex items-center justify-between mt-3 text-[12px]">
        <span className="text-[#7E8AA8]">
          Current <span className="text-[#A9B2CC]">{formatRupiah(goal.current)}</span>
        </span>
        <span className="text-[#7E8AA8]">
          Target <span className="text-[#A9B2CC]">{formatRupiah(goal.target)}</span>
        </span>
      </div>
    </button>
  )
}