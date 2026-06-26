interface Activity {
  title: string
  amount: string
  time: string
  positive: boolean
}

interface RecentActivityProps {
  activities: Activity[]
}

function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7">
      <h2 className="mm-font-display text-lg text-white font-medium mb-5">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((act, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  act.positive ? 'bg-[#7FBE94]/10' : 'bg-[#D98C8E]/10'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={act.positive ? '#7FBE94' : '#D98C8E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {act.positive ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[13px] text-white truncate">{act.title}</p>
                <p className="text-[11.5px] text-[#7E8AA8]">{act.time}</p>
              </div>
            </div>
            <span className={`text-[12.5px] font-medium shrink-0 ${act.positive ? 'text-[#7FBE94]' : 'text-[#D98C8E]'}`}>
              {act.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
