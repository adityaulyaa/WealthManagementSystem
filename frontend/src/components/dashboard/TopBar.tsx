interface TopBarProps {
  displayName: string
  initials: string
  membership: string
  hasNotification: boolean
  onOpenSidebar: () => void
  title: string
  subtitle?: string
}

function TopBar({ displayName, initials, membership, hasNotification, onOpenSidebar, title, subtitle }: TopBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 lg:px-10 py-5 border-b border-[#1C2540] bg-[#080C18]/95">
      {/* Mobile hamburger */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#10172A] border border-[#263150] text-[#A9B2CC]"
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {title ? (
        <div className="min-w-0">
          <h1 className="mm-font-display text-xl text-white font-medium">{title}</h1>
          {subtitle && <p className="text-[12.5px] text-[#7E8AA8] mt-0.5">{subtitle}</p>}
        </div>
      ) : (
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.18em] text-[#C99A4B] font-semibold uppercase mb-0.5">
            Welcome back
          </p>
          <h1 className="mm-font-display text-xl text-white font-medium truncate">Hi, {displayName}</h1>
        </div>
      )}

      {title ? (
        <div className="flex items-center gap-2.5 ml-auto pl-3 border-l border-[#1C2540]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9B36C] to-[#9C7A3C] flex items-center justify-center text-[#0B1020] font-semibold text-sm mm-font-display">
            {initials}
          </div>
          <div className="hidden lg:block">
            <p className="text-[13.5px] text-white font-medium leading-tight">{displayName}</p>
            <p className="text-[11.5px] text-[#7E8AA8] leading-tight">{membership}</p>
          </div>
        </div>
      ) : (
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
            {hasNotification && (
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#D9B36C]" />
            )}
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2.5 pl-2 lg:pl-3 border-l border-[#1C2540]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9B36C] to-[#9C7A3C] flex items-center justify-center text-[#0B1020] font-semibold text-sm mm-font-display">
              {initials}
            </div>
            <div className="hidden lg:block">
              <p className="text-[13.5px] text-white font-medium leading-tight">{displayName}</p>
              <p className="text-[11.5px] text-[#7E8AA8] leading-tight">{membership}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default TopBar
