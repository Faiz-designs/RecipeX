import { useState } from 'react'

const faqItems = [
  {
    q: 'How does the scanner work?',
    a: 'Simply upload a photo or use your camera to capture a vegetable. Our AI model identifies it in real time, estimates freshness and quantity, and returns recipes, nutrition data, and allergy information.'
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Scanned images are processed securely and are not stored permanently. Your scan history is saved locally in your browser and never shared with third parties.'
  },
  {
    q: 'Can I use this for business?',
    a: 'Absolutely! NutriVision AI is free to use for personal and commercial purposes. Contact us for partnership opportunities or custom integrations.'
  },
  {
    q: 'What does the free plan include?',
    a: 'Everything! All features — AI scanning, recipes, nutrition data, allergy reports, substitutions, and improvements — are completely free with no limits.'
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [expanded, setExpanded] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you, ${form.name || 'Guest'}! Your message has been received. We typically respond within 24–48 hours.`)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">📬</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">✉️</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">💬</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">📧</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">Get in Touch</h1>
          <p className="text-lg text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Have a question, suggestion, or bug report? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">📧</div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Email</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">support@nutrivision.ai</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">📍</div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Location</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Remote · Worldwide</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">⏱️</div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Response Time</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">24–48 hours</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-lg shadow-sm">✉️</div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Send a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition">
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows="5" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition resize-vertical" placeholder="Tell us what's on your mind..." />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">Send Message</button>
            </form>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-lg shadow-sm">❓</div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Frequently Asked</h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-300">
                  <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="font-semibold text-slate-800 dark:text-slate-100 pr-4">{item.q}</span>
                    <span className={`shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${expanded === i ? 'rotate-180' : ''}`}>↓</span>
                  </button>
                  {expanded === i && (
                    <div className="px-5 pb-5 animate-fadeIn">
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
