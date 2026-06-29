import { getAllPlaylistsData } from '@/lib/youtube'
import SermonsClient from '@/components/SermonsClient'

export const metadata = {
  title: '설교 · Sermons — 쉼터 교회',
  description: '쉼터 교회 설교 영상 모음',
}

export default async function SermonsPage() {
  const playlistsData = await getAllPlaylistsData()
  return <SermonsClient playlistsData={playlistsData} />
}
