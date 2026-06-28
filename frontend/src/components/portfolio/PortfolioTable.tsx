import type { Portfolio } from './types'
import { riskColor } from '../../utils/common'

interface PortfolioTableProps {
  portfolios: Portfolio[]
  selectedId: string
  setSelectedId: (id: string) => void
}

function PortfolioTable({ portfolios, selectedId, setSelectedId }: PortfolioTableProps) {
  return (
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
            {portfolios.map((p) => {
              const isSelected = p.id === selectedId
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
            {portfolios.length === 0 && (
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
  )
}

export default PortfolioTable