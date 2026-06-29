import { useState, useCallback } from 'react'

/**
 * Reusable hook for handling a generic confirmation modal.
 * Returns the open state and callbacks to open/close the modal.
 */
export function useConfirmation() {
  const [open, setOpen] = useState(false)

  const openConfirmation = useCallback(() => setOpen(true), [])
  const closeConfirmation = useCallback(() => setOpen(false), [])

  return {
    open,
    openConfirmation,
    closeConfirmation,
  }
}
