import { useState } from 'react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function App() {
  const [searchQuery, setSearchQuery] = useState("cats")

  const { data, error, isLoading } = useSWR(`https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`, fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  console.log(data[2].url)

  return (
    <>
      <div>
        {data.map((video) => (
          <p key={video.id}>
            {video.title} - {video.description} - {video.url}
          </p>
        ))}
      </div>
    </>
  )
}

export default App
