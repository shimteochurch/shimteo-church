import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shimteochurch.com'),
  title: '쉼터 교회 · Shimteo Church',
  description: '쉼터 교회 - Shimteo Church. 하나님의 말씀을 중심으로 모이는 공동체입니다.',
  icons: {
    icon: '/images/icon.png',
  },
  openGraph: {
    title: '쉼터 교회 · Shimteo Church',
    description: '쉼터 교회 - Shimteo Church',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shimteochurch.com',
    siteName: '쉼터 교회',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
