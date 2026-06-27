import type { Portfolio, RiskLevel } from './types'

interface PortfolioDetailProps {
  portfolio: Portfolio
  riskColor: (risk: RiskLevel) => string
}

function PortfolioDetail({ portfolio, riskColor }: PortfolioDetailProps) {
  return (
    <div className="bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-7">
      <h2 className="mm-font-display text-lg text-white font-medium mb-6">Portfolio Detail</h2>
      <div className="space-y-5">
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Name</p>
          <p className="text-[15px] text-white font-medium">{portfolio.name}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Type</p>
          <p className="text-[15px] text-white font-medium">{portfolio.type}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Risk</p>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border ${riskColor(portfolio.risk)}`}>
            {portfolio.risk}
          </span>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Created</p>
            <p className="text-[14px] text-[#A9B2CC]">{portfolio.created}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-wider uppercase text-[#7E8AA8] mb-1">Updated</p>
            <p className="text-[14px] text-[#A9B2CC]">{portfolio.updated}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetail