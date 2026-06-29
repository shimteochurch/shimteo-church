import { getPlaylistData } from '@/lib/youtube'
import SeriesDetailClient from '@/components/SeriesDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const playlist = await getPlaylistData(params.playlistId)
  if (!playlist) return { title: '시리즈 — 쉼터 교회' }
  return {
    title: `${playlist.korean} · ${playlist.english} — 쉼터 교회`,
    description: `${playlist.korean} 설교 시리즈 - 쉼터 교회`,
  }
}

export default async function SeriesPage({ params }) {
  const playlist = await getPlaylistData(params.playlistId)
  if (!playlist) notFound()

  return <SeriesDetailClient playlist={playlist} />
}
