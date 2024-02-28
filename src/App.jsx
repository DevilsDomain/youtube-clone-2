// App.js
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useSearch } from './Components/SearchContext';
import Video from './Components/Video';

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const { searchQuery } = useSearch();
  const { data, error, isLoading } = useSWR(
    `https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data[0])

  return (
    <>
      <div>
        {data.map((video) => (
        <Video video={video} key={video.id.videoId}/>
        ))}
      </div>
    </>
  );
}

export default App;
