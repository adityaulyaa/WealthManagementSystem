interface SummaryCard {
  label: string
  value: string
  trend: string
  positive: boolean
}

interface SummaryCardsProps {
  summaryCards: SummaryCard[]
}

function SummaryCards({ summaryCards }: SummaryCardsProps) {
  return (
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
  )
}

export default SummaryCards
