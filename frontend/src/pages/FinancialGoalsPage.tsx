import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// --- TypeScript Interfaces ---

interface NavItem {
  name: string
  icon: ReactNode
}

type RiskLevel = 'Low' | 'Medium' | 'High'

interface Goal {
  id: string
  name: string
  category: string
  target: number
  current: number
  targetDate: string
  risk: RiskLevel
  icon: ReactNode
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    name: 'Portfolio',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </>
    ),
  },
  {
    name: 'Financial Goals',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'Risk Profile',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    ),
  },
]

const goals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Buy House',
    category: 'Property',
    target: 500_000_000,
    current: 270_000_000,
    targetDate: 'Dec 2030',
    risk: 'Medium',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    id: 'goal-2',
    name: 'Education Fund',
    category: 'Education',
    target: 150_000_000,
    current: 96_000_000,
    targetDate: 'Jul 2028',
    risk: 'Low',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 2 8l10 5 10-5-10-5zM2 14l10 5 10-5M2 8v6M22 8v6" />
    ),
  },
  {
    id: 'goal-3',
    name: 'Dream Vacation',
    category: 'Lifestyle',
    target: 40_000_000,
    current: 31_000_000,
    targetDate: 'Jan 2027',
    risk: 'Low',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18l6-12 4 8 3-5 5 9H3z" />
    ),
  },
  {
    id: 'goal-4',
    name: 'New Business Capital',
    category: 'Business',
    target: 300_000_000,
    current: 45_000_000,
    targetDate: 'Mar 2029',
    risk: 'High',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
    ),
  },
  {
    id: 'goal-5',
    name: 'Retirement Reserve',
    category: 'Retirement',
    target: 1_000_000_000,
    current: 410_000_000,
    targetDate: 'Dec 2045',
    risk: 'Medium',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6m0 0l4-2m-4 2L8 7m4 2v12M5 21h14" />
    ),
  },
]

function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function riskColor(risk: RiskLevel): string {
  if (risk === 'High') return 'text-[#D98C8E] bg-[#D98C8E]/10 border-[#D98C8E]/30'
  if (risk === 'Medium') return 'text-[#D9B36C] bg-[#D9B36C]/10 border-[#D9B36C]/30'
  return 'text-[#7FBE94] bg-[#7FBE94]/10 border-[#7FBE94]/30'
}

function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`
}

function getProgress(goal: Goal): number {
  return Math.min(100, Math.round((goal.current / goal.target) * 100))
}

// --- Reusable Progress Bar ---

interface ProgressBarProps {
  percent: number
  size?: 'sm' | 'md'
}

function ProgressBar({ percent, size = 'sm' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className={`w-full ${height} rounded-full bg-[#1C2540] overflow-hidden`}>
      <div
        className="h-full rounded-full"
        style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
      />
    </div>
  )
}

// --- Goal Card ---

interface GoalCardProps {
  goal: Goal
  isSelected: boolean
  onSelect: () => void
}

function GoalCard({ goal, isSelected, onSelect }: GoalCardProps) {
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

function FinancialGoalsPage() {
  const [activeNav, setActiveNav] = useState('Financial Goals')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(goals[0]?.id ?? null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  const filteredGoals = goals.filter((g) => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const selectedGoal = goals.find((g) => g.id === selectedId) ?? null

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

          .mm-font-display { font-family: 'Fraunces', serif; }
          .mm-font-body { font-family: 'Inter', sans-serif; }

          @keyframes mm-fade-up {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .mm-fade-up { animation: mm-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          .mm-input {
            background: #10172A;
            border: 1px solid #263150;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .mm-input:focus {
            border-color: #C99A4B;
            box-shadow: 0 0 0 3px rgba(201, 154, 75, 0.15);
          }

          .mm-nav-item { transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
          .mm-row { transition: background 0.2s ease, border-color 0.2s ease; }

          @media (prefers-reduced-motion: reduce) {
            .mm-fade-up { animation: none !important; opacity: 1 !important; }
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1020] border-r border-[#1C2540] shrink-0 transform transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
        >
          <div className="flex items-center gap-3 px-6 py-7 border-b border-[#1C2540]">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#10172A] border border-[#C99A4B]/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17 L9 9 L13 13 L21 4" />
                <path d="M15 4 H21 V10" />
              </svg>
            </div>
            <span className="mm-font-display text-lg text-white tracking-wide">
              Money<span className="text-[#D9B36C]">Map</span>
            </span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeNav === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveNav(item.name)
                    setMobileSidebarOpen(false)
                  }}
                  className={`mm-nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] border ${
                    isActive
                      ? 'bg-[#10172A] text-[#D9B36C] border-[#C99A4B]/30'
                      : 'text-[#7E8AA8] border-transparent hover:bg-[#10172A]/60 hover:text-white'
                  }`}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          <div className="px-4 py-6 border-t border-[#1C2540]">
            <button
              onClick={() => {
                handleLogout()
                setMobileSidebarOpen(false)
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] text-[#7E8AA8] hover:text-[#E8888A] hover:bg-[#10172A]/60 transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {mobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#0B1020] border-r border-[#1C2540] shrink-0">
          <div className="flex items-center gap-3 px-6 py-7 border-b border-[#1C2540]">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#10172A] border border-[#C99A4B]/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17 L9 9 L13 13 L21 4" />
                <path d="M15 4 H21 V10" />
              </svg>
            </div>
            <span className="mm-font-display text-lg text-white tracking-wide">
              Money<span className="text-[#D9B36C]">Map</span>
            </span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeNav === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`mm-nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] border ${
                    isActive
                      ? 'bg-[#10172A] text-[#D9B36C] border-[#C99A4B]/30'
                      : 'text-[#7E8AA8] border-transparent hover:bg-[#10172A]/60 hover:text-white'
                  }`}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          <div className="px-4 py-6 border-t border-[#1C2540]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] text-[#7E8AA8] hover:text-[#E8888A] hover:bg-[#10172A]/60 transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="flex items-center gap-4 px-6 lg:px-10 py-5 border-b border-[#1C2540] bg-[#080C18]/95">
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] text-[#A9B2CC]"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="mm-font-display text-xl text-white font-medium">Financial Goals</h1>
              <p className="text-[12.5px] text-[#7E8AA8] mt-0.5">Manage and track your financial goals</p>
            </div>

            <div className="flex items-center gap-2.5 ml-auto pl-3 border-l border-[#1C2540]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9B36C] to-[#9C7A3C] flex items-center justify-center text-[#0B1020] font-semibold text-sm mm-font-display">
                {initials}
              </div>
              <div className="hidden lg:block">
                <p className="text-[13.5px] text-white font-medium leading-tight">{displayName}</p>
                <p className="text-[11.5px] text-[#7E8AA8] leading-tight">{membership}</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
            {/* Toolbar */}
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
                className="sm:ml-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#0B1020] font-semibold text-[13.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.99]"
                style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1020" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New Goal
              </button>
            </section>

            {/* Goal list + detail */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              {/* Goal list */}
              <div>
                {filteredGoals.length > 0 ? (
                  <div className="mm-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredGoals.map((goal) => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        isSelected={goal.id === selectedId}
                        onSelect={() => setSelectedId(goal.id)}
                      />
                    ))}
                  </div>
                ) : (
                  // Empty state
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
                )}
              </div>

              {/* Goal detail */}
              <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7 h-fit lg:sticky lg:top-8">
                <h2 className="mm-font-display text-lg text-white font-medium mb-6">Goal Detail</h2>

                {selectedGoal ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36C" strokeWidth="2">
                          {selectedGoal.icon}
                        </svg>
                      </div>
                      <p className="text-[16px] text-white font-medium">{selectedGoal.name}</p>
                    </div>

                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Target</p>
                      <p className="text-[15px] text-white font-medium">{formatRupiah(selectedGoal.target)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Saved</p>
                      <p className="text-[15px] text-white font-medium">{formatRupiah(selectedGoal.current)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Remaining</p>
                      <p className="text-[15px] text-white font-medium">{formatRupiah(selectedGoal.target - selectedGoal.current)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1.5">Progress</p>
                      <ProgressBar percent={getProgress(selectedGoal)} size="md" />
                      <p className="text-[13px] text-[#D9B36C] font-semibold mt-1.5">{getProgress(selectedGoal)}%</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Target Date</p>
                        <p className="text-[14px] text-[#A9B2CC]">{selectedGoal.targetDate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Risk</p>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border ${riskColor(selectedGoal.risk)}`}>
                          {selectedGoal.risk}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Category</p>
                      <p className="text-[14px] text-[#A9B2CC]">{selectedGoal.category}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[13.5px] text-[#7E8AA8] py-6 text-center">Select a goal to see details.</p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default FinancialGoalsPage