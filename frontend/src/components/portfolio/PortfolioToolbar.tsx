import type { RiskLevel } from '../../types/common'

interface PortfolioToolbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  riskFilter: 'All' | RiskLevel
  setRiskFilter: (filter: 'All' | RiskLevel) => void
  onNewPortfolio: () => void
}

function PortfolioToolbar({ searchQuery, setSearchQuery, riskFilter, setRiskFilter, onNewPortfolio }: PortfolioToolbarProps) {
  return (
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
        onClick={onNewPortfolio}
        className="sm:ml-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#0B1020] font-semibold text-[13.5px] tracking-wide transition-all hover:brightness-110 active:scale-[0.99]"
        style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1020" strokeWidth="2.2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Portfolio
      </button>
    </section>
  )
}

export default PortfolioToolbar