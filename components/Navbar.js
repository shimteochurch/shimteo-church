'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = translations.nav

  const links = [
    { href: '/', label: nav.home },
    { href: '/sermons', label: nav.sermons },
    { href: '/about', label: nav.about },
    { href: '/contact', label: nav.contact },
  ]

  function isActive(href) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#1a2744] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-lg font-serif font-bold tracking-wide" onClick={() => setMobileOpen(false)}>
            <span>쉼터 교회</span>
            <span className="text-[#C9A84C]">·</span>
            <span className="text-sm font-sans font-normal opacity-80">Shimteo Church</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors relative
                  ${isActive(link.href)
                    ? 'text-[#C9A84C]'
                    : 'text-gray-200 hover:text-white'
                  }`}
              >
                {link.label[lang]}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C] rounded-full" />
                )}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="ml-4 px-3 py-1 text-xs font-bold border border-[#C9A84C] text-[#C9A84C] rounded hover:bg-[#C9A84C] hover:text-[#1a2744] transition-colors"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-bold border border-[#C9A84C] text-[#C9A84C] rounded hover:bg-[#C9A84C] hover:text-[#1a2744] transition-colors"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1a2744] border-t border-white/10 pb-3">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors
                ${isActive(link.href)
                  ? 'text-[#C9A84C] bg-white/5'
                  : 'text-gray-200 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.label[lang]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
