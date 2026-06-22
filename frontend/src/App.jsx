import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              <span className="font-bold text-gray-800 text-lg">NutriVision AI</span>
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="text-gray-600 hover:text-green-600 text-sm font-medium">Home</Link>
              <Link to="/scan" className="text-gray-600 hover:text-green-600 text-sm font-medium">Scan</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6 mt-8">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
            <p>NutriVision AI — AI-powered smart kitchen assistant</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
