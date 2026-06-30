import { GoalCard } from './GoalCard'
import type { Goal } from './types'

interface GoalListProps {
  goals: Goal[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function GoalList({ goals, selectedId, onSelect }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="mm-fade-up bg-[#0C1224] border border-[#1C2540] rounded-2xl flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="w-12 h-12 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#56628A" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
          </svg>
        </div>
        <p className="text-[14px] text-white font-medium mb-1">No goals found.</p>
        <p className="text-[13px] text-[#7E8AA8]">Create your first goal.</p>
      </div>
    )
  }

  return (
    <div className="mm-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          isSelected={goal.id === selectedId}
          onSelect={() => onSelect(goal.id)}
        />
      ))}
    </div>
  )
}
