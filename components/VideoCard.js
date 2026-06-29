'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { formatDate } from '@/lib/youtube'

export default function VideoCard({ video, size = 'normal' }) {
  const { lang } = useLang()

  const isLarge = size === 'large'

  return (
    <Link href={`/sermons/${video.videoId}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-video">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a2744]/10">
            <svg className="w-12 h-12 text-[#1a2744]/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        )}
      </div>
      <div className={`mt-2 ${isLarge ? 'mt-3' : ''}`}>
        <h3 className={`font-medium text-[#1C1C1E] group-hover:text-[#C9A84C] transition-colors line-clamp-2
          ${isLarge ? 'text-lg' : 'text-sm'}`}>
          {video.title}
        </h3>
        <p className={`text-[#6B6B6B] mt-1 ${isLarge ? 'text-sm' : 'text-xs'}`}>
          {formatDate(video.publishedAt, lang)}
        </p>
      </div>
    </Link>
  )
}
