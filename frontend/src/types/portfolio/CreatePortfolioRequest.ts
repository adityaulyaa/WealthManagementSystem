import type { RiskLevel } from './RiskLevel'

export interface CreatePortfolioRequest {
  userId: number
  portfolioName: string
  portfolioType: string
  riskLevel: RiskLevel
}
