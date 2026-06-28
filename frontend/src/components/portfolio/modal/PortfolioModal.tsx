interface PortfolioModalProps {
  open: boolean
  mode: 'create' | 'edit'

  portfolioName: string
  portfolioType: string
  riskLevel: string

  setPortfolioName: (value: string) => void
  setPortfolioType: (value: string) => void
  setRiskLevel: (value: string) => void

  onClose: () => void
  onSubmit: () => void
}

export default function PortfolioModal({
  open,
  mode,
  portfolioName,
  portfolioType,
  riskLevel,
  setPortfolioName,
  setPortfolioType,
  setRiskLevel,
  onClose,
  onSubmit
}: PortfolioModalProps) {
  if (!open) return null

  const isEdit = mode === 'edit'
  const title = isEdit ? 'Edit Portfolio' : 'Create Portfolio'
  const submitLabel = isEdit ? 'Save Changes' : 'Create Portfolio'

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-8 shadow-2xl mx-4">
        {/* Header */}
        <h2 className="mm-font-display text-xl text-white font-medium mb-6">{title}</h2>

        {/* Form */}
        <div className="space-y-5">
          {/* Portfolio Name */}
          <div>
            <label className="block text-[13px] text-[#7E8AA8] mb-1.5">Portfolio Name</label>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              placeholder="e.g. My Growth Portfolio"
              className="mm-input w-full px-4 py-2.5 rounded-xl text-[13.5px] text-white placeholder-[#56628A] focus:outline-none"
            />
          </div>

          {/* Portfolio Type */}
          <div>
            <label className="block text-[13px] text-[#7E8AA8] mb-1.5">Portfolio Type</label>
            <select
              value={portfolioType}
              onChange={(e) => setPortfolioType(e.target.value)}
              className="mm-input w-full px-4 py-2.5 rounded-xl text-[13.5px] text-white focus:outline-none cursor-pointer appearance-none"
            >
              <option value="" disabled>Select type...</option>
              <option value="Growth">Growth</option>
              <option value="Income">Income</option>
              <option value="Balanced">Balanced</option>
              <option value="Conservative">Conservative</option>
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <label className="block text-[13px] text-[#7E8AA8] mb-1.5">Risk Level</label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="mm-input w-full px-4 py-2.5 rounded-xl text-[13.5px] text-white focus:outline-none cursor-pointer appearance-none"
            >
              <option value="" disabled>Select risk level...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-[13.5px] text-[#7E8AA8] font-medium border border-[#1C2540] hover:bg-[#10172A] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-2.5 rounded-xl text-[13.5px] text-[#0B1020] font-semibold tracking-wide transition-all hover:brightness-110 active:scale-[0.99]"
            style={{ background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

