import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'

export default function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [lastCommand, setLastCommand] = useState('')
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const timerRef = useRef(null)
  const finalRef = useRef('')

  useEffect(() => {
    const hasSR = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    setIsSupported(hasSR)
    axios.get(`${API}/scan/demo`).then(res => {
      const flat = []
      const r = res.data?.result?.recipes
      if (r) { ['easy', 'intermediate', 'advanced'].forEach(d => { if (r[d]) flat.push({ ...r[d], difficulty: d }) }) }
      setRecipes(flat)
    }).catch(() => {})
  }, [])

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  }, [])

  const parseCommand = useCallback((text) => {
    const lower = text.toLowerCase().trim()
    if (!lower) return false

    const navs = [
      { k: ['go to scan', 'open scan', 'scan vegetables', 'start scan'], p: '/scan', l: 'Scan' },
      { k: ['go home', 'home page'], p: '/', l: 'Home' },
      { k: ['show recipes', 'open recipes', 'browse recipes', 'all recipes', 'recipes'], p: '/recipes', l: 'Recipes' },
      { k: ['show history', 'scan history', 'history'], p: '/history', l: 'History' },
      { k: ['meal planner', 'meal plan', 'plan meals', 'meal'], p: '/meal-planner', l: 'Meal Planner' },
      { k: ['shopping list', 'my list', 'shopping'], p: '/shopping-list', l: 'Shopping List' },
      { k: ['nutrition', 'nutrition tracker'], p: '/nutrition', l: 'Nutrition' },
      { k: ['profile', 'my profile'], p: '/profile', l: 'Profile' },
    ]
    for (const c of navs) {
      if (c.k.some(k => lower.includes(k))) { navigate(c.p); speak(`Opening ${c.l}`); return true }
    }

    const prefixes = ['prepare ', 'show ', 'how to cook ', 'how to make ', 'find ', 'make ', 'cook ', 'i want ']
    for (const p of prefixes) {
      if (lower.includes(p)) {
        const idx = lower.indexOf(p)
        let q = lower.slice(idx + p.length).trim()
          .replace(/^(recipe|a|an|the|some)\s+/, '')
          .replace(/\s+recipe$/, '')
          .replace(/[^a-z0-9\s]/g, '').trim()
        if (!q || q.length < 2) continue

        const exact = recipes.find(r => r.name.toLowerCase().includes(q))
        if (exact) { navigate('/cooking-mode', { state: { recipe: exact } }); speak(`Starting ${exact.name}`); return true }

        const fuzzy = recipes.find(r => {
          const rw = r.name.toLowerCase().split(/\s+/)
          return q.split(/\s+/).some(w => w.length > 2 && rw.some(n => n.includes(w) || w.includes(n)))
        })
        if (fuzzy) { navigate('/cooking-mode', { state: { recipe: fuzzy } }); speak(`Starting ${fuzzy.name}`); return true }

        speak(`Sorry, no recipe found for ${q}`)
        return true
      }
    }

    if (lower.includes('hello') || lower.includes('hi')) { speak('Hi! Say prepare a recipe or go to scan'); return true }
    return false
  }, [navigate, recipes, speak])

  const process = useCallback((text) => {
    setTranscript(text)
    if (!text || !text.trim()) return
    const handled = parseCommand(text)
    if (!handled) speak("Sorry, I didn't catch that")
  }, [parseCommand, speak])

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    setIsListening(true)
    setTranscript('')
    finalRef.current = ''

    let rec
    try { rec = new SR() } catch { setIsListening(false); return }
    rec.continuous = false
    rec.interimResults = true
    rec.lang = 'en-US'

    rec.onresult = (e) => {
      for (let i = e.results.length - 1; i >= 0; i--) {
        const r = e.results[i]
        if (r.isFinal) {
          finalRef.current = r[0].transcript
          setTranscript(finalRef.current)
          clearTimeout(timerRef.current)
          rec.stop()
          return
        } else if (i === e.results.length - 1) {
          setTranscript(r[0].transcript)
        }
      }
    }

    rec.onend = () => {
      setIsListening(false)
      clearTimeout(timerRef.current)
      if (finalRef.current) process(finalRef.current)
    }

    rec.onerror = (e) => {
      setIsListening(false)
      if (e.error === 'not-allowed') {
        setLastCommand('Please allow microphone access in browser settings')
      }
    }

    try { rec.start(); recognitionRef.current = rec } catch { setIsListening(false) }
    timerRef.current = setTimeout(() => { try { rec.stop() } catch {} }, 10000)
  }, [process])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) { try { recognitionRef.current.stop() } catch {}; recognitionRef.current = null }
    clearTimeout(timerRef.current)
    setIsListening(false)
  }, [])

  const toggleListening = useCallback(() => {
    if (recognitionRef.current) stopListening()
    else startListening()
  }, [startListening, stopListening])

  const submitText = useCallback((text) => {
    if (text && text.trim()) process(text)
  }, [process])

  useEffect(() => {
    return () => { if (recognitionRef.current) { try { recognitionRef.current.abort() } catch {} }; clearTimeout(timerRef.current) }
  }, [])

  return { isListening, transcript, isSupported, lastCommand, startListening, stopListening, toggleListening, submitText }
}
