import { Link } from 'react-router-dom'

const features = [
  { emoji: '📸', title: 'Smart Scan', desc: 'Upload a photo or use your camera. AI identifies vegetables instantly with freshness and confidence.' },
  { emoji: '🍳', title: '3-Level Recipes', desc: 'Easy, intermediate, and advanced recipes tailored to exactly what you have in hand.' },
  { emoji: '🥦', title: 'Nutrition per 100g', desc: 'USDA-verified nutrition data — calories, macros, fiber, vitamins, and glycemic index.' },
  { emoji: '🩺', title: 'Allergy Risk Report', desc: '9-group health risk assessment with severity flags — safe, caution, or avoid.' },
  { emoji: '🔄', title: 'Smart Substitutions', desc: 'When a vegetable is risky, get a safe alternative with nutritional equivalence info.' },
  { emoji: '📊', title: 'Meal Balance Score', desc: 'Overall health score with nutritional gap analysis and next-scan suggestions.' },
]

const stats = [
  { value: '5+', label: 'Vegetables' },
  { value: '15+', label: 'Recipes' },
  { value: '9', label: 'Allergy Groups' },
  { value: '100%', label: 'Free' },
]

export default function Home() {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🥦</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">🍅</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥕</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🥬</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float stagger-5">🌶️</div>
          <div className="absolute top-40 left-1/2 text-3xl animate-float stagger-6">🧄</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-1.5 mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-sm font-medium text-white/90">AI-Powered Kitchen Assistant</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Your Smart
            <span className="block text-emerald-200">Kitchen Companion</span>
          </h1>
          <p className="text-lg text-emerald-100/90 mb-10 leading-relaxed max-w-xl mx-auto">
            Scan any vegetable, get instant recipes, nutrition facts, allergy alerts,
            and smart swaps — all powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/scan" className="group inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3.5 rounded-xl text-lg font-bold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl active:scale-[0.97]">
              Start Scanning
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to="/scan" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/25 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all">
              Try Demo <span>🎮</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{s.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">Everything You Need</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">From identification to the dinner table — one tool does it all.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-6 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {item.emoji}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1.5 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Transform Your Kitchen?</h2>
          <p className="text-emerald-100/90 mb-8 max-w-lg mx-auto">Stop guessing what's for dinner. Scan what you have and let AI do the rest.</p>
          <Link to="/scan" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl active:scale-[0.97]">
            Get Started Free <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
