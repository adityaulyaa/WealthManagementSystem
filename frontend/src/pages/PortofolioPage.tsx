import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// --- TypeScript Interfaces ---

interface NavItem {
  name: string
  icon: JSX.Element
}

type RiskLevel = 'Low' | 'Medium' | 'High'

interface Asset {
  name: string
  type: string
  percent: number
}

interface Portfolio {
  id: string
  name: string
  type: string
  risk: RiskLevel
  created: string
  updated: string
  assets: Asset[]
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

const portfolios: Portfolio[] = [
  {
    id: 'pf-1',
    name: 'Growth Strategy',
    type: 'Growth',
    risk: 'High',
    created: '20 June 2026',
    updated: '25 June 2026',
    assets: [
      { name: 'BBCA', type: 'Stock', percent: 40 },
      { name: 'TLKM', type: 'Stock', percent: 30 },
      { name: 'Obligasi', type: 'Bond', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
  },
  {
    id: 'pf-2',
    name: 'Retirement Fund',
    type: 'Balanced',
    risk: 'Medium',
    created: '02 March 2026',
    updated: '18 June 2026',
    assets: [
      { name: 'Obligasi Negara', type: 'Bond', percent: 45 },
      { name: 'BBRI', type: 'Stock', percent: 25 },
      { name: 'Reksa Dana Pasar Uang', type: 'Mutual Fund', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
  },
  {
    id: 'pf-3',
    name: 'Emergency Reserve',
    type: 'Conservative',
    risk: 'Low',
    created: '11 January 2026',
    updated: '10 June 2026',
    assets: [
      { name: 'Deposito Berjangka', type: 'Deposit', percent: 60 },
      { name: 'Obligasi Negara', type: 'Bond', percent: 25 },
      { name: 'Cash', type: 'Cash', percent: 15 },
    ],
  },
  {
    id: 'pf-4',
    name: 'Education Fund',
    type: 'Growth',
    risk: 'Medium',
    created: '05 April 2026',
    updated: '22 June 2026',
    assets: [
      { name: 'TLKM', type: 'Stock', percent: 35 },
      { name: 'Reksa Dana Saham', type: 'Mutual Fund', percent: 35 },
      { name: 'Obligasi', type: 'Bond', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
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

function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Portfolio')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All')
  const [selectedId, setSelectedId] = useState<string>(portfolios[0].id)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'All' || p.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  const selectedPortfolio =
    portfolios.find((p) => p.id === selectedId) ?? filteredPortfolios[0] ?? portfolios[0]

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
              <h1 className="mm-font-display text-xl text-white font-medium">Portfolio</h1>
              <p className="text-[12.5px] text-[#7E8AA8] mt-0.5">Manage all of your investment portfolios</p>
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
              {/* Search */}
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
                  placeholder="Search portfolio..."
                  className="mm-input w-full pl-10 pr-4 py-2.5 rounded-xl text-[13.5px] text-white placeholder-[#56628A] focus:outline-none"
                />
              </div>

              {/* Risk filter */}
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as 'All' | RiskLevel)}
                className="mm-input px-4 py-2.5 rounded-xl text-[13.5px] text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Risk</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {/* New portfolio */}
              <button
                className="sm:ml-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#0B1020] font-semibold text-[13.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.99]"
                style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1020" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New Portfolio
              </button>
            </section>

            {/* Portfolio list */}
            <section className="mm-fade-up bg-[#0C1224] border border-[#1C2540] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#1C2540]">
                      <th className="px-6 py-4 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Portfolio</th>
                      <th className="px-6 py-4 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Type</th>
                      <th className="px-6 py-4 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Risk</th>
                      <th className="px-6 py-4 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Created</th>
                      <th className="px-6 py-4 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPortfolios.map((p) => {
                      const isSelected = p.id === selectedPortfolio.id
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedId(p.id)}
                          className={`mm-row border-b border-[#1C2540] last:border-b-0 cursor-pointer ${
                            isSelected ? 'bg-[#10172A]' : 'hover:bg-[#10172A]/50'
                          }`}
                        >
                          <td className="px-6 py-4 text-[13.5px] text-white font-medium">{p.name}</td>
                          <td className="px-6 py-4 text-[13.5px] text-[#A9B2CC]">{p.type}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border ${riskColor(p.risk)}`}>
                              {p.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[13px] text-[#7E8AA8]">{p.created}</td>
                          <td className="px-6 py-4 text-[13px] text-[#7E8AA8]">{p.updated}</td>
                        </tr>
                      )
                    })}
                    {filteredPortfolios.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-[13.5px] text-[#7E8AA8]">
                          Tidak ada portofolio yang cocok.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Detail + Assets */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
              {/* Portfolio detail */}
              <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7">
                <h2 className="mm-font-display text-lg text-white font-medium mb-6">Portfolio Detail</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Name</p>
                    <p className="text-[15px] text-white font-medium">{selectedPortfolio.name}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Type</p>
                    <p className="text-[15px] text-white font-medium">{selectedPortfolio.type}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Risk</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border ${riskColor(selectedPortfolio.risk)}`}>
                      {selectedPortfolio.risk}
                    </span>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Created</p>
                      <p className="text-[14px] text-[#A9B2CC]">{selectedPortfolio.created}</p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Updated</p>
                      <p className="text-[14px] text-[#A9B2CC]">{selectedPortfolio.updated}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio assets */}
              <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7">
                <h2 className="mm-font-display text-lg text-white font-medium mb-6">Assets Allocation</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#1C2540]">
                        <th className="pb-3 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Asset</th>
                        <th className="pb-3 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium">Type</th>
                        <th className="pb-3 text-[11px] tracking-wider uppercase text-[#7E8AA8] font-medium text-right">Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPortfolio.assets.map((asset) => (
                        <tr key={asset.name} className="border-b border-[#1C2540] last:border-b-0">
                          <td className="py-3.5 text-[13.5px] text-white font-medium">{asset.name}</td>
                          <td className="py-3.5 text-[13.5px] text-[#7E8AA8]">{asset.type}</td>
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-20 h-1.5 rounded-full bg-[#1C2540] overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${asset.percent}%`, background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
                                />
                              </div>
                              <span className="text-[13px] text-[#D9B36C] font-medium w-10 text-right">{asset.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default PortfolioPage