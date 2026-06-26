import type { QuickAction } from './types'

interface QuickActionsProps {
  quickActions: QuickAction[]
}

function QuickActions({ quickActions }: QuickActionsProps) {
  return (
    <section>
      <h2 className="mm-font-display text-lg text-white font-medium mb-5">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <div key={action.title} className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-5 hover:border-[#C99A4B]/40 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {action.icon}
              </svg>
            </div>
            <h3 className="text-white font-medium mb-1">{action.title}</h3>
            <p className="text-[#7E8AA8] text-[13px]">{action.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuickActions
