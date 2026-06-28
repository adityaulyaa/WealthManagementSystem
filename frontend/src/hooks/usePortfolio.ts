import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import PortfolioService from '../services/portfolioService'
import { mapPortfolioResponseToPortfolio } from '../utils/mappers'
import { portfolios as dummyPortfolios } from '../components/portfolio/data'
import type { Portfolio } from '../components/portfolio/types'

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

  useEffect(() => {
    refreshPortfolios()
  }, [refreshPortfolios])

  return {
    portfolios,

    selectedId,
    setSelectedId,

    loading,

    refreshPortfolios,
  }
}
