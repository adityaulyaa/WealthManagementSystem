import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import FinancialGoalService from '../services/financialGoalService'
import { mapFinancialGoalResponseToGoal } from '../utils/mappers'
import { goals as dummyGoals } from '../components/financialGoals/data'
import type { Goal } from '../components/financialGoals/types'

export function useFinancialGoals() {
  const [goals, setGoals] = useState<Goal[]>(dummyGoals)
  const [selectedId, setSelectedId] = useState<string | null>(goals[0]?.id ?? null)
  const [loading, setLoading] = useState(true)

  const fetchGoals = useCallback(async () => {
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
      toast.error("Failed to load financial goals. Displaying dummy data.")
      setGoals(dummyGoals)
      if (dummyGoals.length > 0) {
        setSelectedId(dummyGoals[0].id)
      } else {
        setSelectedId(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  return {
    goals,
    loading,
    selectedId,
    setSelectedId,
    refreshGoals: fetchGoals,
  }
}
