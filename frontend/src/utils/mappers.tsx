import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import type { Portfolio, Asset } from '../components/portfolio/types'
import type { FinancialGoalResponse } from '../types/financialGoal/FinancialGoalResponse'
import type { Goal } from '../components/financialGoals/types'
import { formatDate } from './common'

// Placeholder assets until backend provides them
const placeholderAssets: Asset[] = [
    { name: 'US Stocks', type: 'ETF', percent: 40 },
    { name: 'International Stocks', type: 'ETF', percent: 20 },
    { name: 'US Bonds', type: 'Bond', percent: 30 },
    { name: 'Cash', type: 'Cash', percent: 10 },
]

// Placeholder icon for Financial Goals until backend provides it
const placeholderGoalIcon = (
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v6m0 0l4-2m-4 2L8 7m4 2v12M5 21h14" />
)

/**
 * Maps a PortfolioResponse DTO from the backend to a Portfolio UI model.
 * @param dto - The PortfolioResponse DTO from the backend.
 * @returns The Portfolio model for the UI.
 */
export function mapPortfolioResponseToPortfolio(dto: PortfolioResponse): Portfolio {
  const riskLevelBackend = dto.riskLevel.toLowerCase()
  const riskLevelFrontend = (riskLevelBackend.charAt(0).toUpperCase() + riskLevelBackend.slice(1)) as 'Low' | 'Medium' | 'High'

  return {
    id: dto.id.toString(), // Convert number to string to match UI model
    name: dto.portfolioName,
    type: dto.portfolioType,
    risk: riskLevelFrontend,
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
    id: dto.id.toString(),
    name: dto.goalName,
    category: dto.category,
    target: dto.targetAmount,
    current: dto.currentSavings,
    targetDate: formatDate(dto.targetDate), // Use the common formatDate utility
    risk: "Medium", // Placeholder until backend supports it
    icon: placeholderGoalIcon, // Placeholder until backend supports it
  }
}
