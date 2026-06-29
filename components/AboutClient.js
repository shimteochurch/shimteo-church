'use client'

import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import churchConfig from '@/config/church'

export default function AboutClient() {
  const { lang } = useLang()
  const about = translations.about

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2744] mb-10 text-center">
        {about.title[lang]}
      </h1>

      {/* Pastor Section */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-6">
          {about.pastor[lang]}
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-[#E8E4DC]">
            {/*
              To display the pastor's photo, place an image at /public/images/pastor.jpg
              (recommended: 800x800px, square crop).
              If no file is placed there, a placeholder shape will be shown.
            */}
            <Image
              src="/images/pastor.jpg"
              alt={churchConfig.pastor[lang === 'ko' ? 'korean' : 'english']}
              width={192}
              height={192}
              className="object-cover w-full h-full"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#1C1C1E] mb-2">
              {churchConfig.pastor[lang === 'ko' ? 'korean' : 'english']}
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed">
              {churchConfig.intro[lang === 'ko' ? 'korean' : 'english']}
            </p>
          </div>
        </div>
      </section>

      {/* Church Introduction */}
      <section className="mb-12 bg-white rounded-xl p-8 border border-[#E8E4DC]">
        <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-4">
          {about.churchIntro[lang]}
        </h2>
        <p className="text-[#6B6B6B] leading-relaxed">
          {churchConfig.intro[lang === 'ko' ? 'korean' : 'english']}
        </p>
      </section>

      {/* Service Information */}
      <section className="bg-[#1a2744] text-white rounded-xl p-8">
        <h2 className="font-serif text-2xl font-bold mb-6">
          {about.serviceInfo[lang]}
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{about.sundayService[lang]}</h3>
              <p className="text-gray-300">
                {churchConfig.sundayService[lang === 'ko' ? 'korean' : 'english']}
              </p>
            </div>
          </div>
          {churchConfig.serviceNotes[lang === 'ko' ? 'korean' : 'english'] && (
            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-gray-300 text-sm">
                {churchConfig.serviceNotes[lang === 'ko' ? 'korean' : 'english']}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
