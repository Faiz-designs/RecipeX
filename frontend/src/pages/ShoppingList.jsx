import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getShoppingList, addToShoppingList, removeFromShoppingList, toggleShoppingItem, clearShoppingList } from '../utils/shoppingList'

export default function ShoppingList() {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => { setItems(getShoppingList()) }, [])

  const handleAdd = () => {
    if (!newItem.trim()) return
    const updated = addToShoppingList({ name: newItem.trim() })
    setItems(updated)
    setNewItem('')
  }

  const handleToggle = (id) => setItems(toggleShoppingItem(id))
  const handleRemove = (id) => setItems(removeFromShoppingList(id))
  const handleClear = () => { clearShoppingList(); setItems([]) }

  const checkedCount = items.filter(i => i.checked).length
  const progress = items.length ? Math.round((checkedCount / items.length) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">🛒</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{t('shoppingList.title')}</h1>
            <p className="text-emerald-100/80 text-sm">{t('shoppingList.items', { count: items.length })}</p>
          </div>
        </div>
        {items.length > 0 && (
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{checkedCount}/{items.length} {t('shoppingList.checked')}</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={newItem} onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder={t('shoppingList.placeholder')}
          className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
        />
        <button onClick={handleAdd} className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">{t('shoppingList.addItem')}</button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">{t('shoppingList.emptyTitle')}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">{t('shoppingList.emptyDesc')}</p>
          <Link to="/scan" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all">{t('shoppingList.scanVeggies')} →</Link>
        </div>
      ) : (
        <div className="space-y-1.5">
          {items.map(item => (
            <div key={item.id} className={`flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700 hover:shadow-sm transition-all ${item.checked ? 'opacity-60' : ''}`}>
              <button onClick={() => handleToggle(item.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center text-xs transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-500'}`}>
                {item.checked ? '✓' : ''}
              </button>
              <span className={`flex-1 text-sm font-medium ${item.checked ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{item.name}</span>
              <button onClick={() => handleRemove(item.id)} className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1">✕</button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="text-xs text-slate-400 dark:text-slate-500">{items.length - checkedCount} {t('shoppingList.remaining')}</span>
          <button onClick={handleClear} className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium transition-colors">{t('shoppingList.clearAll')}</button>
        </div>
      )}
    </div>
  )
}
