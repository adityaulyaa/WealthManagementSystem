import { useState, useCallback } from 'react'

type ModalMode = 'create' | 'edit'

/**
 * Reusable hook for handling a generic modal with open/close state and a mode (e.g., for create vs edit).
 */
export function useModalState(initialMode: ModalMode = 'create') {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<ModalMode>(initialMode)

  const openModal = useCallback((newMode?: ModalMode) => {
    if (newMode) setMode(newMode)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    open,
    mode,
    setMode,
    openModal,
    closeModal,
  }
}