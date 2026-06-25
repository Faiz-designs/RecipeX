import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'

export default function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null)

  useEffect(() => {
    axios.get(`${API}/scan/demo`)
      .then(res => {
        const data = res.data
        const flat = []
        if (data?.result?.recipes) {
          const r = data.result.recipes
          if (r.easy) flat.push({ ...r.easy, difficulty: 'easy' })
          if (r.intermediate) flat.push({ ...r.intermediate, difficulty: 'intermediate' })
          if (r.advanced) flat.push({ ...r.advanced, difficulty: 'advanced' })
        }
        setRecipes(flat)
      })
      .catch(() => {})
  }, [])

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }, [])

  const parseCommand = useCallback((text) => {
    const lower = text.toLowerCase().trim()

    const navCommands = [
      { keywords: ['go to scan', 'open scan', 'scan vegetables', 'start scan'], path: '/scan', label: 'Scan' },
      { keywords: ['go home', 'go to home', 'home page'], path: '/', label: 'Home' },
      { keywords: ['show recipes', 'open recipes', 'browse recipes', 'all recipes'], path: '/recipes', label: 'Recipes' },
      { keywords: ['show history', 'scan history', 'my history'], path: '/history', label: 'History' },
      { keywords: ['meal planner', 'meal plan', 'plan meals'], path: '/meal-planner', label: 'Meal Planner' },
      { keywords: ['shopping list', 'my list'], path: '/shopping-list', label: 'Shopping List' },
      { keywords: ['nutrition', 'show nutrition', 'nutrition tracker'], path: '/nutrition', label: 'Nutrition' },
      { keywords: ['my profile', 'profile', 'account'], path: '/profile', label: 'Profile' },
    ]

    for (const cmd of navCommands) {
      if (cmd.keywords.some(k => lower.includes(k))) {
        navigate(cmd.path)
        speak(`Opening ${cmd.label}`)
        return true
      }
    }

    const recipePrefixes = ['prepare ', 'show ', 'how to cook ', 'how to make ', 'find ', 'make ', 'cook ']
    for (const prefix of recipePrefixes) {
      if (lower.includes(prefix)) {
        const idx = lower.indexOf(prefix)
        const query = lower.slice(idx + prefix.length).trim().replace(/^recipe\s+/, '').replace(/\s+recipe$/, '')
        if (!query || query.length < 2) continue

        const match = recipes.find(r => r.name.toLowerCase().includes(query))
        if (match) {
          navigate('/cooking-mode', { state: { recipe: match } })
          speak(`Starting ${match.name}`)
          return true
        }

        const fuzzy = recipes.find(r =>
          r.name.toLowerCase().split(' ').some(w => w.startsWith(query) || query.startsWith(w))
        )
        if (fuzzy) {
          navigate('/cooking-mode', { state: { recipe: fuzzy } })
          speak(`Starting ${fuzzy.name}`)
          return true
        }

        speak(`Sorry, I could not find a recipe for ${query}`)
        return true
      }
    }

    return false
  }, [navigate, recipes, speak])

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    setIsListening(true)
    setTranscript('')
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      const result = event.results[0]
      const text = result[0].transcript
      setTranscript(text)
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = setTimeout(() => { recognition.stop() }, 2000)
      if (result.isFinal) {
        const handled = parseCommand(text)
        if (handled) setTimeout(() => setIsListening(false), 800)
        else recognition.stop()
      }
    }
    recognition.onend = () => { setIsListening(false); clearTimeout(silenceTimerRef.current) }
    recognition.onerror = () => { setIsListening(false) }
    recognition.start()
    recognitionRef.current = recognition
    silenceTimerRef.current = setTimeout(() => { recognition.stop() }, 7000)
  }, [parseCommand])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop()
    clearTimeout(silenceTimerRef.current)
    setIsListening(false)
  }, [])

  const toggleListening = useCallback(() => {
    if (isListening) stopListening()
    else startListening()
  }, [isListening, startListening, stopListening])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort()
      clearTimeout(silenceTimerRef.current)
    }
  }, [])

  return { isListening, transcript, startListening, stopListening, toggleListening }
}
