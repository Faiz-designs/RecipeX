import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import History from './pages/History'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 flex flex-col">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <span className="text-lg">🥗</span>
              </div>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 text-lg">
                NutriVision AI
              </span>
            </Link>
            <div className="flex gap-1.5">
              <Link to="/" className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50/80">
                Home
              </Link>
              <Link to="/scan" className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50/80">
                Scan
              </Link>
              <Link to="/history" className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50/80">
                History
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <footer className="border-t border-white/20 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-xs">🥗</span>
                </div>
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">NutriVision AI</span>
              </div>
              <p className="text-sm text-slate-400">AI-powered smart kitchen assistant</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
