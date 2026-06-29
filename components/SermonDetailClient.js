'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import churchConfig from '@/config/church'
import VideoCard from '@/components/VideoCard'
import { formatDate, formatViewCount } from '@/lib/youtube'

export default function SermonDetailClient({ video, playlist, relatedVideos }) {
  const { lang } = useLang()
  const t = translations.sermon
  const s = translations.sermons
  const [expanded, setExpanded] = useState(false)

  const descriptionLines = video.description?.split('\n') || []
  const isLong = descriptionLines.length > 5 || (video.description?.length || 0) > 300

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {playlist && (
        <Link
          href={`/sermons/series/${playlist.id}`}
          className="text-[#C9A84C] hover:text-[#b8963f] text-sm font-medium transition-colors inline-block mb-4"
        >
          {s.backToSeries[lang]}
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-6">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Video Info */}
          <div className="space-y-3">
            {playlist && (
              <Link
                href={`/sermons/series/${playlist.id}`}
                className="inline-block text-xs px-2 py-1 bg-[#1a2744]/5 text-[#1a2744] rounded-full font-medium hover:bg-[#1a2744]/10 transition-colors"
              >
                {playlist[lang === 'ko' ? 'korean' : 'english']}
              </Link>
            )}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a2744]">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B6B6B]">
              <span>{churchConfig.pastor[lang === 'ko' ? 'korean' : 'english']}</span>
              <span>&middot;</span>
              <span>{formatDate(video.publishedAt, lang)}</span>
              {video.duration && (
                <>
                  <span>&middot;</span>
                  <span>{video.duration}</span>
                </>
              )}
              {video.viewCount && video.viewCount !== '0' && (
                <>
                  <span>&middot;</span>
                  <span>{formatViewCount(video.viewCount)} {t.views[lang]}</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <div className="mt-6 bg-white rounded-xl p-6 border border-[#E8E4DC]">
              <div className={`text-[#6B6B6B] text-sm whitespace-pre-line leading-relaxed ${!expanded && isLong ? 'line-clamp-5' : ''}`}
                style={!expanded && isLong ? { display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
              >
                {video.description}
              </div>
              {isLong && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 text-[#C9A84C] hover:text-[#b8963f] text-sm font-medium transition-colors"
                >
                  {expanded ? t.showLess[lang] : t.showMore[lang]}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Up Next */}
        <div className="lg:col-span-1">
          {relatedVideos.length > 0 && (
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1a2744] mb-4">
                {t.upNext[lang]}
              </h2>
              <div className="space-y-4">
                {relatedVideos.map(v => (
                  <VideoCard key={v.videoId} video={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
