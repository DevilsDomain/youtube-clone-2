import { Link } from "react-router-dom"
function Video({video}) {
  return (
    <Link to={`/video/${video.id.videoId}`}>
        <div>
            <p>{video.duration_raw}</p>
            <img src={video.snippet.thumbnails.url} />
            <p>{video.title}</p>
            <p>{video.channelName}</p>
            <p>{video.views}</p>
        </div>
    </Link>
  )
}

export default Video