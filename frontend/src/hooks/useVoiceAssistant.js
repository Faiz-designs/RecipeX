import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'

export default function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null)
  const finalTranscriptRef = useRef('')

  useEffect(() => {
    const hasSR = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    setIsSupported(hasSR)
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
    utterance.onerror = () => {}
    window.speechSynthesis.speak(utterance)
  }, [])

  const parseCommand = useCallback((text) => {
    const lower = text.toLowerCase().trim()
    if (!lower) return false

    const navCommands = [
      { keywords: ['go to scan', 'open scan', 'scan vegetables', 'start scan'], path: '/scan', label: 'Scan' },
      { keywords: ['go home', 'go to home', 'home page', 'open home'], path: '/', label: 'Home' },
      { keywords: ['show recipes', 'open recipes', 'browse recipes', 'all recipes'], path: '/recipes', label: 'Recipes' },
      { keywords: ['show history', 'scan history', 'my history'], path: '/history', label: 'History' },
      { keywords: ['meal planner', 'meal plan', 'plan meals'], path: '/meal-planner', label: 'Meal Planner' },
      { keywords: ['shopping list', 'my list', 'open list'], path: '/shopping-list', label: 'Shopping List' },
      { keywords: ['nutrition', 'show nutrition', 'nutrition tracker'], path: '/nutrition', label: 'Nutrition' },
      { keywords: ['my profile', 'profile', 'account', 'open profile'], path: '/profile', label: 'Profile' },
    ]

    for (const cmd of navCommands) {
      if (cmd.keywords.some(k => lower.includes(k))) {
        navigate(cmd.path)
        speak(`Opening ${cmd.label}`)
        return true
      }
    }

    const recipePrefixes = ['prepare ', 'show ', 'how to cook ', 'how to make ', 'find ', 'make ', 'cook ', 'i want ']
    for (const prefix of recipePrefixes) {
      if (lower.includes(prefix)) {
        const idx = lower.indexOf(prefix)
        let query = lower.slice(idx + prefix.length).trim()
          .replace(/^recipe\s+/, '').replace(/\s+recipe$/, '')
          .replace(/^a\s+|^an\s+|^the\s+|^some\s+/i, '')
          .replace(/[^a-z0-9\s]/g, '').trim()
        if (!query || query.length < 2) continue

        const match = recipes.find(r => r.name.toLowerCase().includes(query))
        if (match) {
          navigate('/cooking-mode', { state: { recipe: match } })
          speak(`Starting ${match.name}`)
          return true
        }

        const queryWords = query.split(/\s+/)
        const fuzzy = recipes.find(r => {
          const nameWords = r.name.toLowerCase().split(/\s+/)
          return queryWords.some(qw =>
            qw.length > 2 && nameWords.some(nw => nw.startsWith(qw) || qw.startsWith(nw))
          )
        })
        if (fuzzy) {
          navigate('/cooking-mode', { state: { recipe: fuzzy } })
          speak(`Starting ${fuzzy.name}`)
          return true
        }

        speak(`Sorry, I could not find a recipe for ${query}`)
        return true
      }
    }

    if (lower.includes('hello') || lower.includes('hi nut') || lower.includes('hey')) {
      speak('Hello! Try saying prepare, or go to scan')
      return true
    }

    return false
  }, [navigate, recipes, speak])

  const processTranscript = useCallback((text) => {
    if (!text || !text.trim()) return
    const handled = parseCommand(text)
    if (handled) {
      setTimeout(() => setIsListening(false), 800)
    } else {
      speak("Sorry, I didn't catch that")
    }
  }, [parseCommand, speak])

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    setIsListening(true)
    setTranscript('')
    finalTranscriptRef.current = ''

    speak('I\'m listening')

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-IN'

    recognition.onresult = (event) => {
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0].transcript
        setTranscript(text)
        if (result.isFinal) {
          finalTranscriptRef.current = text
          clearTimeout(silenceTimerRef.current)
          recognition.stop()
          return
        }
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      clearTimeout(silenceTimerRef.current)
      if (finalTranscriptRef.current) {
        processTranscript(finalTranscriptRef.current)
      } else if (transcript) {
        processTranscript(transcript)
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
      speak('Microphone error. Please allow microphone access.')
    }

    recognition.start()
    recognitionRef.current = recognition
    silenceTimerRef.current = setTimeout(() => {
      recognition.stop()
    }, 10000)
  }, [processTranscript, speak, transcript])

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

  return { isListening, transcript, isSupported, startListening, stopListening, toggleListening }
}
