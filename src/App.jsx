// App.js
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useSearch } from './Components/SearchContext';

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const { searchQuery } = useSearch();
  const { data, error, isLoading } = useSWR(
    `https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div>
        {data.map((video) => (
          <Link to={`/video/${video.id.videoId}`} key={video.id.videoId}>
            {video.title}
          </Link>
        ))}
      </div>
    </>
  );
}

export default App;
