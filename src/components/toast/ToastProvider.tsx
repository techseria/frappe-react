import React, { createContext, useContext, useState, useEffect } from 'react'
import Toast, { ToastProps } from '../Toast'

type ToastItem = ToastProps & { id: string }

type ToastContextType = {
  toasts: ToastItem[]
  toast: (options: Omit<ToastProps, 'onClose'>) => string
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  toast: () => '',
  dismissToast: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = (options: Omit<ToastProps, 'onClose'>) => {
    const id = `toast-${Math.random().toString(36).slice(2, 9)}`
    setToasts((prev) => [...prev, { ...options, id, onClose: () => dismissToast(id) }])
    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, dismissToast }: { toasts: ToastItem[]; dismissToast: (id: string) => void }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!document.getElementById('frappeui-toast-root')) {
      const root = document.createElement('div')
      root.id = 'frappeui-toast-root'
      root.style.position = 'fixed'
      root.style.top = '16px'
      root.style.right = '16px'
      root.style.bottom = '16px'
      root.style.left = '16px'
      root.style.zIndex = '9999'
      root.style.pointerEvents = 'none'
      document.body.appendChild(root)
    }
  }, [])

  const positions = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-right',
    'bottom-center',
    'bottom-left',
  ]

  return (
    <div id="frappeui-toast-root">
      {positions.map((position) => (
        <div
          key={position}
          className={getPositionClasses(position)}
        >
          {toasts
            .filter((toast) => toast.position === position)
            .map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => dismissToast(toast.id)}
              />
            ))}
        </div>
      ))}
    </div>
  )
}

function getPositionClasses(position: string) {
  const classes = ['absolute']
  if (position === 'top-left') classes.push('top-0 left-0')
  if (position === 'top-right') classes.push('top-0 right-0')
  if (position === 'top-center') classes.push('top-0 left-1/2 -translate-x-1/2')
  if (position === 'bottom-left') classes.push('bottom-0 left-0')
  if (position === 'bottom-right') classes.push('bottom-0 right-0')
  if (position === 'bottom-center') classes.push('bottom-0 left-1/2 -translate-x-1/2')
  return classes.join(' ')
}

export function useToast() {
  return useContext(ToastContext)
}
