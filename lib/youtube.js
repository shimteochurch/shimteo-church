import playlists from './playlists'

const API_KEY = process.env.YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

function parseDuration(iso8601) {
  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function formatDate(dateString, lang = 'ko') {
  const date = new Date(dateString)
  if (lang === 'ko') {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatViewCount(count) {
  const num = parseInt(count)
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

async function fetchPlaylistVideos(playlistId, maxResults = 50) {
  try {
    const res = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return []
    const data = await res.json()

    const videoIds = data.items
      .filter(item => item.snippet.resourceId.kind === 'youtube#video')
      .map(item => item.snippet.resourceId.videoId)

    if (videoIds.length === 0) return []

    const detailsRes = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    )
    if (!detailsRes.ok) return data.items.map(item => mapBasicVideo(item, playlistId))

    const details = await detailsRes.json()
    const detailsMap = {}
    details.items.forEach(item => {
      detailsMap[item.id] = item
    })

    return data.items
      .filter(item => item.snippet.resourceId.kind === 'youtube#video')
      .map(item => {
        const videoId = item.snippet.resourceId.videoId
        const detail = detailsMap[videoId]
        return {
          videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.maxres?.url
            || item.snippet.thumbnails?.high?.url
            || item.snippet.thumbnails?.medium?.url
            || item.snippet.thumbnails?.default?.url,
          publishedAt: detail?.snippet?.publishedAt || item.snippet.publishedAt,
          playlistId,
          duration: detail ? parseDuration(detail.contentDetails.duration) : '',
          viewCount: detail ? detail.statistics.viewCount : '0',
        }
      })
  } catch {
    return []
  }
}

function mapBasicVideo(item, playlistId) {
  return {
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.high?.url
      || item.snippet.thumbnails?.medium?.url
      || item.snippet.thumbnails?.default?.url,
    publishedAt: item.snippet.publishedAt,
    playlistId,
    duration: '',
    viewCount: '0',
  }
}

async function fetchVideoById(videoId) {
  try {
    const res = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.items || data.items.length === 0) return null

    const item = data.items[0]
    return {
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.maxres?.url
        || item.snippet.thumbnails?.high?.url
        || item.snippet.thumbnails?.medium?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount || '0',
    }
  } catch {
    return null
  }
}

async function getAllVideos() {
  const allVideos = []
  for (const playlist of playlists) {
    const videos = await fetchPlaylistVideos(playlist.id)
    allVideos.push(...videos)
  }
  allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  return allVideos
}

async function getPlaylistData(playlistId) {
  const playlist = playlists.find(p => p.id === playlistId)
  if (!playlist) return null

  const videos = await fetchPlaylistVideos(playlistId)
  videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return {
    ...playlist,
    videos,
    videoCount: videos.length,
    dateRange: videos.length > 0
      ? {
          start: videos[videos.length - 1].publishedAt,
          end: videos[0].publishedAt,
        }
      : null,
  }
}

async function getAllPlaylistsData() {
  const results = []
  for (const playlist of playlists) {
    const data = await getPlaylistData(playlist.id)
    if (data) results.push(data)
  }
  return results
}

function findVideoPlaylist(videoId, allPlaylistsData) {
  for (const playlist of allPlaylistsData) {
    if (playlist.videos.some(v => v.videoId === videoId)) {
      return playlist
    }
  }
  return null
}

export {
  fetchPlaylistVideos,
  fetchVideoById,
  getAllVideos,
  getPlaylistData,
  getAllPlaylistsData,
  findVideoPlaylist,
  formatDate,
  formatViewCount,
  parseDuration,
}
