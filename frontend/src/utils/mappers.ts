import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import type { Portfolio, Asset } from '../components/portfolio/types'

// Temporary dummy assets to be used until backend provides them
const dummyAssets: Asset[] = [
    { name: 'US Stocks', type: 'ETF', percent: 40 },
    { name: 'International Stocks', type: 'ETF', percent: 20 },
    { name: 'US Bonds', type: 'Bond', percent: 30 },
    { name: 'Cash', type: 'Cash', percent: 10 },
]

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
    created: new Date(dto.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    updated: new Date(dto.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    assets: dummyAssets, // Use dummy assets for now
  }
}
