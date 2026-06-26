import type { RiskLevel } from './RiskLevel'

export interface UpdatePortfolioRequest {
  userId: number
  portfolioName: string
  portfolioType: string
  riskLevel: RiskLevel
}
