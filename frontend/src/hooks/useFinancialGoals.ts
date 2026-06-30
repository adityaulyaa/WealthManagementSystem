import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import FinancialGoalService from '../services/financialGoalService'
import { mapFinancialGoalResponseToGoal } from '../utils/mappers'
import type { Goal } from '../components/financialGoals/types'

export function useFinancialGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshGoals = useCallback(async () => {
    setLoading(true)
    try {
      const response = await FinancialGoalService.getAllGoals()
      const mappedGoals = response.map(mapFinancialGoalResponseToGoal)
      setGoals(mappedGoals)
      if (mappedGoals.length > 0) {
        setSelectedId(mappedGoals[0].id)
      } else {
        setSelectedId(null)
      }
    } catch (err) {
      console.error("Failed to fetch financial goals:", err)
      toast.error("Failed to load financial goals.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshGoals()
  }, [refreshGoals])

  return {
    goals,
    selectedId,
    setSelectedId,
    loading,
    refreshGoals,
  }
}
