import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ShareButton({ title, text, url }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const shareUrl = url || window.location.href
  const shareTitle = title || document.title

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: text || shareTitle, url: shareUrl })
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        prompt('Copy this link:', shareUrl)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-slate-200 dark:border-slate-600/60"
      aria-label={t('share.title')}
    >
      {copied ? '✓' : '🔗'} {copied ? t('share.copied') : t('share.title')}
    </button>
  )
}
