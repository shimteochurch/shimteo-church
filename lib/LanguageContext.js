'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko')

  useEffect(() => {
    const saved = localStorage.getItem('shimteo-lang')
    if (saved === 'en' || saved === 'ko') {
      setLang(saved)
    }
  }, [])

  function toggleLang() {
    const next = lang === 'ko' ? 'en' : 'ko'
    setLang(next)
    localStorage.setItem('shimteo-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang must be used within LanguageProvider')
  return context
}

export function t(obj, lang) {
  if (!obj) return ''
  return obj[lang] || obj.ko || ''
}
