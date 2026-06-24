import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function Home() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.animate-on-scroll')
      cards.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = document.getElementById('stats-section')
    if (el) {
      const statCards = el.querySelectorAll('.animate-stat')
      statCards.forEach((c) => observer.observe(c))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = document.getElementById('features-section')
    if (el) {
      const featureCards = el.querySelectorAll('.animate-feature')
      featureCards.forEach((c) => observer.observe(c))
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    { emoji: '📸', title: t('home.features.smartScan'), desc: t('home.features.smartScanDesc') },
    { emoji: '🍳', title: t('home.features.threeLevelRecipes'), desc: t('home.features.threeLevelRecipesDesc') },
    { emoji: '🥦', title: t('home.features.nutritionPer100g'), desc: t('home.features.nutritionPer100gDesc') },
    { emoji: '🩺', title: t('home.features.allergyReport'), desc: t('home.features.allergyReportDesc') },
    { emoji: '🔄', title: t('home.features.smartSubstitutions'), desc: t('home.features.smartSubstitutionsDesc') },
    { emoji: '📊', title: t('home.features.mealBalanceScore'), desc: t('home.features.mealBalanceScoreDesc') },
  ]

  const stats = [
    { value: '5+', label: t('home.stats.vegetables') },
    { value: '15+', label: t('home.stats.recipes') },
    { value: '9', label: t('home.stats.allergyGroups') },
    { value: '100%', label: t('home.stats.free') },
  ]

  return (
    <>
      <SEO title="Home" description="Your smart kitchen companion. Scan vegetables, get AI-powered recipes, nutrition, and allergy insights." />
      <div ref={sectionRef}>
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 text-7xl animate-float stagger-1">🥦</div>
          <div className="absolute top-20 right-20 text-6xl animate-float stagger-3">🍅</div>
          <div className="absolute bottom-16 left-1/4 text-5xl animate-float stagger-5">🥕</div>
          <div className="absolute top-1/3 right-1/4 text-6xl animate-float stagger-2">🥬</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-float stagger-6">🌶️</div>
          <div className="absolute top-40 left-1/2 text-4xl animate-float stagger-4">🧄</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-1.5 mb-6 border border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t('home.aiPowered')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {t('home.heroTitle')}
            <span className="block text-emerald-200 mt-2">{t('home.heroTitleLine2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/85 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('home.heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/scan"
              className="group inline-flex items-center gap-2 btn-glass btn-glass-white px-8 py-3.5 rounded-xl text-lg active:scale-[0.97]"
            >
              {t('home.startScanning')}
              <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
            </Link>
            <Link
              to="/scan"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              {t('home.tryDemo')} <span>🎮</span>
            </Link>
          </div>
        </div>
      </div>

      <div id="stats-section" className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="animate-stat opacity-0 relative glass-card rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-2xl" />
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{s.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="features-section" className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">{t('home.featuresTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">{t('home.featuresDesc')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <div
              key={i}
              className="animate-feature opacity-0 group relative glass-card rounded-2xl shadow-sm p-6 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1.5 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/60 dark:to-teal-800/60 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-1 ring-emerald-200/50 dark:ring-emerald-700/30">
                {item.emoji}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-6 left-10 text-5xl animate-float stagger-2">🥦</div>
          <div className="absolute bottom-6 right-10 text-5xl animate-float stagger-4">🍳</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('home.ctaTitle')}</h2>
          <p className="text-emerald-100/85 mb-8 max-w-lg mx-auto">{t('home.ctaDesc')}</p>
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 btn-glass btn-glass-white px-10 py-4 rounded-xl text-lg active:scale-[0.97]"
          >
            {t('home.getStarted')} <span>→</span>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
