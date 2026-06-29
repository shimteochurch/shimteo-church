'use client'

import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import churchConfig from '@/config/church'

export default function Footer() {
  const { lang } = useLang()
  const nav = translations.nav
  const year = new Date().getFullYear()
  const addr = churchConfig.address

  return (
    <footer className="bg-[#1a2744] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-2">
              {churchConfig.name[lang === 'ko' ? 'korean' : 'english']}
            </h3>
            <p className="text-sm text-gray-400">
              {addr.street}, {addr.city}, {addr.state} {addr.zip}
            </p>
            <p className="text-sm text-gray-400 mt-1">{churchConfig.email}</p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
              {lang === 'ko' ? '바로가기' : 'Quick Links'}
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: nav.home },
                { href: '/sermons', label: nav.sermons },
                { href: '/about', label: nav.about },
                { href: '/contact', label: nav.contact },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors"
                >
                  {link.label[lang]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
              {lang === 'ko' ? '연결' : 'Connect'}
            </h4>
            <a
              href={churchConfig.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C9A84C] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {year} {churchConfig.name[lang === 'ko' ? 'korean' : 'english']}. {translations.footer.allRightsReserved[lang]}
        </div>
      </div>
    </footer>
  )
}
