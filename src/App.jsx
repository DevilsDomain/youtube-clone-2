import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function App() {
  const [searchQuery, setSearchQuery] = useState("cats")

  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`, fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  console.log(data[0])
  console.log(data[0].id)

  return (
    <>
      <div>
        {data.map((video) => (
          <Link to={`video/${video.id.videoId}`} key={video.id.videoId}>
            {video.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default App
