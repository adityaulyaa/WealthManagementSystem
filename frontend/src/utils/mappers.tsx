import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import type { Portfolio, Asset } from '../components/portfolio/types'
import type { FinancialGoalResponse } from '../types/financialGoal/FinancialGoalResponse'
import type { Goal } from '../components/financialGoals/types'
import type { RiskLevel } from '../types/common'
import { formatDate } from './common'

// Placeholder assets until backend provides them
const placeholderAssets: Asset[] = [
    { name: 'US Stocks', type: 'ETF', percent: 40 },
    { name: 'International Stocks', type: 'ETF', percent: 20 },
    { name: 'US Bonds', type: 'Bond', percent: 30 },
    { name: 'Cash', type: 'Cash', percent: 10 },
]

// Placeholder risk level until backend supports it
const PLACEHOLDER_RISK: RiskLevel = 'MEDIUM'

/**
 * Maps a PortfolioResponse DTO from the backend to a Portfolio UI model.
 * @param dto - The PortfolioResponse DTO from the backend.
 * @returns The Portfolio model for the UI.
 */
export function mapPortfolioResponseToPortfolio(dto: PortfolioResponse): Portfolio {
  return {
    id: dto.id.toString(), // Convert number to string to match UI model
    name: dto.portfolioName,
    type: dto.portfolioType,
    risk: dto.riskLevel,
    created: formatDate(dto.createdAt),
    updated: formatDate(dto.updatedAt),
    assets: placeholderAssets, // Use placeholder assets for now
  }
}

/**
 * Maps a FinancialGoalResponse DTO from the backend to a Financial Goal UI model.
 * @param dto - The FinancialGoalResponse DTO from the backend.
 * @returns The Financial Goal model for the UI.
 */
export function mapFinancialGoalResponseToGoal(dto: FinancialGoalResponse): Goal {
  return {
    id: dto.id,
    goalName: dto.goalName,
    category: dto.category,
    targetAmount: dto.targetAmount,
    currentSavings: dto.currentSavings,
    targetDate: dto.targetDate,
    status: dto.status,
    progressPercentage: dto.progressPercentage,
    monthsRemaining: dto.monthsRemaining,
    insights: dto.insights,
  }
}
