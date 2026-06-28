import type { RiskLevel } from '../common'

export interface UpdatePortfolioRequest {
  userId: number
  portfolioName: string
  portfolioType: string
  riskLevel: RiskLevel
}
