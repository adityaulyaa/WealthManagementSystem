import type { RiskLevel } from '../common'

export interface CreatePortfolioRequest {
  userId: number
  portfolioName: string
  portfolioType: string
  riskLevel: RiskLevel
}
