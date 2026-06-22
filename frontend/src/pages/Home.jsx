import { Link } from 'react-router-dom'

const features = [
  { emoji: '📸', title: 'Smart Scan', desc: 'Upload a photo or use your camera. AI identifies vegetables instantly with freshness and confidence.' },
  { emoji: '🍳', title: '3-Level Recipes', desc: 'Easy, intermediate, and advanced recipes tailored to exactly what you have in hand.' },
  { emoji: '🥦', title: 'Nutrition per 100g', desc: 'USDA-verified nutrition data — calories, macros, fiber, vitamins, and glycemic index.' },
  { emoji: '🩺', title: 'Allergy Risk Report', desc: '9-group health risk assessment with severity flags — safe, caution, or avoid.' },
  { emoji: '🔄', title: 'Smart Substitutions', desc: 'When a vegetable is risky, get a safe alternative with nutritional equivalence info.' },
  { emoji: '📊', title: 'Meal Balance Score', desc: 'Overall health score with nutritional gap analysis and next-scan suggestions.' },
]

export default function Home() {
  return (
    <div className="min-h-[80vh]">
      <div className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="text-6xl mb-4">🥗</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            NutriVision AI
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            AI-powered smart kitchen assistant. Scan vegetables, get recipes, nutrition, allergy info, and smart substitutions — all in seconds.
          </p>
          <Link
            to="/scan"
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Start Scanning →
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-green-200 transition">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
