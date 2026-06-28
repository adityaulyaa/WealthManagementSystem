import type { ProgressBarProps } from './types'

export function ProgressBar({ percent, size = 'sm' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className={`w-full ${height} rounded-full bg-[#1C2540] overflow-hidden`}>
      <div
        className="h-full rounded-full"
        style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' }}
      />
    </div>
  )
}