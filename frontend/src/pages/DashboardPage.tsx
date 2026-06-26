import { useState } from 'react'

// --- TypeScript Interfaces ---

interface NavItem {
  name: string
  icon: JSX.Element
}

interface SummaryCard {
  label: string
  value: string
  trend: string
  positive: boolean
}

interface Activity {
  title: string
  amount: string
  time: string
  positive: boolean
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

const summaryCards: SummaryCard[] = [
  { label: 'Total Balance', value: 'Rp 482.350.000', trend: '+4.8%', positive: true },
  { label: 'Total Growth', value: 'Rp 36.120.500', trend: '+2.1%', positive: true },
  { label: 'Active Goals', value: '5 Goals', trend: '2 on track', positive: true },
  { label: 'Risk Score', value: 'Moderate', trend: '-0.3 pts', positive: false },
]

const activities: Activity[] = [
  { title: 'Investasi Reksa Dana Pasar Uang', amount: '+ Rp 5.000.000', time: '2 jam lalu', positive: true },
  { title: 'Penarikan Dana Darurat', amount: '- Rp 1.200.000', time: 'Kemarin', positive: false },
  { title: 'Dividen Saham BBCA', amount: '+ Rp 850.000', time: '2 hari lalu', positive: true },
  { title: 'Top Up Goal: Dana Pendidikan', amount: '+ Rp 2.500.000', time: '3 hari lalu', positive: true },
  { title: 'Biaya Administrasi Bulanan', amount: '- Rp 25.000', time: '5 hari lalu', positive: false },
]

function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard')

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

          @keyframes mm-draw {
            to { stroke-dashoffset: 0; }
          }
          .mm-draw-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: mm-draw 2.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
          }
          .mm-draw-path-2 {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: mm-draw 2.2s cubic-bezier(0.65, 0, 0.35, 1) 0.5s forwards;
          }
          .mm-fill-fade {
            opacity: 0;
            animation: mm-fade-up 1s ease 0.8s forwards;
          }

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

          @media (prefers-reduced-motion: reduce) {
            .mm-fade-up, .mm-draw-path, .mm-draw-path-2, .mm-fill-fade {
              animation: none !important;
              opacity: 1 !important;
              stroke-dashoffset: 0 !important;
            }
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#0B1020] border-r border-[#1C2540] shrink-0">
          {/* Logo + brand */}
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

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
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
              );
            })}
          </nav>

          {/* Log out */}
          <div className="px-4 py-6 border-t border-[#1C2540]">
            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] text-[#7E8AA8] hover:text-[#E8888A] hover:bg-[#10172A]/60 transition-colors">
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
          <header className="flex items-center justify-between gap-4 px-6 lg:px-10 py-5 border-b border-[#1C2540] bg-[#080C18]/95">
            <div className="min-w-0">
              <p className="text-[11px] tracking-[0.18em] text-[#C99A4B] font-semibold uppercase mb-0.5">
                Welcome back
              </p>
              <h1 className="mm-font-display text-xl text-white font-medium truncate">Hi, Andika Pratama</h1>
            </div>

            <div className="flex items-center gap-3 lg:gap-5">
              {/* Search */}
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56628A" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search transaksi, goal..."
                  className="mm-input w-56 lg:w-64 pl-10 pr-4 py-2.5 rounded-xl text-[13.5px] text-white placeholder-[#56628A] focus:outline-none"
                />
              </div>

              {/* Notification */}
              <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#10172A] border border-[#263150] hover:border-[#C99A4B]/40 transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A9B2CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#D9B36C]" />
              </button>

              {/* User profile */}
              <div className="flex items-center gap-2.5 pl-2 lg:pl-3 border-l border-[#1C2540]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9B36C] to-[#9C7A3C] flex items-center justify-center text-[#0B1020] font-semibold text-sm mm-font-display">
                  AP
                </div>
                <div className="hidden lg:block">
                  <p className="text-[13.5px] text-white font-medium leading-tight">Andika Pratama</p>
                  <p className="text-[11.5px] text-[#7E8AA8] leading-tight">Premium Member</p>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-7">
            {/* Summary cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryCards.map((card, i) => (
                <div
                  key={card.label}
                  className="mm-fade-up bg-[#0C1224] border border-[#1C2540] rounded-2xl p-5"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <p className="text-[12px] text-[#7E8AA8] mb-2.5">{card.label}</p>
                  <p className="mm-font-display text-[1.45rem] text-white font-medium mb-2">{card.value}</p>
                  <p className={`text-[12px] font-medium ${card.positive ? 'text-[#7FBE94]' : 'text-[#D98C8E]'}`}>
                    {card.trend}
                  </p>
                </div>
              ))}
            </section>

            {/* Chart + Recent activity */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
              {/* Portfolio chart */}
              <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="mm-font-display text-lg text-white font-medium">Portfolio Performance</h2>
                    <p className="text-[12.5px] text-[#7E8AA8] mt-0.5">6 bulan terakhir</p>
                  </div>
                  <span className="text-[12px] px-3 py-1.5 rounded-full bg-[#10172A] border border-[#263150] text-[#D9B36C]">
                    +8.4%
                  </span>
                </div>

                <svg viewBox="0 0 560 200" className="w-full h-52 overflow-visible" fill="none">
                  {/* ledger gridlines */}
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="560"
                      y1={40 + i * 40}
                      y2={40 + i * 40}
                      stroke="#1C2540"
                      strokeWidth="1"
                    />
                  ))}

                  <path
                    d="M0 170 L0 160 C 60 165, 90 110, 140 118 C 190 126, 210 70, 260 75 C 310 80, 330 95, 380 88 C 430 81, 450 40, 500 45 C 525 47, 545 35, 560 30 L560 170 Z"
                    fill="rgba(201,154,75,0.08)"
                    className="mm-fill-fade"
                  />
                  <path
                    d="M0 160 C 60 165, 90 110, 140 118 C 190 126, 210 70, 260 75 C 310 80, 330 95, 380 88 C 430 81, 450 40, 500 45 C 525 47, 545 35, 560 30"
                    stroke="#324168"
                    strokeWidth="1.5"
                    className="mm-draw-path"
                  />
                  <path
                    d="M0 168 C 60 172, 95 130, 145 136 C 195 142, 215 95, 265 98 C 315 101, 335 112, 385 106 C 435 100, 455 65, 505 68 C 528 69, 548 58, 560 54"
                    stroke="#D9B36C"
                    strokeWidth="2"
                    className="mm-draw-path-2"
                  />
                </svg>

                <div className="flex items-center justify-between mt-2 text-[11px] text-[#56628A]">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span>
                </div>
              </div>

              {/* Recent activity */}
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
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;