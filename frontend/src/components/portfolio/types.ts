export type RiskLevel = 'Low' | 'Medium' | 'High'

export interface Asset {
  name: string
  type: string
  percent: number
}

export interface Portfolio {
  id: string
  name: string
  type: string
  risk: RiskLevel
  created: string
  updated: string
  assets: Asset[]
}

export function riskColor(risk: RiskLevel): string {
  if (risk === 'High') return 'text-[#D98C8E] bg-[#D98C8E]/10 border-[#D98C8E]/30'
  if (risk === 'Medium') return 'text-[#D9B36C] bg-[#D9B36C]/10 border-[#D9B36C]/30'
  return 'text-[#7FBE94] bg-[#7FBE94]/10 border-[#7FBE94]/30'
}