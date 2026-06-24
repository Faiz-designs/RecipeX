import { createContext, useContext } from 'react'
import { useToast } from './useToast'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const { toasts, addToast, removeToast } = useToast()
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
          {toasts.map(t => (
            <div key={t.id} className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm border text-sm font-medium animate-fadeIn ${t.type === 'success' ? 'bg-emerald-50/95 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : t.type === 'error' ? 'bg-red-50/95 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300' : 'bg-slate-50/95 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'}`}>
              <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
              <span className="flex-1">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="opacity-50 hover:opacity-100 transition-opacity">✕</button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  return useContext(ToastContext)
}
