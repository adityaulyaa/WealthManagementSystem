import type { RiskLevel } from '../types/common'

export function riskColor(risk: RiskLevel): string {
  if (risk === 'High') return 'text-[#D98C8E] bg-[#D98C8E]/10 border-[#D98C8E]/30'
  if (risk === 'Medium') return 'text-[#D9B36C] bg-[#D9B36C]/10 border-[#D9B36C]/30'
  return 'text-[#7FBE94] bg-[#7FBE94]/10 border-[#7FBE94]/30'
}

export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
