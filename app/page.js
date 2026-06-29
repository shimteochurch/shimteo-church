import { getAllPlaylistsData } from '@/lib/youtube'
import HomeClient from '@/components/HomeClient'

export default async function Home() {
  const playlistsData = await getAllPlaylistsData()

  const allVideos = []
  for (const playlist of playlistsData) {
    allVideos.push(...playlist.videos)
  }
  allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  const featuredVideo = allVideos[0] || null
  const recentVideos = allVideos.slice(1, 4)

  return <HomeClient featuredVideo={featuredVideo} recentVideos={recentVideos} />
}
