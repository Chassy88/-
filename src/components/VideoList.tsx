import type { VideoItem } from '../data/mockVideos'
import VideoCard from './VideoCard'
import './VideoList.css'

type VideoListProps = {
  videos: VideoItem[]
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
