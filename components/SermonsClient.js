'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import VideoCard from '@/components/VideoCard'
import { formatDate } from '@/lib/youtube'

export default function SermonsClient({ playlistsData }) {
  const { lang } = useLang()
  const s = translations.sermons
  const [activeTab, setActiveTab] = useState('latest')
  const [visibleCount, setVisibleCount] = useState(8)

  const allVideos = useMemo(() => {
    const videos = []
    for (const playlist of playlistsData) {
      videos.push(...playlist.videos)
    }
    videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    return videos
  }, [playlistsData])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2744] mb-8 text-center">
        {s.title[lang]}
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-1 mb-10">
        {['latest', 'series'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors
              ${activeTab === tab
                ? 'bg-[#1a2744] text-white'
                : 'bg-white text-[#6B6B6B] border border-[#E8E4DC] hover:border-[#1a2744] hover:text-[#1a2744]'
              }`}
          >
            {tab === 'latest' ? s.latest[lang] : s.series[lang]}
          </button>
        ))}
      </div>

      {/* Latest Tab */}
      {activeTab === 'latest' && (
        <div className="space-y-12">
          {playlistsData.map(playlist => (
            <div key={playlist.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-bold text-[#1a2744]">
                  {playlist[lang === 'ko' ? 'korean' : 'english']}
                  <span className="text-[#6B6B6B] font-normal text-sm ml-2">
                    {playlist.videoCount} {s.videos[lang]}
                  </span>
                </h2>
                <Link
                  href={`/sermons/series/${playlist.id}`}
                  className="text-[#C9A84C] hover:text-[#b8963f] text-sm font-medium transition-colors"
                >
                  {s.viewAll[lang]} &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {playlist.videos.slice(0, 4).map(video => (
                  <VideoCard key={video.videoId} video={video} />
                ))}
              </div>
            </div>
          ))}

          {/* Load More (all videos combined) */}
          {allVideos.length > visibleCount && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="px-8 py-3 bg-white border border-[#E8E4DC] text-[#1a2744] rounded-lg font-medium hover:border-[#1a2744] transition-colors"
              >
                {s.loadMore[lang]}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Series Tab */}
      {activeTab === 'series' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlistsData.map(playlist => (
            <Link
              key={playlist.id}
              href={`/sermons/series/${playlist.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2744] to-[#2a3d5c] aspect-[4/3] p-6 flex flex-col justify-end">
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-2 py-1 bg-[#C9A84C]/20 text-[#C9A84C] rounded-full font-medium">
                    {s.ongoing[lang]}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
                  {playlist.korean}
                </h3>
                <p className="text-gray-300 text-sm mb-3">{playlist.english}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{playlist.videoCount} {s.videos[lang]}</span>
                  {playlist.dateRange && (
                    <>
                      <span>&middot;</span>
                      <span>
                        {formatDate(playlist.dateRange.start, lang)} ~
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
