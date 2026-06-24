import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { t } = useTranslation()
  const heroRef = useRef()
  const statsRef = useRef()
  const featuresRef = useRef()
  const stepsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { y: 80, opacity: 0, duration: 1, ease: 'power4.out' })
      gsap.from('.hero-sub', { y: 40, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, delay: 0.6, ease: 'power3.out', stagger: 0.15 })
      gsap.from('.hero-image', { scale: 1.1, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power4.out' })
      gsap.from('.stat-item', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } })
      gsap.from('.feature-card', { y: 80, opacity: 0, duration: 0.8, stagger: 0.12, scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' } })
      gsap.from('.step-card', { x: -60, opacity: 0, duration: 0.7, stagger: 0.2, scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO title="Home" description="Your smart kitchen companion. Scan vegetables, get AI-powered recipes, nutrition, and allergy insights." />
      <div>
        {/* Hero */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-red-950/70 to-stone-900" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-600/15 blur-[100px]" />
          <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-full text-red-300 text-sm font-semibold mb-6">AI-Powered Kitchen Assistant</span>
                <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6">
                  <span className="font-display">RecipeX</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-300">AI</span>
                </h1>
                <p className="hero-sub text-lg md:text-xl text-stone-300 max-w-lg mb-8 leading-relaxed">
                  Scan any vegetable with your camera and get instant recipes, nutrition, storage tips, and more — powered by artificial intelligence.
                </p>
                <div className="hero-cta flex flex-wrap gap-4">
                  <Link to="/scan" className="btn-glass btn-glass-red px-8 py-4 rounded-xl text-lg">Start Scanning</Link>
                  <Link to="/recipes" className="btn-glass btn-glass-white px-8 py-4 rounded-xl text-lg">Explore Recipes</Link>
                </div>
              </div>
              <div className="hero-image relative">
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-red-500/30 via-rose-600/20 to-red-500/10 border border-red-400/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4 animate-float">🥗</div>
                    <p className="text-stone-300 text-lg font-medium">Snap. Scan. Cook.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section ref={statsRef} className="relative -mt-20 z-10 max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Foods Scanned' },
              { value: '10K+', label: 'Recipes' },
              { value: '5K+', label: 'Active Users' },
              { value: '99%', label: 'Accuracy' },
            ].map(s => (
              <div key={s.label} className="stat-item text-center">
                <div className="text-3xl md:text-4xl font-black text-red-600 font-display">{s.value}</div>
                <div className="text-sm text-stone-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section ref={featuresRef} className="max-w-6xl mx-auto px-6 py-28">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4 font-display text-stone-800 dark:text-stone-100">
            Everything You Need
          </h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-16">
            From scanning to cooking, RecipeX AI has you covered.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop', title: 'Smart Scan', desc: 'Identify any vegetable instantly with AI' },
              { img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop', title: 'Recipe Finder', desc: 'Get personalized recipes from your ingredients' },
              { img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop', title: 'Nutrition Data', desc: 'Detailed macros, vitamins, and health insights' },
              { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', title: 'Meal Planner', desc: 'AI generates weekly meal plans for you' },
              { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop', title: 'Shopping List', desc: 'Auto-categorized lists with delivery links' },
              { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop', title: '8 Languages', desc: 'Available in English, Hindi, Telugu & more' },
            ].map(f => (
              <div key={f.title} className="feature-card glass-card rounded-2xl card-hover overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section ref={stepsRef} className="bg-stone-50 dark:bg-stone-800/50 py-28">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4 font-display text-stone-800 dark:text-stone-100">
              How It Works
            </h2>
            <p className="text-stone-500 text-center max-w-xl mx-auto mb-16">
              Three simple steps to smarter cooking.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop', title: 'Scan', desc: 'Point your camera at any vegetable or upload a photo.' },
                { step: '02', img: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=400&fit=crop', title: 'Discover', desc: 'Get instant AI analysis with recipes, nutrition, and tips.' },
                { step: '03', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', title: 'Cook & Track', desc: 'Follow guided recipes, track nutrition, and plan meals.' },
              ].map(s => (
                <div key={s.step} className="step-card glass-card rounded-2xl card-hover overflow-hidden">
                  <div className="h-52 overflow-hidden relative">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-4xl font-black text-white/80 font-display leading-none">{s.step}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">{s.title}</h3>
                    <p className="text-stone-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="glass-card rounded-3xl p-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-display text-stone-800 dark:text-stone-100">
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto mb-10">
              Join thousands of smart cooks using AI to reduce waste, eat better, and save time.
            </p>
            <Link to="/signup" className="btn-glass btn-glass-red px-10 py-4 rounded-xl text-lg inline-block">Get Started Free</Link>
          </div>
        </section>
      </div>
    </>
  )
}
