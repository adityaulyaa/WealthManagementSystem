import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import type { CreatePortfolioRequest } from '../types/portfolio/CreatePortfolioRequest'
import type { UpdatePortfolioRequest } from '../types/portfolio/UpdatePortfolioRequest'
import type { PortfolioResponse } from '../types/portfolio/PortfolioResponse'
import { validatePortfolioForm } from '../utils/validators'
import { useDirtyForm } from './useDirtyForm'
import type { Portfolio } from '../components/portfolio/types'
import { useAsyncAction } from './useAsyncAction'
import type { RiskLevel } from '../types/common'

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

  const closeModalDirectly = useCallback(() => {
    setModalOpen(false)
    setPortfolioName('')
    setPortfolioType('')
    setRiskLevel('')
    resetDirty()
    onModalClose?.()
  }, [resetDirty, onModalClose])

  const handleCloseDeleteConfirmation = useCallback(() => {
    // isSubmitting will be defined after useAsyncAction, so we remove the check here for now
    setDeleteConfirmationOpen(false)
  }, []) 

  // Using useAsyncAction for all async operations
  const { execute: executeCreate, isLoading: isCreating } = useAsyncAction(
    async (request: CreatePortfolioRequest) => createPortfolio(request),
    {
      successMessage: "Portfolio created successfully.",
      onSuccess: closeModalDirectly,
    }
  )

  const { execute: executeUpdate, isLoading: isUpdating } = useAsyncAction(
    async (id: number, request: UpdatePortfolioRequest) => updatePortfolio(id, request),
    {
      successMessage: "Portfolio updated successfully.",
      onSuccess: closeModalDirectly,
    }
  )

  const { execute: executeDelete, isLoading: isDeleting } = useAsyncAction(
    async (id: number, currentSelected: string) => deletePortfolio(id, currentSelected),
    {
      successMessage: "Portfolio deleted successfully.",
      onSuccess: handleCloseDeleteConfirmation,
    }
  )

  const isSubmitting = isCreating || isUpdating || isDeleting

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

  const handleCreatePortfolio = useCallback(async () => {
    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    const formData = { portfolioName, portfolioType, riskLevel }
    try {
      validatePortfolioForm(formData) // This will throw if invalid, and assert riskLevel is RiskLevel
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    // Now TypeScript knows formData.riskLevel is RiskLevel
    const createRequest: CreatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName: formData.portfolioName,
      portfolioType: formData.portfolioType,
      riskLevel: formData.riskLevel,
    }

    await executeCreate(createRequest)
  }, [user, portfolioName, portfolioType, riskLevel, executeCreate])

  const handleUpdatePortfolio = useCallback(async (portfolioId: number) => {
    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    const formData = { portfolioName, portfolioType, riskLevel }
    try {
      validatePortfolioForm(formData) // This will throw if invalid, and assert riskLevel is RiskLevel
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    // Now TypeScript knows formData.riskLevel is RiskLevel
    const updateRequest: UpdatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName: formData.portfolioName,
      portfolioType: formData.portfolioType,
      riskLevel: formData.riskLevel,
    }

    await executeUpdate(portfolioId, updateRequest)
  }, [user, portfolioName, portfolioType, riskLevel, executeUpdate])

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
    await executeDelete(portfolioId, selectedId)
  }, [executeDelete, selectedId])

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
