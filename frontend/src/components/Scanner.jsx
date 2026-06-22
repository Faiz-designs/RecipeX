import { useState, useRef, useCallback } from 'react'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'

export default function Scanner({ onScanComplete }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('upload')
  const fileRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)

  const handleFile = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(s)
      if (videoRef.current) videoRef.current.srcObject = s
    } catch {
      setError('Camera access denied. Use upload mode instead.')
    }
  }, [])

  const captureFromCamera = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }, 'image/jpeg')
    if (stream) stream.getTracks().forEach(t => t.stop())
    setStream(null)
  }, [stream])

  const handleDemo = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${API}/scan/demo`)
      if (onScanComplete) onScanComplete(res.data)
    } catch (err) {
      setError('Demo failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleScan = async () => {
    if (!image) { setError('Please select or capture an image'); return }
    setLoading(true)
    setError('')
    const form = new FormData()
    form.append('file', image)
    try {
      const res = await axios.post(`${API}/scan/`, form)
      if (onScanComplete) onScanComplete(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Scan failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Capture Vegetables</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode('upload'); if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null) } }}
          className={`px-4 py-2 rounded ${mode === 'upload' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >Upload</button>
        <button
          onClick={() => { setMode('camera'); startCamera() }}
          className={`px-4 py-2 rounded ${mode === 'camera' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >Camera</button>
      </div>

      {mode === 'upload' && (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-400 mb-4"
        >
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} hidden />
          {preview
            ? <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
            : <p className="text-gray-400 text-lg">Click to upload vegetable image</p>
          }
        </div>
      )}

      {mode === 'camera' && (
        <div className="mb-4">
          {!stream && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">Click Start Camera</p>
              <button
                onClick={startCamera}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >Start Camera</button>
            </div>
          )}
          {stream && (
            <div className="text-center">
              <video ref={videoRef} autoPlay className="max-h-64 mx-auto rounded border" />
              <button
                onClick={captureFromCamera}
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >Capture</button>
            </div>
          )}
          {preview && (
            <img src={preview} alt="Captured" className="max-h-64 mx-auto rounded mt-3" />
          )}
        </div>
      )}

      <canvas ref={canvasRef} hidden />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleScan}
          disabled={loading || !image}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing with AI...' : 'Scan & Analyze'}
        </button>
        <button
          onClick={handleDemo}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Demo Mode
        </button>
      </div>
    </div>
  )
}
