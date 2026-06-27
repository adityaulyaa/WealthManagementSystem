import type { Asset } from './types'

interface PortfolioAssetsProps {
  assets: Asset[]
}

function PortfolioAssets({ assets }: PortfolioAssetsProps) {
  return (
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
            {assets.map((asset) => (
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
  )
}

export default PortfolioAssets