import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import type { RiskLevel } from '../types/common'
import type { CreatePortfolioRequest } from '../types/portfolio/CreatePortfolioRequest'
import type { UpdatePortfolioRequest } from '../types/portfolio/UpdatePortfolioRequest'
import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import { validatePortfolioForm } from '../utils/validators'
import { useDirtyForm } from './useDirtyForm'
import type { Portfolio } from '../components/portfolio/types'

interface UsePortfolioCrudProps {
  onModalClose?: () => void;
  selectedId: string;
  createPortfolio: (data: CreatePortfolioRequest) => Promise<PortfolioResponse>;
  updatePortfolio: (id: number, data: UpdatePortfolioRequest) => Promise<PortfolioResponse>;
  deletePortfolio: (id: number, currentSelectedId: string) => Promise<void>;
}

export function usePortfolioCrud({ onModalClose, selectedId, createPortfolio, updatePortfolio, deletePortfolio }: UsePortfolioCrudProps) {
  const { user } = useAuth()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)

  const [portfolioName, setPortfolioName] = useState('')
  const [portfolioType, setPortfolioType] = useState('')
  const [riskLevel, setRiskLevel] = useState<RiskLevel | ''>('')

  const { isDirty, reset: resetDirty } = useDirtyForm({
    portfolioName,
    portfolioType,
    riskLevel,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeModalDirectly = useCallback(() => {
    setModalOpen(false)
    setPortfolioName('')
    setPortfolioType('')
    setRiskLevel('')
    resetDirty()
    onModalClose?.()
  }, [resetDirty, onModalClose])

  const resetPortfolioForm = useCallback(() => {
    setPortfolioName('')
    setPortfolioType('')
    setRiskLevel('')
    resetDirty()
  }, [resetDirty])

  const handleNewPortfolio = useCallback(() => {
    resetPortfolioForm()
    setModalMode('create')
    setModalOpen(true)
  }, [resetPortfolioForm])

  const handleEditPortfolio = useCallback((portfolio: Portfolio) => {
    setPortfolioName(portfolio.name)
    setPortfolioType(portfolio.type)
    setRiskLevel(portfolio.risk)
    setModalMode('edit')
    setModalOpen(true)
    resetDirty()
  }, [resetDirty])

  const handleCloseModal = useCallback(() => {
    if (isSubmitting) return
    if (isDirty) {
      setDiscardConfirmationOpen(true)
      return
    }
    closeModalDirectly()
  }, [isSubmitting, isDirty, closeModalDirectly])

  const handleConfirmDiscard = useCallback(() => {
    setDiscardConfirmationOpen(false)
    closeModalDirectly()
  }, [closeModalDirectly])

  const handleCancelDiscard = useCallback(() => {
    setDiscardConfirmationOpen(false)
  }, [])

  const handleCloseDeleteConfirmation = useCallback(() => {
    if (isSubmitting) return
    setDeleteConfirmationOpen(false)
  }, [isSubmitting])

  const handleCreatePortfolio = useCallback(async () => {
    try {
      validatePortfolioForm({ portfolioName, portfolioType, riskLevel })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    const createRequest: CreatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName,
      portfolioType,
      riskLevel: riskLevel as RiskLevel,
    }

    try {
      setIsSubmitting(true)
      await createPortfolio(createRequest)
      toast.success("Portfolio created successfully.")
      closeModalDirectly()
    } catch (error) {
      console.error("Error creating portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [user, portfolioName, portfolioType, riskLevel, createPortfolio, closeModalDirectly])

  const handleUpdatePortfolio = useCallback(async (portfolioId: number) => {
    try {
      validatePortfolioForm({ portfolioName, portfolioType, riskLevel })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    const updateRequest: UpdatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName,
      portfolioType,
      riskLevel: riskLevel as RiskLevel,
    }

    try {
      setIsSubmitting(true)
      await updatePortfolio(portfolioId, updateRequest)
      toast.success("Portfolio updated successfully.")
      closeModalDirectly()
    } catch (error) {
      console.error("Error updating portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [user, portfolioName, portfolioType, riskLevel, updatePortfolio, closeModalDirectly])

  const handleSubmitPortfolio = useCallback(async (portfolioId?: number) => {
    if (modalMode === 'create') {
      await handleCreatePortfolio()
    } else if (portfolioId) {
      await handleUpdatePortfolio(portfolioId)
    }
  }, [modalMode, handleCreatePortfolio, handleUpdatePortfolio])

  const handleDeletePortfolio = useCallback(() => {
    setDeleteConfirmationOpen(true)
  }, [])

  const handleConfirmDelete = useCallback(async (portfolioId: number) => {
    try {
      setIsSubmitting(true)
      await deletePortfolio(portfolioId, selectedId)
      toast.success("Portfolio deleted successfully.")
      handleCloseDeleteConfirmation()
    } catch (error) {
      console.error("Error deleting portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [deletePortfolio, selectedId, handleCloseDeleteConfirmation])

  return {
    modalOpen,
    modalMode,
    deleteConfirmationOpen,
    discardConfirmationOpen,
    portfolioName,
    setPortfolioName,
    portfolioType,
    setPortfolioType,
    riskLevel,
    setRiskLevel,
    isSubmitting,
    handleNewPortfolio,
    handleEditPortfolio,
    handleCloseModal,
    handleSubmitPortfolio,
    handleDeletePortfolio,
    handleConfirmDelete,
    handleCloseDeleteConfirmation,
    handleConfirmDiscard,
    handleCancelDiscard,
  }
}