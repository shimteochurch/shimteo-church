'use client'

import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import VideoCard from '@/components/VideoCard'
import { formatDate } from '@/lib/youtube'

export default function SeriesDetailClient({ playlist }) {
  const { lang } = useLang()
  const s = translations.sermons

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/sermons"
        className="text-[#C9A84C] hover:text-[#b8963f] text-sm font-medium transition-colors inline-block mb-6"
      >
        {s.backToSermons[lang]}
      </Link>

      {/* Series Header */}
      <div className="bg-gradient-to-br from-[#1a2744] to-[#2a3d5c] rounded-xl p-8 sm:p-10 mb-10 text-white">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
          {playlist.korean}
        </h1>
        <p className="text-gray-300 text-lg mb-4">{playlist.english}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span>{playlist.videoCount} {s.videos[lang]}</span>
          {playlist.dateRange && (
            <>
              <span>&middot;</span>
              <span>{formatDate(playlist.dateRange.start, lang)} ~</span>
            </>
          )}
          <span className="text-xs px-2 py-1 bg-[#C9A84C]/20 text-[#C9A84C] rounded-full font-medium">
            {s.ongoing[lang]}
          </span>
        </div>
      </div>

      {/* Video Grid */}
      {playlist.videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.videos.map(video => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-[#6B6B6B] text-center py-12">
          {lang === 'ko' ? '아직 영상이 없습니다.' : 'No videos yet.'}
        </p>
      )}
    </div>
  )
}
