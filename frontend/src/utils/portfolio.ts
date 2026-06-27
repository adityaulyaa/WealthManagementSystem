export function riskColor(risk: 'Low' | 'Medium' | 'High'): string {
  if (risk === 'High') return 'text-[#D98C8E] bg-[#D98C8E]/10 border-[#D98C8E]/30'
  if (risk === 'Medium') return 'text-[#D9B36C] bg-[#D9B36C]/10 border-[#D9B36C]/30'
  return 'text-[#7FBE94] bg-[#7FBE94]/10 border-[#7FBE94]/30'
}