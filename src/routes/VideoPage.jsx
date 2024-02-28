import { useParams } from 'react-router-dom'
import useSWR from 'swr'


const fetcher = url => fetch(url).then(r => r.json())

function VideoPage() {
  const { videoID } = useParams();
  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoID}`, fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
        <p>{data.title}</p>
        <iframe width="420" height="315" 
        src={`${data.url.substring(0,24)}embed/${videoID}`}>
        </iframe>
        <p>{data.description}</p>
    </div>
  )
}

export default VideoPage