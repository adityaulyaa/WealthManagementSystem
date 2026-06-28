import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import PortfolioService from '../services/portfolioService'
import { mapPortfolioResponseToPortfolio } from '../utils/mappers'
import { portfolios as dummyPortfolios } from '../components/portfolio/data'
import type { Portfolio } from '../components/portfolio/types'
import type { CreatePortfolioRequest } from '../types/portfolio/CreatePortfolioRequest'
import type { UpdatePortfolioRequest } from '../types/portfolio/UpdatePortfolioRequest'
import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'

export function usePortfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(dummyPortfolios)
  const [selectedId, setSelectedId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const refreshPortfolios = useCallback(async () => {
    setLoading(true)
    try {
      const response = await PortfolioService.getAllPortfolios()
      const mappedPortfolios = response.map(mapPortfolioResponseToPortfolio)
      setPortfolios(mappedPortfolios)
      if (mappedPortfolios.length > 0) {
        setSelectedId(mappedPortfolios[0].id)
      } else {
        setSelectedId('')
      }
    } catch (err) {
      console.error("Failed to fetch portfolios:", err)
      toast.error("Failed to load portfolios. Displaying dummy data.")
      setPortfolios(dummyPortfolios)
      if (dummyPortfolios.length > 0) {
        setSelectedId(dummyPortfolios[0].id)
      } else {
        setSelectedId('')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Creates a new portfolio via the backend API.
   * On success, refreshes the portfolio list.
   * On failure, shows an error toast and re-throws the error.
   */
  const createPortfolio = useCallback(async (data: CreatePortfolioRequest): Promise<PortfolioResponse> => {
    try {
      const created = await PortfolioService.createPortfolio(data)
      await refreshPortfolios()
      return created
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create portfolio."
      toast.error(message)
      throw err
    }
  }, [refreshPortfolios])

  const updatePortfolio = useCallback(async (id: number, data: UpdatePortfolioRequest): Promise<PortfolioResponse> => {
    try {
      const updated = await PortfolioService.updatePortfolio(id, data)
      await refreshPortfolios()
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update portfolio."
      toast.error(message)
      throw err
    }
  }, [refreshPortfolios])

  const deletePortfolio = useCallback(async (id: number): Promise<void> => {
    try {
      await PortfolioService.deletePortfolio(id)
      await refreshPortfolios()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete portfolio."
      toast.error(message)
      throw err
    }
  }, [refreshPortfolios])

  useEffect(() => {
    refreshPortfolios()
  }, [refreshPortfolios])

  return {
    portfolios,

    selectedId,
    setSelectedId,

    loading,

    refreshPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  }
}
