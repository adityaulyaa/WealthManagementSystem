import axiosClient from '../api/axiosClient'
import type { FinancialGoalResponse } from '../types/financialGoal/FinancialGoalResponse'
import type { CreateFinancialGoalRequest } from '../types/financialGoal/CreateFinancialGoalRequest'
import type { UpdateFinancialGoalRequest } from '../types/financialGoal/UpdateFinancialGoalRequest'

/**
 * Service class for handling all financial goal-related API communication.
 *
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 7.1
 */
class FinancialGoalService {
  /**
   * Retrieves all financial goals for the authenticated user.
   *
   * @returns A promise that resolves with an array of FinancialGoalResponse DTOs.
   */
  public async getAllGoals(): Promise<FinancialGoalResponse[]> {
    const response = await axiosClient.get<FinancialGoalResponse[]>('/goals')
    return response.data
  }

  /**
   * Retrieves a single financial goal by its ID.
   *
   * @param id The ID of the financial goal to retrieve.
   * @returns A promise that resolves with a FinancialGoalResponse DTO.
   */
  public async getGoalById(id: number): Promise<FinancialGoalResponse> {
    const response = await axiosClient.get<FinancialGoalResponse>(`/goals/${id}`)
    return response.data
  }

  /**
   * Creates a new financial goal.
   *
   * @param data The data for the new financial goal.
   * @returns A promise that resolves with the created FinancialGoalResponse DTO.
   */
  public async createGoal(data: CreateFinancialGoalRequest): Promise<FinancialGoalResponse> {
    const response = await axiosClient.post<FinancialGoalResponse>('/goals', data)
    return response.data
  }

  /**
   * Updates an existing financial goal.
   *
   * @param id The ID of the financial goal to update.
   * @param data The updated data for the financial goal.
   * @returns A promise that resolves with the updated FinancialGoalResponse DTO.
   */
  public async updateGoal(id: number, data: UpdateFinancialGoalRequest): Promise<FinancialGoalResponse> {
    const response = await axiosClient.put<FinancialGoalResponse>(`/goals/${id}`, data)
    return response.data
  }

  /**
   * Deletes a financial goal by its ID.
   *
   * @param id The ID of the financial goal to delete.
   * @returns A promise that resolves when the financial goal is deleted.
   */
  public async deleteGoal(id: number): Promise<void> {
    await axiosClient.delete(`/goals/${id}`)
  }
}

/**
 * Exports a singleton instance of FinancialGoalService.
 * This ensures that all components use the same service instance.
 */
export default new FinancialGoalService()
