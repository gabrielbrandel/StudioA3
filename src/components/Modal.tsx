import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-studio-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative mx-auto mt-20 w-[min(900px,calc(100%-2rem))] overflow-hidden rounded-2xl bg-white shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-studio-200 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-medium text-studio-900">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-studio-700 hover:bg-studio-50"
          >
            Fechar
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
