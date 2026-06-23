import { Link } from 'react-router-dom'

const features = [
  { emoji: '📸', title: 'AI Scanner', desc: 'Real-time vegetable recognition with freshness detection and confidence scoring.' },
  { emoji: '🍳', title: 'Smart Recipes', desc: 'Easy, Intermediate, and Advanced recipes tailored to ingredients you have.' },
  { emoji: '🥦', title: 'Nutrition Data', desc: 'USDA-verified nutrition per 100g — calories, macros, fibre, vitamins, and glycemic index.' },
  { emoji: '🩺', title: 'Allergy Reports', desc: '9-group medical risk assessment with severity flags — safe, caution, or avoid.' },
  { emoji: '📊', title: 'Meal Planning', desc: 'Balance scores out of 10 with nutritional gap analysis and next-scan suggestions.' },
  { emoji: '💰', title: 'Budget Cooking', desc: 'Cost estimation per serving with money-saving tips and seasonal produce picks.' },
]

const techStack = [
  { name: 'React', color: 'text-sky-600 dark:text-sky-400' },
  { name: 'Vite', color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Tailwind', color: 'text-cyan-600 dark:text-cyan-400' },
  { name: 'FastAPI', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'Groq AI', color: 'text-orange-600 dark:text-orange-400' },
  { name: 'SQLite', color: 'text-blue-600 dark:text-blue-400' },
  { name: 'PythonAnywhere', color: 'text-teal-600 dark:text-teal-400' },
  { name: 'Vercel', color: 'text-slate-600 dark:text-slate-400' },
]

export default function About() {
  return (
    <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🥗</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">🤖</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥕</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🍅</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float stagger-5">🥦</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-1.5 mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-sm font-medium text-white/90">AI-Powered Smart Kitchen Assistant</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            About NutriVision AI
          </h1>
          <p className="text-lg text-emerald-100/90 mb-6 leading-relaxed max-w-xl mx-auto">
            AI-Powered Smart Kitchen Assistant — reducing food waste and making healthy cooking accessible to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 p-8 md:p-10 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-lg shadow-sm">🎯</div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Our Mission</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            We believe a smarter kitchen starts with knowing what's in your fridge. NutriVision AI uses
            advanced computer vision and nutritional science to help you identify vegetables, discover
            delicious recipes, understand what you're eating, and cook within your budget. Our goal is to
            <span className="font-semibold text-emerald-600 dark:text-emerald-400"> reduce food waste </span>
            and make
            <span className="font-semibold text-emerald-600 dark:text-emerald-400"> healthy cooking accessible </span>
            to everyone — one scan at a time.
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">Everything You Need</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Six powerful features packed into one seamless experience.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
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

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 p-8 md:p-10 text-center mb-16">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">Built with Love by RecipeX Team</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            A passionate team dedicated to making cooking smarter, healthier, and more fun.
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">Powered By</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Modern tools and technologies that make it all possible.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((t, i) => (
            <span key={i} className={`px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-semibold shadow-sm ${t.color}`}>
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
