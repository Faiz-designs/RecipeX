import { useState, useRef, useCallback, useEffect } from 'react'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'

export default function Scanner({ onScanComplete }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('upload')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)

  const handleFile = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file); setPreview(URL.createObjectURL(file)); setError('')
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) { setImage(file); setPreview(URL.createObjectURL(file)); setError('') }
    else { setError('Please drop an image file') }
  }, [])

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true) }, [])
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setDragOver(false) }, [])

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } })
      setStream(s)
    } catch { setError('Camera access denied. Use upload mode instead.') }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  const captureFromCamera = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
      setImage(file); setPreview(URL.createObjectURL(file))
    }, 'image/jpeg')
    if (stream) stream.getTracks().forEach(t => t.stop())
    setStream(null)
  }, [stream])

  const handleDemo = async () => {
    setLoading(true); setError('')
    try {
      const res = await axios.get(`${API}/scan/demo`)
      if (onScanComplete) onScanComplete(res.data)
    } catch { setError('Demo failed. Is the backend running?') }
    finally { setLoading(false) }
  }

  const handleScan = async () => {
    if (!image) { setError('Please select or capture an image'); return }
    setLoading(true); setError('')
    try {
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.onerror = reject
      })
      const base64 = await toBase64(image)
      const res = await axios.post(`${API}/scan/`, { image: base64 })
      if (onScanComplete) onScanComplete(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Is the backend running?')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md"><span className="text-lg">📸</span></div>
          <div><h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Scan Vegetables</h2><p className="text-sm text-slate-400 dark:text-slate-500">Upload a photo or use demo mode</p></div>
        </div>

        <div className="flex gap-2 mb-6 bg-slate-100/80 dark:bg-slate-700/50 rounded-xl p-1">
          {['upload', 'camera'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null) } }} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === m ? 'bg-white dark:bg-slate-600 text-emerald-700 dark:text-emerald-300 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
              {m === 'upload' ? '📁 Upload' : '📷 Camera'}
            </button>
          ))}
        </div>

        {mode === 'upload' && (
          <div onClick={() => !loading && fileRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden ${dragOver ? 'border-emerald-400 bg-emerald-50/80 dark:bg-emerald-900/30 scale-[1.01]' : 'border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20'}`}>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} hidden />
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="relative w-14 h-14"><div className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-800 rounded-full" /><div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" /></div>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">Analyzing with AI...</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm">Identifying vegetables and generating insights</p>
              </div>
            ) : preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full max-h-72 object-contain p-4" />
                <button onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null) }} className="absolute top-2 right-2 w-8 h-8 bg-slate-800/60 hover:bg-slate-800/80 text-white rounded-full flex items-center justify-center text-sm backdrop-blur-sm transition-all">✕</button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center text-3xl mb-4">📸</div>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Click or drag & drop an image</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Supports JPG, PNG, WEBP</p>
              </div>
            )}
          </div>
        )}

        {mode === 'camera' && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden bg-slate-50/50 dark:bg-slate-800/50">
            {!stream ? (
              <div className="flex flex-col items-center py-12">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl mb-4">📷</div>
                <p className="text-slate-500 dark:text-slate-400 mb-4">Click to start your camera</p>
                <button onClick={startCamera} className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">Start Camera</button>
              </div>
            ) : (
              <div>
                <video ref={videoRef} autoPlay className="w-full max-h-72 object-contain bg-black/5 dark:bg-black/20" />
                <div className="flex gap-2 p-3 bg-slate-100/50 dark:bg-slate-700/50">
                  <button onClick={captureFromCamera} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md">Capture Photo</button>
                  <button onClick={() => { stream.getTracks().forEach(t => t.stop()); setStream(null) }} className="px-4 py-2.5 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-all">Cancel</button>
                </div>
              </div>
            )}
            {preview && <div className="relative border-t border-slate-200 dark:border-slate-600"><img src={preview} alt="Captured" className="w-full max-h-48 object-contain p-3" /></div>}
          </div>
        )}

        <canvas ref={canvasRef} hidden />

        {error && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2"><span>⚠</span> {error}</div>}

        <div className="flex gap-3 mt-6">
          <button onClick={handleScan} disabled={loading || !image} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl text-base font-bold hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
            {loading ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</> : 'Scan & Analyze'}
          </button>
          <button onClick={handleDemo} disabled={loading} className="px-6 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
            {loading ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading...</> : 'Demo Mode'}
          </button>
        </div>
      </div>
    </div>
  )
}
