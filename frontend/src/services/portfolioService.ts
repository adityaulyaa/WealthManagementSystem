import axiosClient from '../api/axiosClient'
import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import type { CreatePortfolioRequest } from '../types/portfolio/CreatePortfolioRequest'
import type { UpdatePortfolioRequest } from '../types/portfolio/UpdatePortfolioRequest'
import type { RiskLevel } from '../types/portfolio/RiskLevel'

/**
 * Service class for handling all portfolio-related API communication.
 *
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 6.8
 */
class PortfolioService {
  /**
   * Retrieves all portfolios for the authenticated user.
   *
   * @returns A promise that resolves with an array of PortfolioResponse DTOs.
   */
  public async getAllPortfolios(): Promise<PortfolioResponse[]> {
    const response = await axiosClient.get<PortfolioResponse[]>('/portfolios')
    return response.data
  }

  /**
   * Retrieves a single portfolio by its ID.
   *
   * @param id The ID of the portfolio to retrieve.
   * @returns A promise that resolves with a PortfolioResponse DTO.
   */
  public async getPortfolioById(id: number): Promise<PortfolioResponse> {
    const response = await axiosClient.get<PortfolioResponse>(`/portfolios/${id}`)
    return response.data
  }

  /**
   * Creates a new portfolio.
   *
   * @param data The data for the new portfolio.
   * @returns A promise that resolves with the created PortfolioResponse DTO.
   */
  public async createPortfolio(data: CreatePortfolioRequest): Promise<PortfolioResponse> {
    const response = await axiosClient.post<PortfolioResponse>('/portfolios', data)
    return response.data
  }

  /**
   * Updates an existing portfolio.
   *
   * @param id The ID of the portfolio to update.
   * @param data The updated data for the portfolio.
   * @returns A promise that resolves with the updated PortfolioResponse DTO.
   */
  public async updatePortfolio(id: number, data: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    const response = await axiosClient.put<PortfolioResponse>(`/portfolios/${id}`, data)
    return response.data
  }

  /**
   * Deletes a portfolio by its ID.
   *
   * @param id The ID of the portfolio to delete.
   * @returns A promise that resolves when the portfolio is deleted.
   */
  public async deletePortfolio(id: number): Promise<void> {
    await axiosClient.delete(`/portfolios/${id}`)
  }
}

/**
 * Exports a singleton instance of PortfolioService.
 * This ensures that all components use the same service instance.
 */
export default new PortfolioService()
