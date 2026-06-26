interface NavItem {
  name: string
  icon: JSX.Element
}

interface SidebarProps {
  activeNav: string
  setActiveNav: (name: string) => void
  handleLogout: () => void
  navItems: NavItem[]
}

function Sidebar({ activeNav, setActiveNav, handleLogout, navItems }: SidebarProps) {
  return (
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
  )
}

export default Sidebar
