interface GoalToolbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onNewGoal: () => void
}

export default function GoalToolbar({ searchQuery, setSearchQuery, onNewGoal }: GoalToolbarProps) {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56628A" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search financial goal..."
          className="mm-input w-full pl-10 pr-4 py-2.5 rounded-xl text-[13.5px] text-white placeholder-[#56628A] focus:outline-none"
        />
      </div>

      <button
        onClick={onNewGoal}
        className="sm:ml-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#0B1020] font-semibold text-[13.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.99]"
        style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1020" strokeWidth="2.2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Goal
      </button>
    </section>
  )
}
