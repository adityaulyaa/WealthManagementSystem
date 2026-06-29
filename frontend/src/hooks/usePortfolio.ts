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

  const refreshPortfolios = useCallback(async (preferredSelectedId?: string) => {
    setLoading(true)
    try {
      const response = await PortfolioService.getAllPortfolios()
      const mappedPortfolios = response.map(mapPortfolioResponseToPortfolio)
      setPortfolios(mappedPortfolios)

      // Selection Logic:
      // 1. If there are portfolios, try to preserve the preferred ID.
      // 2. If preferred ID is not in the new list, default to the first portfolio.
      // 3. If list is empty, set selection to empty string.
      if (mappedPortfolios.length > 0) {
        const isPreferredStillPresent = mappedPortfolios.some(p => p.id === preferredSelectedId)
        const newSelectedId = isPreferredStillPresent
          ? preferredSelectedId!
          : mappedPortfolios[0].id
        setSelectedId(newSelectedId)
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

  const createPortfolio = useCallback(async (data: CreatePortfolioRequest): Promise<PortfolioResponse> => {
    try {
      const created = await PortfolioService.createPortfolio(data)
      await refreshPortfolios(created.id.toString())
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
      await refreshPortfolios(id.toString())
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update portfolio."
      toast.error(message)
      throw err
    }
  }, [refreshPortfolios])

  const deletePortfolio = useCallback(async (id: number, currentSelectedId: string): Promise<void> => {
    try {
      await PortfolioService.deletePortfolio(id)
      // After deletion, refresh and maintain selection if possible.
      // If the deleted portfolio was the selected one, the refreshed list will select the first entry.
      await refreshPortfolios(currentSelectedId)
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
