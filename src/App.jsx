import useSWR from 'swr';
import { useSearch } from './Components/SearchContext';
import Video from './Components/Video';
import styled from 'styled-components';

const fetcher = (url) => fetch(url).then((r) => r.json());

const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 0 auto; 
  padding-top: 50px;
  max-width: 1300px;
  gap: 20px 20px; 
`;

function App() {
  const { searchQuery } = useSearch();
  const { data, error, isLoading } = useSWR(
    `https://youtube.thorsteinsson.is/api/search?q=${searchQuery}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data)

  return (
    <VideosContainer>
      {data.map((video) => (
        <Video video={video} playlist={false} key={video.id.videoId} />
      ))}
    </VideosContainer>
  );
}

export default App;
