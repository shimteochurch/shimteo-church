import { fetchVideoById, getAllPlaylistsData, findVideoPlaylist } from '@/lib/youtube'
import SermonDetailClient from '@/components/SermonDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const video = await fetchVideoById(params.videoId)
  if (!video) return { title: '설교 — 쉼터 교회' }
  return {
    title: `${video.title} — 쉼터 교회`,
    description: video.description?.slice(0, 160) || '',
    openGraph: {
      title: video.title,
      description: video.description?.slice(0, 160) || '',
      images: video.thumbnail ? [{ url: video.thumbnail }] : [],
    },
  }
}

export default async function SermonPage({ params }) {
  const video = await fetchVideoById(params.videoId)
  if (!video) notFound()

  const allPlaylists = await getAllPlaylistsData()
  const playlist = findVideoPlaylist(params.videoId, allPlaylists)

  const relatedVideos = playlist
    ? playlist.videos
        .filter(v => v.videoId !== params.videoId)
        .slice(0, 3)
    : []

  return (
    <SermonDetailClient
      video={video}
      playlist={playlist}
      relatedVideos={relatedVideos}
    />
  )
}
