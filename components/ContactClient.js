'use client'

import { useLang } from '@/lib/LanguageContext'
import translations from '@/lib/translations'
import churchConfig from '@/config/church'

export default function ContactClient() {
  const { lang } = useLang()
  const contact = translations.contact
  const addr = churchConfig.address

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2744] mb-10 text-center">
        {contact.title[lang]}
      </h1>

      {/* Google Maps Embed */}
      <div className="rounded-xl overflow-hidden border border-[#E8E4DC] mb-8">
        {/*
          To get your Google Maps embed URL:
          1. Go to maps.google.com
          2. Search your church address
          3. Click Share → Embed a map
          4. Copy the iframe src URL
          5. Replace the src below with your URL
        */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.2262919107957!2d-118.3229309873862!3d33.83227437312913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd4ab84835a4ab%3A0x89139a92741568b1!2s1551%20El%20Prado%20Ave%2C%20Torrance%2C%20CA%2090501!5e0!3m2!1sen!2sus!4v1782698645668!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Church Location"
          className="w-full"
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a2744]/5 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#1a2744]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1a2744] mb-2">{contact.address[lang]}</h3>
          <p className="text-[#6B6B6B] text-sm">
            {addr.street}<br />
            {addr.city}, {addr.state} {addr.zip}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a2744]/5 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#1a2744]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1a2744] mb-2">{contact.phone[lang]}</h3>
          <p className="text-[#6B6B6B] text-sm">{churchConfig.phone}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a2744]/5 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#1a2744]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1a2744] mb-2">{contact.email[lang]}</h3>
          <p className="text-[#6B6B6B] text-sm">{churchConfig.email}</p>
        </div>
      </div>
    </div>
  )
}
