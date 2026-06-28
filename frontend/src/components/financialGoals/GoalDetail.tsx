import { ProgressBar } from './ProgressBar'
import { riskColor, formatRupiah, getProgress } from './utils'
import type { Goal } from './types'

interface GoalDetailProps {
  goal: Goal | null
}

export default function GoalDetail({ goal }: GoalDetailProps) {
  if (!goal) {
    return (
      <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7 h-fit lg:sticky lg:top-8">
        <h2 className="mm-font-display text-lg text-white font-medium mb-6">Goal Detail</h2>
        <p className="text-[13.5px] text-[#7E8AA8] py-6 text-center">Select a goal to see details.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7 h-fit lg:sticky lg:top-8">
      <h2 className="mm-font-display text-lg text-white font-medium mb-6">Goal Detail</h2>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2">
              {goal.icon}
            </svg>
          </div>
          <p className="text-[16px] text-white font-medium">{goal.name}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Target</p>
          <p className="text-[15px] text-white font-medium">{formatRupiah(goal.target)}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Saved</p>
          <p className="text-[15px] text-white font-medium">{formatRupiah(goal.current)}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Remaining</p>
          <p className="text-[15px] text-white font-medium">{formatRupiah(goal.target - goal.current)}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1.5">Progress</p>
          <ProgressBar percent={getProgress(goal)} size="md" />
          <p className="text-[13px] text-[#D9B36C] font-semibold mt-1.5">{getProgress(goal)}%</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Target Date</p>
            <p className="text-[14px] text-[#A9B2CC]">{goal.targetDate}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Risk</p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border ${riskColor(goal.risk)}`}>
              {goal.risk}
            </span>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Category</p>
          <p className="text-[14px] text-[#A9B2CC]">{goal.category}</p>
        </div>
      </div>
    </div>
  )
}
