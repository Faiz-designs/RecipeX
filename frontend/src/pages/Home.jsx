import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <div className="text-6xl mb-6">🥗</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          NutriVision AI
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          AI-powered smart kitchen assistant.<br />
          Scan vegetables, get recipes, nutrition, allergy info, and smart substitutions — all in seconds.
        </p>
        <Link
          to="/scan"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg"
        >
          Start Scanning
        </Link>
        <div className="mt-12 grid md:grid-cols-3 gap-4 text-left">
          {[
            { emoji: '📸', title: 'Scan & Identify', desc: 'Upload or capture a photo of your vegetables. AI identifies them instantly.' },
            { emoji: '🍳', title: '3 Skill-Level Recipes', desc: 'Easy, intermediate, and advanced recipes tailored to what you have.' },
            { emoji: '🩺', title: 'Allergy-Safe Substitutions', desc: 'Flagged risks with smart alternatives for every dietary need.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
