import { ProgressBar } from './ProgressBar'
import { formatRupiah } from './utils'
import type { Goal } from './types'

interface GoalDetailProps {
  goal: Goal | null
  onEdit: (goal: Goal) => void
  onDelete: (goalId: number) => void
}

export default function GoalDetail({ goal, onEdit, onDelete }: GoalDetailProps) {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="mm-font-display text-lg text-white font-medium">Goal Detail</h2>
        <div className="flex gap-2">
            <button onClick={() => onEdit(goal)} className="p-2 rounded-full hover:bg-[#1A1F2E] text-gray-400 hover:text-[#D9B36C]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button onClick={() => onDelete(goal.id)} className="p-2 rounded-full hover:bg-[#1A1F2E] text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[16px] text-white font-medium">{goal.goalName}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Target</p>
          <p className="text-[15px] text-white font-medium">{formatRupiah(goal.targetAmount)}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Saved</p>
          <p className="text-[15px] text-white font-medium">{formatRupiah(goal.currentSavings)}</p>
        </div>
        
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1.5">Progress</p>
          <ProgressBar percent={goal.progressPercentage} size="md" />
          <p className="text-[13px] text-[#D9B36C] font-semibold mt-1.5">{goal.progressPercentage}%</p>
        </div>

        <div>
           <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Status</p>
           <p className="text-[14px] text-[#A9B2CC]">{goal.status}</p>
        </div>

        <div>
           <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Insights</p>
           <ul className="list-disc list-inside text-[13px] text-[#A9B2CC] space-y-1">
             {goal.insights.map((insight, idx) => (
               <li key={idx}>{insight}</li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  )
}
