'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import churchConfig from '@/config/church'
import VideoCard from '@/components/VideoCard'
import { formatDate } from '@/lib/youtube'

export default function HomeClient({ featuredVideo, recentVideos }) {
  const { lang } = useLang()
  const home = translations.home

  return (
    <>
      {/* Hero Section */}
      {/*
        To use a hero background image, place an image at /public/images/hero.jpeg
        (recommended: 1920x1080px). If the file exists, it will show as a dark overlay.
        If no file is placed there, a solid navy background is used.
      */}
      <section className="relative bg-[#1a2744] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            {churchConfig.name.korean}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-2">
            {churchConfig.name.english}
          </p>
          <p className="text-[#C9A84C] text-lg mt-4 mb-8">
            {churchConfig.tagline[lang === 'ko' ? 'korean' : 'english']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-[#1a2744] font-semibold rounded-lg hover:bg-[#b8963f] transition-colors"
            >
              {home.serviceTimes[lang]}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              {home.directions[lang]}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Sermon Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a2744]">
            {home.latestSermon[lang]}
          </h2>
          <Link
            href="/sermons"
            className="text-[#C9A84C] hover:text-[#b8963f] text-sm font-medium transition-colors"
          >
            {home.viewAll[lang]} &rarr;
          </Link>
        </div>

        {featuredVideo ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <VideoCard video={featuredVideo} size="large" />
            <div className="flex flex-col justify-center">
              <p className="text-[#C9A84C] text-sm font-medium mb-2">
                {home.latestSermon[lang]}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1a2744] mb-3">
                {featuredVideo.title}
              </h3>
              <p className="text-[#6B6B6B] text-sm mb-2">
                {churchConfig.pastor[lang === 'ko' ? 'korean' : 'english']}
              </p>
              <p className="text-[#6B6B6B] text-sm mb-1">
                {formatDate(featuredVideo.publishedAt, lang)}
              </p>
              {featuredVideo.duration && (
                <p className="text-[#6B6B6B] text-sm">{featuredVideo.duration}</p>
              )}
              <Link
                href={`/sermons/${featuredVideo.videoId}`}
                className="mt-4 inline-flex items-center text-[#C9A84C] hover:text-[#b8963f] font-medium transition-colors"
              >
                {lang === 'ko' ? '설교 보기' : 'Watch Sermon'} &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-[#6B6B6B] text-center py-12">
            {lang === 'ko' ? '설교 영상이 없습니다.' : 'No sermons available.'}
          </p>
        )}

        {recentVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map(video => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        )}
      </section>

      {/* About Preview Section */}
      <section className="bg-white border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a2744] mb-6">
            {home.aboutPreview[lang]}
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto mb-4">
            {churchConfig.intro[lang === 'ko' ? 'korean' : 'english']}
          </p>
          <p className="text-[#1a2744] font-semibold mb-6">
            {churchConfig.sundayService[lang === 'ko' ? 'korean' : 'english']}
          </p>
          <Link
            href="/about"
            className="text-[#C9A84C] hover:text-[#b8963f] font-medium transition-colors"
          >
            {home.learnMore[lang]} &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
