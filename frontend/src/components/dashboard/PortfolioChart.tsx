function PortfolioChart() {
  return (
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
  )
}

export default PortfolioChart
