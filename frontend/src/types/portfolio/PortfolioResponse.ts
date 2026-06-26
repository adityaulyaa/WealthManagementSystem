import type { RiskLevel } from './RiskLevel'

export interface PortfolioResponse {
  id: number
  userId: number
  portfolioName: string
  portfolioType: string
  riskLevel: RiskLevel
  createdAt: string
  updatedAt: string
}
