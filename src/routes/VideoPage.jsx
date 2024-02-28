import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import RecVideos from '../Components/RecVideos';


const fetcher = url => fetch(url).then(r => r.json())

function VideoPage() {
  const { videoID } = useParams();
  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoID}`, fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  console.log(data)
  return (
    <div>
        <div>
            <p>{data.title}</p>
            <iframe width="420" height="315" 
            src={`${data.url.substring(0,24)}embed/${videoID}`}>
            </iframe>
            <p>{data.description}</p>
        </div>
        <div>
            <h1>recommended videos</h1>
            <RecVideos></RecVideos>
        </div>
    </div>
  )
}

export default VideoPage