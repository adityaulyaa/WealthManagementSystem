import type { ReactNode } from 'react'

interface ConfirmationModalProps {
  open: boolean
  title: string
  message: string | ReactNode
  confirmLabel: string
  cancelLabel: string
  confirmVariant?: 'danger' | 'primary'
  isSubmitting?: boolean // Optional: to disable buttons during async ops
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  confirmVariant = 'primary',
  isSubmitting = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!open) return null

  const confirmButtonClass =
    confirmVariant === 'danger'
      ? 'px-5 py-2.5 rounded-xl text-[13.5px] text-[#0B1020] font-semibold tracking-wide transition-all bg-red-600 hover:bg-red-700 active:scale-[0.99]'
      : 'px-5 py-2.5 rounded-xl text-[13.5px] text-[#0B1020] font-semibold tracking-wide transition-all hover:brightness-110 active:scale-[0.99]'

  const confirmButtonStyle = confirmVariant === 'primary' ? { background: 'linear-gradient(90deg, #D9B36C, #C99A4B)' } : {}

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isSubmitting) return
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-[#0C1224] border border-[#1C2540] rounded-2xl p-6 lg:p-8 shadow-2xl mx-4">
        {/* Header */}
        <h2 className="mm-font-display text-xl text-white font-medium mb-4">{title}</h2>

        {/* Message */}
        <div className="text-[15px] text-[#A9B2CC] mb-6">{message}</div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-[13.5px] text-[#7E8AA8] font-medium border border-[#1C2540] hover:bg-[#10172A] hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={confirmButtonClass}
            style={confirmButtonStyle}
            disabled={isSubmitting}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
